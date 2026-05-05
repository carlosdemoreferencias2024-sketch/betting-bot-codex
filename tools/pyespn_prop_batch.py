import argparse
import difflib
import json
import statistics
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SHIMS = ROOT / "tools" / "pyespn_shims"
VENDOR = ROOT / "vendor" / "pyespn-dev"
DATA_DIR = ROOT / "data"
for path in [str(SHIMS), str(VENDOR)]:
    if path not in sys.path:
        sys.path.insert(0, path)


def parse_args():
    parser = argparse.ArgumentParser(description="Batch de game logs PyESPN para props NFL/NBA.")
    parser.add_argument("--league", required=True, choices=["nfl", "nba"])
    parser.add_argument("--season", required=True, type=int)
    parser.add_argument("--recent", type=int, default=5)
    return parser.parse_args()


def normalize_name(value):
    return "".join(ch for ch in str(value or "").lower() if ch.isalnum())


def ensure_data_dir():
    DATA_DIR.mkdir(parents=True, exist_ok=True)


def cache_path(league, season):
    ensure_data_dir()
    return DATA_DIR / f"pyespn-player-index-{league}-{season}.json"


def load_payload_from_stdin():
    raw = sys.stdin.read().strip()
    if not raw:
        return {}
    try:
        return json.loads(raw)
    except Exception:
        return {}


def write_json(file_path, value):
    ensure_data_dir()
    file_path.write_text(json.dumps(value, indent=2, ensure_ascii=False), encoding="utf-8")


def read_json(file_path, fallback):
    try:
        if not file_path.exists():
            return fallback
        return json.loads(file_path.read_text(encoding="utf-8"))
    except Exception:
        return fallback


def build_player_index(espn, season):
    season_cache = cache_path(espn.league_abbv, season)
    cached = read_json(season_cache, None)
    if cached:
        return cached

    espn.load_season_rosters(season=season)
    by_id = {}
    for team in espn.teams:
        for player in team.roster.get(season, []) or []:
            player_id = str(getattr(player, "id", "") or "")
            if not player_id or player_id in by_id:
                continue
            aliases = list({
                getattr(player, "full_name", "") or "",
                getattr(player, "display_name", "") or "",
                getattr(player, "short_name", "") or "",
            })
            by_id[player_id] = {
                "id": player_id,
                "full_name": getattr(player, "full_name", "") or "",
                "display_name": getattr(player, "display_name", "") or "",
                "short_name": getattr(player, "short_name", "") or "",
                "position": getattr(player, "position_abbreviation", "") or "",
                "team": getattr(team, "name", "") or "",
                "aliases": [alias for alias in aliases if alias],
            }

    indexed = {
        "league": espn.league_abbv,
        "season": season,
        "players": list(by_id.values()),
    }
    write_json(season_cache, indexed)
    return indexed


def resolve_player(name, index):
    needle = normalize_name(name)
    if not needle:
        return None

    alias_map = {}
    for entry in index.get("players", []):
        for alias in entry.get("aliases", []) or []:
            alias_key = normalize_name(alias)
            if alias_key and alias_key not in alias_map:
                alias_map[alias_key] = entry

    if needle in alias_map:
        return alias_map[needle]

    contains = []
    for alias_key, entry in alias_map.items():
        if needle in alias_key or alias_key in needle:
            contains.append((alias_key, entry))
    if contains:
        contains.sort(key=lambda item: abs(len(item[0]) - len(needle)))
        return contains[0][1]

    closest = difflib.get_close_matches(needle, list(alias_map.keys()), n=1, cutoff=0.86)
    if closest:
        return alias_map.get(closest[0])
    return None


def coerce_number(value):
    try:
        return float(value)
    except Exception:
        return None


def flatten_log_stats(entry):
    flat = {}
    for category in entry.get("stats", []) or []:
        for stat in getattr(category, "stats", []) or []:
            abbr = getattr(stat, "stat_type_abbreviation", None) or getattr(stat, "name", None)
            value = coerce_number(getattr(stat, "stat_value", None))
            if abbr and value is not None:
                flat[abbr] = value
    return flat


def stat_value(raw, candidates):
    for candidate in candidates:
        value = coerce_number(raw.get(candidate))
        if value is not None:
            return value
    return 0.0


def map_nba_log(raw):
    return {
        "pts": stat_value(raw, ["PTS"]),
        "reb": stat_value(raw, ["REB"]),
        "ast": stat_value(raw, ["AST"]),
        "fg3m": stat_value(raw, ["3PM"]),
        "min": stat_value(raw, ["MIN"]),
    }


def map_nfl_log(raw, position):
    pos = str(position or "").upper()
    is_qb = pos == "QB"
    is_rush = pos in {"QB", "RB", "FB"}
    is_receiving = pos in {"WR", "TE", "RB", "HB", "FB"}
    return {
        "pass_yds": stat_value(raw, ["TYDS", "NTYDS", "NYDS"]) if is_qb else 0.0,
        "pass_tds": stat_value(raw, ["TD"]) if is_qb else 0.0,
        "rush_yds": stat_value(raw, ["YDS"]) if is_rush else 0.0,
        "rec_yds": stat_value(raw, ["YDS"]) if is_receiving and not is_qb else 0.0,
        "td": stat_value(raw, ["TD"]),
        "min": 0.0,
    }


def average_key(rows, key):
    values = [coerce_number(row.get(key)) for row in rows]
    values = [value for value in values if value is not None]
    if not values:
        return 0.0
    return round(statistics.mean(values), 2)


def summarize_player_logs(player, league, season, recent_count, fallback_meta=None):
    player.load_player_box_scores_season(season)
    logs = list(getattr(player, "_stats_game_log", {}).get(season, []) or [])
    flattened = []
    for entry in logs:
        raw_stats = flatten_log_stats(entry)
        if not raw_stats:
            continue
        event = entry.get("event")
        event_name = getattr(event, "short_name", None) or getattr(event, "event_name", None) or getattr(event, "name", None)
        event_date = getattr(event, "date", None)
        mapped = map_nfl_log(raw_stats, getattr(player, "position_abbreviation", None)) if league == "nfl" else map_nba_log(raw_stats)
        flattened.append({
            "event": event_name,
            "date": event_date,
            "raw": raw_stats,
            "mapped": mapped,
        })

    flattened.sort(key=lambda item: item.get("date") or "")
    recent = flattened[-recent_count:]
    mapped_recent = [entry["mapped"] for entry in recent]
    mapped_season = [entry["mapped"] for entry in flattened]

    keys = ["pass_yds", "pass_tds", "rush_yds", "rec_yds", "td", "min"] if league == "nfl" else ["pts", "reb", "ast", "fg3m", "min"]
    recent_summary = {key: average_key(mapped_recent, key) for key in keys}
    season_summary = {key: average_key(mapped_season, key) for key in keys}

    return {
        "source": "pyespn",
        "playerId": str(getattr(player, "id", "") or ""),
        "playerName": getattr(player, "full_name", None) or getattr(player, "display_name", None) or "",
        "teamName": fallback_meta.get("team", "") if fallback_meta else "",
        "position": getattr(player, "position_abbreviation", None) or (fallback_meta or {}).get("position", ""),
        "recentGames": len(recent),
        "seasonGames": len(flattened),
        "recent": recent_summary,
        "season": season_summary,
        "events": [
            {
                "event": item.get("event"),
                "date": item.get("date"),
                "mapped": item.get("mapped"),
            }
            for item in recent
        ],
    }


def main():
    from pyespn import PYESPN

    args = parse_args()
    payload = load_payload_from_stdin()
    requested_names = payload.get("names", [])
    if not isinstance(requested_names, list):
        requested_names = []
    requested_names = [str(name or "").strip() for name in requested_names if str(name or "").strip()]

    resolver = PYESPN(args.league, load_teams=True)
    index = build_player_index(resolver, args.season)

    espn = PYESPN(args.league, load_teams=False)
    if args.league == "nba":
        espn.load_season_schedule(
            season=args.season,
            load_only_current_week=False,
            load_regular_season=True,
            load_postseason=True,
            load_play_in=True,
            load_game_odds=False,
        )

    results = {}
    unresolved = []
    for name in requested_names:
        resolved = resolve_player(name, index)
        if not resolved:
            unresolved.append(name)
            continue
        try:
            player = espn.get_player_info(resolved["id"])
            summary = summarize_player_logs(player, args.league, args.season, args.recent, resolved)
            summary["requestedName"] = name
            summary["matchedAlias"] = resolved.get("full_name") or resolved.get("display_name") or name
            results[normalize_name(name)] = summary
        except Exception as exc:
            results[normalize_name(name)] = {
                "source": "pyespn-error",
                "requestedName": name,
                "matchedAlias": resolved.get("full_name") or name,
                "playerId": resolved.get("id"),
                "error": f"{type(exc).__name__}: {exc}",
            }

    print(json.dumps({
        "league": args.league,
        "season": args.season,
        "requested": requested_names,
        "resolved": results,
        "unresolved": unresolved,
    }, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()

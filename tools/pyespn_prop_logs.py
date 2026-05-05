import argparse
import json
import statistics
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SHIMS = ROOT / "tools" / "pyespn_shims"
VENDOR = ROOT / "vendor" / "pyespn-dev"
for path in [str(SHIMS), str(VENDOR)]:
    if path not in sys.path:
        sys.path.insert(0, path)


def parse_args():
    parser = argparse.ArgumentParser(description="Resumen de game logs con PyESPN para props NFL/NBA.")
    parser.add_argument("--league", required=True, choices=["nfl", "nba"])
    parser.add_argument("--season", required=True, type=int)
    parser.add_argument("--player-id", required=True, type=int)
    parser.add_argument("--recent", type=int, default=5)
    return parser.parse_args()


def coerce_number(value):
    try:
        return float(value)
    except Exception:
        return None


def summarize_logs(player, season, recent_count):
    player.load_player_box_scores_season(season)
    logs = list(getattr(player, "_stats_game_log", {}).get(season, []) or [])
    recent_logs = logs[-recent_count:]
    by_abbr = {}
    events = []

    for entry in recent_logs:
        event = entry.get("event")
        event_name = getattr(event, "short_name", None) or getattr(event, "event_name", None) or getattr(event, "name", None)
        event_date = getattr(event, "date", None)
        flat_stats = {}
        for category in entry.get("stats", []) or []:
            for stat in getattr(category, "stats", []) or []:
                abbr = getattr(stat, "stat_type_abbreviation", None) or getattr(stat, "name", None)
                value = coerce_number(getattr(stat, "stat_value", None))
                if not abbr or value is None:
                    continue
                flat_stats[abbr] = value
                by_abbr.setdefault(abbr, []).append(value)
        events.append({
            "event": event_name,
            "date": event_date,
            "stats": flat_stats,
        })

    averages = {
        abbr: round(statistics.mean(values), 2)
        for abbr, values in by_abbr.items()
        if values
    }

    return {
        "season": season,
        "recent_games": len(recent_logs),
        "averages": averages,
        "events": events,
    }


def main():
    from pyespn import PYESPN

    args = parse_args()
    espn = PYESPN(args.league, load_teams=False)
    player = espn.get_player_info(args.player_id)
    espn.load_season_schedule(
        season=args.season,
        load_only_current_week=False,
        load_regular_season=True,
        load_postseason=False,
        load_game_odds=False,
    )
    summary = summarize_logs(player, args.season, args.recent)
    payload = {
        "league": args.league,
        "player_id": args.player_id,
        "player_name": getattr(player, "full_name", None) or getattr(player, "name", None),
        "summary": summary,
    }
    print(json.dumps(payload, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()

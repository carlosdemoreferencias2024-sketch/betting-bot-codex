import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SHIMS = ROOT / "tools" / "pyespn_shims"
RUNTIME = ROOT / "vendor" / "pyespn_pydeps"
VENDOR = ROOT / "vendor" / "pyespn-dev"
if str(SHIMS) not in sys.path:
    sys.path.insert(0, str(SHIMS))
if str(RUNTIME) not in sys.path:
    sys.path.insert(0, str(RUNTIME))
if str(VENDOR) not in sys.path:
    sys.path.insert(0, str(VENDOR))


def safe_attr(obj, *names, default=None):
    for name in names:
        value = getattr(obj, name, None)
        if value is not None:
            return value
    return default


def probe_league(league, season, event_id, player_id):
    from pyespn import PYESPN

    espn = PYESPN(league, load_teams=False)
    player = espn.get_player_info(player_id)
    event = espn.get_game_info(event_id)

    result = {
        "league": league,
        "team_count": len(getattr(espn, "teams", []) or []),
        "team_mapping_count": len(getattr(espn, "team_id_mapping", []) or []),
        "team_load_mode": "deferred",
        "player": {
            "id": player_id,
            "full_name": safe_attr(player, "full_name", "name", default=""),
            "type": safe_attr(player, "type", default=""),
            "date_of_birth": safe_attr(player, "date_of_birth", default=""),
            "debut_year": safe_attr(player, "debut_year", "draft_year", default=None),
        },
        "event": {
            "id": event_id,
            "short_name": safe_attr(event, "short_name", default=""),
            "event_name": safe_attr(event, "event_name", "name", default=""),
            "date": safe_attr(event, "date", default=""),
        },
    }

    try:
        espn.load_season_schedule(
            season=season,
            load_only_current_week=True,
            load_regular_season=True,
            load_postseason=False,
            load_game_odds=False,
        )
        league_obj = getattr(espn, "league", None)
        result["schedule_probe"] = {
            "season": season,
            "loaded": True,
            "league_class": league_obj.__class__.__name__ if league_obj else None,
        }
    except Exception as exc:
        result["schedule_probe"] = {
            "season": season,
            "loaded": False,
            "error": f"{type(exc).__name__}: {exc}",
        }

    return result


def main():
    report = {
        "vendor_path": str(VENDOR),
        "python": sys.executable,
        "probes": [],
    }

    report["probes"].append(probe_league("nfl", 2025, 401671889, 278))
    report["probes"].append(probe_league("nba", 2025, 401705402, 4397002))

    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()

import json
from pathlib import Path


class TeamNormalizer:
    def __init__(self) -> None:
        mapping_file = Path(__file__).resolve().parents[2] / "data" / "team_mapping.json"
        self.mapping = json.loads(mapping_file.read_text(encoding="utf-8")) if mapping_file.exists() else {}
        self.alias_index = self._build_alias_index()

    def _build_alias_index(self) -> dict[tuple[str, str], str]:
        index: dict[tuple[str, str], str] = {}
        for sport_name, teams in self.mapping.items():
            for _, data in teams.items():
                official = data["official"]
                index[(sport_name.upper(), self._key(official))] = official
                for alias in data.get("aliases", []):
                    index[(sport_name.upper(), self._key(alias))] = official
        return index

    @staticmethod
    def _key(name: str) -> str:
        return "".join(ch.lower() for ch in str(name) if ch.isalnum())

    def normalize(self, sport_name: str, raw_name: str) -> str:
        return self.alias_index.get((sport_name.upper(), self._key(raw_name)), raw_name)

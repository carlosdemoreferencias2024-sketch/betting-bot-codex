import math


class BettingAlgorithms:
    @staticmethod
    def soccer_poisson(avg_goals_home: float, avg_goals_away: float) -> dict[str, float]:
        prob_home = 0.0
        prob_away = 0.0
        prob_draw = 0.0
        for i in range(6):
            for j in range(6):
                p_i = BettingAlgorithms._poisson_pmf(i, avg_goals_home)
                p_j = BettingAlgorithms._poisson_pmf(j, avg_goals_away)
                if i > j:
                    prob_home += p_i * p_j
                elif i < j:
                    prob_away += p_i * p_j
                else:
                    prob_draw += p_i * p_j
        return {"home": prob_home, "away": prob_away, "draw": prob_draw}

    @staticmethod
    def mlb_log5(win_pct_home: float, win_pct_away: float) -> dict[str, float]:
        a = win_pct_home
        b = win_pct_away
        denom = a + b - (2 * a * b)
        if denom == 0:
            return {"home": 0.5, "away": 0.5}
        prob_home = (a - (a * b)) / denom
        return {"home": prob_home, "away": 1 - prob_home}

    @staticmethod
    def elo_prediction(rating_home: float, rating_away: float) -> dict[str, float]:
        expected_home = 1 / (1 + 10 ** ((rating_away - rating_home) / 400))
        return {"home": expected_home, "away": 1 - expected_home}

    @staticmethod
    def fair_odd(probability: float) -> float:
        if probability <= 0:
            return 999.0
        return round(1 / probability, 2)

    @staticmethod
    def edge_percent(market_odd: float, fair_odd: float) -> float:
        if fair_odd <= 0:
            return 0.0
        return round(((market_odd / fair_odd) - 1) * 100, 2)

    @staticmethod
    def kelly_fraction(decimal_odd: float, probability: float, fraction: float = 0.25) -> float:
        b = decimal_odd - 1
        if b <= 0:
            return 0.0
        q = 1 - probability
        raw = ((b * probability) - q) / b
        return round(max(0.0, raw * fraction), 4)

    @staticmethod
    def _poisson_pmf(goals: int, avg: float) -> float:
        if avg <= 0:
            return 1.0 if goals == 0 else 0.0
        return (math.exp(-avg) * (avg ** goals)) / math.factorial(goals)

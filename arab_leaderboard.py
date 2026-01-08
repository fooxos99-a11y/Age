import requests

# رموز الدول العربية
arab_countries = [
    "SA", "EG", "AE", "JO", "MA", "DZ", "TN", "OM", "QA", "KW", "BH", "IQ", "SY", "LB", "LY", "SD", "YE", "PS", "SO", "MR", "DJ", "KM"
]

def get_arab_leaderboard(season=12, pages=1000):
    url = "https://aoe4world.com/api/leaderboard/rm_solo"
    arab_players = []
    for page in range(1, pages+1):
        params = {"season": season, "page": page, "count": 50}
        try:
            res = requests.get(url, params=params)
            if res.status_code != 200:
                print(f"Error fetching page {page}: {res.status_code}")
                continue
            data = res.json()
            for player in data.get("leaderboard", []):
                if player.get("country") in arab_countries:
                    arab_players.append({
                        "rank": player.get("rank"),
                        "name": player.get("name"),
                        "country": player.get("country"),
                        "rating": player.get("rating"),
                        "win_rate": player.get("win_rate"),
                        "games": player.get("games")
                    })
        except Exception as e:
            print(f"Exception on page {page}: {e}")
    return arab_players

if __name__ == "__main__":
    players = get_arab_leaderboard()
    for p in players:
        print(f"#{p['rank']} {p['name']} ({p['country']}) - Rating: {p['rating']} - Win Rate: {p['win_rate']}% - Games: {p['games']}")

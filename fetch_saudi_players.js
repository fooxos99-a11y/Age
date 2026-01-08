// Script to fetch Saudi players and their points from aoe4world.com leaderboard
// Requires: node-fetch (install with: npm install node-fetch)



const fs = require('fs');
const url = 'https://aoe4world.com/api/leaderboard/rm_solo?country=sa';

// Use global fetch in Node.js 18+
async function fetchSaudiPlayers() {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Network response was not ok: ' + response.status);
    const data = await response.json();
    const players = data.players.map(player => ({
      name: player.name,
      rank: player.rank,
      rating: player.rating,
      country: player.country
    }));
    fs.writeFileSync('saudi_players.json', JSON.stringify(players, null, 2));
    console.log('Fetched and saved Saudi players:', players.length);
  } catch (error) {
    console.error('Error fetching players:', error);
  }
}

fetchSaudiPlayers();

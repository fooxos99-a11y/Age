// Script to scrape Saudi players and their points from aoe4world.com leaderboard HTML
// Requires: npm install node-fetch cheerio

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://aoe4world.com/leaderboard/rm_solo?country=sa';

async function scrapeSaudiPlayers() {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/html'
      }
    });
    if (!response.ok) throw new Error('Network response was not ok: ' + response.status);
    const html = await response.text();
    const $ = cheerio.load(html);
    const players = [];
    // The table rows contain player data
    $('table tbody tr').each((i, el) => {
      const tds = $(el).find('td');
      if (tds.length >= 5) {
        players.push({
          rank: $(tds[0]).text().trim(),
          name: $(tds[1]).text().trim(),
          rating: $(tds[2]).text().trim(),
          country: 'sa'
        });
      }
    });
    fs.writeFileSync('saudi_players.json', JSON.stringify(players, null, 2));
    console.log('Scraped and saved Saudi players:', players.length);
  } catch (error) {
    console.error('Error scraping players:', error);
  }
}

scrapeSaudiPlayers();

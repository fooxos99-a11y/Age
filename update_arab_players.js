// سكريبت Node.js لجلب وتحديث اللاعبين العرب في Supabase تلقائيًا
const { createClient } = require('@supabase/supabase-js');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xvzsfcsnfymcqcijmfhe.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_IJsEFq2d4VPvsMZi3sQ-Yw_otD0OoG1';
const supabase = createClient(supabaseUrl, supabaseKey);

const arabCountries = [
  'SA', 'EG', 'AE', 'JO', 'MA', 'DZ', 'TN', 'OM', 'QA', 'KW', 'BH', 'IQ', 'SY', 'LB', 'LY', 'SD', 'YE', 'PS', 'SO', 'MR', 'DJ', 'KM'
];

async function fetchAndUpdatePlayers() {
  let allPlayers = [];
  for (const country of arabCountries) {
    let page = 1;
    let hasMore = true;
    let countryPlayers = 0;
    while (hasMore && page <= 20) { // جلب أول 20 صفحة لكل دولة
      const url = `https://aoe4world.com/api/leaderboard/rm_solo?season=12&country=${country}&page=${page}&count=50`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.log(`فشل جلب البيانات من ${country} الصفحة ${page}`);
          break;
        }
        const data = await res.json();
        const players = data.leaderboard || [];
        if (players.length === 0) {
          hasMore = false;
        } else {
          allPlayers.push(...players.map(p => ({
            rank: p.rank,
            name: p.name,
            country: p.country,
            rating: p.rating,
            win_rate: p.win_rate,
            games: p.games
          })));
          countryPlayers += players.length;
          page++;
        }
      } catch (err) {
        console.log(`خطأ في جلب بيانات ${country} الصفحة ${page}:`, err);
        hasMore = false;
      }
    }
    console.log(`تم جلب ${countryPlayers} لاعب من ${country}`);
  }

  // تحديث أو إضافة اللاعبين في Supabase
  for (const player of allPlayers) {
    await supabase
      .from('players')
      .upsert([player], { onConflict: ['rank', 'country'] });
  }
  console.log(`تم تحديث ${allPlayers.length} لاعب عربي.`);
}

// تشغيل كل 10 دقائق
setInterval(fetchAndUpdatePlayers, 10 * 60 * 1000);

// تشغيل أول مرة عند بدء السكريبت
fetchAndUpdatePlayers();

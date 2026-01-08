"use client"

import { useState, useEffect } from "react"
import { Trophy } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Header } from "@/components/header"

export default function PlayersPage() {
  const { language } = useLanguage()
  // استخدم رقم الصفحة من الرابط
  function getPageFromUrl() {
    if (typeof window === 'undefined') return 1;
    const params = new URLSearchParams(window.location.search);
    return Number(params.get('page')) || 1;
  }
  const [currentPage, setCurrentPage] = useState(getPageFromUrl());
  const [activeTab, setActiveTab] = useState<"individual" | "team">("individual")
  // عند تغيير الصفحة، حدث الرابط
  function handlePageChange(page: number) {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('page', String(page));
      window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    }
  }

  const isArabic = language === "ar"

  // ضع هنا معرفات اللاعبين الذين تريدهم من aoe4world (بدون تكرار)
  const playerIds = [
    13803227, 18269677, 16919033, 18127021, 14536691, 22697227, 720732, 18949649, 7202544, 22744507, 11831473, 17916129, 16735807, 22583412, 13610117, 24463802, 10838919, 23074017, 3104402, 15356403, 7751466, 8338970, 3830179,
    11936490, 17691205, 7101802, 11722889, 14942784, 12612429, 21930925, 2726798, 7951909, 18646935, 22321156, 15623207, 22392824, 18537498, 10380410, 23365421, 10298048, 17519084, 22678310, 4187391, 18427504, 7286535, 20985555, 18756172, 18648333, 16142126, 23478463, 14139190, 21400369, 22520672, 6601674, 2904007, 9333742, 6992032, 22581524, 4885161, 12546758
  ];
  const [players, setPlayers] = useState<any[]>([]);
  // دالة توحيد اسم اللاعب (بدون تشكيل ومسافات وحروف صغيرة)
  function normalizeNameKey(name: string) {
    return name.replace(/[\u064B-\u0652]/g, '').replace(/\s+/g, '').toLowerCase();
  }
  const deniedNorm = normalizeNameKey("Denied");
  const deniedNorm2 = normalizeNameKey("DenieD");
  const overrideCountry: Record<string, string> = {
    DenieD: "tn", // تونس (exact match)
    denied: "tn", // تونس
    [deniedNorm]: "tn", // تونس (normalized)
    [deniedNorm2]: "tn", // تونس (normalized for DenieD)
    // أضف لاعبين آخرين هنا إذا احتجت
  };

  // اجبر علم تونس إذا كان اسم اللاعب DenieD بالضبط
  function getPlayerCountry(player: any) {
    if (player.username === "DenieD") return "tn";
    if (player.username === "allowed") return "tn";
    if (player.username === "Gam3rLama") return "tn";
    if (player.username === "النقيب / SPARTAN") return "ly";
    // ...existing code...
    // منطقك الحالي:
    // دالة توحيد اسم اللاعب (بدون تشكيل ومسافات وحروف صغيرة)
    function normalizeNameKey(name: string) {
      return name.replace(/[\u064B-\u0652]/g, '').replace(/\s+/g, '').toLowerCase();
    }
    const normName = normalizeNameKey(player.username);
    return overrideCountry[player.username] || overrideCountry[normName] || player.country;
  }
    // خريطة الكلان للاعبين حسب الاسم
    const clanImages: Record<string, string> = {
      loklok: "/1.png",
      // أضف لاعبين آخرين هنا
    };
  const [loading, setLoading] = useState(true);

  // خريطة الرانكات إلى الصور (ضع الصور في public/ranks/ بنفس الاسم)
  const rankImages: Record<string, string> = {
    bronze1: "/bronze1.png",
    bronze2: "/bronze2.png",
    bronze3: "/bronze3.png",
    silver1: "/Silver1.png",
    silver2: "/Silver2.png",
    silver3: "/Silver3.png",
    gold1: "/gold1.png",
    gold2: "/gold2.png",
    gold3: "/gold3.png",
    platinum1: "/plat1.png",
    platinum2: "/plat2.png",
    platinum3: "/plat3.png",
    diamond1: "/diamond1.png",
    diamond2: "/diamond2.png",
    diamond3: "/diamond3.png",
    conqueror1: "/conq1.png",
    conqueror2: "/conq2.png",
    conqueror3: "/Conq3.png",
  };

  // دالة لتحويل اسم الرانك إلى مفتاح الصورة الصحيح
  function normalizeRankName(rankName: string = ""): string {
    // مثال: "Gold I" → "gold1"
    return rankName
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace("iii", "3")
      .replace("ii", "2")
      .replace("i", "1");
  }

  useEffect(() => {
    async function fetchPlayers() {
      // جلب بيانات كل لاعب من aoe4world API
      const responses = await Promise.all(
        playerIds.map(async (id) => {
          const res = await fetch(`https://aoe4world.com/api/v0/players/${id}`);
          if (!res.ok) return null;
          const data = await res.json();
          // تم حذف جميع أوامر الطباعة من الصفحة لتحسين الأداء
          // جلب بيانات السولو والتيم من modes
          const solo = data.modes?.rm_solo || {};
          const team = data.modes?.rm_team || {};
          return {
            username: data.name,
            country: data.country || '',
            solo: {
              rank: solo.rank !== undefined && solo.rank !== null ? solo.rank : '',
              points: solo.max_rating_7d !== undefined && solo.max_rating_7d !== null ? solo.max_rating_7d : '',
              winRate: solo.win_rate !== undefined && solo.win_rate !== null ? `${solo.win_rate}%` : '',
              games: solo.games_count !== undefined && solo.games_count !== null ? solo.games_count : '',
              rankName: solo.rank_level || '',
            },
            team: {
              rank: team.rank !== undefined && team.rank !== null ? team.rank : '',
              points: team.max_rating_7d !== undefined && team.max_rating_7d !== null ? team.max_rating_7d : '',
              winRate: team.win_rate !== undefined && team.win_rate !== null ? `${team.win_rate}%` : '',
              games: team.games_count !== undefined && team.games_count !== null ? team.games_count : '',
              rankName: team.rank_level || '',
            },
          };
        })
      );
      setPlayers(responses.filter(Boolean));
      setLoading(false);
    }
    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-lg font-semibold">{isArabic ? "جاري تحميل اللاعبين..." : "Loading players..."}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen text-foreground relative overflow-hidden" style={{ backgroundImage: "url('/textures/bg-texture.png')", backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
      <div className="relative z-10 max-w-6xl mx-auto py-8 px-6">
        <Header />
        {/* Header with Trophy Icon */}
        <div className="flex flex-col items-center" style={{ marginTop: 72, marginBottom: 72 }}>
          <Trophy className="w-16 h-16 mb-4" strokeWidth={1.5} color="#f9b83f" />
          <h1 className="text-4xl font-bold text-foreground">{isArabic ? "أفضل اللاعبين" : "Best Players"}</h1>
        </div>
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("individual")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "individual"
                ? "bg-gradient-to-br from-[#f9b83f] to-[#f7c873] text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            {isArabic ? "التصنيف الفردي" : "Individual Ranking"}
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "team"
                ? "bg-gradient-to-br from-[#f9b83f] to-[#f7c873] text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            {isArabic ? "التصنيف الجماعي" : "Team Ranking"}
          </button>
        </div>
        {/* Leaderboard Table */}
        <div className="bg-card rounded-xl overflow-hidden border border-border">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-card border-b border-border text-muted-foreground text-sm font-semibold">
            <div>{isArabic ? "#الترتيب / اللاعب" : "Rank / Player"}</div>
            <div className="text-center">{isArabic ? "التصنيف" : "Rating"}</div>
            <div className="text-center">{isArabic ? "نسبة الفوز" : "Win Rate"}</div>
            <div className="text-center">{isArabic ? "عدد الألعاب" : "Games"}</div>
            <div className="text-center">{isArabic ? "الكلان" : "Clan"}</div>
          </div>
          {/* Empty State */}
          {players.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-6">
              <Trophy className="w-20 h-20 mb-6 opacity-50" strokeWidth={1} color="#f9b83f" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {isArabic ? "لا يوجد لاعبون حالياً" : "No Players Yet"}
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                {isArabic
                  ? "لم يتم إضافة أي لاعبين بعد. سيظهر اللاعبون هنا عند إضافتهم."
                  : "No players have been added yet. Players will appear here once they are added."}
              </p>
            </div>
          ) : (
            // Table Body (for when players are added)
            <>
              {/* تقسيم اللاعبين حسب الصفحة */}
              {(() => {
                const pageSize = 10;
                // إزالة التكرار بناءً على اسم المستخدم (username)
                const uniquePlayersMap = new Map();
                players.forEach((player) => {
                  if (!uniquePlayersMap.has(player.username)) {
                    uniquePlayersMap.set(player.username, player);
                  }
                });
                const uniquePlayers = Array.from(uniquePlayersMap.values());
                const sortedPlayers = uniquePlayers
                  .map((player) => ({
                    ...player,
                    _points: Number((activeTab === "individual" ? player.solo.points : player.team.points) || 0),
                  }))
                  .sort((a, b) => b._points - a._points);
                const start = (Number(currentPage) - 1) * pageSize;
                const end = start + pageSize;
                return sortedPlayers.slice(start, end).map((player, index) => {
                  const data = activeTab === "individual" ? player.solo : player.team;
                  // منطق الرانك حسب النقاط
                  let rankImg = null;
                  let rankTitle = "";
                  const pts = Number(data.points);
                  if (!isNaN(pts)) {
                    if (pts >= 0 && pts <= 399) { rankImg = rankImages.bronze1; rankTitle = "Bronze"; }
                    else if (pts >= 400 && pts <= 449) { rankImg = rankImages.bronze2; rankTitle = "Bronze"; }
                    else if (pts >= 450 && pts <= 499) { rankImg = rankImages.bronze3; rankTitle = "Bronze"; }
                    else if (pts >= 500 && pts <= 599) { rankImg = rankImages.silver1; rankTitle = "Silver"; }
                    else if (pts >= 600 && pts <= 649) { rankImg = rankImages.silver2; rankTitle = "Silver"; }
                    else if (pts >= 650 && pts <= 699) { rankImg = rankImages.silver3; rankTitle = "Silver"; }
                    else if (pts >= 700 && pts <= 799) { rankImg = rankImages.gold1; rankTitle = "Gold"; }
                    else if (pts >= 800 && pts <= 899) { rankImg = rankImages.gold2; rankTitle = "Gold"; }
                    else if (pts >= 900 && pts <= 999) { rankImg = rankImages.gold3; rankTitle = "Gold"; }
                    else if (pts >= 1000 && pts <= 1099) { rankImg = rankImages.platinum1; rankTitle = "Platinum"; }
                    else if (pts >= 1100 && pts <= 1149) { rankImg = rankImages.platinum2; rankTitle = "Platinum"; }
                    else if (pts >= 1150 && pts <= 1199) { rankImg = rankImages.platinum3; rankTitle = "Platinum"; }
                    else if (pts >= 1200 && pts <= 1299) { rankImg = rankImages.diamond1; rankTitle = "Diamond"; }
                    else if (pts >= 1300 && pts <= 1349) { rankImg = rankImages.diamond2; rankTitle = "Diamond"; }
                    else if (pts >= 1350 && pts <= 1399) { rankImg = rankImages.diamond3; rankTitle = "Diamond"; }
                    else if (pts >= 1400 && pts <= 1499) { rankImg = rankImages.conqueror1; rankTitle = "Conqueror"; }
                    else if (pts >= 1500 && pts <= 1599) { rankImg = rankImages.conqueror2; rankTitle = "Conqueror"; }
                    else if (pts >= 1600 && pts <= 3000) { rankImg = rankImages.conqueror3; rankTitle = "Conqueror"; }
                  }
                  return (
                    <div
                      key={player.username + activeTab}
                      className="grid grid-cols-5 gap-4 px-6 py-5 items-center border-b border-border last:border-b-0 hover:bg-accent/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-foreground font-semibold">#{start + index + 1}</span>
                        {getPlayerCountry(player) && (
                          <img
                            src={`https://flagcdn.com/24x18/${getPlayerCountry(player).toLowerCase()}.png`}
                            alt={getPlayerCountry(player)}
                            className="inline-block rounded-sm border border-border"
                            style={{ width: 24, height: 18, objectFit: 'cover' }}
                          />
                        )}
                        <span className="text-foreground font-medium">{player.username}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center h-full min-h-[40px]">
                        <span className="flex items-center gap-2 justify-center">
                          {data.points !== undefined && data.points !== null && data.points !== '' ? data.points : '-'}
                          {rankImg && (
                            <span
                              title={rankTitle}
                              className="flex items-center justify-center"
                              style={{ width: 28, height: 28, minWidth: 28, minHeight: 28 }}
                            >
                              <img
                                src={rankImg}
                                alt={rankTitle}
                                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                              />
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="text-center text-muted-foreground">{data.winRate !== '' ? data.winRate : '-'}</div>
                      <div className="text-center text-muted-foreground">{data.games !== '' ? data.games : '-'}</div>
                      <div className="text-center text-muted-foreground">
                        {/* خانة الكلان */}
                        {clanImages[player.username] ? (
                          <img
                            src={clanImages[player.username]}
                            alt="clan"
                            style={{ width: 32, height: 32, objectFit: 'contain', display: 'inline-block', borderRadius: 8 }}
                          />
                        ) : (
                          "-"
                        )}
                      </div>
                    </div>
                  );
                });
              })()}
            </>
          )}
        </div>
        {/* أزرار التنقل بين الصفحات */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-full bg-card border border-border text-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="الصفحة السابقة"
          >
            →
          </button>
          <span className="mx-2 text-lg font-semibold">{(currentPage - 1) * 10 + 1} - {Math.min(currentPage * 10, players.length)}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * 10 >= players.length}
            className="px-4 py-2 rounded-full bg-card border border-border text-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="الصفحة التالية"
          >
            ←
          </button>
        </div>
      </div>
    </div>
  );
}

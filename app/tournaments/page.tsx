"use client"
import { PageBackground } from "@/components/page-background"
import { Header } from "@/components/header"
import { Trophy } from "lucide-react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function TournamentsPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [clan, setClan] = useState("");
  const [success, setSuccess] = useState(false);
  // بيانات ترتيب البطولات (تعديلها يدوياً)
  const [tournamentPlayers, setTournamentPlayers] = useState([
    // مثال: { rank: 1, name: "Player1", points: 100, winRate: "80%" }
  ]);

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden" style={{ backgroundImage: "url('/textures/bg-texture.png')", backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
      <div className="relative z-10 max-w-6xl mx-auto py-8 px-6">
        <Header />
        <div className="flex flex-col items-center mb-12" style={{ marginTop: 72, marginBottom: 48 }}>
          <Trophy className="w-16 h-16 mb-4" strokeWidth={1.5} color="#f9b83f" />
          <h1 className="text-4xl font-bold text-foreground mb-2">أفضل اللاعبين</h1>
        </div>
        {/* نموذج التسجيل */}
        <div className="bg-card rounded-xl overflow-hidden border border-border max-w-md mx-auto p-8 mb-8 flex flex-col gap-4 shadow">
          <label className="text-right font-semibold mb-1">تسجيل مشارك</label>
          <Input
            type="text"
            className="text-right border-0 shadow-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="اكتب اسمك هنا"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <select
            className="text-right border-0 shadow-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md h-10 px-3 py-2 bg-background"
            value={clan}
            onChange={e => setClan(e.target.value)}
          >
            <option value="">اختر الكلان</option>
            <option value="Prestige">Prestige</option>
            <option value="Nova">Nova</option>
            <option value="Mythic">Mythic</option>
            <option value="Alpha">Alpha</option>
            <option value="Shadow">Shadow</option>
            <option value="Meta">Meta</option>
          </select>
          <Button
            onClick={async () => {
              if (name.trim() && clan) {
                // حفظ المشارك في Supabase
                const { error } = await supabase.from("participants").insert([{ name, clan }]);
                if (!error) {
                  setSuccess(true);
                  setName("");
                  setClan("");
                  setTimeout(() => setSuccess(false), 3000);
                } else {
                  alert("حدث خطأ أثناء التسجيل، حاول مرة أخرى");
                }
              }
            }}
            className="mt-2 bg-[#f9b83f] hover:bg-[#e6a92e] text-white border-none"
            style={{ boxShadow: '0 2px 8px 0 #f9b83f33' }}
            disabled={!name.trim() || !clan}
          >
            تسجيل
          </Button>
          {success && (
            <div className="text-green-600 font-bold mt-2">تم التسجيل</div>
          )}
        </div>
        <div className="bg-card rounded-xl overflow-hidden border border-border max-w-2xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-card border-b border-border text-muted-foreground text-sm font-semibold">
            <div>الترتيب / اللاعب</div>
            <div className="text-center">النقاط</div>
            <div className="text-center">نسبة الفوز</div>
          </div>
          {/* Table Body */}
          {tournamentPlayers.length === 0 ? null : (
            tournamentPlayers.map((player, idx) => (
              <div key={player.rank} className="grid grid-cols-3 gap-4 px-6 py-3 border-b border-border last:border-b-0 text-lg">
                <div>
                  <span className="font-bold">#{player.rank}</span> {player.name}
                </div>
                <div className="text-center font-semibold">{player.points}</div>
                <div className="text-center">{player.winRate}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

"use client"
import { PageBackground } from "@/components/page-background"
import { Header } from "@/components/header"
import { Trophy } from "lucide-react"

import { useState } from "react";

export default function TournamentsPage() {
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
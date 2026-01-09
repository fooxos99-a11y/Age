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
    { rank: 1, name: "loklok", points: 0, winRate: "-", clan: "" },
    { rank: 2, name: "Ru$h", points: 0, winRate: "-", clan: "" },
    { rank: 3, name: "Rockman", points: 0, winRate: "-", clan: "" },
    { rank: 4, name: "DenieD", points: 0, winRate: "-", clan: "" },
    { rank: 5, name: "CaS", points: 0, winRate: "-", clan: "" },
    { rank: 6, name: "Revain", points: 0, winRate: "-", clan: "" },
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
            <div className="text-center">الكلان</div>
          </div>
          {/* Table Body */}
          {tournamentPlayers.length === 0 ? null : (
            tournamentPlayers.map((player, idx) => (
              <div key={player.rank} className="grid grid-cols-3 gap-4 px-6 py-3 border-b border-border last:border-b-0 text-lg">
                <div>
                  <span className="font-bold">#{player.rank}</span>{" "}
                  {player.name === "loklok" && (
                    <img src="https://flagcdn.com/24x18/dz.png" alt="DZ" className="inline-block rounded-sm border border-border align-middle" style={{ width: 24, height: 18, objectFit: 'cover', marginLeft: 12, verticalAlign: 'middle', position: 'relative', top: '-2px' }} />
                  )}
                  {player.name === "Ru$h" && (
                    <img src="https://flagcdn.com/24x18/iq.png" alt="IQ" className="inline-block rounded-sm border border-border align-middle" style={{ width: 24, height: 18, objectFit: 'cover', marginLeft: 12, verticalAlign: 'middle', position: 'relative', top: '-2px' }} />
                  )}
                  {player.name === "Rockman" && (
                    <img src="https://flagcdn.com/24x18/kw.png" alt="KW" className="inline-block rounded-sm border border-border align-middle" style={{ width: 24, height: 18, objectFit: 'cover', marginLeft: 12, verticalAlign: 'middle', position: 'relative', top: '-2px' }} />
                  )}
                  {player.name === "DenieD" && (
                    <img src="https://flagcdn.com/24x18/tn.png" alt="TN" className="inline-block rounded-sm border border-border align-middle" style={{ width: 24, height: 18, objectFit: 'cover', marginLeft: 12, verticalAlign: 'middle', position: 'relative', top: '-2px' }} />
                  )}
                  {player.name === "CaS" && (
                    <img src="/flags/qa.png" alt="QA" className="inline-block rounded-sm border border-border align-middle" style={{ width: 24, height: 18, objectFit: 'cover', marginLeft: 12, verticalAlign: 'middle', position: 'relative', top: '-2px' }} />
                  )}
                  {player.name === "Revain" && (
                    <img src="/flags/sa.png" alt="SA" className="inline-block rounded-sm border border-border align-middle" style={{ width: 24, height: 18, objectFit: 'cover', marginLeft: 12, verticalAlign: 'middle', position: 'relative', top: '-2px' }} />
                  )}
                  {player.name}
                  {player.clan && (
                    <span className="inline-block text-xs text-muted-foreground mx-2">{player.clan}</span>
                  )}
                  {player.name === "Mythic" && (
                    <span className="inline-block text-xs text-muted-foreground mx-2">Mythic</span>
                  )}
                </div>
                <div className="text-center font-semibold">{player.points}</div>
                <div className="text-center">
                  {player.name === "loklok" ? (
                    <div>
                      <img src="/4.png" alt="loklok-clan" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />
                    </div>
                  ) : player.name === "Ru$h" ? (
                    <div>
                      <img src="/2.png" alt="rush-clan" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />
                    </div>
                  ) : player.name === "Rockman" ? (
                    <div>
                      <img src="/5.png" alt="rockman-clan" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />
                    </div>
                  ) : player.name === "DenieD" ? (
                    <div>
                      <img src="/2.png" alt="denied-clan" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />
                    </div>
                  ) : player.name === "CaS" ? (
                    <div>
                      <img src="/3.png" alt="cas-clan" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />
                    </div>
                  ) : player.name === "Revain" ? (
                    <div>
                      <img src="/6.png" alt="revain-clan" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />
                    </div>
                  ) : player.clan ? (
                    <div>
                      {player.clan === "Prestige" && <img src="/1.png" alt="Prestige" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />}
                      {player.clan === "Nova" && <img src="/2.png" alt="Nova" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />}
                      {player.clan === "Mythic" && <img src="/3.png" alt="Mythic" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />}
                      {player.clan === "Alpha" && <img src="/4.png" alt="Alpha" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />}
                      {player.clan === "Shadow" && <img src="/5.png" alt="Shadow" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />}
                      {player.clan === "Meta" && <img src="/6.png" alt="Meta" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />}
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

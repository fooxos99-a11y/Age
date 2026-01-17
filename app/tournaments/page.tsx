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
    { name: "Shadow", points: 0, winRate: "-", clan: "" },
    { name: "Void", points: 0, winRate: "-", clan: "" },
    { name: "Eagle", points: 0, winRate: "-", clan: "" },
    { name: "Immortal", points: 0, winRate: "-", clan: "" },
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
              <div key={idx} className="grid grid-cols-3 gap-4 px-6 py-3 border-b border-border last:border-b-0 text-lg">
                <div>
                  <span className="font-bold">#{idx + 1}</span> {player.name}
                  {player.clan && (
                    <span className="inline-block text-xs text-muted-foreground mx-2">{player.clan}</span>
                  )}
                </div>
                <div className="text-center font-semibold">{player.points}</div>
                <div className="text-center">
                  {player.name === "Shadow" ? (
                    <img src="/4.png" alt="shadow-clan" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />
                  ) : player.name === "Void" ? (
                    <img src="/6.png" alt="void-clan" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />
                  ) : player.name === "Eagle" ? (
                    <img src="/1.png" alt="eagle-clan" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />
                  ) : player.name === "Immortal" ? (
                    <img src="/7.png" alt="immortal-clan" className="inline-block w-6 h-6 rounded-full mx-1 mt-1 align-middle" />
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

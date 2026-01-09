"use client"
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClansPage() {
  const router = useRouter();
  // تسجيل مشارك
  const [name, setName] = useState("");
  const [clan, setClan] = useState("");
  const [success, setSuccess] = useState(false);
  // طلب دخول كلان
  const [joinName, setJoinName] = useState("");
  const [joinClan, setJoinClan] = useState("");
  const [joinSuccess, setJoinSuccess] = useState(false);

  return (
    <>
      <Header />
      <main className="min-h-screen text-foreground relative overflow-hidden" style={{ backgroundImage: "url('/textures/bg-texture.png')", backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
        <div className="relative z-10 max-w-6xl mx-auto py-8 px-6">
          <div className="flex flex-row gap-8 w-full max-w-3xl mt-8 mx-auto">
            {/* نافذة تسجيل مشارك */}
            <div className="flex-1 bg-card rounded-xl overflow-hidden border border-border p-8 flex flex-col gap-4 shadow">
              <label className="text-right font-semibold mb-1">التسجيل في البطولة</label>
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
                <option value="other">أي كلان متاح</option>
                <option value="Prestige">Prestige</option>
                <option value="Nova">Nova</option>
                <option value="Mythic">Mythic</option>
                <option value="Alpha">Alpha</option>
                <option value="Shadow">Shadow</option>
                <option value="Meta">Meta</option>
              </select>
              <div className="text-xs text-muted-foreground text-right">* يجب الدخول الى كلان قبل التسجيل</div>
              <Button
                onClick={async () => {
                  if (name.trim() && clan) {
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
                className="mt-6 bg-[#f9b83f] hover:bg-[#e6a92e] text-white border-none"
                style={{ boxShadow: '0 2px 8px 0 #f9b83f33' }}
                disabled={!name.trim() || !clan}
              >
                تسجيل
              </Button>
              {success && (
                <div className="text-green-600 font-bold mt-2">تم التسجيل</div>
              )}
            </div>
            {/* نافذة طلب دخول كلان */}
            <div className="flex-1 bg-card rounded-xl overflow-hidden border border-border p-8 flex flex-col gap-4 shadow">
              <label className="text-right font-semibold mb-1">طلب دخول كلان</label>
              <Input
                type="text"
                className="text-right border-0 shadow-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="اكتب اسمك هنا"
                value={joinName}
                onChange={e => setJoinName(e.target.value)}
              />
              <select
                className="text-right border-0 shadow-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md h-10 px-3 py-2 bg-background"
                value={joinClan}
                onChange={e => setJoinClan(e.target.value)}
              >
                <option value="" disabled>اختر الكلان</option>
                <option value="other">أي كلان متاح</option>
                <option value="Prestige">Prestige</option>
                <option value="Nova">Nova</option>
                <option value="Mythic">Mythic</option>
                <option value="Alpha">Alpha</option>
                <option value="Shadow">Shadow</option>
                <option value="Meta">Meta</option>
              </select>
              <div className="text-xs text-muted-foreground text-right">* يفضل اختيار "أي كلان متاح" إلا عند الإتفاق المسبق مع قائد الكلان</div>
              <Button
                onClick={async () => {
                  if (joinName.trim() && joinClan) {
                    const { error } = await supabase.from("clan_requests").insert([{ name: joinName, clan: joinClan }]);
                    if (!error) {
                      setJoinSuccess(true);
                      setJoinName("");
                      setJoinClan("");
                      setTimeout(() => setJoinSuccess(false), 3000);
                    } else {
                      alert("حدث خطأ أثناء التسجيل، حاول مرة أخرى");
                    }
                  }
                }}
                className="mt-2 bg-[#f9b83f] hover:bg-[#e6a92e] text-white border-none"
                style={{ boxShadow: '0 2px 8px 0 #f9b83f33' }}
                disabled={!joinName.trim() || !joinClan}
              >
                تسجيل
              </Button>
              {joinSuccess && (
                <div className="text-green-600 font-bold mt-2">تم التسجيل</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

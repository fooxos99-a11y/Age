"use client"
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ClansPage() {



  // Refs for dropdowns
  const regDropdownRef = useRef(null);
  const joinDropdownRef = useRef(null);

  const router = useRouter();
  // تسجيل مشارك
  const [name, setName] = useState("");
  const [clan, setClan] = useState("");
  const [success, setSuccess] = useState(false);
  // طلب دخول كلان
  const [joinName, setJoinName] = useState("");
  const [joinClan, setJoinClan] = useState("");
  const [joinSuccess, setJoinSuccess] = useState(false);
  // Dropdown state for custom select
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownReg, setShowDropdownReg] = useState(false);

  // Close dropdowns on outside click (must be after state declarations)
  useEffect(() => {
    function handleClickOutside(event) {
      if (showDropdownReg && regDropdownRef.current && !regDropdownRef.current.contains(event.target)) {
        setShowDropdownReg(false);
      }
      if (showDropdown && joinDropdownRef.current && !joinDropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdownReg, showDropdown]);

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
              {/* Custom select with images for كلان options in registration */}
              <div>
                <button
                  type="button"
                  className="w-full text-right border-0 shadow-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md h-10 px-3 py-2 bg-background flex items-center justify-between"
                  onClick={() => setShowDropdownReg(true)}
                >
                  {clan === '' && 'اختر الكلان'}
                  {clan === 'other' && 'أي كلان متاح'}
                  {clan === 'Prestige' && (
                    <span className="flex items-center gap-2"><img src="/1.png" alt="Prestige" className="w-6 h-6 rounded-full" />Prestige</span>
                  )}
                  {clan === 'Nova' && (
                    <span className="flex items-center gap-2"><img src="/6.png" alt="Nova" className="w-6 h-6 rounded-full" />Nova</span>
                  )}
                  {clan === 'Mythic' && (
                    <span className="flex items-center gap-2"><img src="/5.png" alt="Mythic" className="w-6 h-6 rounded-full" />Mythic</span>
                  )}
                  {clan === 'Alpha' && (
                    <span className="flex items-center gap-2"><img src="/2.png" alt="Alpha" className="w-6 h-6 rounded-full" />Alpha</span>
                  )}
                  {clan === 'Shadow' && (
                    <span className="flex items-center gap-2"><img src="/4.png" alt="Shadow" className="w-6 h-6 rounded-full" />Shadow</span>
                  )}
                  {clan === 'Meta' && (
                    <span className="flex items-center gap-2"><img src="/3.png" alt="Meta" className="w-6 h-6 rounded-full" />Meta</span>
                  )}
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" /></svg>
                </button>
                {showDropdownReg && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setShowDropdownReg(false)}>
                    <div className="bg-background border border-border rounded-md shadow-lg min-w-[220px] max-w-xs w-full max-h-[80vh] overflow-y-auto p-2" onClick={e => e.stopPropagation()}>
                      <div className="px-3 py-2 text-right text-muted-foreground cursor-pointer" onClick={() => { setClan(''); setShowDropdownReg(false); }}>اختر الكلان</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent flex items-center gap-2" onClick={() => { setClan('Prestige'); setShowDropdownReg(false); }}><img src="/1.png" alt="Prestige" className="w-6 h-6 rounded-full" />Prestige</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent flex items-center gap-2" onClick={() => { setClan('Nova'); setShowDropdownReg(false); }}><img src="/6.png" alt="Nova" className="w-6 h-6 rounded-full" />Nova</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent flex items-center gap-2" onClick={() => { setClan('Mythic'); setShowDropdownReg(false); }}><img src="/5.png" alt="Mythic" className="w-6 h-6 rounded-full" />Mythic</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent flex items-center gap-2" onClick={() => { setClan('Alpha'); setShowDropdownReg(false); }}><img src="/2.png" alt="Alpha" className="w-6 h-6 rounded-full" />Alpha</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent flex items-center gap-2" onClick={() => { setClan('Shadow'); setShowDropdownReg(false); }}><img src="/4.png" alt="Shadow" className="w-6 h-6 rounded-full" />Shadow</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent flex items-center gap-2" onClick={() => { setClan('Meta'); setShowDropdownReg(false); }}><img src="/3.png" alt="Meta" className="w-6 h-6 rounded-full" />Meta</div>
                    </div>
                  </div>
                )}
              </div>
              {/* End custom select */}
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
              {/* Custom select with image for Prestige */}
              <div>
                <button
                  type="button"
                  className="w-full text-right border-0 shadow-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md h-10 px-3 py-2 bg-background flex items-center justify-between"
                  onClick={() => setShowDropdown(true)}
                >
                  {joinClan === '' && 'اختر الكلان'}
                  {joinClan === 'other' && 'أي كلان متاح'}
                  {joinClan === 'Prestige' && (
                    <span className="flex items-center gap-2"><img src="/1.png" alt="Prestige" className="w-6 h-6 rounded-full" />Prestige</span>
                  )}
                  {joinClan === 'Nova' && (
                    <span className="flex items-center gap-2"><img src="/6.png" alt="Nova" className="w-6 h-6 rounded-full" />Nova</span>
                  )}
                  {joinClan === 'Mythic' && (
                    <span className="flex items-center gap-2"><img src="/5.png" alt="Mythic" className="w-6 h-6 rounded-full" />Mythic</span>
                  )}
                  {joinClan === 'Alpha' && (
                    <span className="flex items-center gap-2"><img src="/2.png" alt="Alpha" className="w-6 h-6 rounded-full" />Alpha</span>
                  )}
                  {joinClan === 'Shadow' && (
                    <span className="flex items-center gap-2"><img src="/4.png" alt="Shadow" className="w-6 h-6 rounded-full" />Shadow</span>
                  )}
                  {joinClan === 'Meta' && (
                    <span className="flex items-center gap-2"><img src="/3.png" alt="Meta" className="w-6 h-6 rounded-full" />Meta</span>
                  )}
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" /></svg>
                </button>
                {showDropdown && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setShowDropdown(false)}>
                    <div className="bg-background border border-border rounded-md shadow-lg min-w-[220px] max-w-xs w-full max-h-[80vh] overflow-y-auto p-2" onClick={e => e.stopPropagation()}>
                      <div className="px-3 py-2 text-right text-muted-foreground cursor-pointer" onClick={() => { setJoinClan(''); setShowDropdown(false); }}>اختر الكلان</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent" onClick={() => { setJoinClan('other'); setShowDropdown(false); }}>أي كلان متاح</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent flex items-center gap-2" onClick={() => { setJoinClan('Prestige'); setShowDropdown(false); }}><img src="/1.png" alt="Prestige" className="w-6 h-6 rounded-full" />Prestige</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent flex items-center gap-2" onClick={() => { setJoinClan('Nova'); setShowDropdown(false); }}><img src="/6.png" alt="Nova" className="w-6 h-6 rounded-full" />Nova</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent flex items-center gap-2" onClick={() => { setJoinClan('Mythic'); setShowDropdown(false); }}><img src="/5.png" alt="Mythic" className="w-6 h-6 rounded-full" />Mythic</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent flex items-center gap-2" onClick={() => { setJoinClan('Alpha'); setShowDropdown(false); }}><img src="/2.png" alt="Alpha" className="w-6 h-6 rounded-full" />Alpha</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent flex items-center gap-2" onClick={() => { setJoinClan('Shadow'); setShowDropdown(false); }}><img src="/4.png" alt="Shadow" className="w-6 h-6 rounded-full" />Shadow</div>
                      <div className="px-3 py-2 text-right cursor-pointer hover:bg-accent flex items-center gap-2" onClick={() => { setJoinClan('Meta'); setShowDropdown(false); }}><img src="/3.png" alt="Meta" className="w-6 h-6 rounded-full" />Meta</div>
                    </div>
                  </div>
                )}
              </div>
              {/* End custom select */}
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

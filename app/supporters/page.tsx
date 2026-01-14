"use client"
import { PageBackground } from "@/components/page-background"
import { Header } from "@/components/header"

import { useState } from "react";

export default function SupportersPage() {
  // بيانات الداعمين (تعديلها يدوياً)
  const [supporters] = useState([
    { name: "Ru$h", amount: "$100$" },
    // مثال: { name: "اسم الداعم", amount: 100 }
  ]);

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden" style={{ backgroundImage: "url('/textures/bg-texture.png')", backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
      <div className="relative z-10 max-w-6xl mx-auto py-8 px-6">
        <Header />
        <div className="flex flex-col items-center mb-12" style={{ marginTop: 72, marginBottom: 48 }}>
          <h1 className="text-4xl font-bold mb-2" style={{
            color: '#f9b83f'
          }}>الداعمين</h1>
        </div>
        <div className="bg-card rounded-xl overflow-hidden border border-border max-w-2xl mx-auto mb-12">
          {/* Table Header */}
          <div className="grid grid-cols-2 gap-4 px-6 py-4 bg-card border-b border-border text-sm font-semibold">
            <div style={{ color: '#f9b83f' }}>اسم الداعم</div>
            <div className="text-center" style={{ color: '#f9b83f' }}>المبلغ</div>
          </div>
          {/* Table Body */}
          {supporters.length === 0 ? null : (
            supporters.map((supporter, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-4 px-6 py-3 border-b border-border last:border-b-0 text-lg">
                <div style={{ color: '#f9b83f' }}>{supporter.name}</div>
                <div className="text-center font-semibold" style={{ color: '#f9b83f' }}>{supporter.amount}</div>
              </div>
            ))
          )}
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-24 mb-4">
          <div className="max-w-2xl w-full text-sm space-y-2 text-center mt-8">
            <div className="text-base text-foreground">جميع المبالغ تعود الى البطولات</div>
            <a
              href="https://gofund.me/8ae56ba9b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 rounded bg-yellow-400 text-black font-bold shadow hover:bg-yellow-500 transition-colors my-2"
            >
              يمكنك الدعم عبر الضغط هنا
            </a>
            <div className="text-base text-foreground">الداعمين سيكون لهم رتب خاصة في مجتمع الديسكورد</div>
          </div>
        </div>
      </div>
    </div>
  );
}

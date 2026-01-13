"use client"
import { PageBackground } from "@/components/page-background"
import { Header } from "@/components/header"

import { useState } from "react";

export default function SupportersPage() {
  // بيانات الداعمين (تعديلها يدوياً)
  const [supporters] = useState([
    { name: "خالد", amount: "$10" },
    // مثال: { name: "اسم الداعم", amount: 100 }
  ]);

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden" style={{ backgroundImage: "url('/textures/bg-texture.png')", backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
      <div className="relative z-10 max-w-2xl md:max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <Header />
        <div className="flex flex-col items-center mb-8 sm:mb-12" style={{ marginTop: 48, marginBottom: 32 }}>
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center" style={{ color: '#f9b83f' }}>الداعمين</h1>
        </div>
        <div className="bg-card rounded-xl overflow-hidden border border-border w-full mb-8 sm:mb-12">
          {/* Table Header */}
          <div className="grid grid-cols-2 gap-4 px-4 sm:px-6 py-4 bg-card border-b border-border text-sm font-semibold">
            <div style={{ color: '#f9b83f' }}>اسم الداعم</div>
            <div className="text-center" style={{ color: '#f9b83f' }}>المبلغ</div>
          </div>
          {/* Table Body */}
          {supporters.length === 0 ? null : (
            supporters.map((supporter, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-4 px-4 sm:px-6 py-3 border-b border-border last:border-b-0 text-base sm:text-lg">
                <div style={{ color: '#f9b83f' }}>{supporter.name}</div>
                <div className="text-center font-semibold" style={{ color: '#f9b83f' }}>{supporter.amount}</div>
              </div>
            ))
          )}
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-12 sm:mt-24 mb-4">
          <div className="max-w-2xl w-full text-xs sm:text-sm space-y-2 text-right" style={{
            background: 'linear-gradient(90deg, #f9b83f 0%, #f7c873 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: '#f9b83f'
          }}>
            <div>جميع المبالغ تعود الى البطولات</div>
            <div>
              <a
                href="https://www.paypal.me/aoe4arab"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', cursor: 'pointer', color: 'inherit' }}
              >
                يمكنك الدعم عبر الضغط هنا
              </a>
            </div>
            <div>الداعمين سيكون لهم رتب خاصة في مجتمع الديسكورد</div>
          </div>
        </div>
      </div>
    </div>
  );
}

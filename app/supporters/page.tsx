"use client"
import { PageBackground } from "@/components/page-background"
import { Header } from "@/components/header"

import { useState, useEffect, useRef } from "react";
import Script from "next/script";

export default function SupportersPage() {
    const paypalRef = useRef(null);

    useEffect(() => {
      if (typeof window !== "undefined" && window.paypal && paypalRef.current) {
        window.paypal.HostedButtons({
          hostedButtonId: "53CP6A8AJR9XY"
        }).render(paypalRef.current);
      }
    }, [typeof window !== "undefined" && window.paypal]);
  // بيانات الداعمين (تعديلها يدوياً)
  const [supporters] = useState([
    { name: "Ru$h", amount: "$100" },
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
              {/* PayPal Button Embed (React way) */}
              <div className="my-4 flex flex-col items-center justify-center">
                {/* إزالة النصوص المكررة */}
                <div style={{ width: 340, direction: 'ltr', background: 'transparent', padding: 0, margin: '0 auto' }}>
                  <style>{`
                    #paypal-container-53CP6A8AJR9XY input[type='number'],
                    #paypal-container-53CP6A8AJR9XY input[type='text'] {
                      border: 2px solid #000 !important;
                      color: #000 !important;
                    }
                    #paypal-container-53CP6A8AJR9XY span,
                    #paypal-container-53CP6A8AJR9XY label,
                    #paypal-container-53CP6A8AJR9XY div,
                    #paypal-container-53CP6A8AJR9XY p {
                      font-size: 0 !important;
                      color: transparent !important;
                      letter-spacing: -1em !important;
                      line-height: 0 !important;
                    }
                  `}</style>
                  <div ref={paypalRef} id="paypal-container-53CP6A8AJR9XY"></div>
                </div>
                <Script
                  src="https://www.paypal.com/sdk/js?client-id=BAA58qxEgZABdcWnJ19mUOpX56zKmBh7tuQWG7ykbM06PIviWtS-Mq7Q4rPzwkcz_yEnbfXtROieBXiNqs&components=hosted-buttons&disable-funding=venmo&currency=USD"
                  strategy="afterInteractive"
                  crossOrigin="anonymous"
                  onLoad={() => {
                    if (window.paypal && paypalRef.current) {
                      window.paypal.HostedButtons({
                        hostedButtonId: "53CP6A8AJR9XY"
                      }).render(paypalRef.current);
                    }
                  }}
                />
              </div>
              <div className="text-base text-foreground">الداعمين سيكون لهم رتب خاصة في مجتمع الديسكورد</div>
              {/* PayPal Script لم يعد مطلوباً */}
          </div>
        </div>
      </div>
    </div>
  );
}

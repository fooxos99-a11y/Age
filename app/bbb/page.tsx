"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BBBPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      const { data, error } = await supabase.from("clan_requests").select("name, clan");
      if (!error && data) {
        setRequests(data);
      }
      setLoading(false);
    }
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-black text-white py-16">
      <h1 className="text-3xl font-bold mb-8">جدول طلبات دخول الكلانات</h1>
      <div className="w-full max-w-xl">
        {loading ? (
          <div className="text-center py-8 text-gray-400">جاري التحميل...</div>
        ) : (
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-lg">
                <th className="text-right px-4">اسم اللاعب</th>
                <th className="text-right px-4">الكلان المطلوب</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-8 text-gray-400">لا يوجد طلبات بعد</td>
                </tr>
              ) : (
                requests.map((r, i) => (
                  <tr key={i} className="bg-gray-900 rounded-lg">
                    <td className="px-4 py-3 rounded-r-lg">{r.name}</td>
                    <td className="px-4 py-3 rounded-l-lg">{r.clan}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

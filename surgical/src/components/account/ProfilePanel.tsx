"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { AccountProfile } from "@/lib/types";

const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#10243E] outline-none transition focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/10";

export function ProfilePanel({ profile }: { profile: AccountProfile }) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const update =
    (key: "business" | "contact" | "role" | "gst" | "email" | "phone") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSaved(false);
      setForm((current) => ({ ...current, [key]: event.target.value }));
    };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#071B35]">My Profile</h1>
      <p className="mt-1 text-sm text-slate-500">
        Business details used for invoices, credit checks and order updates.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Account status", value: form.verified ? "Verified" : "Pending" },
          { label: "Credit terms", value: form.creditTerms },
          { label: "Member since", value: form.memberSince },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              {item.label}
            </p>
            <p className="mt-1 text-sm font-bold text-[#10243E]">{item.value}</p>
          </div>
        ))}
      </div>

      <form
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block text-xs font-semibold text-[#10243E]">
            Business / institution
            <input
              required
              value={form.business}
              onChange={update("business")}
              className={`${fieldClass} mt-1.5`}
            />
          </label>
          <label className="block text-xs font-semibold text-[#10243E]">
            Contact person
            <input
              required
              value={form.contact}
              onChange={update("contact")}
              className={`${fieldClass} mt-1.5`}
            />
          </label>
          <label className="block text-xs font-semibold text-[#10243E]">
            Role
            <input
              required
              value={form.role}
              onChange={update("role")}
              className={`${fieldClass} mt-1.5`}
            />
          </label>
          <label className="block text-xs font-semibold text-[#10243E]">
            GST number
            <input
              required
              value={form.gst}
              onChange={update("gst")}
              className={`${fieldClass} mt-1.5`}
            />
          </label>
          <label className="block text-xs font-semibold text-[#10243E]">
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={update("email")}
              className={`${fieldClass} mt-1.5`}
            />
          </label>
          <label className="block text-xs font-semibold text-[#10243E]">
            Phone
            <input
              required
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              className={`${fieldClass} mt-1.5`}
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="rounded-xl bg-[#087F8C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066D78]"
          >
            Save profile
          </button>
          {saved && (
            <p className="inline-flex items-center gap-1.5 text-sm font-medium text-[#14866d]">
              <CheckCircle2 size={16} />
              Profile updated
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

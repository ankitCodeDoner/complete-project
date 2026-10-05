"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type Mode = "login" | "register";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#10243E] outline-none transition focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/10 placeholder:text-slate-400";

export const AuthForm: React.FC<{ initialMode?: Mode }> = ({
  initialMode = "login",
}) => {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [done, setDone] = useState<Mode | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo only — no authentication is performed.
    setDone(mode);
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-[#DDE9EC] bg-[#F4FBFB] p-8 text-center">
        <CheckCircle2 size={40} className="mx-auto text-[#14866d]" />
        <h2 className="mt-4 text-lg font-bold text-[#071B35]">
          {done === "login" ? "Signed in" : "Registration submitted"}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {done === "login"
            ? "You're signed in to your demo account. Order history and saved addresses would appear in your dashboard."
            : "Thanks! Your business details are under review. Verified accounts unlock wholesale pricing and credit terms."}
        </p>
        <div className="mt-5 flex items-center justify-center gap-4">
          <Link
            href="/profile"
            className="text-sm font-semibold text-[#087F8C] hover:underline"
          >
            Open your account
          </Link>
          <button
            type="button"
            onClick={() => setDone(null)}
            className="text-sm font-semibold text-slate-500 hover:underline"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      {/* Tabs */}
      <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
        {(["login", "register"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-lg py-2.5 text-sm font-semibold transition ${
              mode === m
                ? "bg-white text-[#087F8C] shadow-sm"
                : "text-slate-500 hover:text-[#10243E]"
            }`}
          >
            {m === "login" ? "Sign In" : "Register"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#10243E]">
              Business / Institution name *
            </label>
            <input required placeholder="City Hospital Pvt Ltd" className={inputClass} />
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#10243E]">
            Email *
          </label>
          <input
            required
            type="email"
            placeholder="you@hospital.com"
            className={inputClass}
          />
        </div>

        {mode === "register" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#10243E]">
                GST number *
              </label>
              <input
                required
                placeholder="22AAAAA0000A1Z5"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#10243E]">
                Phone *
              </label>
              <input
                required
                type="tel"
                placeholder="+91 90000 00000"
                className={inputClass}
              />
            </div>
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#10243E]">
            Password *
          </label>
          <input
            required
            type="password"
            placeholder="••••••••"
            className={inputClass}
          />
        </div>

        {mode === "login" && (
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-500">
              <input type="checkbox" className="h-4 w-4 accent-[#087F8C]" />
              Remember me
            </label>
            <a href="#" className="font-semibold text-[#087F8C] hover:underline">
              Forgot password?
            </a>
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-[#087F8C] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#087F8C]/20 transition hover:bg-[#066D78]"
        >
          {mode === "login" ? "Sign In" : "Create Business Account"}
        </button>

        <p className="text-center text-[11px] leading-5 text-slate-400">
          {mode === "login"
            ? "New to MedVance? Switch to Register to create a verified business account."
            : "B2B accounts are verified before wholesale pricing and credit terms are enabled."}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;

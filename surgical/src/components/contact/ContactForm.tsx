"use client";

import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    org: "",
    email: "",
    phone: "",
    message: "",
  });

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo only — no data is sent anywhere.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#DDE9EC] bg-[#F4FBFB] p-10 text-center">
        <CheckCircle2 size={40} className="text-[#14866d]" />
        <h3 className="mt-4 text-lg font-bold text-[#071B35]">
          Thank you, {form.name || "there"}!
        </h3>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Your enquiry has been received. Our team will get back to you within
          one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", org: "", email: "", phone: "", message: "" });
          }}
          className="mt-5 text-sm font-semibold text-[#087F8C] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#10243E] outline-none transition focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/10 placeholder:text-slate-400";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#10243E]">
            Full name *
          </label>
          <input
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Dr. Jane Doe"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#10243E]">
            Organisation
          </label>
          <input
            value={form.org}
            onChange={update("org")}
            placeholder="City Hospital"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#10243E]">
            Email *
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@hospital.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#10243E]">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="+91 90000 00000"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold text-[#10243E]">
          How can we help? *
        </label>
        <textarea
          required
          value={form.message}
          onChange={update("message")}
          rows={5}
          placeholder="Tell us about your procurement needs, product enquiries or bulk requirements…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#087F8C] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#087F8C]/20 transition hover:bg-[#066D78] sm:w-auto"
      >
        <Send size={16} />
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;

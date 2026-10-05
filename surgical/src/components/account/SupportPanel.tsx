"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { FaqAccordion } from "@/components/contact/FaqAccordion";
import type { Faq } from "@/lib/types";

const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#10243E] outline-none transition focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/10";

const starterTickets = [
  {
    id: "TCK-1042",
    topic: "Bulk quote",
    detail: "Pricing for 50 boxes of absorbable sutures.",
    status: "Open",
  },
  {
    id: "TCK-1031",
    topic: "Invoice",
    detail: "GST invoice copy for order MV-24091.",
    status: "Resolved",
  },
];

export function SupportPanel({ faqs }: { faqs: Faq[] }) {
  const [tickets, setTickets] = useState(starterTickets);
  const [topic, setTopic] = useState("Order help");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#071B35]">Help & Support</h1>
      <p className="mt-1 text-sm text-slate-500">
        Ask about an order, a quote, or an invoice. Our procurement desk replies
        within one business day.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <a
          href="tel:+919876543210"
          className="rounded-2xl border border-slate-200 bg-white p-4 text-sm"
        >
          <Phone size={16} className="text-[#087F8C]" />
          <p className="mt-2 font-bold text-[#10243E]">Call the desk</p>
          <p className="text-xs text-slate-500">+91 98765 43210</p>
        </a>
        <a
          href="mailto:support@medvance.example"
          className="rounded-2xl border border-slate-200 bg-white p-4 text-sm"
        >
          <Mail size={16} className="text-[#087F8C]" />
          <p className="mt-2 font-bold text-[#10243E]">Email support</p>
          <p className="text-xs text-slate-500">support@medvance.example</p>
        </a>
        <Link
          href="/contact"
          className="rounded-2xl border border-slate-200 bg-white p-4 text-sm"
        >
          <p className="font-bold text-[#10243E]">All contact options</p>
          <p className="mt-1 text-xs text-slate-500">
            Offices, WhatsApp and the public enquiry form.
          </p>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-bold text-[#071B35]">Your requests</h2>
          <div className="mt-3 space-y-3">
            {tickets.map((ticket) => (
              <article
                key={ticket.id}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-[#10243E]">
                    {ticket.id} · {ticket.topic}
                  </p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      ticket.status === "Open"
                        ? "bg-amber-50 text-amber-800"
                        : "bg-emerald-50 text-emerald-800"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{ticket.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <form
          className="rounded-2xl border border-slate-200 bg-white p-5"
          onSubmit={(event) => {
            event.preventDefault();
            setTickets((current) => [
              {
                id: `TCK-${1043 + current.length}`,
                topic,
                detail: message,
                status: "Open",
              },
              ...current,
            ]);
            setMessage("");
            setSent(true);
          }}
        >
          <h2 className="text-sm font-bold text-[#071B35]">New request</h2>
          <label className="mt-4 block text-xs font-semibold text-[#10243E]">
            Topic
            <select
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className={`${fieldClass} mt-1.5`}
            >
              <option>Order help</option>
              <option>Bulk quote</option>
              <option>Invoice</option>
              <option>Return</option>
            </select>
          </label>
          <label className="mt-4 block text-xs font-semibold text-[#10243E]">
            Message
            <textarea
              required
              rows={4}
              value={message}
              onChange={(event) => {
                setSent(false);
                setMessage(event.target.value);
              }}
              placeholder="Include an order number if you have one."
              className={`${fieldClass} mt-1.5`}
            />
          </label>
          <button
            type="submit"
            className="mt-4 rounded-xl bg-[#087F8C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066D78]"
          >
            Send request
          </button>
          {sent && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#14866d]">
              <CheckCircle2 size={16} />
              Request added
            </p>
          )}
        </form>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-sm font-bold text-[#071B35]">
          Common questions
        </h2>
        <FaqAccordion faqs={faqs} />
      </div>
    </div>
  );
}

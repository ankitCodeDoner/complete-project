"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import type { AccountNotification } from "@/lib/types";

const preferences = [
  { id: "orders", label: "Order and shipment updates", on: true },
  { id: "credit", label: "Credit and invoice notices", on: true },
  { id: "offers", label: "Bulk pricing and offers", on: false },
];

export function NotificationCenter({
  notifications,
}: {
  notifications: AccountNotification[];
}) {
  const [items, setItems] = useState(notifications);
  const [prefs, setPrefs] = useState(preferences);
  const unread = items.filter((item) => !item.read).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#071B35]">Notifications</h1>
          <p className="mt-1 text-sm text-slate-500">
            {unread === 0
              ? "You're up to date."
              : `${unread} unread ${unread === 1 ? "update" : "updates"}.`}
          </p>
        </div>
        {unread > 0 && (
          <button
            type="button"
            onClick={() =>
              setItems((current) =>
                current.map((item) => ({ ...item, read: true }))
              )
            }
            className="text-sm font-semibold text-[#087F8C] hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={() =>
              setItems((current) =>
                current.map((entry) =>
                  entry.id === item.id ? { ...entry, read: true } : entry
                )
              )
            }
            className={`flex gap-3 rounded-2xl border bg-white p-4 transition hover:border-[#a7dce9] ${
              item.read ? "border-slate-200" : "border-[#c7ebe4]"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                item.read
                  ? "bg-slate-100 text-slate-400"
                  : "bg-[#E9FAF6] text-[#087F8C]"
              }`}
            >
              <Bell size={16} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-[#10243E]">{item.title}</p>
                {!item.read && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#087F8C]" />
                )}
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-500">{item.body}</p>
              <p className="mt-1 text-[11px] text-slate-400">{item.time}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-bold text-[#071B35]">Email preferences</h2>
        <div className="mt-4 space-y-3">
          {prefs.map((pref) => (
            <label
              key={pref.id}
              className="flex items-center justify-between gap-4 text-sm text-[#334A62]"
            >
              {pref.label}
              <input
                type="checkbox"
                checked={pref.on}
                onChange={() =>
                  setPrefs((current) =>
                    current.map((item) =>
                      item.id === pref.id ? { ...item, on: !item.on } : item
                    )
                  )
                }
                className="h-4 w-4 accent-[#087F8C]"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

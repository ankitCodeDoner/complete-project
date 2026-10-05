"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Headphones,
  MapPinned,
  Package,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import accountJson from "@/data/account.json";
import type { AccountData } from "@/lib/types";

const account = accountJson as AccountData;

const links = [
  { href: "/profile", label: "My Profile", icon: UserRound },
  { href: "/orders", label: "My Orders", icon: Package },
  { href: "/addresses", label: "Saved Addresses", icon: MapPinned },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/support", label: "Help & Support", icon: Headphones },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const current = links.find((link) => isActive(pathname, link.href));
  const unread = account.notifications.filter((item) => !item.read).length;

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-10">
      <Breadcrumb
        items={[
          { label: "Account", href: "/profile" },
          { label: current?.label ?? "Account" },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9FAF6] text-[#087F8C]">
                <UserRound size={20} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#071B35]">
                  {account.profile.business}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {account.profile.contact}
                </p>
              </div>
            </div>
            {account.profile.verified && (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#E9FAF6] px-2.5 py-1 text-[11px] font-semibold text-[#087F8C]">
                <ShieldCheck size={13} />
                Verified buyer
              </p>
            )}
          </div>

          <nav
            aria-label="Account"
            className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:rounded-2xl lg:border lg:border-slate-200 lg:bg-white lg:p-2"
          >
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-[#E9FAF6] text-[#087F8C]"
                      : "bg-white text-[#334A62] hover:bg-[#F3F9FA] lg:bg-transparent"
                  } border border-slate-200 lg:border-0`}
                >
                  <link.icon size={16} />
                  <span className="flex-1">{link.label}</span>
                  {link.href === "/notifications" && unread > 0 && (
                    <span className="rounded-full bg-[#087F8C] px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {unread}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

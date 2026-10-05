"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, ArrowUpRight } from "lucide-react";

export const StaticIcon = () => {
  return (
    <Link
      href="/contact"
      aria-label="Contact Us"
      title="Contact Us"
      className="
        group fixed
        hidden sm:flex
        h-14 w-14
        items-center justify-center
        rounded-full
        border border-white/20
        bg-[#168C9C]
        text-white
        shadow-[0_8px_30px_rgba(7,27,53,0.25)]
        transition-all duration-300
        hover:scale-110
        hover:bg-[#117581]
        hover:shadow-[0_10px_35px_rgba(22,140,156,0.4)]
        focus:outline-none
        focus:ring-4 focus:ring-[#168C9C]/30
        bottom-8 right-8
        z-50
      "
    >
      {/* Contact Icon */}
      <MessageCircle
        size={25}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:scale-110"
      />

      {/* Small Arrow */}
      <span
        className="
          absolute -right-1 -top-1
          flex h-5 w-5
          items-center justify-center
          rounded-full
          border-2 border-white
          bg-[#071B35]
          text-white
        "
      >
        <ArrowUpRight size={11} strokeWidth={2.5} />
      </span>

      {/* Tooltip */}
      <span
        className="
          pointer-events-none
          absolute right-16 top-1/2
          -translate-y-1/2
          whitespace-nowrap
          rounded-lg
          bg-[#071B35]
          px-3 py-2
          text-xs font-semibold text-white
          opacity-0
          shadow-lg
          transition-all duration-300
          group-hover:opacity-100
          max-sm:hidden
        "
      >
        Contact Us
      </span>
    </Link>
  );
};
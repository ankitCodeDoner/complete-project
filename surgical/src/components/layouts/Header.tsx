"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  FileText,
  Heart,
  Headphones,
  LogIn,
  MapPin,
  MapPinned,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Search,
  ShoppingCart,
  UserRound,
  UserPlus,
  X,
} from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";

const categories: { label: string; href: string }[] = [
  {
    label: "Surgical Instruments",
    href: "/categories/surgical-instruments",
  },
  {
    label: "Dental",
    href: "/categories/dental",
  },
  {
    label: "Diagnostics",
    href: "/categories/diagnostics",
  },
  {
    label: "Orthopedics",
    href: "/categories/orthopedics",
  },
  {
    label: "Consumables",
    href: "/categories/consumables",
  },
  {
    label: "Physiotherapy",
    href: "/categories/physiotherapy",
  },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { count, ready } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const q = searchTerm.trim();

    router.push(
      q ? `/products?q=${encodeURIComponent(q)}` : "/products"
    );

    setIsMobileMenuOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen((prev) => !prev);
    setIsMobileMenuOpen(false);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <>
      {/* =====================================================
          TOP INFORMATION BAR
      ===================================================== */}

      <div className="border-b border-white/10 bg-[#071B35] text-white">
        <div className="mx-auto flex h-8 max-w-[1600px] items-center justify-between gap-4 px-4 text-[11px] font-medium sm:px-6 lg:px-8">

          {/* Helpline */}

          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 whitespace-nowrap transition hover:text-[#53D1C3]"
          >
            <Phone size={12} />

            <span>24/7 Helpline:</span>

            <span className="font-semibold">
              +91 98765 43210
            </span>
          </a>

          {/* Desktop Information */}

          <div className="hidden items-center gap-6 md:flex">

            <a
              href="https://wa.me/91999XXXXXXX09"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 whitespace-nowrap transition hover:text-[#53D1C3]"
            >
              <MessageCircle size={12} />

              WhatsApp Desk: +91 999XXXXXXX09
            </a>

            <span className="hidden items-center gap-1.5 whitespace-nowrap xl:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#42D6AE]" />

              ISO 13485:2016 Certified
            </span>

          </div>

          {/* Delivery */}

          <div className="hidden items-center gap-1.5 whitespace-nowrap sm:flex">

            <span className="text-[#F5A623]">
              ◆
            </span>

            Express Delivery: New Delhi (110001)

          </div>

        </div>
      </div>


      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <div className="sticky top-0 z-50 border-b border-[#E7ECF2] bg-white">

        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">

          <div className="flex min-h-[76px] items-center gap-4 lg:gap-6">


            {/* =================================================
                LOGO
            ================================================= */}

            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="MedVance Healthcare Home"
              onClick={closeProfile}
            >
              <img
                src="/assets/images/mainLogo.png"
                alt="MedVance Healthcare Solutions"
                className="h-auto w-[145px] object-contain sm:w-[165px]"
              />
            </Link>


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="hidden min-w-0 flex-1 items-center lg:flex">

              <form
                onSubmit={handleSearch}
                className="flex h-9 min-w-0 flex-1 overflow-hidden rounded-lg border border-[#DDE5ED] bg-white transition focus-within:border-[#087F8C] focus-within:ring-2 focus-within:ring-[#087F8C]/10"
              >

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search surgical instruments, diagnostics..."
                  aria-label="Search products"
                  className="min-w-0 flex-1 bg-transparent px-4 text-sm text-[#16304D] outline-none placeholder:text-[#97A5B5]"
                />

                <button
                  type="submit"
                  aria-label="Search"
                  className="flex w-10 shrink-0 items-center justify-center bg-[#071B35] text-white transition hover:bg-[#087F8C]"
                >
                  <Search size={17} />
                </button>

              </form>

            </div>


            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">


              {/* Delivery */}

              <button
                type="button"
                className="hidden items-center gap-2 text-left xl:flex"
              >

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9FAF6] text-[#087F8C]">
                  <MapPin size={16} />
                </div>

                <div className="leading-tight">

                  <p className="text-[10px] text-[#8391A1]">
                    Deliver to
                  </p>

                  <p className="flex items-center gap-1 text-[11px] font-bold text-[#263B53]">
                    New Delhi 110001
                    <ChevronDown size={11} />
                  </p>

                </div>

              </button>


              {/* Cart */}

              <Link
                href="/cart"
                onClick={closeProfile}
                className="group flex flex-col items-center gap-1 text-[#506176] transition hover:text-[#087F8C]"
              >

                <div className="relative">

                  <ShoppingCart
                    size={22}
                    strokeWidth={1.7}
                  />

                  {ready && count > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#087F8C] px-1 text-[9px] font-bold text-white">
                      {count}
                    </span>
                  )}

                </div>

              </Link>


              {/* =================================================
                  LOGIN / PROFILE
              ================================================= */}

              <div className="relative hidden sm:block">

                {/* Login Button */}

                <button
                  type="button"
                  onClick={handleProfileToggle}
                  aria-haspopup="menu"
                  aria-expanded={isProfileOpen}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition ${
                    isProfileOpen
                      ? "border-[#087F8C] bg-[#F4FBFB]"
                      : "border-[#E1E8EF] bg-white hover:border-[#087F8C] hover:bg-[#F4FBFB]"
                  }`}
                >

                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      isProfileOpen
                        ? "bg-[#E4F7F3] text-[#087F8C]"
                        : "bg-[#F0F4F8] text-[#60748A]"
                    }`}
                  >
                    <UserRound size={16} />
                  </div>

                  <div className="leading-tight text-left">

                    <p className="text-[9px] text-[#8B98A8]">
                      Account
                    </p>

                    <p className="flex items-center gap-1 text-[11px] font-bold text-[#263B53]">

                      Login

                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          isProfileOpen ? "rotate-180 text-[#087F8C]" : ""
                        }`}
                      />

                    </p>

                  </div>

                </button>


                {/* =================================================
                    COMPACT LOGIN DROPDOWN
                ================================================= */}

                {isProfileOpen && (
                  <div
                    className="absolute right-0 top-[calc(100%+8px)] z-[100] w-[290px] overflow-hidden rounded-xl border border-[#DCE4EA] bg-white shadow-[0_10px_35px_rgba(7,27,53,0.14)]"
                    role="menu"
                  >

                    {/* Header */}

                    <div className="flex items-center justify-between border-b border-[#EDF1F4] px-4 py-3">

                      <div>

                        <p className="text-[13px] font-semibold text-[#263B53]">
                          New customer?
                        </p>

                        <p className="mt-0.5 text-[10px] text-[#8A98A8]">
                          Create your MedVance account
                        </p>

                      </div>

                      <Link
                        href="/signup"
                        onClick={closeProfile}
                        className="flex items-center gap-1.5 rounded-md bg-[#E8F8F5] px-2.5 py-1.5 text-[11px] font-bold text-[#087F8C] transition hover:bg-[#D9F3EE]"
                      >
                        <UserPlus size={14} />

                        Sign Up
                      </Link>

                    </div>


                    {/* Account */}

                    <div className="p-1.5">

                      <Link
                        href="/profile"
                        onClick={closeProfile}
                        role="menuitem"
                        className="group flex items-center gap-3 rounded-lg px-2.5 py-2 transition hover:bg-[#F3F9FA]"
                      >

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F2F6F8] text-[#526A80] transition group-hover:bg-[#E5F7F3] group-hover:text-[#087F8C]">
                          <UserRound size={16} />
                        </div>

                        <span className="flex-1 text-[12px] font-medium text-[#334A62] group-hover:text-[#087F8C]">
                          My Profile
                        </span>

                        <ChevronDown
                          size={13}
                          className="-rotate-90 text-[#AAB5BE]"
                        />

                      </Link>


                      <Link
                        href="/orders"
                        onClick={closeProfile}
                        role="menuitem"
                        className="group flex items-center gap-3 rounded-lg px-2.5 py-2 transition hover:bg-[#F3F9FA]"
                      >

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F2F6F8] text-[#526A80] transition group-hover:bg-[#E5F7F3] group-hover:text-[#087F8C]">
                          <Package size={16} />
                        </div>

                        <span className="flex-1 text-[12px] font-medium text-[#334A62] group-hover:text-[#087F8C]">
                          My Orders
                        </span>

                        <ChevronDown
                          size={13}
                          className="-rotate-90 text-[#AAB5BE]"
                        />

                      </Link>

                      <Link
                        href="/addresses"
                        onClick={closeProfile}
                        role="menuitem"
                        className="group flex items-center gap-3 rounded-lg px-2.5 py-2 transition hover:bg-[#F3F9FA]"
                      >

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F2F6F8] text-[#526A80] transition group-hover:bg-[#E5F7F3] group-hover:text-[#087F8C]">
                          <MapPinned size={16} />
                        </div>

                        <span className="flex-1 text-[12px] font-medium text-[#334A62] group-hover:text-[#087F8C]">
                          Saved Addresses
                        </span>

                        <ChevronDown
                          size={13}
                          className="-rotate-90 text-[#AAB5BE]"
                        />

                      </Link>

                    </div>


                    {/* Divider */}

                    <div className="border-t border-[#EDF1F4]" />


                    {/* Business */}

                    <div className="p-1.5">

                      <Link
                        href="/notifications"
                        onClick={closeProfile}
                        role="menuitem"
                        className="group flex items-center gap-3 rounded-lg px-2.5 py-2 transition hover:bg-[#F3F9FA]"
                      >

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F2F6F8] text-[#526A80] transition group-hover:bg-[#E5F7F3] group-hover:text-[#087F8C]">
                          <Bell size={16} />
                        </div>

                        <span className="flex-1 text-[12px] font-medium text-[#334A62] group-hover:text-[#087F8C]">
                          Notifications
                        </span>

                        <ChevronDown
                          size={13}
                          className="-rotate-90 text-[#AAB5BE]"
                        />

                      </Link>


                      <Link
                        href="/support"
                        onClick={closeProfile}
                        role="menuitem"
                        className="group flex items-center gap-3 rounded-lg px-2.5 py-2 transition hover:bg-[#F3F9FA]"
                      >

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F2F6F8] text-[#526A80] transition group-hover:bg-[#E5F7F3] group-hover:text-[#087F8C]">
                          <Headphones size={16} />
                        </div>

                        <span className="flex-1 text-[12px] font-medium text-[#334A62] group-hover:text-[#087F8C]">
                          Help & Support
                        </span>

                        <ChevronDown
                          size={13}
                          className="-rotate-90 text-[#AAB5BE]"
                        />

                      </Link>

                    </div>


                    {/* Login Footer */}

                    <div className="border-t border-[#EDF1F4] bg-[#FAFCFD] p-2.5">

                      <Link
                        href="/login"
                        onClick={closeProfile}
                        className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#071B35] text-[11px] font-semibold text-white transition hover:bg-[#087F8C]"
                      >

                        <LogIn size={14} />

                        Login to Account

                      </Link>

                    </div>

                  </div>
                )}

              </div>


              {/* Mobile Menu */}

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setIsProfileOpen(false);
                }}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E9F0] text-[#16304D] transition hover:bg-[#F3F7FA] lg:hidden"
              >

                {isMobileMenuOpen ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}

              </button>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          MOBILE SEARCH
      ===================================================== */}

      <div className="border-b border-[#E7ECF2] bg-white px-4 py-3 lg:hidden">

        <form
          onSubmit={handleSearch}
          className="flex h-9 overflow-hidden rounded-lg border border-[#DDE5ED] focus-within:border-[#087F8C]"
        >

          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search instruments, equipment..."
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#9AA7B5]"
          />

          <button
            type="submit"
            aria-label="Search"
            className="flex w-10 items-center justify-center bg-[#071B35] text-white"
          >
            <Search size={17} />
          </button>

        </form>

      </div>


      {/* =====================================================
          CATEGORY NAVIGATION
      ===================================================== */}

      <nav className="hidden border-b border-[#E9EEF3] bg-white lg:block">

        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">

          <div className="flex h-[42px] items-center gap-0.5">

            {/* All Categories */}

            <Link
              href="/categories"
              className="mr-4 flex h-full shrink-0 items-center gap-2 border-b-2 border-transparent px-1 text-[11px] font-bold text-[#334A62] transition hover:text-[#087F8C] xl:text-[12px]"
            >

              <Menu size={15} />

              All Medical Categories

              <ChevronDown size={13} />

            </Link>


            {/* Navigation Links */}

            <div className="flex h-full min-w-0 flex-1 items-center justify-between">

              {categories.map((category) => {

                const isActive =
                  pathname === category.href;

                return (
                  <Link
                    key={category.href}
                    href={category.href}
                    className={`flex h-full items-center whitespace-nowrap border-b-2 px-1.5 text-[10px] font-semibold transition xl:text-[11px] ${
                      isActive
                        ? "border-[#087F8C] text-[#16304D]"
                        : "border-transparent text-[#35465B] hover:border-[#087F8C] hover:text-[#087F8C]"
                    }`}
                  >
                    {category.label}
                  </Link>
                );

              })}


              {/* Special Offers */}

              <Link
                href="/products"
                className="flex h-full shrink-0 items-center gap-1 border-b-2 border-transparent px-1.5 text-[11px] font-bold text-[#E47522] transition hover:border-[#E47522]"
              >

                <span className="text-[13px]">
                  ◖
                </span>

                Special Offers

              </Link>

            </div>

          </div>

        </div>

      </nav>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {isMobileMenuOpen && (

        <div className="border-b border-[#E2E9F0] bg-white shadow-lg lg:hidden">

          <div className="space-y-1 px-4 py-4">

            {/* Delivery */}

            <div className="mb-3 flex items-center gap-3 rounded-lg bg-[#F5F9FC] px-3 py-3">

              <MapPin
                size={19}
                className="text-[#087F8C]"
              />

              <div>

                <p className="text-[11px] text-[#7D8D9E]">
                  Deliver to
                </p>

                <p className="text-sm font-bold text-[#16304D]">
                  New Delhi 110001
                </p>

              </div>

            </div>


            {/* Navigation Links */}

            <p className="px-3 pb-1 pt-1 text-[11px] font-bold uppercase tracking-wider text-[#92A0AF]">
              Medical Categories
            </p>


            {categories.map((category) => (

              <Link
                key={category.href}
                href={category.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-[#334A62] transition hover:bg-[#F2F8F9] hover:text-[#087F8C]"
              >

                {category.label}

                <ChevronDown
                  size={15}
                  className="-rotate-90 text-[#8FA0B1]"
                />

              </Link>

            ))}


            <div className="my-2 border-t border-[#E9EEF3]" />


            {/* Profile */}

            {[
              { href: "/profile", label: "My Profile", icon: UserRound },
              { href: "/orders", label: "My Orders", icon: Package },
              { href: "/addresses", label: "Saved Addresses", icon: MapPinned },
              { href: "/notifications", label: "Notifications", icon: Bell },
              { href: "/support", label: "Help & Support", icon: Headphones },
              { href: "/signup", label: "Sign Up", icon: UserPlus },
              { href: "/login", label: "Login", icon: LogIn },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-[#334A62] hover:bg-[#F2F8F9]"
              >
                <item.icon size={19} />
                {item.label}
              </Link>
            ))}


            {/* Contact */}

            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-[#334A62] hover:bg-[#F2F8F9]"
            >

              <Phone size={19} />

              Contact Us

            </a>


            {/* WhatsApp */}

            <a
              href="https://wa.me/91999XXXXXXX09"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#087F8C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#066D78]"
            >

              <MessageCircle size={17} />

              Chat on WhatsApp

            </a>

          </div>

        </div>

      )}

    </>
  );
};

export default Header;
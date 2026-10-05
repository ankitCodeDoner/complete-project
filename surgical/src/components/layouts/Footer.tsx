
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Truck,
  Headset,
  Award,
  Globe,
  Share2,
  Home,
  Grid2X2,
  ShoppingCart,
  UserRound,
} from "lucide-react";

export const Footer = () => {
  const pathname = usePathname();

  const categories = [
    {
      name: "Surgical Instruments",
      href: "/categories/surgical-instruments",
    },
    {
      name: "Dental",
      href: "/categories/dental",
    },
    {
      name: "Orthopedics",
      href: "/categories/orthopedics",
    },
    {
      name: "Diagnostics",
      href: "/categories/diagnostics",
    },
    {
      name: "Consumables",
      href: "/categories/consumables",
    },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "All Products", href: "/products" },
    { name: "Brands", href: "/brands" },
    { name: "Export & Regions", href: "/export" },
    { name: "Blog & News", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const footerLinks = [
    {
      name: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      name: "Terms & Conditions",
      href: "/terms",
    },
    {
      name: "Shipping Policy",
      href: "/shipping-policy",
    },
    {
      name: "Return Policy",
      href: "/return-policy",
    },
  ];

  // Mobile Bottom Navigation Items
  const mobileNavigationItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Categories",
      href: "/categories",
      icon: Grid2X2,
    },
    {
      label: "Cart",
      href: "/cart",
      icon: ShoppingCart,
    },
    {
      label: "Contact Us",
      href: "/contact",
      icon: MessageCircle,
    },
    {
      label: "Account",
      href: "/login",
      icon: UserRound,
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#071B35] text-white">

      {/* Subtle Background Decoration */}

      <div className="pointer-events-none absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-[#168C9C]/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 top-40 h-96 w-96 rounded-full bg-[#168C9C]/5 blur-3xl" />

      {/* Top Benefits Section */}

      <div className="relative border-b border-white/10">

        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">

          {/* Quality Assured */}

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#168C9C]/30 bg-[#168C9C]/15 text-[#63D2D8]">

              <ShieldCheck
                size={25}
                strokeWidth={1.6}
              />

            </div>

            <div>

              <h3 className="text-sm font-semibold">
                Quality Assured
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Reliable medical instruments
              </p>

            </div>

          </div>

          {/* Safe Delivery */}

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#168C9C]/30 bg-[#168C9C]/15 text-[#63D2D8]">

              <Truck
                size={25}
                strokeWidth={1.6}
              />

            </div>

            <div>

              <h3 className="text-sm font-semibold">
                Safe Delivery
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Secure product shipping
              </p>

            </div>

          </div>

          {/* Expert Support */}

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#168C9C]/30 bg-[#168C9C]/15 text-[#63D2D8]">

              <Headset
                size={25}
                strokeWidth={1.6}
              />

            </div>

            <div>

              <h3 className="text-sm font-semibold">
                Expert Support
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Assistance when you need it
              </p>

            </div>

          </div>

          {/* Professional Standards */}

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#168C9C]/30 bg-[#168C9C]/15 text-[#63D2D8]">

              <Award
                size={25}
                strokeWidth={1.6}
              />

            </div>

            <div>

              <h3 className="text-sm font-semibold">
                Professional Standards
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Products for healthcare needs
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Main Footer Content */}

      <div className="relative mx-auto max-w-[1600px] px-5 py-12 sm:px-6 lg:px-10 lg:py-16">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">

          {/* Company Information */}

          <div className="lg:col-span-4">

            {/* Logo */}

            <Link
              href="/"
              className="inline-block"
            >

              <img
                src="/assets/images/mainLogo.png"
                alt="MedVance HealthCare Logo"
                className="h-16 w-auto max-w-[260px] object-contain"
              />

            </Link>

            {/* Description */}

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">

              Your trusted destination for surgical instruments,
              dental instruments, medical equipment, and healthcare
              solutions. We aim to support healthcare professionals
              with reliable products and service.

            </p>

            {/* Social Media */}

            <div className="mt-7">

              <h3 className="mb-4 text-base font-bold text-white">
                Follow Us
              </h3>

              <div className="flex items-center gap-3">

                {/* Website */}

                <Link
                  href="/"
                  aria-label="Website"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:border-[#168C9C] hover:bg-[#168C9C] hover:text-white"
                >

                  <Globe size={18} />

                </Link>

                {/* Share */}

                <a
                  href="#"
                  aria-label="Share"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:border-[#168C9C] hover:bg-[#168C9C] hover:text-white"
                >

                  <Share2 size={18} />

                </a>

                {/* Email */}

                <a
                  href="mailto:info@yourcompany.com"
                  aria-label="Email"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:border-[#168C9C] hover:bg-[#168C9C] hover:text-white"
                >

                  <Mail size={18} />

                </a>

                {/* WhatsApp */}

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:border-[#168C9C] hover:bg-[#168C9C] hover:text-white"
                >

                  <MessageCircle size={18} />

                </a>

              </div>

            </div>

          </div>

          {/* Categories */}

          <div className="lg:col-span-3">

            <h3 className="relative mb-7 inline-block text-lg font-bold uppercase tracking-wide text-white">

              Categories

              <span className="absolute -bottom-3 left-0 h-[3px] w-11 rounded-full bg-[#35D5DF]" />

            </h3>

            <ul className="space-y-5">

              {categories.map((category) => (

                <li key={category.name}>

                  <Link
                    href={category.href}
                    className="group flex items-center justify-between gap-3 text-sm text-slate-300 transition duration-300 hover:text-[#63D2D8]"
                  >

                    <span>
                      {category.name}
                    </span>

                    <ArrowRight
                      size={17}
                      className="shrink-0 text-[#168C9C] transition duration-300 group-hover:translate-x-1 group-hover:text-[#63D2D8]"
                    />

                  </Link>

                </li>

              ))}

              <li>

                <Link
                  href="/categories"
                  className="group inline-flex items-center gap-3 text-sm font-semibold text-[#35D5DF] transition duration-300 hover:text-white"
                >

                  View All Categories

                  <ArrowRight
                    size={17}
                    className="transition duration-300 group-hover:translate-x-1"
                  />

                </Link>

              </li>

            </ul>

          </div>

          {/* Company */}

          <div className="lg:col-span-2">

            <h3 className="relative mb-7 inline-block text-lg font-bold uppercase tracking-wide text-white">

              Company

              <span className="absolute -bottom-3 left-0 h-[3px] w-11 rounded-full bg-[#35D5DF]" />

            </h3>

            <ul className="space-y-5">

              {companyLinks.map((link) => (

                <li key={link.name}>

                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-300 transition duration-300 hover:text-[#63D2D8]"
                  >

                    <ArrowRight
                      size={15}
                      className="shrink-0 text-[#168C9C] transition duration-300 group-hover:translate-x-1 group-hover:text-[#63D2D8]"
                    />

                    {link.name}

                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* Get In Touch */}

          <div className="lg:col-span-3">

            <h3 className="relative mb-7 inline-block text-lg font-bold uppercase tracking-wide text-white">

              Get In Touch

              <span className="absolute -bottom-3 left-0 h-[3px] w-11 rounded-full bg-[#35D5DF]" />

            </h3>

            <div className="space-y-5">

              {/* Address */}

              <div className="flex items-start gap-4">

                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#168C9C]/15 text-[#63D2D8]">

                  <MapPin size={19} />

                </div>

                <p className="text-sm leading-6 text-slate-300">

                  Your Business Address,
                  <br />
                  City, State, India

                </p>

              </div>

              {/* Phone */}

              <a
                href="tel:+919876543210"
                className="group flex items-center gap-4 text-sm text-slate-300 transition duration-300 hover:text-[#63D2D8]"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#168C9C]/15 text-[#63D2D8]">

                  <Phone size={18} />

                </div>

                <span>
                  +91 98765 43210
                </span>

              </a>

              {/* Email */}

              <a
                href="mailto:info@yourcompany.com"
                className="group flex items-center gap-4 text-sm text-slate-300 transition duration-300 hover:text-[#63D2D8]"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#168C9C]/15 text-[#63D2D8]">

                  <Mail size={18} />

                </div>

                <span className="break-all">
                  info@yourcompany.com
                </span>

              </a>

              {/* WhatsApp */}

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-sm text-slate-300 transition duration-300 hover:text-[#63D2D8]"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#168C9C]/15 text-[#63D2D8]">

                  <MessageCircle size={18} />

                </div>

                <span>
                  Chat on WhatsApp
                </span>

              </a>

            </div>

            {/* Contact Button */}

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#168C9C] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#168C9C]/10 transition duration-300 hover:bg-[#117581] hover:shadow-[#168C9C]/20"
            >

              Contact Us

              <ArrowRight size={17} />

            </Link>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}

      <div className="relative border-t border-white/10">

        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">

          {/* Copyright */}

          <p className="text-center text-xs text-slate-400 sm:text-sm lg:text-left">

            © {new Date().getFullYear()} MedVance HealthCare.
            All rights reserved.

          </p>

          {/* Policies */}

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 lg:justify-end">

            {footerLinks.map((link, index) => (

              <React.Fragment key={link.name}>

                <Link
                  href={link.href}
                  className="text-xs text-slate-400 transition duration-300 hover:text-[#63D2D8] sm:text-sm"
                >

                  {link.name}

                </Link>

                {index < footerLinks.length - 1 && (

                  <span className="hidden text-[#168C9C] sm:inline">
                    |
                  </span>

                )}

              </React.Fragment>

            ))}

          </div>

        </div>

      </div>

      {/* Mobile Bottom Navigation */}

      <nav
        className="
          fixed bottom-0 left-0 right-0 z-[100]
          border-t border-slate-200
          bg-white/95
          text-slate-700
          shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
          backdrop-blur-xl
          md:hidden
        "
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >

        <div className="mx-auto flex h-[68px] max-w-md items-center justify-around px-1">

          {mobileNavigationItems.map((item) => {

            const Icon = item.icon;

            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (

              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex min-w-0 flex-1 flex-col
                  items-center justify-center
                  gap-1
                  rounded-xl
                  py-2
                  text-[10px]
                  font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "text-[#168C9C]"
                      : "text-slate-500 hover:text-[#168C9C]"
                  }
                `}
              >

                <Icon
                  size={21}
                  strokeWidth={isActive ? 2.4 : 1.8}
                />

                <span className="truncate">
                  {item.label}
                </span>

                {isActive && (

                  <span className="h-1 w-1 rounded-full bg-[#168C9C]" />

                )}

              </Link>

            );

          })}

        </div>

      </nav>

    </footer>
  );
};
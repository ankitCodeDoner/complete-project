import React from "react";
import { PackageCheck, Wallet, Clock, ShieldCheck } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = pageMetadata({
  title: "Sign In / Register",
  description:
    "Sign in or create a verified B2B account on MedVance to unlock wholesale pricing, credit terms, order tracking and reordering.",
  path: "/login",
  noIndex: true,
});

const benefits = [
  {
    icon: Wallet,
    title: "Wholesale & bulk pricing",
    text: "Verified institutional rate cards with tiered discounts.",
  },
  {
    icon: Clock,
    title: "30-day credit terms",
    text: "Flexible credit for qualifying orders after verification.",
  },
  {
    icon: PackageCheck,
    title: "Order tracking & reorder",
    text: "Track shipments and reorder past purchases in one click.",
  },
  {
    icon: ShieldCheck,
    title: "Saved GST & addresses",
    text: "Store business details for faster, compliant checkout.",
  },
];

export default function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Institutional Access"
        title="Sign in to your business account"
        subtitle="Access wholesale pricing, credit terms and order management built for hospitals, clinics and labs."
        crumbs={[{ label: "Sign In" }]}
      />

      <section className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:py-14">
       <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
  {/* Benefits */}
  <div className="order-2 lg:order-1">
    <h2 className="text-xl font-bold text-[#071B35] sm:text-2xl">
      Why register as a business?
    </h2>
    <p className="mt-2 text-sm leading-6 text-slate-500">
      MedVance is a B2B marketplace. A verified account unlocks pricing
      and terms designed for institutional procurement.
    </p>

    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {benefits.map((b) => (
        <div
          key={b.title}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E9FAF6] text-[#087F8C]">
            <b.icon size={20} strokeWidth={1.7} />
          </div>

          <h3 className="text-sm font-bold text-[#10243E]">
            {b.title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {b.text}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Form */}
  <div className="order-1 lg:order-2">
    <AuthForm />
  </div>
</div>
      </section>
    </>
  );
}

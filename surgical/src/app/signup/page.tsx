import { PackageCheck, Wallet, Clock, ShieldCheck } from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Create Account",
  description:
    "Register a verified B2B account on MedVance for wholesale pricing, credit terms and order tracking.",
  path: "/signup",
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

export default function SignupPage() {
  return (
    <>
      <PageHero
        eyebrow="New customer"
        title="Create your MedVance account"
        subtitle="Register your hospital, clinic or lab to unlock wholesale pricing and procurement tools."
        crumbs={[{ label: "Sign Up" }]}
      />

      <section className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="order-2 lg:order-1">
            <h2 className="text-xl font-bold text-[#071B35] sm:text-2xl">
              What you get after verification
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Accounts are reviewed before wholesale rates and credit terms are
              turned on.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E9FAF6] text-[#087F8C]">
                    <benefit.icon size={20} strokeWidth={1.7} />
                  </div>
                  <h3 className="text-sm font-bold text-[#10243E]">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <AuthForm initialMode="register" />
          </div>
        </div>
      </section>
    </>
  );
}

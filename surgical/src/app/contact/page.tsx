import React from "react";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { FaqAccordion } from "@/components/contact/FaqAccordion";
import { getContact } from "@/lib/data";

export const metadata = pageMetadata({
  title: "Contact & Support",
  description:
    "Get in touch with MedVance — phone, email and WhatsApp support, office locations across India, and answers to common procurement questions.",
  path: "/contact",
});

export default async function ContactPage() {
  const { offices, faqs } = await getContact();

  const channels = [
    {
      icon: Phone,
      title: "Call us",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
      note: "Mon–Sat, 9am–7pm IST",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+91 98765 43210",
      href: "https://wa.me/919876543210",
      note: "Quick order & product help",
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@medvance.example",
      href: "mailto:support@medvance.example",
      note: "We reply within 1 business day",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="We're here to help"
        title="Contact & Support"
        subtitle="Questions about products, bulk pricing, orders or exports? Reach our team through any channel below or send us a message."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        {/* Channels */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#a7dce9] hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E9FAF6] text-[#087F8C]">
                <c.icon size={22} strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {c.title}
                </p>
                <p className="mt-0.5 text-sm font-bold text-[#10243E] transition group-hover:text-[#087F8C]">
                  {c.value}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">{c.note}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Form + offices */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-bold text-[#071B35]">
              Send us a message
            </h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-[#071B35]">
              Our offices
            </h2>
            <div className="space-y-4">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <h3 className="text-sm font-bold text-[#10243E]">
                    {office.city}
                  </h3>
                  <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-slate-500">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-[#087F8C]" />
                    {office.address}
                  </p>
                  <div className="mt-2 flex flex-col gap-1 text-xs text-slate-500">
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 hover:text-[#087F8C]"
                    >
                      <Phone size={13} className="text-[#087F8C]" />
                      {office.phone}
                    </a>
                    <a
                      href={`mailto:${office.email}`}
                      className="flex items-center gap-2 hover:text-[#087F8C]"
                    >
                      <Mail size={13} className="text-[#087F8C]" />
                      {office.email}
                    </a>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-2 rounded-2xl bg-[#F4FBFB] px-5 py-4 text-xs font-medium text-[#087F8C]">
                <Clock size={15} />
                Support hours: Mon–Sat, 9:00am – 7:00pm IST
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-100 bg-[#f5f8fc]">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="mb-8 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="h-1 w-6 rounded-full bg-teal-700" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700 sm:text-xs">
                FAQ
              </span>
              <span className="h-1 w-6 rounded-full bg-teal-700" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#071B35] sm:text-3xl">
              Frequently asked questions
            </h2>
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </>
  );
}

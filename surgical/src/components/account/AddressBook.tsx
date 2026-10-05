"use client";

import React, { useState } from "react";
import { MapPinned, Trash2 } from "lucide-react";
import type { SavedAddress } from "@/lib/types";

const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#10243E] outline-none transition focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/10";

const empty = {
  label: "",
  contact: "",
  line: "",
  city: "",
  state: "",
  pin: "",
  phone: "",
};

export function AddressBook({ addresses }: { addresses: SavedAddress[] }) {
  const [items, setItems] = useState(addresses);
  const [draft, setDraft] = useState(empty);

  const update =
    (key: keyof typeof empty) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDraft((current) => ({ ...current, [key]: event.target.value }));
    };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#071B35]">Saved Addresses</h1>
      <p className="mt-1 text-sm text-slate-500">
        Delivery locations used at checkout for this institution.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((address) => (
          <article
            key={address.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <MapPinned size={16} className="text-[#087F8C]" />
                <h2 className="text-sm font-bold text-[#10243E]">
                  {address.label}
                </h2>
              </div>
              {address.isDefault && (
                <span className="rounded-full bg-[#E9FAF6] px-2.5 py-0.5 text-[11px] font-semibold text-[#087F8C]">
                  Default
                </span>
              )}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {address.contact}
              <br />
              {address.line}
              <br />
              {address.city}, {address.state} {address.pin}
              <br />
              {address.phone}
            </p>
            <div className="mt-4 flex gap-3 text-xs font-semibold">
              {!address.isDefault && (
                <button
                  type="button"
                  onClick={() =>
                    setItems((current) =>
                      current.map((item) => ({
                        ...item,
                        isDefault: item.id === address.id,
                      }))
                    )
                  }
                  className="text-[#087F8C] hover:underline"
                >
                  Set as default
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  setItems((current) =>
                    current.filter((item) => item.id !== address.id)
                  )
                }
                className="inline-flex items-center gap-1 text-slate-400 hover:text-red-600"
              >
                <Trash2 size={13} />
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <form
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        onSubmit={(event) => {
          event.preventDefault();
          setItems((current) => [
            ...current,
            {
              ...draft,
              id: `addr-${Date.now()}`,
              isDefault: current.length === 0,
            },
          ]);
          setDraft(empty);
        }}
      >
        <h2 className="text-sm font-bold text-[#071B35]">Add an address</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(
            [
              ["label", "Label", "Ward store"],
              ["contact", "Contact name", "Store in-charge"],
              ["phone", "Phone", "+91 90000 00000"],
              ["pin", "PIN code", "110001"],
              ["city", "City", "New Delhi"],
              ["state", "State", "Delhi"],
            ] as const
          ).map(([key, label, placeholder]) => (
            <label key={key} className="block text-xs font-semibold text-[#10243E]">
              {label}
              <input
                required
                value={draft[key]}
                placeholder={placeholder}
                onChange={update(key)}
                className={`${fieldClass} mt-1.5`}
              />
            </label>
          ))}
          <label className="block text-xs font-semibold text-[#10243E] sm:col-span-2">
            Street address
            <input
              required
              value={draft.line}
              placeholder="Building, street, area"
              onChange={update("line")}
              className={`${fieldClass} mt-1.5`}
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-5 rounded-xl bg-[#087F8C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066D78]"
        >
          Save address
        </button>
      </form>
    </div>
  );
}

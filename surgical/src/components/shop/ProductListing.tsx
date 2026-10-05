"use client";

import React, { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/lib/types";

type SortKey = "relevance" | "price-asc" | "price-desc" | "discount";

interface ProductListingProps {
  products: Product[];
  /** Facets to hide, e.g. hide "brand" on a brand page. */
  hideFacets?: Array<"brand" | "origin" | "speciality">;
}

const uniqueSorted = (values: string[]): string[] =>
  Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

export const ProductListing: React.FC<ProductListingProps> = ({
  products,
  hideFacets = [],
}) => {
  const brands = useMemo(
    () => uniqueSorted(products.map((p) => p.brand)),
    [products]
  );
  const origins = useMemo(
    () => uniqueSorted(products.map((p) => p.origin)),
    [products]
  );
  const specialities = useMemo(
    () => uniqueSorted(products.map((p) => p.speciality)),
    [products]
  );

  const [selBrands, setSelBrands] = useState<string[]>([]);
  const [selOrigins, setSelOrigins] = useState<string[]>([]);
  const [selSpecialities, setSelSpecialities] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    setList(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
    );
  };

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      if (selBrands.length && !selBrands.includes(p.brand)) return false;
      if (selOrigins.length && !selOrigins.includes(p.origin)) return false;
      if (selSpecialities.length && !selSpecialities.includes(p.speciality))
        return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "discount":
        return [...result].sort((a, b) => b.discount - a.discount);
      default:
        return result;
    }
  }, [products, selBrands, selOrigins, selSpecialities, inStockOnly, sort]);

  const activeCount =
    selBrands.length + selOrigins.length + selSpecialities.length +
    (inStockOnly ? 1 : 0);

  const clearAll = () => {
    setSelBrands([]);
    setSelOrigins([]);
    setSelSpecialities([]);
    setInStockOnly(false);
  };

  const FacetGroup = ({
    title,
    options,
    selected,
    onToggle,
  }: {
    title: string;
    options: string[];
    selected: string[];
    onToggle: (v: string) => void;
  }) => (
    <div className="border-b border-slate-100 pb-5">
      <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#10243E]">
        {title}
      </h4>
      <div className="space-y-2.5">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onToggle(opt)}
              className="h-4 w-4 rounded border-slate-300 text-[#087F8C] accent-[#087F8C]"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  const filtersBody = (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#071B35]">Filters</h3>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-semibold text-[#087F8C] hover:underline"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {!hideFacets.includes("brand") && brands.length > 1 && (
        <FacetGroup
          title="Brand"
          options={brands}
          selected={selBrands}
          onToggle={(v) => toggle(v, selBrands, setSelBrands)}
        />
      )}

      {!hideFacets.includes("origin") && origins.length > 1 && (
        <FacetGroup
          title="Country of Origin"
          options={origins}
          selected={selOrigins}
          onToggle={(v) => toggle(v, selOrigins, setSelOrigins)}
        />
      )}

      {!hideFacets.includes("speciality") && specialities.length > 1 && (
        <FacetGroup
          title="Speciality"
          options={specialities}
          selected={selSpecialities}
          onToggle={(v) => toggle(v, selSpecialities, setSelSpecialities)}
        />
      )}

      <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={() => setInStockOnly((v) => !v)}
          className="h-4 w-4 rounded border-slate-300 accent-[#087F8C]"
        />
        In stock only
      </label>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">
          {filtersBody}
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        {/* Toolbar */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            <span className="font-bold text-[#10243E]">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "product" : "products"}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#10243E] lg:hidden"
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeCount > 0 && (
                <span className="ml-0.5 rounded-full bg-[#087F8C] px-1.5 text-[10px] text-white">
                  {activeCount}
                </span>
              )}
            </button>

            <label className="flex items-center gap-2 text-xs text-slate-500">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-[#10243E] outline-none focus:border-[#087F8C]"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </label>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-sm font-semibold text-[#10243E]">
              No products match your filters
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-3 text-sm font-semibold text-[#087F8C] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#071B35]">Filters</h3>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close filters"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200"
              >
                <X size={18} />
              </button>
            </div>
            {filtersBody}
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="mt-6 w-full rounded-xl bg-[#087F8C] py-3 text-sm font-semibold text-white"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;

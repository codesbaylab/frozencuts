"use client";

import { useMemo, useState } from "react";
import { products, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";

const sizes: Array<"All" | Product["size"]> = ["All", "500g", "1kg", "2kg"];
type Sort = "featured" | "asc" | "desc";

export default function ShopClient() {
  const [size, setSize] = useState<(typeof sizes)[number]>("All");
  const [sort, setSort] = useState<Sort>("featured");
  const [minInput, setMinInput] = useState("200");
  const [maxInput, setMaxInput] = useState("800");
  const [range, setRange] = useState<[number, number]>([200, 800]);

  const visible = useMemo(() => {
    const list = products.filter(
      (p) => (size === "All" || p.size === size) && p.price >= range[0] && p.price <= range[1]
    );
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [size, sort, range]);

  const countFor = (s: (typeof sizes)[number]) =>
    s === "All" ? products.length : products.filter((p) => p.size === s).length;

  const applyRange = () => {
    const min = Number(minInput) || 0;
    const max = Number(maxInput) || Infinity;
    setRange([min, max]);
  };

  return (
    <>
      <div className="shop-toolbar">
        <div className="container toolbar-inner">
          <div className="filter-tabs">
            {sizes.map((s) => (
              <button key={s} className={`filter-tab${size === s ? " active" : ""}`} onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
          </div>
          <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="featured">Sort: Featured</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="shop-layout">
        <div className="container">
          <div className="shop-grid">
            <aside className="sidebar">
              <div className="sidebar-section">
                <div className="sidebar-title">Pack Size</div>
                <div className="sidebar-cats">
                  {sizes.map((s) => (
                    <a
                      key={s}
                      href="#"
                      className={size === s ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        setSize(s);
                      }}
                    >
                      {s === "All" ? "All Packs" : `${s} Pack`} <span className="count">{countFor(s)}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="sidebar-section">
                <div className="sidebar-title">Price Range</div>
                <div className="price-range">
                  <input
                    className="price-input"
                    type="number"
                    placeholder="₹ Min"
                    value={minInput}
                    onChange={(e) => setMinInput(e.target.value)}
                  />
                  <span style={{ color: "var(--text-secondary)" }}>–</span>
                  <input
                    className="price-input"
                    type="number"
                    placeholder="₹ Max"
                    value={maxInput}
                    onChange={(e) => setMaxInput(e.target.value)}
                  />
                </div>
                <button className="btn-filter" onClick={applyRange}>
                  Apply Filter
                </button>
              </div>
            </aside>

            <div>
              <div className="products-header">
                <p className="products-count">
                  Showing <strong>{visible.length}</strong> products
                </p>
              </div>
              <div className="products-main-grid">
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

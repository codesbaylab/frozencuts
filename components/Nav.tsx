"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag } from "@phosphor-icons/react";
import { useCart } from "./CartContext";

export default function Nav() {
  const pathname = usePathname();
  const isShop = pathname.startsWith("/shop");
  const [scrolled, setScrolled] = useState(isShop);
  const { count, open } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(isShop || window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isShop]);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-left">
          <Link href="/" className="brand">Fresh Cuts.</Link>
        </div>
        <div className="nav-links">
          <Link
            href="/shop"
            className="nav-link"
            style={isShop ? { color: "var(--text-primary)", fontWeight: 600 } : undefined}
          >
            Shop
          </Link>
          <Link href="/#quality" className="nav-link">Quality</Link>
          <Link href="/#delivery" className="nav-link">Delivery</Link>
        </div>
        <div className="nav-right">
          <button className="cart-btn" aria-label="Open cart" onClick={open}>
            <ShoppingBag />
            <span className="cart-count">{count}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

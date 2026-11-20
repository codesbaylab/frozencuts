import type { Metadata } from "next";
import Link from "next/link";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop — Fresh Cuts | Premium Meat Kerala",
};

export default function ShopPage() {
  return (
    <>
      <section className="shop-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Shop</span>
          </div>
          <h1>All Products</h1>
          <p>Fresh, premium cuts delivered to your door in Kerala</p>
        </div>
      </section>
      <ShopClient />
    </>
  );
}

"use client";

import Image from "next/image";
import { Plus } from "@phosphor-icons/react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartContext";

export default function ProductCard({ product, reveal = false }: { product: Product; reveal?: boolean }) {
  const { add } = useCart();
  return (
    <div className={`product-item${reveal ? " reveal" : ""}`}>
      <div className="product-img-wrapper">
        {product.tag && <span className={`tag tag-${product.tag.variant}`}>{product.tag.label}</span>}
        <Image
          src={product.image}
          alt={`${product.name} ${product.size}`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="product-info">
        <div className="product-main">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-meta">{product.description} &bull; {product.size} pack</p>
        </div>
        <div className="product-purchase">
          <span className="price">&#8377;{product.price}</span>
          <button className="btn-add" onClick={() => add(product.id)}>
            <Plus /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash, WhatsappLogo, X } from "@phosphor-icons/react";
import { products, WHATSAPP_NUMBER } from "@/lib/products";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { items, isOpen, close, setQty, count } = useCart();

  const lines = products
    .filter((p) => items[p.id])
    .map((p) => ({ product: p, qty: items[p.id] }));
  const total = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  const message = [
    "Hi Fresh Cuts, I'd like to place an order:",
    "",
    ...lines.map(
      ({ product, qty }) => `• ${product.name} (${product.size}) x ${qty} = ₹${product.price * qty}`
    ),
    "",
    `Total: ₹${total}`,
  ].join("\n");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <>
      <div className={`cart-overlay${isOpen ? " open" : ""}`} onClick={close} />
      <aside className={`cart-drawer${isOpen ? " open" : ""}`} aria-hidden={!isOpen} aria-label="Shopping cart">
        <div className="cart-head">
          <h3>Your Cart ({count})</h3>
          <button className="cart-close" onClick={close} aria-label="Close cart">
            <X />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map(({ product, qty }) => (
                <div className="cart-line" key={product.id}>
                  <div className="cart-line-img">
                    <Image src={product.image} alt={product.name} fill sizes="72px" />
                  </div>
                  <div className="cart-line-info">
                    <p className="cart-line-title">{product.name}</p>
                    <p className="cart-line-meta">{product.size} pack</p>
                    <div className="qty">
                      <button onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease">
                        <Minus />
                      </button>
                      <span>{qty}</span>
                      <button onClick={() => setQty(product.id, qty + 1)} aria-label="Increase">
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <div className="cart-line-side">
                    <span className="cart-line-price">&#8377;{product.price * qty}</span>
                    <button className="cart-remove" onClick={() => setQty(product.id, 0)} aria-label="Remove">
                      <Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-foot">
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>&#8377;{total}</strong>
              </div>
              <a className="btn-primary cart-checkout" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo weight="fill" /> Order on WhatsApp
              </a>
              <p className="cart-note">Delivery and payment details will be sorted out on WhatsApp.</p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

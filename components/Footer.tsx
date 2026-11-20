import Link from "next/link";
import { Bank, CreditCard } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/" className="brand">Fresh Cuts.</Link>
          <p>Premium online butchery delivering direct to your door in Kerala.</p>
        </div>
        <div className="footer-links">
          <div className="link-col">
            <h4>Shop</h4>
            <Link href="/shop">Pork Cuts</Link>
            <Link href="/shop">Dry Beef</Link>
            <Link href="/shop">Steaks</Link>
          </div>
          <div className="link-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">FAQ</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 Fresh Cuts. All rights reserved.</p>
        <div className="payment-icons">
          <CreditCard />
          <Bank />
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Knife, Leaf, Star, ThermometerCold } from "@phosphor-icons/react/dist/ssr";
import HomeAnimations from "@/components/HomeAnimations";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const features = [
  { Icon: Knife, title: "Artisan Cut", text: "Every piece is carefully portioned by our master butchers." },
  { Icon: ThermometerCold, title: "Cold Chain", text: "Maintained at optimal temperature from farm to your door." },
  { Icon: Leaf, title: "100% Natural", text: "No added preservatives or artificial colors. Just pure meat." },
];

export default function Home() {
  return (
    <>
      <HomeAnimations />

      <section className="hero">
        <div className="hero-container">
          <div className="hero-text">
            <div className="badge fade-up">Farm to Table</div>
            <h1 className="hero-title fade-up">
              Premium cuts,
              <br />
              <span className="highlight">delivered fresh.</span>
            </h1>
            <p className="hero-desc fade-up">
              Experience the finest quality pork and dry-aged beef. Sourced from local farms and delivered
              directly to your kitchen in Kerala.
            </p>
            <div className="hero-actions fade-up">
              <Link href="/#shop" className="btn-primary">
                Shop Now <ArrowRight />
              </Link>
            </div>
          </div>

          <div className="hero-image-wrap fade-in-scale">
            <Image
              src="/assets/hero-steak.jpg"
              alt="Premium Steak"
              width={800}
              height={600}
              priority
              className="hero-img master-img"
            />
            <div className="floating-card top-left float-anim-1">
              <CheckCircle weight="fill" color="var(--accent)" />
              <span>100% Quality Assured</span>
            </div>
            <div className="floating-card bottom-right float-anim-2">
              <div className="rating">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} weight="fill" />
                ))}
                <span>5.0</span>
              </div>
              <p>2,000+ Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="quality">
        <div className="container feature-grid">
          {features.map(({ Icon, title, text }) => (
            <div className="feature-card reveal" key={title}>
              <div className="icon-box">
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shop" id="shop">
        <div className="container">
          <div className="section-head reveal">
            <h2>Fresh Frozen Pork</h2>
            <p>Farm-fresh, frozen to lock in quality. Choose your pack size.</p>
          </div>
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} reveal />
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" />
    </>
  );
}

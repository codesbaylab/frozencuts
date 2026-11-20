export type Product = {
  id: string;
  name: string;
  size: "500g" | "1kg" | "2kg";
  description: string;
  price: number;
  image: string;
  tag?: { label: string; variant: "hot" | "new" };
};

export const products: Product[] = [
  {
    id: "frozen-pork-500g",
    name: "Fresh Frozen Pork",
    size: "500g",
    description: "Small pieces",
    price: 200,
    image: "/assets/frozen-pork.jpg",
    tag: { label: "Best Seller", variant: "hot" },
  },
  {
    id: "frozen-pork-1kg",
    name: "Fresh Frozen Pork",
    size: "1kg",
    description: "Small pieces",
    price: 400,
    image: "/assets/frozen-pork.jpg",
    tag: { label: "Value", variant: "new" },
  },
  {
    id: "frozen-pork-2kg",
    name: "Fresh Frozen Pork",
    size: "2kg",
    description: "Small pieces",
    price: 800,
    image: "/assets/frozen-pork.jpg",
  },
];

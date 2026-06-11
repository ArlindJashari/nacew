export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  accent: string;
  ink: string;
  rotate: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We killed four separate SaaS subscriptions and replaced them with one platform we actually own. The team stopped fighting tools and started shipping.",
    name: "Marcus Reyne",
    role: "COO, Halden Logistics",
    accent: "#cfe4ff",
    ink: "#0b2740",
    rotate: -4,
  },
  {
    quote:
      "Nacew mapped our whole approval flow in a week and built exactly what we described, with no per-seat fees, no feature paywalls. It just fits how we work.",
    name: "Priya Anand",
    role: "Head of Ops, Northbeam",
    accent: "#ffd76b",
    ink: "#3a2a00",
    rotate: 3,
  },
  {
    quote:
      "The dashboard reports our real KPIs, not some generic template. Onboarding new staff went from days to hours because the product speaks our language.",
    name: "Tom Whitfield",
    role: "Founder, Crateworks",
    accent: "#f6efe2",
    ink: "#33291a",
    rotate: -2,
  },
  {
    quote:
      "We own the code, the data, and the roadmap. Every month that used to be a license bill is now reinvested into features our customers actually ask for.",
    name: "Sofia Marin",
    role: "CEO, Lumera Studio",
    accent: "#ffc2dd",
    ink: "#451026",
    rotate: 4,
  },
];

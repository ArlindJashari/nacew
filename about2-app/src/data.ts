import { icon } from "./assets";

const ICONS = {
  a: icon("s9YDIUapR91VpkvUK9ZLPACuw9U"),
  b: icon("miL5J9blUiDB8QThoEJvrSkDwZs"),
  c: icon("Nnml8mVvvAj0NcAHIgZSPDubI"),
  d: icon("uYdGksmnZNHGFDicj12ehbKToG8"),
  e: icon("L7rFSFzzpFB93B3JKv9UaQDF8"),
};

export const FOOTER_LINKS = [
  { label: "Platforms", href: "./#why-nacew" },
  { label: "About", href: "/about2/#home" },
  { label: "Use Cases", href: "./#what-you-get" },
  { label: "Testimonials", href: "./#testimonials" },
  { label: "FAQ", href: "./#faq" },
  { label: "Contact", href: "mailto:contact@nacew.com" },
] as const;

export const FOOTER_SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nacew", icon: "linkedin" as const },
  { label: "Instagram", href: "https://www.instagram.com/nacew", icon: "instagram" as const },
  { label: "X", href: "https://x.com/nacew", icon: "x" as const },
  { label: "GitHub", href: "https://github.com/nacew", icon: "github" as const },
] as const;

export const RESEARCH_STAGE = {
  callTitle: "Product strategy call",
  chatPrompt: "What problem are we solving for users?",
  wireTag: "High friction",
  cursors: { you: "You", mate: "Armend" },
  thread: [
    {
      id: "r1" as const,
      name: "Olta",
      role: "Research",
      time: "2m ago",
      message: "Users drop off at onboarding: they don't understand the value prop in the first screen.",
    },
    {
      id: "r2" as const,
      name: "Liri",
      role: "Strategy",
      time: "1m ago",
      message: "JTBD: help finance teams reconcile expenses without switching between three tools.",
    },
  ],
  jtbd: [
    { line: "When I review monthly spend," },
    { line: "I want one clear dashboard", sub: "so I don't cross-check spreadsheets." },
    { line: "I need confidence before I approve." },
  ],
};

export const RESEARCH_DELIVERABLES = [
  { icon: ICONS.a, text: "Experience audit and competitor analysis" },
  { icon: ICONS.b, text: "Product strategy and requirements" },
  { icon: ICONS.c, text: "User research, personas, and journey mapping" },
  { icon: ICONS.d, text: "Information architecture and user flows" },
  { icon: ICONS.e, text: "Clear recommendations grounded in evidence" },
];

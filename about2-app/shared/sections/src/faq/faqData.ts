export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = keyof typeof FAQ_ITEMS;

export const FAQ_CATEGORIES = ["General", "Services", "Ownership & Support"] as const;

export const FAQ_ITEMS = {
  General: [
    {
      question: "What does Nacew do?",
      answer:
        "Nacew designs and builds custom software for companies that want to replace expensive subscription tools with owned digital products. We work across UX/UI design, web development, mobile apps, dashboards, CRM systems, automations, and internal platforms.",
    },
    {
      question: "Can you replace the tools we already pay for?",
      answer:
        "Yes. We start by analyzing the tools your company currently uses, what features you actually need, and where your workflow feels limited. Then we design and build a custom alternative focused on your real business process.",
    },
    {
      question: "Is this cheaper than paying for subscriptions?",
      answer:
        "In many cases, yes over the long term. A subscription is a recurring cost that continues every month or year. A custom product requires an initial investment, but it becomes an asset your company owns and can expand over time.",
    },
    {
      question: "Do we pay monthly or yearly fees?",
      answer:
        "No. Unlike subscription software, Nacew builds software you fully own. You pay for the design and development of your custom platform, and after that, the code and application belong to you without ongoing license fees.",
    },
    {
      question: "How do we get started?",
      answer:
        "You can request a project estimate or book a free consultation. We will discuss the subscription systems you currently use, map your workflows, and outline a tailored roadmap to build your custom replacement.",
    },
  ],
  Services: [
    {
      question: "Do you also provide UX/UI design?",
      answer:
        "Yes. UX/UI design is a core part of our process. We plan the user experience, structure the interface, create high-quality visuals, and make sure the product feels simple, premium, and easy to use.",
    },
    {
      question: "How long does a project take?",
      answer:
        "Timelines depend on complexity. A focused internal tool or dashboard can take a few weeks, while a full web or mobile platform may take several months. After a discovery call, we provide a realistic timeline and project scope.",
    },
    {
      question: "What technologies do you use?",
      answer:
        "We build modern, secure, and scalable applications using industry-standard tools like React, Node.js, modern SQL databases, and secure cloud environments. We ensure the stack matches your long-term growth needs.",
    },
    {
      question: "Can you build mobile apps for iOS and Android?",
      answer:
        "Yes. We create native or cross-platform mobile experiences connected directly to your custom backend, database, and business workflows, tailored for your users and team.",
    },
    {
      question: "Can you integrate with other third-party tools?",
      answer:
        "Absolutely. We build custom API integrations to connect your new platform with external payment systems, shipping APIs, communication tools, and legacy systems you need to retain.",
    },
  ],
  "Ownership & Support": [
    {
      question: "Do we own the final product?",
      answer:
        "Yes. The goal is to give your company ownership and control over the product, brand experience, workflows, and roadmap. Specific ownership terms can be defined clearly before the project starts.",
    },
    {
      question: "Can you maintain the software after launch?",
      answer:
        "Yes. Nacew can provide ongoing support, improvements, bug fixes, security updates, hosting guidance, and new feature development after launch.",
    },
    {
      question: "Where is our software hosted?",
      answer:
        "We deploy your custom software directly to cloud infrastructure owned and controlled by your company (such as AWS, Google Cloud, or Vercel). We set up the hosting environment so your team is fully independent.",
    },
    {
      question: "How is our data protected and secured?",
      answer:
        "Since you fully own the database and server environments, you have complete control over your data. We implement standard security protocols, role-based access, and data encryption to keep your information secure.",
    },
    {
      question: "What happens if we want to add features in the future?",
      answer:
        "Because the software is completely modular and built with clean, modern code, you can easily expand it. You can work with Nacew to build new features, or hand the codebase over to internal developers at any time.",
    },
  ],
} as const satisfies Record<(typeof FAQ_CATEGORIES)[number], FaqItem[]>;

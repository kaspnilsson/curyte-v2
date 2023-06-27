export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Curyte",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Generate",
      href: "/",
    },
    {
      title: "Lessons",
      href: "/lessons",
    },
    {
      title: "Query playground",
      href: "/lessons/playground",
    },
  ],
};

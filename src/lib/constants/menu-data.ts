import { MegaMenuData } from "@/lib/types/menu";

export const megaMenuData: MegaMenuData = {
  triggerLabel: "Explore",
  sections: [
    {
      heading: "Hooks",
      links: [
        {
          label: "Use Action State",
          href: "/state/useActionState",
          description: "Track your metrics in real-time",
        },
        {
          label: "Use Callback",
          href: "/state/use-callback",
          description: "Track your metrics in real-time",
        },
      ],
    },
  ],
};

// types/menu.ts
export interface MenuLink {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface MenuSection {
  heading: string;
  links: MenuLink[];
}

export interface MegaMenuData {
  triggerLabel: string;
  sections: MenuSection[];
}

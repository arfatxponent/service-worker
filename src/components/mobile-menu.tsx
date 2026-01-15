// components/mobile-menu.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { MegaMenuData, MenuSection } from "@/lib/types/menu";

interface MobileMenuProps {
  data: MegaMenuData;
}

export function MobileMenu({ data }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-2">
          {data.sections.map((section) => (
            <MobileSectionAccordion
              key={section.heading}
              section={section}
              onLinkClick={() => setIsOpen(false)}
            />
          ))}
        </nav>
        {/* CTA Button */}
        <div className="mt-8 border-t pt-6">
          <Button className="w-full" asChild>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact Sales
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileSectionAccordionProps {
  section: MenuSection;
  onLinkClick: () => void;
}

function MobileSectionAccordion({
  section,
  onLinkClick,
}: MobileSectionAccordionProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-medium hover:bg-accent">
        {section.heading}
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isExpanded && "rotate-90"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand">
        <ul className="ml-4 mt-2 space-y-1 border-l pl-4">
          {section.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onLinkClick}
                className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

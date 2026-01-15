"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MegaMenuData, MenuSection } from "@/lib/types/menu";

interface MegaMenuProps {
  data: MegaMenuData;
  className?: string;
}

export function MegaMenu({ data, className }: MegaMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn("group gap-1 font-medium hover:bg-accent", className)}
        >
          {data.triggerLabel}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-screen max-w-4xl p-0"
        align="end"
        sideOffset={16}
      >
        <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-4">
          {data.sections.map((section) => (
            <MenuSectionComponent
              key={section.heading}
              section={section}
              onLinkClick={() => setIsOpen(false)}
            />
          ))}
        </div>
        {/* Optional: Footer area for CTA */}
        <div className="border-t bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Need help getting started?
            </p>
            <Button size="sm" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface MenuSectionComponentProps {
  section: MenuSection;
  onLinkClick: () => void;
}

function MenuSectionComponent({
  section,
  onLinkClick,
}: MenuSectionComponentProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground">
        {section.heading}
      </h4>
      <ul className="space-y-2">
        {section.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              className="group/link block space-y-1 rounded-md p-2 transition-colors hover:bg-accent"
            >
              <span className="text-sm font-medium text-foreground group-hover/link:text-primary">
                {link.label}
              </span>
              {link.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {link.description}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

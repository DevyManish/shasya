"use client";

import * as React from "react";
import {
  IconCamera,
  IconCalendarDollar,
  IconZoom,
  IconBuildingStore,
  IconFileAi,
  IconFileDescription,
  IconShoppingCart,
  IconCalculator,
  IconHelp,
  IconMessageChatbot,
  IconWheat,
  IconReport,
  IconSearch,
  IconSettings,
  IconTemperatureSun,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/app/nav-documents";
import { NavMain } from "@/components/app/nav-main";
import { NavSecondary } from "@/components/app/nav-secondary";
import { NavUser } from "@/components/app/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Analyze",
      url: "#",
      icon: IconWheat,
    },
    {
      title: "Disease",
      url: "#",
      icon: IconZoom,
    },
    {
      title: "Fertilizer",
      url: "#",
      icon: IconCalculator,
    },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: IconChartLine,
    // },
    {
      title: "Weather",
      url: "#",
      icon: IconTemperatureSun,
    },
    {
      title: "Expenses",
      url: "#",
      icon: IconCalendarDollar,
    },
    {
      title: "Ask AI",
      url: "#",
      icon: IconMessageChatbot,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  market: [
    {
      name: "Mandi Prices",
      url: "#",
      icon: IconBuildingStore,
    },
    {
      name: "Orders",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Buy/Sell",
      url: "#",
      icon: IconShoppingCart,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string;
    email: string;
    image?: string | undefined;
  };
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                {/* <IconInnerShadowTop className="!size-5" /> */}
                <Image
                  src="/logo.webp"
                  alt="logo"
                  className="logo h-[32px]"
                  width={20}
                  height={20}
                />
                <span className="text-base font-semibold">Shasya</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.market} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

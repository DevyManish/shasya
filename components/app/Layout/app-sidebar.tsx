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
  IconHome,
} from "@tabler/icons-react";

import { NavDocuments } from "./nav-documents";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
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
import { useSession } from "@/lib/auth-client";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/app",
      icon: IconHome,
    },
    {
      title: "Analyze",
      url: "https://shsaycroprecommedation.streamlit.app/",
      icon: IconWheat,
    },
    {
      title: "Disease",
      url: "/app/disease",
      icon: IconZoom,
    },
    {
      title: "Fertilizer",
      url: "/app/fertilizer",
      icon: IconCalculator,
    },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: IconChartLine,
    // },
    {
      title: "Weather",
      url: "/app/weather",
      icon: IconTemperatureSun,
    },
    {
      title: "Expenses",
      url: "/app/expense",
      icon: IconCalendarDollar,
    },
    {
      title: "Ask AI",
      url: "/app/chat",
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
      url: "/app/",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/app/",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/app/",
      icon: IconSearch,
    },
  ],
  market: [
    {
      name: "Mandi Prices",
      url: "/app/",
      icon: IconBuildingStore,
    },
    {
      name: "Orders",
      url: "/app/",
      icon: IconReport,
    },
    {
      name: "Buy/Sell",
      url: "/app/",
      icon: IconShoppingCart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = useSession();
  const user = session?.user;
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
        <NavUser
          user={{
            name: user?.name ?? "",
            email: user?.email ?? "",
            image: user?.image ?? undefined,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

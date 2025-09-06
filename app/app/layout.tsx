import { AppSidebar } from "@/components/app/Layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import FadeContent from "@/components/FadeContent";
// import { Sidebar } from "@/components/app-sidebar"

export const metadata: Metadata = {
  title: "Shasya App 🌱",
  description: "Welcome to Shasya",
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <main className="">
      <FadeContent>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </FadeContent>
    </main>
  );
}

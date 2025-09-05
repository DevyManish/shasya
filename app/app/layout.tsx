import { AppSidebar } from "@/components/app/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
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

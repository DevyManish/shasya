import type { Metadata } from "next";
import type { ReactNode } from "react";
// import { Sidebar } from "@/components/app-sidebar"

export const metadata: Metadata = {
  title: "Shasya App 🌱",
  description: "Welcome to Shasya",
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return <main className="">{children}</main>;
}

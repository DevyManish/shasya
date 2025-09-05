"use client";
import { AppSidebar } from "@/components/app/app-sidebar";
import HealthCard from "@/components/app/health";
import { SectionCards } from "@/components/app/section-cards";
import { SiteHeader } from "@/components/app/site-header";
import FadeContent from "@/components/FadeContent";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

import { dashboardData as data } from "@/utils/data";
import {
  IconChartAreaLine,
  IconMapPin,
  IconMeterSquare,
} from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <p className="text-2xl font-bold italic">Loading</p>
        <Loader2 size={36} className="animate-spin md:ml-3 text-green-400" />
      </div>
    );
  }

  if (!user) {
    redirect("/");
  }

  return (
    <FadeContent>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar
          variant="inset"
          user={{
            name: user?.name ?? "",
            email: user?.email ?? "",
            image: user?.image ?? undefined,
          }}
        />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <Card className="@container/card">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-3xl">
                        Soil Health
                      </CardTitle>
                      <CardDescription>
                        Last uploaded 2 days ago.
                      </CardDescription>
                      <div>
                        <div className="flex items-center">
                          <div className="mt-0.5">
                            <IconMapPin size={15} />
                          </div>
                          <p className="ml-1">
                            Location:{" "}
                            <span className="text-muted-foreground">
                              23.3805° N, 88.5243° E
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center">
                          <div className="mt-0.5">
                            <IconMeterSquare size={16} />
                          </div>
                          <p className="ml-1">
                            Area:{" "}
                            <span className="text-muted-foreground">
                              21 bigha {"≈ 6.94 acres"}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center">
                          <div className="mt-0.5">
                            <IconChartAreaLine size={16} />
                          </div>
                          <p className="ml-1">
                            Soil type:{" "}
                            <span className="text-muted-foreground">
                              New alluvial, loamy to sandy-loam, neutral pH,
                              low–medium fertility
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="py-2">
                        <HealthCard />
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </FadeContent>
  );
}

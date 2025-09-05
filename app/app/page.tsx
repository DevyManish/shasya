"use client";
import { SectionCards } from "@/components/app/section-cards";
import { SiteHeader } from "@/components/app/site-header";
import SoilHealth from "@/components/app/soil-health";
import FadeContent from "@/components/FadeContent";
import { useSession } from "@/lib/auth-client";
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
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <SoilHealth />
            </div>
          </div>
        </div>
      </div>
    </FadeContent>
  );
}

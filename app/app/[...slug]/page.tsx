import FertilizerCalculator from "@/components/app/calculator/fertilizer-cal";
import Chat from "@/components/app/chat/Chat";
import MandiPrices from "@/components/app/mandi/mandi-table";
import React from "react";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  let content: React.ReactNode;

  switch (slug[0]) {
    case "fertilizer":
      content = <FertilizerCalculator />;
      break;
    case "mandi":
      content = <MandiPrices />;
      break;

    case "analyze":
      content = (
        <div className="w-full h-full">
          <iframe
            src="https://shsaycroprecommedation.streamlit.app/"
            title="Analyze"
            width="100%"
            height="80%"
            // frameBorder="0"
          ></iframe>
        </div>
      );
      break;

    case "chat":
      content = <Chat />;
      break;

    default:
      content = (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">{slug}</h1>
          <p className="italic text-gray-500">This feature is coming soon 🚧</p>
        </div>
      );
      break;
  }

  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      {content}
    </div>
  );
};

export default Page;

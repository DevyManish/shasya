import Chat from "@/components/app/chat/Chat";
import React from "react";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  let content: React.ReactNode;

  switch (slug[0]) {
    case "about":
      content = <h1 className="text-2xl font-bold">About Page</h1>;
      break;

    case "contact":
      content = <h1 className="text-2xl font-bold">Contact Page</h1>;
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

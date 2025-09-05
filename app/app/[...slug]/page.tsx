import React from "react";

// interface PageProps {
//   params: {
//     slug: string[];
//   };
// }

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <h1 className="text-2xl underline italic">{slug}</h1>
    </div>
  );
};

export default Page;

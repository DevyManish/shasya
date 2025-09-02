import SignIn from "@/components/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to Shasya 🌱",
  description: "Welcome to Shasya",
};

export default function Page() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/login-bg.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 w-full max-w-md mx-4">
        <SignIn />
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings, CreditCard, LogOut } from "lucide-react";
import { RiAppsLine } from "react-icons/ri";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const UserAvatarDropdown = () => {
  const { data: session } = useSession();

  // const toggleTheme = () => {
  //   const newTheme =
  //     theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  //   setTheme(newTheme);

  //   // Apply theme to document
  //   if (newTheme === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else if (newTheme === "light") {
  //     document.documentElement.classList.remove("dark");
  //   } else {
  //     // System theme
  //     const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
  //       .matches
  //       ? "dark"
  //       : "light";
  //     document.documentElement.classList.toggle("dark", systemTheme === "dark");
  //   }
  // };

  // const getThemeIcon = () => {
  //   switch (theme) {
  //     case "light":
  //       return <Sun className="h-4 w-4" />;
  //     case "dark":
  //       return <Moon className="h-4 w-4" />;
  //     case "system":
  //       return <Monitor className="h-4 w-4" />;
  //     default:
  //       return <Sun className="h-4 w-4" />;
  //   }
  // };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  console.log(user.image);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full ">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image!} alt={user.name || user.email} />
            {/* <AvatarFallback className="bg-gradient-to-r from-green-500 to-green-700 text-white">
              {getUserInitials(user.name || user.email)}
            </AvatarFallback> */}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 mt-2 ml-5 md:ml-0 z-20"
        side="bottom"
        align="end"
        // forceMount
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.name || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <Link href="/app">
          <DropdownMenuItem className="cursor-pointer">
            <RiAppsLine className="mr-2 h-4 w-4" />
            <span>App</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <ModeToggle />
          <p>Theme</p>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatarDropdown;

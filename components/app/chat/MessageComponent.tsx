"use client";
import React from "react";
import { Bot, User } from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

type User =
  | {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null;
    }
  | undefined;

interface Props {
  message: Message;
  isBot: boolean;
  user: User;
}

export const MessageComponent: React.FC<Props> = ({ message, isBot, user }) => {
  return (
    <div className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div className="max-w-[70%] rounded-lg p-3 border whitespace-pre-wrap">
        {message.content}
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0">
          {user?.image ? (
            <Image
              src={user.image}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
              width={32}
              height={32}
            />
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>
      )}
    </div>
  );
};

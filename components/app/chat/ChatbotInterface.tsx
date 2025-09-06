"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Groq from "groq-sdk";
import { useSession } from "@/lib/auth-client";
import { MessageComponent } from "./MessageComponent";

// Define the Message interface to match MessageComponent expectations
interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const ChatbotInterface = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "नमस्ते किसान भाई 👋🏼, मैं आपकी खेती से जुड़ी किसी भी सवाल में मदद करने के लिए तैयार हूँ।",
      role: "assistant" as const,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLElement;
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user" as const,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `
You are a friendly agricultural assistant for Indian farmers.
- Always answer questions related to crops, soil, fertilizers, pests, irrigation, government schemes, weather tips, and farming techniques.
- Respond in a clear, simple, and supportive tone. Avoid technical jargon unless necessary, and give practical, actionable advice.
- If someone asks about non-farming topics, politely guide them back to agriculture-related queries.
- Do NOT include any <think> or hidden reasoning in your responses.
- IMPORTANT: Detect the user's language.
   • If the user asks in Hindi, reply in Hindi.
   • If the user asks in English, reply in English.
   • Never mix both languages unless the user does so.`,
          },
          ...messages.map((msg) => ({
            role: msg.role as "system" | "user" | "assistant",
            content: msg.content,
          })),
          {
            role: "user",
            content: inputMessage,
          },
        ],
        model: "deepseek-r1-distill-llama-70b",
        temperature: 0.7,
        max_tokens: 800,
      });
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          response.choices[0]?.message?.content ||
          "माफ़ कीजिए, मैं इसका जवाब नहीं दे सका।",
        role: "assistant" as const,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling Groq API:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "माफ़ कीजिए, आपकी रिक्वेस्ट प्रोसेस करने में समस्या आई। कृपया दोबारा प्रयास करें।",
        role: "assistant" as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        content:
          "नमस्ते! मैं आपका खेती सहायक चैटबॉट हूँ। आप मुझसे फसल, मौसम, कीट, सिंचाई या खेती से जुड़े किसी भी सवाल पूछ सकते हैं।",
        role: "assistant" as const,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col p-8 h-screen min-h-0">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">KisanBot</h1>
            <p className="mt-1">आपका खेती सहायक</p>
          </div>
          <Button variant="outline" size="sm" onClick={clearChat}>
            Clear Chat
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 min-h-0">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="space-y-4 px-6">
            {messages.map((message) => (
              <MessageComponent
                key={message.id}
                message={message}
                isBot={message.role === "assistant"}
                user={user}
              />
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="rounded-lg p-4 border">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="p-6 border-t">
        <div className="flex gap-4">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="यहाँ अपना सवाल लिखें... (Press Enter to send)"
            className="flex-1 resize-none min-h-[60px] max-h-[120px]"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 self-end"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const Hero = () => (
  <div className="flex w-full items-center justify-center py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline">Start growing with AI!</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular text-gradient">
              Grow smarter, Not harder.
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left text-balance ">
              With Shasya, every farmer gets access to AI-powered insights —
              from crop predictions to disease alerts — built for Indian soil,
              climate, and language.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button size="lg" className="gap-4" variant="outline">
              Jump on a call <PhoneCall className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              className="gap-4 btn-gradient shadow-md hover:opacity-90 transition"
            >
              Sign up here <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Image
          src="/wheat.webp"
          alt="farm"
          width={500}
          height={500}
          className="w-4/5 h-full rounded-xl"
        />
      </div>
    </div>
  </div>
);

import CardNav from "@/components/CardNav";
import FadeContent from "@/components/FadeContent";
import { Hero } from "@/components/Hero";
import { items } from "@/utils/data";

export default function Home() {
  return (
    <div className="flex w-full items-center justify-center px-10 md:px-24">
      <CardNav
        logo="/logo.webp"
        logoAlt="Shasya Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      <main className="flex w-full items-center justify-center mx-auto px-10 py-12 md:py-18 md:mt-5 ">
        <FadeContent
          blur={true}
          duration={600}
          easing="ease-out"
          initialOpacity={0}
        >
          <Hero />
        </FadeContent>
      </main>
    </div>
  );
}

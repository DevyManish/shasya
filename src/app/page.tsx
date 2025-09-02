import CardNav from "@/components/CardNav";
import FadeContent from "@/components/FadeContent";
import { Hero } from "@/components/Hero";

export default function Home() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", href: "#", ariaLabel: "About Company" },
        { label: "Careers", href: "#", ariaLabel: "About Careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", href: "#", ariaLabel: "Featured Projects" },
        { label: "Case Studies", href: "#", ariaLabel: "Project Case Studies" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", href: "#", ariaLabel: "Email us" },
        { label: "Twitter", href: "#", ariaLabel: "Twitter" },
        { label: "LinkedIn", href: "#", ariaLabel: "LinkedIn" },
      ],
    },
  ];

  return (
    <div className="">
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
      <main className="flex w-full items-center justify-center mx-auto px-10 py-12 md:py-8 ">
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

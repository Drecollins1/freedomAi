import { Ticker } from "@/components/sections/Ticker";
import { SiteNav } from "@/components/sections/SiteNav";
import { MarketStrip } from "@/components/sections/MarketStrip";
import { Hero } from "@/components/sections/Hero";
import { Shift } from "@/components/sections/Shift";
import { Intro } from "@/components/sections/Intro";
import { Curiosity } from "@/components/sections/Curiosity";
import { Comparison } from "@/components/sections/Comparison";
import { Imagine } from "@/components/sections/Imagine";
import { TelegramFlow } from "@/components/sections/TelegramFlow";
import { ThreeDays } from "@/components/sections/ThreeDays";
import { Testimonials } from "@/components/sections/Testimonials";
import { Owner } from "@/components/sections/Owner";
import { FinalCta } from "@/components/sections/FinalCta";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <Ticker />
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <MarketStrip />
        <Shift />
        <Intro />
        <Curiosity />
        <Comparison />
        <Imagine />
        <TelegramFlow />
        <ThreeDays />
        <Testimonials />
        <Owner />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

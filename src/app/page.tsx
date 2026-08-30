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
import { getSettings } from "@/lib/settings";

export default async function Home() {
  // The owner-editable values are read once here and passed down, so the rest
  // of the page stays made of plain, prop-driven components.
  const settings = await getSettings();

  return (
    <>
      <Ticker />
      <SiteNav sessionDate={settings.sessionDate} sessionTime={settings.sessionTime} />
      <main className="flex-1">
        <Hero telegramInviteUrl={settings.telegramInviteUrl} />
        <MarketStrip />
        <Shift />
        <Intro />
        <Curiosity />
        <Comparison />
        <Imagine />
        <TelegramFlow members={settings.telegramMembers} />
        <ThreeDays />
        <Testimonials testimonialsUrl={settings.testimonialsUrl} />
        <Owner />
        <FinalCta sessionDate={settings.sessionDate} />
      </main>
      <SiteFooter companyLine={settings.companyLine} />
    </>
  );
}

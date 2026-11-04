import { About } from "./components/about";
import { Community } from "./components/community";
import { Curriculum } from "./components/curriculum";
import { FbaExplainer } from "./components/fba-explainer";
import { Faq } from "./components/faq";
import { FinalCta } from "./components/final-cta";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { Mentorship } from "./components/mentorship";
import { Nav } from "./components/nav";
import { Pillars } from "./components/pillars";
import { Pricing } from "./components/pricing";
import { Problem } from "./components/problem";
import { SocialProof } from "./components/social-proof";
import { WhoFor } from "./components/who-for";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <FbaExplainer />
        <Problem />
        <Pillars />
        <Curriculum />
        <Mentorship />
        <Community />
        <About />
        <WhoFor />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

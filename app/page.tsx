import { About } from "./components/about";
import { Community } from "./components/community";
import { Curriculum } from "./components/curriculum";
import { Faq } from "./components/faq";
import { FinalCta } from "./components/final-cta";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { Mentorship } from "./components/mentorship";
import { Nav } from "./components/nav";
import { Pillars } from "./components/pillars";
import { Pricing } from "./components/pricing";
import { Problem } from "./components/problem";
import { Proof } from "./components/proof";
import { SocialProof } from "./components/social-proof";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <Pillars />
        <Proof />
        <Curriculum />
        <Mentorship />
        <Community />
        <About />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

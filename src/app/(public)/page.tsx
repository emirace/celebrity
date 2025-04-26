import Services from "../_components/services";
import Hero from "../_components/hero";
import { WhyChooseUsSection } from "../_components/whyChooseUsSection";
import ConnectWithCeleb from "../_components/connectWithCeleb";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-mono)]">
      <Hero />
      <WhyChooseUsSection />
      <Services />
      <ConnectWithCeleb />
    </div>
  );
}

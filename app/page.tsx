import {
  AuraHero,
  ContactBridge,
  CraftsignalFeature,
  ExperienceRail,
  SignatureSystems,
} from "@/components/home/HomeSections";
import {
  auraHeroData,
  contactCTA,
  coreStack,
  experiences,
  signatureSystems,
} from "@/lib/home-content";

export default function Home() {
  return (
    <main className="home-shell" aria-labelledby="home-title">
      <div className="home-noise" aria-hidden="true" />
      <div className="home-vignette" aria-hidden="true" />

      <div className="home-content">
        <AuraHero hero={auraHeroData} cta={contactCTA} />
        <SignatureSystems systems={signatureSystems} stack={coreStack} cta={contactCTA} />
        <CraftsignalFeature cta={contactCTA} />
        <ExperienceRail items={experiences} />
        <ContactBridge cta={contactCTA} />
      </div>
    </main>
  );
}

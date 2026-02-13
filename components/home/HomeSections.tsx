import Link from "next/link";
import Image from "next/image";
import type {
  AuraHeroData,
  ContactCTA,
  ExperienceItem,
  SignatureSystem,
} from "@/lib/home-content";

function CTAGroup({ cta }: { cta: ContactCTA }) {
  return (
    <div className="cta-group" role="group" aria-label="Primary contact actions">
      <a
        href={cta.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-primary"
      >
        {cta.bookingLabel}
      </a>
      <a href={`mailto:${cta.email}`} className="cta-secondary">
        {cta.emailLabel}
      </a>
    </div>
  );
}

export function AuraHero({
  hero,
  cta,
}: {
  hero: AuraHeroData;
  cta: ContactCTA;
}) {
  return (
    <section className="aura-hero" id="top">
      <div className="aura-nav">
        <span className="aura-kicker">Portfolio</span>
        <div className="aura-links" aria-label="Section navigation">
          <a href="#systems">Systems</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <Link href="/blog">Writing</Link>
        </div>
      </div>

      <div className="aura-layout">
        <div className="aura-copy">
          <p className="aura-label">{hero.intro}</p>
          <h1 id="home-title">{hero.name}</h1>
          <p className="aura-role">{hero.roleLine}</p>
          <p className="aura-summary">{hero.summary}</p>
          <CTAGroup cta={cta} />

          <dl className="aura-facts">
            {hero.quickFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="aura-portrait">
          <Image
            src="/profile_pic.png"
            alt="Mohamed Attig portrait"
            width={640}
            height={640}
            sizes="(max-width: 768px) 80vw, 420px"
            priority
          />
        </div>
      </div>
    </section>
  );
}

export function SignatureSystems({
  systems,
  stack,
  cta,
}: {
  systems: SignatureSystem[];
  stack: string[];
  cta: ContactCTA;
}) {
  return (
    <section className="home-section" id="systems">
      <header className="section-head">
        <p>Signature systems</p>
        <h2>Quiet execution, measurable outcomes.</h2>
      </header>

      <div className="systems-grid">
        {systems.map((system, index) => (
          <article key={system.id} className="system-card">
            <p className="system-index">0{index + 1}</p>
            <h3>{system.title}</h3>
            <p className="system-summary">{system.summary}</p>
            <ul>
              {system.proof.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="stack-strip" aria-label="Core technology stack">
        {stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="section-cta-row">
        <CTAGroup cta={cta} />
      </div>
    </section>
  );
}

export function CraftsignalFeature({ cta }: { cta: ContactCTA }) {
  return (
    <section className="home-section craftsignal-block">
      <header className="section-head">
        <p>Featured build</p>
        <h2>Craftsignal.io</h2>
      </header>

      <p className="craftsignal-copy">
        Craftsignal is a product expression of how I build: lean scope, durable architecture,
        and fast iteration without sacrificing system integrity.
      </p>

      <div className="craftsignal-actions">
        <a
          href="https://craftsignal.io"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-secondary"
        >
          Visit craftsignal.io
        </a>
        <a href={`mailto:${cta.email}`} className="craftsignal-inline-mail">
          {cta.email}
        </a>
      </div>
    </section>
  );
}

export function ExperienceRail({ items }: { items: ExperienceItem[] }) {
  return (
    <section className="home-section" id="experience">
      <header className="section-head">
        <p>Professional arc</p>
        <h2>Built for production pressure.</h2>
      </header>

      <div className="experience-rail">
        {items.map((item) => (
          <article key={item.company} className="experience-item">
            <div className="experience-meta">
              <h3>{item.company}</h3>
              <p>{item.role}</p>
              <span>{item.period}</span>
            </div>
            <div className="experience-content">
              <p>{item.context}</p>
              <ul>
                {item.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ContactBridge({ cta }: { cta: ContactCTA }) {
  return (
    <section className="home-section contact-bridge" id="contact">
      <p className="contact-label">Available for founder-led AI builds and backend architecture work.</p>
      <h2>Let the work speak. Then let’s talk.</h2>
      <CTAGroup cta={cta} />
    </section>
  );
}

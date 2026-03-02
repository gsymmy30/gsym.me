import Waves from '@/components/ui/Waves';
import Header from '@/components/ui/Header';
import Headshot from '@/components/ui/Headshot';
import NamePill from '@/components/ui/NamePill';
import RolePill from '@/components/ui/RolePill';
import AboutPill from '@/components/ui/AboutPill';
import GlobePill from '@/components/ui/GlobePill';
import SelectionBox from '@/components/ui/SelectionBox';
import MobileLayout from '@/components/ui/MobileLayout';
import { PillSelectionProvider } from '@/contexts/PillSelection';

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#2d4a3e' }}>
      {/* Semantic microdata for crawlers / screen readers — not visible in UI */}
      <section
        className="sr-only"
        aria-label="About Gursimran Singh"
        itemScope
        itemType="https://schema.org/Person"
      >
        <h1 itemProp="name" data-speakable="true">Gursimran Singh</h1>
        <p itemProp="jobTitle">Technical Program Manager</p>
        <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
          <span itemProp="name">Google DeepMind</span>
        </span>
        <span itemProp="alumniOf" itemScope itemType="https://schema.org/CollegeOrUniversity">
          <span itemProp="name">Georgia Institute of Technology</span>
        </span>
        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="addressLocality">San Francisco</span>{", "}
          <span itemProp="addressRegion">CA</span>
        </span>
        <a itemProp="url" href="https://gsym.me">gsym.me</a>
        <a itemProp="sameAs" href="https://www.linkedin.com/in/gsymmy/">LinkedIn</a>
        <a itemProp="sameAs" href="https://github.com/gsymmy30">GitHub</a>
        <a itemProp="sameAs" href="https://x.com/gsymmy">X / Twitter</a>
        <figure itemProp="image" itemScope itemType="https://schema.org/ImageObject">
          <img
            itemProp="contentUrl url"
            src="/headshot.jpg"
            alt="Gursimran Singh — Technical Program Manager at Google DeepMind"
            width={1563}
            height={1563}
          />
          <meta itemProp="width" content="1563" />
          <meta itemProp="height" content="1563" />
          <meta itemProp="encodingFormat" content="image/jpeg" />
          <meta itemProp="representativeOfPage" content="true" />
          <figcaption itemProp="caption">
            Gursimran Singh — Technical Program Manager at Google DeepMind
          </figcaption>
        </figure>
      </section>
      <Waves
        lineColor="#dad7cd"
        backgroundColor="#2d4a3e"
        waveSpeedX={0.0125}
        waveSpeedY={0.005}
        waveAmpX={40}
        waveAmpY={5}
        friction={0.925}
        tension={0.005}
        maxCursorMove={120}
        xGap={8}
        yGap={20}
      />
      <Header />
      <MobileLayout />
      <PillSelectionProvider>
        <SelectionBox />
        <Headshot />
        <NamePill />
        <RolePill />
        <AboutPill />
        <GlobePill />
      </PillSelectionProvider>
    </div>
  );
}

import Waves from '@/components/ui/Waves';
import Header from '@/components/ui/Header';
import Headshot from '@/components/ui/Headshot';
import NamePill from '@/components/ui/NamePill';
import RolePill from '@/components/ui/RolePill';
import AboutPill from '@/components/ui/AboutPill';
import SelectionBox from '@/components/ui/SelectionBox';
import { PillSelectionProvider } from '@/contexts/PillSelection';

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#2d4a3e' }}>
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
      <PillSelectionProvider>
        <SelectionBox />
        <Headshot />
        <NamePill />
        <RolePill />
        <AboutPill />
      </PillSelectionProvider>
    </div>
  );
}

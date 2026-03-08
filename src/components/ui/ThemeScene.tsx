'use client';

import { useTheme } from '@/contexts/Theme';
import Waves from './Waves';

export default function ThemeScene() {
  const { theme } = useTheme();

  return (
    <Waves
      lineColor={theme.text}
      backgroundColor={theme.pageBg}
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
  );
}

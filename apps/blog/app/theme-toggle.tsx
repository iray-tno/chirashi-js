'use client';

import type { Theme } from '@chirashi/components/ui';
import { ThemeToggle as ThemeToggleBase } from '@chirashi/components/ui';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const themes: Theme[] = ['light', 'dark', 'system'];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-8 w-8" />;
  }

  const current = (theme as Theme) ?? 'system';

  return (
    <ThemeToggleBase
      theme={current}
      onToggle={() => {
        const next = themes[(themes.indexOf(current) + 1) % themes.length];
        setTheme(next);
      }}
    />
  );
}

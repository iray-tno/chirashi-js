import type React from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Light mode</title>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Dark mode</title>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>System mode</title>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const iconMap: Record<Theme, React.FC> = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon,
};

const labelMap: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const themes: Theme[] = ['light', 'dark', 'system'];

function getNextTheme(current: Theme): Theme {
  const nextIndex = (themes.indexOf(current) + 1) % themes.length;
  return themes[nextIndex];
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const Icon = iconMap[theme];
  const next = getNextTheme(theme);

  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2rem',
        height: '2rem',
        borderRadius: '0.375rem',
        border: '1px solid #d4d4d8',
        background: 'transparent',
        color: 'inherit',
        cursor: 'pointer',
      }}
      title={`Theme: ${labelMap[theme]}. Click for ${labelMap[next]}.`}
    >
      <Icon />
    </button>
  );
}

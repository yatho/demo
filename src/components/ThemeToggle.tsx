import React from 'react';
import { useTheme } from '../hooks/useTheme';
import type { Theme } from '../hooks/useTheme';
import './ThemeToggle.css';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, toggle } = useTheme();

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };

  return (
    <div className="theme-toggle">
      <label htmlFor="theme-select" className="visually-hidden">Theme</label>
      <select id="theme-select" value={theme} onChange={onSelect} aria-label="Select theme">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <button className="theme-toggle-btn" onClick={toggle} title="Toggle light/dark" aria-label="Toggle theme">
        Toggle
      </button>
    </div>
  );
};

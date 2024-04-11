'use client'

import React from 'react'
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from '@/providers/ThemeProvider';

const DarkModeToggler = () => {
  const { toggleTheme, theme } = useTheme()
  return (
    <div className="flex items-center gap-2 p-2">
      <Switch
        id="dark-mode-toggle"
        ariaLabel="Dark Mode Toggle"
        checked={theme === 'dark'}
        onClick={() => toggleTheme()}
      />
      <Label htmlFor="dark-mode-toggle">
        {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </Label>
    </div>
  );
}

export default DarkModeToggler
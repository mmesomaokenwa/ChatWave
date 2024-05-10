'use client'

import React from 'react'
import { useTheme } from '@/providers/ThemeProvider';
import { Switch } from '@nextui-org/react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggler = ({callback}) => {
  const { toggleTheme, theme } = useTheme()

  const handleToggle = () => {
    if (callback) callback()
    toggleTheme()
  }
  return (
    <Switch
      ariaLabel="Dark Mode Toggle"
      isSelected={theme === "dark"}
      onChange={handleToggle}
      color="secondary"
      size="md"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <Sun className={className} />
        ) : (
          <Moon className={className} />
        )
      }
    >
      {theme === "dark" ? "Dark" : "Light"} Mode
    </Switch>
  );
}

export default DarkModeToggler
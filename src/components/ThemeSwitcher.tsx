"use client";

import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <Switch
        defaultSelected={theme === 'dark'}
        size="lg"
        color="warning"
        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        thumbIcon={({ isSelected, className }) =>
            isSelected ? (
                <SunIcon className={className} />
            ) : (
                <MoonIcon className={className} />
            )
        }
    />
    
  )
};
"use client"

import { Bell, Moon, Sun, Search, Command } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  title: string
  description?: string
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  const { setTheme, theme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <SidebarTrigger className="md:hidden" />
        
        <div className="flex flex-1 items-center gap-4">
          <div className="hidden md:block animate-fade-in">
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            {/* Search with keyboard shortcut hint */}
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search..."
                className={cn(
                  "w-64 pl-9 pr-12 h-9",
                  "bg-muted/50 border-transparent",
                  "focus:bg-background focus:border-input",
                  "transition-all duration-200"
                )}
              />
              <div className="absolute right-2 flex items-center gap-0.5 pointer-events-none">
                <kbd className="inline-flex h-5 items-center gap-0.5 rounded border border-border/50 bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
                  <Command className="size-3" />K
                </kbd>
              </div>
            </div>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "relative size-9",
                "hover:bg-muted/80 transition-colors"
              )}
            >
              <Bell className="size-4" />
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40" />
                <span className="relative inline-flex size-3 rounded-full bg-primary text-[9px] font-semibold text-primary-foreground items-center justify-center">
                  3
                </span>
              </span>
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Theme toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="size-9 hover:bg-muted/80 transition-colors"
                >
                  <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem 
                  onClick={() => setTheme("light")}
                  className={cn(theme === "light" && "bg-muted")}
                >
                  <Sun className="size-4 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme("dark")}
                  className={cn(theme === "dark" && "bg-muted")}
                >
                  <Moon className="size-4 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme("system")}
                  className={cn(theme === "system" && "bg-muted")}
                >
                  <div className="size-4 mr-2 rounded-full bg-gradient-to-tr from-foreground/80 to-background border border-border" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

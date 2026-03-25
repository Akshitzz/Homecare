"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Users,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  Home,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const mainNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: Calendar,
    badge: "12",
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Services",
    href: "/dashboard/services",
    icon: Briefcase,
  },
]

const secondaryNavItems = [
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    badge: "3",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-4 pb-2">
        <Link 
          href="/dashboard" 
          className={cn(
            "flex items-center gap-3 rounded-lg p-1 -m-1",
            "transition-all duration-200",
            "hover:bg-sidebar-accent/50"
          )}
        >
          <div className={cn(
            "flex size-9 items-center justify-center rounded-xl",
            "bg-gradient-to-br from-primary to-primary/80",
            "text-primary-foreground shadow-sm",
            "ring-1 ring-white/10"
          )}>
            <Home className="size-4" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <span className="text-base font-semibold tracking-tight">HomeCare</span>
            <span className="block text-[10px] text-sidebar-foreground/60 font-medium">Admin Portal</span>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarSeparator className="mx-4 bg-sidebar-border/50" />
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-sidebar-foreground/40 font-semibold px-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-10 transition-all duration-200",
                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      )}
                    >
                      <Link href={item.href} className="flex items-center justify-between">
                        <span className="flex items-center gap-3">
                          <item.icon className={cn(
                            "size-4 transition-colors",
                            isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60"
                          )} />
                          <span>{item.title}</span>
                        </span>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "h-5 px-1.5 text-[10px] font-semibold",
                              "bg-sidebar-primary/20 text-sidebar-primary",
                              "group-data-[collapsible=icon]:hidden"
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator className="mx-2 bg-sidebar-border/50" />
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-sidebar-foreground/40 font-semibold px-2">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-10 transition-all duration-200",
                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      )}
                    >
                      <Link href={item.href} className="flex items-center justify-between">
                        <span className="flex items-center gap-3">
                          <item.icon className={cn(
                            "size-4 transition-colors",
                            isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60"
                          )} />
                          <span>{item.title}</span>
                        </span>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "h-5 px-1.5 text-[10px] font-semibold",
                              "bg-rose-500/20 text-rose-400",
                              "group-data-[collapsible=icon]:hidden"
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Pro upgrade card */}
        <div className="mt-auto px-2 pb-2 group-data-[collapsible=icon]:hidden">
          <div className={cn(
            "rounded-xl p-4",
            "bg-gradient-to-br from-sidebar-primary/20 via-sidebar-primary/10 to-transparent",
            "border border-sidebar-primary/20"
          )}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="size-4 text-sidebar-primary" />
              <span className="text-sm font-semibold text-sidebar-foreground">Upgrade to Pro</span>
            </div>
            <p className="text-[11px] text-sidebar-foreground/60 mb-3 leading-relaxed">
              Unlock analytics, reports, and advanced features.
            </p>
            <button className={cn(
              "w-full h-8 rounded-lg text-xs font-medium",
              "bg-sidebar-primary text-sidebar-primary-foreground",
              "hover:bg-sidebar-primary/90 transition-colors"
            )}>
              Upgrade Now
            </button>
          </div>
        </div>
      </SidebarContent>
      
      <SidebarSeparator className="mx-4 bg-sidebar-border/50" />
      
      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className={cn(
                "h-12 hover:bg-sidebar-accent/50",
                "transition-all duration-200"
              )} 
              tooltip="Admin Profile"
            >
              <Avatar className="size-8 ring-2 ring-sidebar-border">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                <AvatarFallback className="bg-sidebar-primary/20 text-sidebar-primary text-sm">AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm group-data-[collapsible=icon]:hidden">
                <span className="font-medium text-sidebar-foreground">Admin User</span>
                <span className="text-[11px] text-sidebar-foreground/50">admin@homecare.com</span>
              </div>
              <ChevronRight className="ml-auto size-4 text-sidebar-foreground/40 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Logout"
              className="h-9 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <Link href="/login">
                <LogOut className="size-4" />
                <span>Sign out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

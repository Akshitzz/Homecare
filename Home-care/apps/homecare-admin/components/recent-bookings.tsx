"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Booking } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ArrowRight, Clock, DollarSign, MoreHorizontal } from "lucide-react"
import Link from "next/link"

interface RecentBookingsProps {
  bookings: Booking[]
}

const statusConfig = {
  pending: {
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/20",
    dot: "bg-amber-500",
  },
  confirmed: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
    dot: "bg-primary",
  },
  completed: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  cancelled: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/20",
    dot: "bg-destructive",
  },
}

// Generate avatar colors based on name
function getAvatarColor(name: string) {
  const colors = [
    "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  ]
  const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  return colors[index]
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <Card className="premium-card border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base font-medium">Recent Bookings</CardTitle>
          <CardDescription className="text-xs mt-0.5">Latest activity on your platform</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild className="text-xs text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/bookings" className="flex items-center gap-1">
            View all
            <ArrowRight className="size-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {bookings.slice(0, 5).map((booking, index) => {
            const status = statusConfig[booking.status]
            const avatarColor = getAvatarColor(booking.customerName)
            
            return (
              <div
                key={booking.id}
                className={cn(
                  "group flex items-center justify-between gap-4 rounded-lg p-3 -mx-2",
                  "transition-all duration-200 hover:bg-muted/50",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="size-10 ring-2 ring-background">
                    <AvatarFallback className={cn("text-sm font-medium", avatarColor)}>
                      {booking.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">
                      {booking.customerName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {booking.service}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold tabular-nums">${booking.amount}</p>
                    <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      <span>{booking.date}</span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize font-medium text-[11px] px-2 py-0.5",
                      status.bg,
                      status.text,
                      status.border
                    )}
                  >
                    <span className={cn("size-1.5 rounded-full mr-1.5", status.dot)} />
                    {booking.status}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

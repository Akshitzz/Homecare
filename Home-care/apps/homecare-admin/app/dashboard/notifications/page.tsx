"use client"

import { useState, useEffect, useCallback } from "react"
import { formatDistanceToNow } from "date-fns"
import {
  Bell,
  Calendar,
  CreditCard,
  AlertTriangle,
  Info,
  Trash2,
  CheckCheck,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import type { Notification } from "@/lib/types"
import { cn } from "@/lib/utils"

const typeIcons = {
  booking: Calendar,
  payment: CreditCard,
  alert: AlertTriangle,
  info: Info,
}

const typeStyles = {
  booking: "bg-primary/10 text-primary ring-1 ring-primary/20",
  payment: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20",
  alert: "bg-destructive/10 text-destructive ring-1 ring-destructive/20",
  info: "bg-muted text-muted-foreground ring-1 ring-border",
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications")
      const data = await res.json()
      setNotifications(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Failed to load notifications", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = async (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    )
    await fetch("/api/notifications", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: notificationId, read: true }),
    })
  }

  const handleMarkAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    await fetch("/api/notifications", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "all", read: true }),
    })
    toast.success("All notifications marked as read")
  }

  const handleDelete = async (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
    await fetch(`/api/notifications?id=${notificationId}`, { method: "DELETE" })
    toast.success("Notification deleted")
  }

  const handleClearAll = async () => {
    setNotifications([])
    await fetch("/api/notifications?all=true", { method: "DELETE" })
    toast.success("All notifications cleared")
  }

  return (
    <>
      <DashboardHeader
        title="Notifications"
        description="Stay updated with platform activity"
      />
      <div className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                <Bell className="size-5" />
              </div>
              <div>
                <span className="font-medium">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
                </span>
                <p className="text-sm text-muted-foreground">Stay updated with platform activity</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCheck className="mr-2 size-4" />
                Mark all as read
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                disabled={notifications.length === 0}
              >
                <Trash2 className="mr-2 size-4" />
                Clear all
              </Button>
            </div>
          </div>

          <Card className="premium-card border-border/50 overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/30">
              <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="divide-y">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-4 p-4">
                      <Skeleton className="size-10 rounded-full shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-2/3" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="size-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-medium">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    You're all caught up! Check back later.
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => {
                    const Icon = typeIcons[notification.type]
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-4 p-4 transition-colors hover:bg-muted/50",
                          !notification.read && "bg-primary/5"
                        )}
                      >
                        <div
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-full",
                            typeStyles[notification.type]
                          )}
                        >
                          <Icon className="size-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium leading-tight">
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {notification.message}
                              </p>
                            </div>
                            {!notification.read && (
                              <Badge className="shrink-0 bg-primary text-primary-foreground">
                                New
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>
                              {formatDistanceToNow(new Date(notification.createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                            <div className="flex gap-2">
                              {!notification.read && (
                                <button
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="text-primary hover:underline"
                                >
                                  Mark as read
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(notification.id)}
                                className="text-destructive hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

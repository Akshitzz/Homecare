"use client"

import { useState, useEffect, useCallback } from "react"
import { format } from "date-fns"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import type { Booking, BookingStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

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

const paymentConfig = {
  paid: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20",
  },
  pending: {
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/20",
  },
  refunded: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-muted",
  },
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch("/api/bookings")
      const data = await res.json()
      setBookings(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Failed to load bookings", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    )
    const res = await fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: bookingId, status: newStatus }),
    })
    if (res.ok) {
      toast.success(`Booking ${newStatus} successfully`)
    } else {
      toast.error("Failed to update booking")
      fetchBookings()
    }
  }

  return (
    <>
      <DashboardHeader
        title="Booking Management"
        description="View and manage all service bookings"
      />
      <div className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 bg-muted/50 border-transparent focus:bg-background focus:border-input transition-all"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] h-10 bg-muted/50 border-transparent">
                  <Filter className="mr-2 size-4 text-muted-foreground" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="premium-card border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Service</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Payment</TableHead>
                    <TableHead className="hidden lg:table-cell">Amount</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-32" /></TableCell>
                        <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell className="hidden lg:table-cell"><Skeleton className="h-5 w-16" /></TableCell>
                        <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-12" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                      </TableRow>
                    ))
                  ) : filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No bookings found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking, index) => (
                      <TableRow
                        key={booking.id}
                        className="animate-fade-in transition-colors"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.customerName}</p>
                            <p className="text-xs text-muted-foreground hidden sm:block">
                              {booking.customerEmail}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {booking.service}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-1">
                            <Calendar className="size-3 text-muted-foreground" />
                            {booking.date}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "capitalize font-medium text-[11px] px-2 py-0.5",
                              statusConfig[booking.status].bg,
                              statusConfig[booking.status].text,
                              statusConfig[booking.status].border
                            )}
                          >
                            <span className={cn("size-1.5 rounded-full mr-1.5", statusConfig[booking.status].dot)} />
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge
                            variant="outline"
                            className={cn(
                              "capitalize font-medium text-[11px] px-2 py-0.5",
                              paymentConfig[booking.paymentStatus].bg,
                              paymentConfig[booking.paymentStatus].text,
                              paymentConfig[booking.paymentStatus].border
                            )}
                          >
                            {booking.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell font-medium">
                          ${booking.amount}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="size-8">
                                <MoreHorizontal className="size-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => setSelectedBooking(booking)}
                              >
                                <Eye className="mr-2 size-4" />
                                View Details
                              </DropdownMenuItem>
                              {booking.status === "pending" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(booking.id, "confirmed")
                                  }
                                >
                                  <CheckCircle className="mr-2 size-4" />
                                  Approve
                                </DropdownMenuItem>
                              )}
                              {booking.status !== "cancelled" &&
                                booking.status !== "completed" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(booking.id, "cancelled")
                                    }
                                    className="text-destructive"
                                  >
                                    <XCircle className="mr-2 size-4" />
                                    Cancel
                                  </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Booking Details</DialogTitle>
                <DialogDescription>
                  {selectedBooking?.id} - {selectedBooking?.service}
                </DialogDescription>
              </DialogHeader>
              {selectedBooking && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Customer</p>
                      <p className="font-medium">{selectedBooking.customerName}</p>
                      <p className="text-sm text-muted-foreground">{selectedBooking.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Service</p>
                      <p className="font-medium">{selectedBooking.service}</p>
                      <p className="text-sm text-muted-foreground capitalize">{selectedBooking.serviceCategory}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                      <p className="font-medium">{selectedBooking.date}</p>
                      <p className="text-sm text-muted-foreground">{selectedBooking.time}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Amount</p>
                      <p className="text-lg font-bold">${selectedBooking.amount}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p className="text-sm">{selectedBooking.address}</p>
                  </div>
                  {selectedBooking.notes && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Notes</p>
                      <p className="text-sm">{selectedBooking.notes}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize font-medium",
                        statusConfig[selectedBooking.status].bg,
                        statusConfig[selectedBooking.status].text,
                        statusConfig[selectedBooking.status].border
                      )}
                    >
                      <span className={cn("size-1.5 rounded-full mr-1.5", statusConfig[selectedBooking.status].dot)} />
                      {selectedBooking.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize font-medium",
                        paymentConfig[selectedBooking.paymentStatus].bg,
                        paymentConfig[selectedBooking.paymentStatus].text,
                        paymentConfig[selectedBooking.paymentStatus].border
                      )}
                    >
                      {selectedBooking.paymentStatus}
                    </Badge>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}

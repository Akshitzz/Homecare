"use client"

import { useEffect, useState } from "react"
import { Calendar, Users, DollarSign, Briefcase } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatCard } from "@/components/stat-card"
import { BookingsChart, RevenueChart } from "@/components/overview-charts"
import { RecentBookings } from "@/components/recent-bookings"
import type { Booking, DashboardStats, ChartData } from "@/lib/types"

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    bookingsChange: 0,
    totalUsers: 0,
    usersChange: 0,
    totalRevenue: 0,
    revenueChange: 0,
    activeServices: 0,
    servicesChange: 0,
  })
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, bookRes] = await Promise.all([
          fetch("/api/dashboard"),
          fetch("/api/bookings"),
        ])
        const dashData = await dashRes.json()
        const bookData = await bookRes.json()

        const { chartData: chart, ...statsData } = dashData
        setStats(statsData)
        setChartData(chart ?? [])
        setBookings(Array.isArray(bookData) ? bookData.slice(0, 5) : [])
      } catch (err) {
        console.error("Failed to load dashboard", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <DashboardHeader
        title="Dashboard Overview"
        description="Welcome back! Here's what's happening with your platform."
      />
      <div className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
            <StatCard
              title="Total Bookings"
              value={stats.totalBookings}
              change={stats.bookingsChange}
              icon={<Calendar className="size-5" />}
              delay={0}
            />
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              change={stats.usersChange}
              icon={<Users className="size-5" />}
              delay={50}
            />
            <StatCard
              title="Total Revenue"
              value={stats.totalRevenue}
              change={stats.revenueChange}
              icon={<DollarSign className="size-5" />}
              prefix="$"
              delay={100}
            />
            <StatCard
              title="Active Services"
              value={stats.activeServices}
              change={stats.servicesChange}
              icon={<Briefcase className="size-5" />}
              delay={150}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            <BookingsChart data={chartData} />
            <RevenueChart data={chartData} />
          </div>

          {/* Recent Activity */}
          <RecentBookings bookings={bookings} />
        </div>
      </div>
    </>
  )
}

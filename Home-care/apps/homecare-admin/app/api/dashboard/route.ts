import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const [bookingsRes, usersRes, servicesRes, revenueRes, chartRes] = await Promise.all([
      supabase.from("bookings").select("id", { count: "exact", head: true }),
      supabase.from("users").select("id", { count: "exact", head: true }),
      supabase.from("services").select("id", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("bookings").select("amount").eq("payment_status", "paid"),
      // Last 6 months of bookings grouped by month
      supabase
        .from("bookings")
        .select("created_at, amount, payment_status")
        .gte("created_at", new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString())
        .order("created_at", { ascending: true }),
    ])

    const totalRevenue = (revenueRes.data ?? []).reduce(
      (sum: number, b: { amount: number }) => sum + (b.amount ?? 0),
      0
    )

    // Build chart data grouped by month
    const chartMap: Record<string, { bookings: number; revenue: number }> = {}
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    // Initialize the last 6 months to guarantee keys exist in chronological order
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      chartMap[monthNames[d.getMonth()]] = { bookings: 0, revenue: 0 }
    }

    for (const b of chartRes.data ?? []) {
      const d = new Date(b.created_at)
      const key = monthNames[d.getMonth()]
      if (chartMap[key]) {
        chartMap[key].bookings += 1
        if (b.payment_status === "paid") chartMap[key].revenue += b.amount ?? 0
      }
    }

    const chartData = Object.entries(chartMap).map(([month, vals]) => ({
      month,
      bookings: vals.bookings,
      revenue: Math.round(vals.revenue),
    }))

    return NextResponse.json({
      totalBookings: bookingsRes.count ?? 0,
      bookingsChange: 0,
      totalUsers: usersRes.count ?? 0,
      usersChange: 0,
      totalRevenue: Math.round(totalRevenue),
      revenueChange: 0,
      activeServices: servicesRes.count ?? 0,
      servicesChange: 0,
      chartData,
    })
  } catch (err) {
    return NextResponse.json({ error: "Failed to load dashboard stats" }, { status: 500 })
  }
}

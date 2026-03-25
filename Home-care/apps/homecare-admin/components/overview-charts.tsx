"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Line,
  LineChart,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import type { ChartData } from "@/lib/types"
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface OverviewChartsProps {
  data: ChartData[]
}

const bookingsChartConfig = {
  bookings: {
    label: "Bookings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

// Custom tooltip component
function CustomTooltip({ 
  active, 
  payload, 
  label,
  valuePrefix = "",
  valueSuffix = ""
}: {
  active?: boolean
  payload?: Array<{ value: number; dataKey: string; color: string }>
  label?: string
  valuePrefix?: string
  valueSuffix?: string
}) {
  if (!active || !payload?.length) return null
  
  return (
    <div className="rounded-lg border bg-card px-3 py-2 shadow-lg animate-scale-in">
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
          {valuePrefix}{entry.value.toLocaleString()}{valueSuffix}
        </p>
      ))}
    </div>
  )
}

export function BookingsChart({ data }: OverviewChartsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const lastMonth = data[data.length - 1]
  const prevMonth = data[data.length - 2]
  
  let change = "0"
  if (prevMonth) {
    if (prevMonth.bookings === 0) {
      change = lastMonth.bookings > 0 ? "100.0" : "0.0"
    } else {
      change = (((lastMonth.bookings - prevMonth.bookings) / prevMonth.bookings) * 100).toFixed(1)
    }
  }
  const isPositive = Number(change) >= 0

  return (
    <Card className="premium-card border-border/50 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-medium">Bookings Overview</CardTitle>
            <CardDescription className="text-xs mt-0.5">Monthly booking trends</CardDescription>
          </div>
          <div className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
            isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          )}>
            {isPositive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {change}%
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={bookingsChartConfig} className="h-[260px] w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: -8, right: 8, top: 8, bottom: 0 }}
            onMouseMove={(e) => {
              if (e.activeTooltipIndex !== undefined) {
                setHoveredIndex(e.activeTooltipIndex)
              }
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <defs>
              <linearGradient id="fillBookings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-bookings)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--color-bookings)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              vertical={false} 
              strokeDasharray="3 3" 
              className="stroke-border/50"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: "var(--color-bookings)", strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            <Area
              dataKey="bookings"
              type="monotone"
              fill="url(#fillBookings)"
              stroke="var(--color-bookings)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 6,
                fill: "var(--color-bookings)",
                stroke: "var(--card)",
                strokeWidth: 2,
              }}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function RevenueChart({ data }: OverviewChartsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const lastMonth = data[data.length - 1]
  const prevMonth = data[data.length - 2]

  let change = "0"
  if (prevMonth) {
    if (prevMonth.revenue === 0) {
      change = lastMonth.revenue > 0 ? "100.0" : "0.0"
    } else {
      change = (((lastMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100).toFixed(1)
    }
  }
  const isPositive = Number(change) >= 0

  return (
    <Card className="premium-card border-border/50 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-medium">Revenue Analytics</CardTitle>
            <CardDescription className="text-xs mt-0.5">Monthly revenue breakdown</CardDescription>
          </div>
          <div className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
            isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          )}>
            {isPositive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {change}%
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={revenueChartConfig} className="h-[260px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ left: -8, right: 8, top: 8, bottom: 0 }}
            onMouseMove={(e) => {
              if (e.activeTooltipIndex !== undefined) {
                setActiveIndex(e.activeTooltipIndex)
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-revenue)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--color-revenue)" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              vertical={false} 
              strokeDasharray="3 3" 
              className="stroke-border/50"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              content={<CustomTooltip valuePrefix="$" />}
              cursor={{ fill: "var(--muted)", opacity: 0.3 }}
            />
            <Bar
              dataKey="revenue"
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={activeIndex === index ? "var(--color-revenue)" : "url(#fillRevenue)"}
                  className="transition-all duration-200"
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// New: Activity Sparkline for compact display
export function ActivitySparkline({ data }: { data: number[] }) {
  const chartData = data.map((value, index) => ({ value, index }))
  
  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

"use client"

import { useEffect, useState, useRef } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  change: number
  icon: React.ReactNode
  prefix?: string
  suffix?: string
  delay?: number
}

function AnimatedNumber({ 
  value, 
  prefix = "", 
  suffix = "" 
}: { 
  value: number
  prefix?: string
  suffix?: string 
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!hasAnimated || value !== displayValue) {
            setHasAnimated(true)
            const duration = 1000
            const startTime = Date.now()
            const startValue = displayValue
            
            const animate = () => {
              const elapsed = Date.now() - startTime
              const progress = Math.min(elapsed / duration, 1)
              const easeOut = 1 - Math.pow(1 - progress, 3)
              const currentValue = Math.floor(startValue + (value - startValue) * easeOut)
              setDisplayValue(currentValue)
              
              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setDisplayValue(value) // ensure it ends on exact value
              }
            }
            
            requestAnimationFrame(animate)
          }
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}

export function StatCard({ 
  title, 
  value, 
  change, 
  icon, 
  prefix = "", 
  suffix = "",
  delay = 0 
}: StatCardProps) {
  const isPositive = change >= 0
  const numericValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value

  return (
    <Card 
      className={cn(
        "premium-card relative overflow-hidden border-border/50",
        "bg-gradient-to-br from-card to-card/80"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              {title}
            </p>
            <div className="text-3xl font-semibold tracking-tight">
              {typeof value === "number" ? (
                <AnimatedNumber value={numericValue} prefix={prefix} suffix={suffix} />
              ) : (
                <span>{prefix}{value}{suffix}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <div 
                className={cn(
                  "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
                  isPositive 
                    ? "bg-success/10 text-success" 
                    : "bg-destructive/10 text-destructive"
                )}
              >
                {isPositive ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                <span>{isPositive ? "+" : ""}{change}%</span>
              </div>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
          <div className={cn(
            "flex size-12 items-center justify-center rounded-xl",
            "bg-primary/10 text-primary",
            "ring-1 ring-primary/20"
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

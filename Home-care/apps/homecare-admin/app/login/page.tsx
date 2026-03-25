"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Home, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    setIsLoading(true)
    
    // Simulate authentication
    setTimeout(() => {
      if (email === "admin@homecare.com" && password === "admin123") {
        toast.success("Welcome back!")
        router.push("/dashboard")
      } else {
        toast.error("Invalid credentials. Try admin@homecare.com / admin123")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className={cn(
        "hidden lg:flex lg:flex-1 flex-col justify-between p-10",
        "bg-gradient-to-br from-primary/5 via-primary/10 to-background",
        "relative overflow-hidden"
      )}>
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="relative">
          <Link href="/" className="flex items-center gap-3">
            <div className={cn(
              "flex size-10 items-center justify-center rounded-xl",
              "bg-gradient-to-br from-primary to-primary/80",
              "text-primary-foreground shadow-sm"
            )}>
              <Home className="size-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight">HomeCare</span>
          </Link>
        </div>

        <div className="relative space-y-6 max-w-md">
          <div className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1",
            "bg-primary/10 text-primary text-sm font-medium"
          )}>
            <Sparkles className="size-3.5" />
            Admin Dashboard
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-balance leading-tight">
            Manage your home care services with ease
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Track bookings, manage users, and grow your business with our comprehensive admin platform.
          </p>
        </div>

        <div className="relative text-sm text-muted-foreground">
          Trusted by 1,000+ home care providers worldwide
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Mobile logo */}
          <div className="flex flex-col items-center space-y-2 text-center lg:hidden">
            <div className={cn(
              "flex size-12 items-center justify-center rounded-xl",
              "bg-gradient-to-br from-primary to-primary/80",
              "text-primary-foreground shadow-sm"
            )}>
              <Home className="size-6" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">HomeCare Admin</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Desktop heading */}
          <div className="hidden lg:block space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <Card className="border-border/50 shadow-sm">
            <form onSubmit={handleSubmit}>
              <CardContent className="pt-6">
                <FieldGroup className="gap-5">
                  <Field>
                    <FieldLabel className="text-sm font-medium">Email Address</FieldLabel>
                    <InputGroup className="mt-1.5">
                      <InputGroupAddon>
                        <Mail className="size-4 text-muted-foreground" />
                      </InputGroupAddon>
                      <InputGroupInput
                        type="email"
                        placeholder="admin@homecare.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11"
                      />
                    </InputGroup>
                  </Field>
                  <Field>
                    <FieldLabel className="text-sm font-medium">Password</FieldLabel>
                    <InputGroup className="mt-1.5">
                      <InputGroupAddon>
                        <Lock className="size-4 text-muted-foreground" />
                      </InputGroupAddon>
                      <InputGroupInput
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11"
                      />
                      <InputGroupAddon
                        isButton
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) =>
                          setRememberMe(checked as boolean)
                        }
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="#"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </FieldGroup>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pt-2">
                <Button 
                  type="submit" 
                  className="w-full h-11 text-sm font-medium" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner className="size-4 mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="size-4 ml-2" />
                    </>
                  )}
                </Button>
                <div className={cn(
                  "w-full rounded-lg px-3 py-2.5 text-center text-xs",
                  "bg-muted/50 text-muted-foreground"
                )}>
                  Demo: <span className="font-medium text-foreground">admin@homecare.com</span> / <span className="font-medium text-foreground">admin123</span>
                </div>
              </CardFooter>
            </form>
          </Card>

          <p className="text-center text-xs text-muted-foreground leading-relaxed">
            By continuing, you agree to our{" "}
            <Link href="#" className="underline hover:text-foreground transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

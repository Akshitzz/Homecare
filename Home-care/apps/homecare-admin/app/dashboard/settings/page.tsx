"use client"

import { useState } from "react"
import { User, Lock, Bell, Palette, Save } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@homecare.com",
    phone: "+1 (555) 000-0000",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    bookings: true,
    payments: true,
    marketing: false,
  })
  const [platform, setPlatform] = useState({
    siteName: "HomeCare Services",
    currency: "USD",
    timezone: "America/New_York",
    bookingBuffer: "30",
  })

  const handleSaveProfile = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Profile updated successfully")
    }, 500)
  }

  const handleChangePassword = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Password changed successfully")
    }, 500)
  }

  const handleSaveNotifications = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Notification preferences saved")
    }, 500)
  }

  const handleSavePlatform = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Platform settings updated")
    }, 500)
  }

  return (
    <>
      <DashboardHeader
        title="Settings"
        description="Manage your account and platform preferences"
      />
      <div className="flex-1 p-4 md:p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="profile" className="gap-2">
              <User className="size-4 hidden sm:block" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="password" className="gap-2">
              <Lock className="size-4 hidden sm:block" />
              Password
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="size-4 hidden sm:block" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="platform" className="gap-2">
              <Palette className="size-4 hidden sm:block" />
              Platform
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and avatar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="size-20">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-2xl">AD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>
                <Separator />
                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Email Address</FieldLabel>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Phone Number</FieldLabel>
                    <Input
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                    />
                  </Field>
                </FieldGroup>
                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  <Save className="mr-2 size-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel>Current Password</FieldLabel>
                    <Input type="password" placeholder="Enter current password" />
                  </Field>
                  <Field>
                    <FieldLabel>New Password</FieldLabel>
                    <Input type="password" placeholder="Enter new password" />
                  </Field>
                  <Field>
                    <FieldLabel>Confirm New Password</FieldLabel>
                    <Input type="password" placeholder="Confirm new password" />
                  </Field>
                </FieldGroup>
                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="font-medium mb-2">Password Requirements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>At least 8 characters long</li>
                    <li>Contains at least one uppercase letter</li>
                    <li>Contains at least one number</li>
                    <li>Contains at least one special character</li>
                  </ul>
                </div>
                <Button onClick={handleChangePassword} disabled={isLoading}>
                  <Lock className="mr-2 size-4" />
                  {isLoading ? "Changing..." : "Change Password"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive updates and alerts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in browser
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Booking Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        New bookings, cancellations, and updates
                      </p>
                    </div>
                    <Switch
                      checked={notifications.bookings}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, bookings: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Payment Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Successful payments and refunds
                      </p>
                    </div>
                    <Switch
                      checked={notifications.payments}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, payments: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Tips, product updates, and offers
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, marketing: checked })
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleSaveNotifications} disabled={isLoading}>
                  <Save className="mr-2 size-4" />
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platform">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>
                  Configure your platform preferences and defaults.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel>Site Name</FieldLabel>
                    <Input
                      value={platform.siteName}
                      onChange={(e) =>
                        setPlatform({ ...platform, siteName: e.target.value })
                      }
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Currency</FieldLabel>
                      <Select
                        value={platform.currency}
                        onValueChange={(value) =>
                          setPlatform({ ...platform, currency: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (&euro;)</SelectItem>
                          <SelectItem value="GBP">GBP (&pound;)</SelectItem>
                          <SelectItem value="INR">INR (&rupee;)</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel>Timezone</FieldLabel>
                      <Select
                        value={platform.timezone}
                        onValueChange={(value) =>
                          setPlatform({ ...platform, timezone: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          <SelectItem value="Europe/London">London</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel>Booking Buffer (minutes)</FieldLabel>
                    <Select
                      value={platform.bookingBuffer}
                      onValueChange={(value) =>
                        setPlatform({ ...platform, bookingBuffer: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum time between bookings
                    </p>
                  </Field>
                </FieldGroup>
                <Button onClick={handleSavePlatform} disabled={isLoading}>
                  <Save className="mr-2 size-4" />
                  {isLoading ? "Saving..." : "Save Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

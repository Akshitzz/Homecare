"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Star,
  Calendar,
  DollarSign,
  Clock,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import type { Service, ServiceCategory } from "@/lib/types"
import { cn } from "@/lib/utils"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

const categoryLabels: Record<ServiceCategory, string> = {
  cleaning: "Cleaning",
  "elderly-care": "Elderly Care",
  nursing: "Nursing",
  "home-repair": "Home Repair",
  gardening: "Gardening",
}

const categoryConfig: Record<ServiceCategory, { bg: string; text: string; border: string }> = {
  cleaning: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
  "elderly-care": { bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400", border: "border-teal-500/20" },
  nursing: { bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500/20" },
  "home-repair": { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20" },
  gardening: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20" },
}

interface ServiceFormData {
  name: string
  description: string
  category: ServiceCategory
  price: number
  duration: string
  image: string
  isActive: boolean
}

const emptyFormData: ServiceFormData = {
  name: "",
  description: "",
  category: "cleaning",
  price: 0,
  duration: "",
  image: "",
  isActive: true,
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState<ServiceFormData>(emptyFormData)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch("/api/services")
      const data = await res.json()
      setServices(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Failed to load services", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service)
      setFormData({
        name: service.name,
        description: service.description,
        category: service.category,
        price: service.price,
        duration: service.duration,
        image: service.image,
        isActive: service.isActive,
      })
    } else {
      setEditingService(null)
      setFormData(emptyFormData)
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async () => {
    setIsSaving(true)
    try {
      if (editingService) {
        const res = await fetch("/api/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingService.id, ...formData }),
        })
        if (res.ok) {
          toast.success("Service updated successfully")
          fetchServices()
        } else {
          toast.error("Failed to update service")
        }
      } else {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        if (res.ok) {
          toast.success("Service created successfully")
          fetchServices()
        } else {
          toast.error("Failed to create service")
        }
      }
      setIsDialogOpen(false)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (serviceId: string) => {
    setServices((prev) => prev.filter((s) => s.id !== serviceId))
    const res = await fetch(`/api/services?id=${serviceId}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Service deleted successfully")
    } else {
      toast.error("Failed to delete service")
      fetchServices()
    }
  }

  const handleToggleActive = async (serviceId: string, isActive: boolean) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, isActive } : s))
    )
    await fetch("/api/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: serviceId, isActive }),
    })
    toast.success(`Service ${isActive ? "activated" : "deactivated"}`)
  }

  return (
    <>
      <DashboardHeader
        title="Services Management"
        description="Add, edit, and manage your service offerings"
      />
      <div className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 bg-muted/50 border-transparent focus:bg-background focus:border-input transition-all"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px] h-10 bg-muted/50 border-transparent">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="elderly-care">Elderly Care</SelectItem>
                  <SelectItem value="nursing">Nursing</SelectItem>
                  <SelectItem value="home-repair">Home Repair</SelectItem>
                  <SelectItem value="gardening">Gardening</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="mr-2 size-4" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {editingService ? "Edit Service" : "Add New Service"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingService
                      ? "Update the service details below."
                      : "Fill in the details to create a new service."}
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel>Service Name</FieldLabel>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Deep Home Cleaning"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Describe the service..."
                      rows={3}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Category</FieldLabel>
                      <Select
                        value={formData.category}
                        onValueChange={(value: ServiceCategory) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cleaning">Cleaning</SelectItem>
                          <SelectItem value="elderly-care">Elderly Care</SelectItem>
                          <SelectItem value="nursing">Nursing</SelectItem>
                          <SelectItem value="home-repair">Home Repair</SelectItem>
                          <SelectItem value="gardening">Gardening</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel>Price ($)</FieldLabel>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: Number(e.target.value) })
                        }
                        placeholder="0"
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Duration</FieldLabel>
                      <Input
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                        placeholder="e.g., 2-3 hours"
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Image URL</FieldLabel>
                      <Input
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </Field>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <Label>Active Status</Label>
                      <p className="text-xs text-muted-foreground">
                        Make this service available for booking
                      </p>
                    </div>
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isActive: checked })
                      }
                    />
                  </div>
                </FieldGroup>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSaving}>
                    {isSaving ? "Saving..." : editingService ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="border-border/50">
                    <Skeleton className="aspect-video w-full" />
                    <CardHeader>
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))
              : filteredServices.map((service, index) => (
                  <Card
                    key={service.id}
                    className="premium-card overflow-hidden border-border/50 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative aspect-video">
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">No image</span>
                        </div>
                      )}
                      {!service.isActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                          <Badge variant="secondary">Inactive</Badge>
                        </div>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute right-2 top-2 size-8"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenDialog(service)}>
                            <Pencil className="mr-2 size-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(service.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold leading-tight">{service.name}</h3>
                        <Badge
                          variant="outline"
                          className={cn(
                            "shrink-0 font-medium text-[11px]",
                            categoryConfig[service.category].bg,
                            categoryConfig[service.category].text,
                            categoryConfig[service.category].border
                          )}
                        >
                          {categoryLabels[service.category]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="size-4 text-muted-foreground" />
                          <span className="font-semibold">${service.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-4 text-muted-foreground" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-3">
                      <div className="flex w-full items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-warning text-warning" />
                          <span className="font-medium">{service.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="size-4" />
                          <span>{service.bookingsCount} bookings</span>
                        </div>
                        <Switch
                          checked={service.isActive}
                          onCheckedChange={(checked) =>
                            handleToggleActive(service.id, checked)
                          }
                        />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </div>
      </div>
    </>
  )
}

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled"
export type PaymentStatus = "paid" | "pending" | "refunded"
export type UserStatus = "active" | "inactive"
export type ServiceCategory = "cleaning" | "elderly-care" | "nursing" | "home-repair" | "gardening"

export interface Booking {
  id: string
  customerName: string
  customerEmail: string
  service: string
  serviceCategory: ServiceCategory
  date: string
  time: string
  status: BookingStatus
  paymentStatus: PaymentStatus
  amount: number
  address: string
  notes?: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  status: UserStatus
  role: "customer" | "provider" | "admin"
  totalBookings: number
  totalSpent: number
  joinedAt: string
  lastActive: string
}

export interface Service {
  id: string
  name: string
  description: string
  category: ServiceCategory
  price: number
  duration: string
  image: string
  isActive: boolean
  rating: number
  bookingsCount: number
}

export interface Notification {
  id: string
  type: "booking" | "payment" | "alert" | "info"
  title: string
  message: string
  read: boolean
  createdAt: string
}

export interface DashboardStats {
  totalBookings: number
  bookingsChange: number
  totalUsers: number
  usersChange: number
  totalRevenue: number
  revenueChange: number
  activeServices: number
  servicesChange: number
}

export interface ChartData {
  month: string
  bookings: number
  revenue: number
}

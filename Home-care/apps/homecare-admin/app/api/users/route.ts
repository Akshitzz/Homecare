import { NextResponse } from "next/server"
import { getSupabaseAdmin, verifyAdmin } from "@/lib/supabase/admin"

export const dynamic = "force-dynamic"
import type { User } from "@/lib/types"

export async function GET(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const role = searchParams.get("role")
  const supabase = getSupabaseAdmin()

  let query = supabase
    .from("users")
    .select("*")
    .order("joined_at", { ascending: false })

  if (status && status !== "all") query = query.eq("status", status)
  if (role && role !== "all") query = query.eq("role", role)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const users = (data ?? []).map((u: Record<string, unknown>) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    avatar: u.avatar,
    status: u.status,
    role: u.role,
    totalBookings: u.total_bookings,
    totalSpent: u.total_spent,
    joinedAt: u.joined_at,
    lastActive: u.last_active,
  }))

  return NextResponse.json(users)
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const supabase = getSupabaseAdmin()
    const body = await request.json() as User
    const { data, error } = await supabase
      .from("users")
      .insert({
        id: `USR${Date.now()}`,
        name: body.name,
        email: body.email,
        phone: body.phone,
        avatar: body.avatar,
        status: body.status ?? "active",
        role: body.role ?? "customer",
        total_bookings: 0,
        total_spent: 0,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create user" }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const supabase = getSupabaseAdmin()
    const body = await request.json()
    const { id, ...updates } = body

    const dbUpdates: Record<string, unknown> = {}
    if (updates.name !== undefined) dbUpdates.name = updates.name
    if (updates.email !== undefined) dbUpdates.email = updates.email
    if (updates.phone !== undefined) dbUpdates.phone = updates.phone
    if (updates.avatar !== undefined) dbUpdates.avatar = updates.avatar
    if (updates.status !== undefined) dbUpdates.status = updates.status
    if (updates.role !== undefined) dbUpdates.role = updates.role
    if (updates.totalBookings !== undefined) dbUpdates.total_bookings = updates.totalBookings
    if (updates.totalSpent !== undefined) dbUpdates.total_spent = updates.totalSpent
    if (updates.lastActive !== undefined) dbUpdates.last_active = updates.lastActive

    const { data, error } = await supabase
      .from("users")
      .update(dbUpdates)
      .eq("id", id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to update user" }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const supabase = getSupabaseAdmin()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const { error } = await supabase.from("users").delete().eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 400 })
  }
}

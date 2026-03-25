import { NextResponse } from "next/server"
import { getSupabaseAdmin, verifyAdmin } from "@/lib/supabase/admin"

export const dynamic = "force-dynamic"
import type { Booking } from "@/lib/types"

export async function GET(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const supabase = getSupabaseAdmin()

  let query = supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })

  if (status && status !== "all") {
    query = query.eq("status", status)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Map snake_case columns to camelCase for the frontend
  const bookings = (data ?? []).map((b: Record<string, unknown>) => ({
    id: b.id,
    customerName: b.customer_name,
    customerEmail: b.customer_email,
    service: b.service,
    serviceCategory: b.service_category,
    date: b.date,
    time: b.time,
    status: b.status,
    paymentStatus: b.payment_status,
    amount: b.amount,
    address: b.address,
    notes: b.notes,
    createdAt: b.created_at,
  }))

  return NextResponse.json(bookings)
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const supabase = getSupabaseAdmin()
    const body = await request.json() as Booking
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        id: `BK${Date.now()}`,
        customer_name: body.customerName,
        customer_email: body.customerEmail,
        service: body.service,
        service_category: body.serviceCategory,
        date: body.date,
        time: body.time,
        status: body.status ?? "pending",
        payment_status: body.paymentStatus ?? "pending",
        amount: body.amount,
        address: body.address,
        notes: body.notes,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 400 })
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
    if (updates.status !== undefined) dbUpdates.status = updates.status
    if (updates.paymentStatus !== undefined) dbUpdates.payment_status = updates.paymentStatus
    if (updates.customerName !== undefined) dbUpdates.customer_name = updates.customerName
    if (updates.customerEmail !== undefined) dbUpdates.customer_email = updates.customerEmail
    if (updates.service !== undefined) dbUpdates.service = updates.service
    if (updates.serviceCategory !== undefined) dbUpdates.service_category = updates.serviceCategory
    if (updates.date !== undefined) dbUpdates.date = updates.date
    if (updates.time !== undefined) dbUpdates.time = updates.time
    if (updates.amount !== undefined) dbUpdates.amount = updates.amount
    if (updates.address !== undefined) dbUpdates.address = updates.address
    if (updates.notes !== undefined) dbUpdates.notes = updates.notes

    const { data, error } = await supabase
      .from("bookings")
      .update(dbUpdates)
      .eq("id", id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 400 })
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
      return NextResponse.json({ error: "Booking ID required" }, { status: 400 })
    }

    const { error } = await supabase.from("bookings").delete().eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 400 })
  }
}

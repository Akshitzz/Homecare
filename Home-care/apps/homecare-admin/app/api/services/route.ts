import { NextResponse } from "next/server"
import { getSupabaseAdmin, verifyAdmin } from "@/lib/supabase/admin"

export const dynamic = "force-dynamic"
import type { Service } from "@/lib/types"

export async function GET(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const supabase = getSupabaseAdmin()

  let query = supabase
    .from("services")
    .select("*")
    .order("name", { ascending: true })

  if (category && category !== "all") query = query.eq("category", category)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const services = (data ?? []).map((s: Record<string, unknown>) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    category: s.category,
    price: s.price,
    duration: s.duration,
    image: s.image,
    isActive: s.is_active,
    rating: s.rating,
    bookingsCount: s.bookings_count,
  }))

  return NextResponse.json(services)
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const supabase = getSupabaseAdmin()
    const body = await request.json() as Service
    const { data, error } = await supabase
      .from("services")
      .insert({
        id: `SRV${Date.now()}`,
        name: body.name,
        description: body.description,
        category: body.category,
        price: body.price,
        duration: body.duration,
        image: body.image,
        is_active: body.isActive ?? true,
        rating: 0,
        bookings_count: 0,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create service" }, { status: 400 })
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
    if (updates.description !== undefined) dbUpdates.description = updates.description
    if (updates.category !== undefined) dbUpdates.category = updates.category
    if (updates.price !== undefined) dbUpdates.price = updates.price
    if (updates.duration !== undefined) dbUpdates.duration = updates.duration
    if (updates.image !== undefined) dbUpdates.image = updates.image
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive
    if (updates.rating !== undefined) dbUpdates.rating = updates.rating
    if (updates.bookingsCount !== undefined) dbUpdates.bookings_count = updates.bookingsCount

    const { data, error } = await supabase
      .from("services")
      .update(dbUpdates)
      .eq("id", id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to update service" }, { status: 400 })
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
      return NextResponse.json({ error: "Service ID required" }, { status: 400 })
    }

    const { error } = await supabase.from("services").delete().eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 400 })
  }
}

import { NextResponse } from "next/server"
import { getSupabaseAdmin, verifyAdmin } from "@/lib/supabase/admin"

export const dynamic = "force-dynamic"
import type { Notification } from "@/lib/types"

export async function GET() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const notifications = (data ?? []).map((n: Record<string, unknown>) => ({
    id: n.id,
    type: n.type,
    title: n.title,
    message: n.message,
    read: n.read,
    createdAt: n.created_at,
  }))

  return NextResponse.json(notifications)
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const supabase = getSupabaseAdmin()
    const body = await request.json() as Notification
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        id: `NOT${Date.now()}`,
        type: body.type,
        title: body.title,
        message: body.message,
        read: false,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create notification" }, { status: 400 })
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

    // Support marking all as read: id === "all"
    if (id === "all") {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("read", false)

      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
      return NextResponse.json({ success: true })
    }

    const { data, error } = await supabase
      .from("notifications")
      .update({ read: updates.read })
      .eq("id", id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Failed to update notification" }, { status: 400 })
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
    const all = searchParams.get("all")

    if (all === "true") {
      const { error } = await supabase.from("notifications").delete().neq("id", "")
      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
      return NextResponse.json({ success: true })
    }

    if (!id) {
      return NextResponse.json({ error: "Notification ID required" }, { status: 400 })
    }

    const { error } = await supabase.from("notifications").delete().eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete notification" }, { status: 400 })
  }
}

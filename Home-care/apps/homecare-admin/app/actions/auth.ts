'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Check if the authenticated user is an admin in the public users table
  // Use the service-role client so this check doesn't depend on RLS policies.
  const adminDb = getSupabaseAdmin()
  const { data: userData, error: roleError } = await adminDb
    .from('users')
    .select('role')
    .eq('email', email)
    .single()

  if (roleError || !userData || userData.role !== 'admin') {
    // If not an admin, sign them out immediately to destroy the new session
    await supabase.auth.signOut()
    if (process.env.NODE_ENV !== 'production' && roleError) {
      return { error: `Unauthorized: ${roleError.message}` }
    }
    return { error: 'Unauthorized: You do not have admin access.' }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

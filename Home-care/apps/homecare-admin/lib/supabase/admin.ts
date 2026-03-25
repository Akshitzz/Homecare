import { createClient as createSupabaseJSClient } from "@supabase/supabase-js"
import { createClient as createServerClient } from "./server"

export const getSupabaseAdmin = () => {
  return createSupabaseJSClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

export async function verifyAdmin() {
  const supabase = await createServerClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user || !user.email) {
    return false
  }
  
  // Use admin client to check role to gracefully allow the check even if RLS is on for public.users
  const adminDb = getSupabaseAdmin()
  const { data: userData } = await adminDb
    .from('users')
    .select('role')
    .eq('email', user.email)
    .single()
    
  return userData?.role === 'admin'
}

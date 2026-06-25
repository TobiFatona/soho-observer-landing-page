// The Supabase JS SDK is ~110 KB (raw) and is only needed when a visitor
// actually submits the waitlist / login form. We dynamic-import it on demand
// so it is split into its own chunk and kept out of the initial page bundle.
let clientPromise

export function getSupabase() {
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(
        import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
        import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'
      )
    )
  }
  return clientPromise
}

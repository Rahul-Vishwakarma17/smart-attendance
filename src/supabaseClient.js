import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://pofevdtkcwgppiqaytzl.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvZmV2ZHRrY3dncHBpcWF5dHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMTUxNDYsImV4cCI6MjA4OTg5MTE0Nn0.hr2WiMzVn4WOTlu88bodymsZS0Wcl2O2cVdCqraS6gg"

export const supabase = createClient(supabaseUrl, supabaseKey)
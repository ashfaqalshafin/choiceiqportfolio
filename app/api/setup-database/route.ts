import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    // Create a server-side Supabase client with service role key for admin privileges
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      ""

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase credentials not configured" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if the projects table exists by trying to query it
    const { error: checkError } = await supabase.from("projects").select("id").limit(1)

    // If there's no error, the table exists
    if (!checkError) {
      return NextResponse.json({ message: "Projects table already exists" })
    }

    // If table creation was successful, insert sample data
    const sampleData = [
      {
        title: "Personal Blog",
        description: "A responsive blog built with Next.js and Tailwind CSS",
        link: "https://example.com/blog",
        image_url: "https://via.placeholder.com/600x400?text=Blog+Project",
      },
      {
        title: "Weather App",
        description: "Real-time weather application using OpenWeather API",
        link: "https://example.com/weather",
        image_url: "https://via.placeholder.com/600x400?text=Weather+App",
      },
      {
        title: "E-commerce Dashboard",
        description: "Admin dashboard for managing products and orders",
        link: "https://example.com/dashboard",
        image_url: "https://via.placeholder.com/600x400?text=Dashboard",
      },
    ]

    const { error: insertError } = await supabase.from("projects").insert(sampleData)

    if (insertError) {
      console.error("Error inserting sample data:", insertError)
      return NextResponse.json({ message: "Projects table created but failed to insert sample data" })
    }

    return NextResponse.json({ message: "Projects table created and sample data inserted" })
  } catch (error) {
    console.error("Error in setup-database route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

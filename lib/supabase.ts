import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL or Anon Key is missing. Make sure you have the correct environment variables set up.")
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "")

// Projects table name
export const PROJECTS_TABLE = "projects"

// Project interface
export interface Project {
  id: number
  title: string
  description: string
  link: string
  image_url?: string
  created_at?: string
  updated_at?: string
}

// Fallback projects data when table doesn't exist
const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Personal Blog",
    description: "A responsive blog built with Next.js and Tailwind CSS",
    link: "https://example.com/blog",
    image_url: "https://via.placeholder.com/600x400?text=Blog+Project",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Weather App",
    description: "Real-time weather application using OpenWeather API",
    link: "https://example.com/weather",
    image_url: "https://via.placeholder.com/600x400?text=Weather+App",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "E-commerce Dashboard",
    description: "Admin dashboard for managing products and orders",
    link: "https://example.com/dashboard",
    image_url: "https://via.placeholder.com/600x400?text=Dashboard",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Project functions
export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase.from(PROJECTS_TABLE).select("*").order("created_at", { ascending: false })

    if (error) {
      // Check if the error is because the table doesn't exist
      if (error.message.includes("relation") && error.message.includes("does not exist")) {
        console.warn("Projects table doesn't exist yet. Using fallback data.")
        return FALLBACK_PROJECTS
      }

      console.error("Error fetching projects:", error)
      return FALLBACK_PROJECTS
    }

    return data || FALLBACK_PROJECTS
  } catch (error) {
    console.error("Error in getProjects:", error)
    return FALLBACK_PROJECTS
  }
}

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

// Table names
export const PROJECTS_TABLE = "projects"
export const PROFILES_TABLE = "profiles"

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

// Profile interface
export interface Profile {
  id: number
  name: string
  title: string
  bio?: string
  location?: string
  avatar_url?: string
  resume_url?: string
  email?: string
  phone?: string
  created_at?: string
  updated_at?: string
}

// Fallback profile data
const FALLBACK_PROFILE: Profile = {
  id: 1,
  name: "Shafin",
  title: "Creative Coder & Editor",
  bio: "I blend technical skills with creative vision to build engaging digital experiences. Constantly learning and improving to create better solutions.",
  location: "Sylhet, Bangladesh",
  avatar_url: "https://via.placeholder.com/300x300?text=Shafin",
  email: "shafinff333@gmail.com",
  phone: "01797488769",
}

// Fallback projects data
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

// Profile functions
export async function getProfile(): Promise<Profile> {
  try {
    const { data, error } = await supabase.from(PROFILES_TABLE).select("*").limit(1).single()

    if (error) {
      // Check if the error is because the table doesn't exist
      if (error.message.includes("relation") && error.message.includes("does not exist")) {
        console.warn("Profiles table doesn't exist yet. Using fallback data.")
        return FALLBACK_PROFILE
      }

      console.error("Error fetching profile:", error)
      return FALLBACK_PROFILE
    }

    return data || FALLBACK_PROFILE
  } catch (error) {
    console.error("Error in getProfile:", error)
    return FALLBACK_PROFILE
  }
}

export async function updateProfile(id: number, profile: Partial<Profile>): Promise<Profile> {
  try {
    const { data, error } = await supabase
      .from(PROFILES_TABLE)
      .update({ ...profile, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating profile:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in updateProfile:", error)
    throw error
  }
}

// Function to upload avatar image
export async function uploadAvatar(file: File): Promise<string> {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `avatar-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error } = await supabase.storage.from("profile-images").upload(filePath, file)

    if (error) {
      console.error("Error uploading avatar:", error)
      throw error
    }

    const { data } = supabase.storage.from("profile-images").getPublicUrl(filePath)
    return data.publicUrl
  } catch (error) {
    console.error("Error in uploadAvatar:", error)
    throw error
  }
}

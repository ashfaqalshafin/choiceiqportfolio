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

    // Check if the hobbies table exists by trying to query it
    const { error: checkError } = await supabase.from("hobbies").select("id").limit(1)

    // If there's no error, the table exists
    if (!checkError) {
      return NextResponse.json({ message: "Hobbies table already exists" })
    }

    // Since we can't directly create tables with the Supabase client,
    // we'll return instructions for manual setup
    if (checkError.message.includes("relation") && checkError.message.includes("does not exist")) {
      return NextResponse.json(
        {
          error: "Hobbies table does not exist",
          message: "Please run the SQL script in the setup-hobbies.sql file to create the table manually.",
          sqlScript: `
CREATE TABLE IF NOT EXISTS hobbies (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER,
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert some sample hobbies
INSERT INTO hobbies (profile_id, name, icon, description)
VALUES 
  (1, 'Photography', 'camera', 'Capturing beautiful moments and landscapes'),
  (1, 'Reading', 'book-open', 'Exploring new worlds through books'),
  (1, 'Hiking', 'mountain', 'Exploring nature and staying active'),
  (1, 'Coding', 'code', 'Building cool projects and learning new technologies');
          `,
        },
        { status: 404 },
      )
    }

    // If we get here, there was some other error
    return NextResponse.json({ error: "Failed to check if hobbies table exists", details: checkError }, { status: 500 })
  } catch (error) {
    console.error("Error in setup-hobbies route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

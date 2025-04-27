import { NextResponse } from "next/server"

export async function GET() {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY
    // Using the actual channel ID from your URL
    const CHANNEL_ID = "UCseFEz1aC1qWq_YCAy7baAA"

    if (!API_KEY) {
      console.error("YouTube API key is not configured")
      return NextResponse.json({ subscriberCount: 1 })
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`,
      )

      if (!response.ok) {
        console.error(`YouTube API responded with status: ${response.status}`)
        return NextResponse.json({ subscriberCount: 1 })
      }

      const data = await response.json()

      if (!data.items || data.items.length === 0) {
        console.error("Channel not found or no statistics available")
        return NextResponse.json({ subscriberCount: 1 })
      }

      // YouTube might hide subscriber counts for small channels
      // In that case, statistics.subscriberCount might be undefined
      const subscriberCount = data.items[0].statistics.subscriberCount
        ? Number.parseInt(data.items[0].statistics.subscriberCount, 10)
        : 1

      return NextResponse.json({ subscriberCount })
    } catch (error) {
      console.error("Error in YouTube API request:", error)
      return NextResponse.json({ subscriberCount: 1 })
    }
  } catch (error) {
    console.error("Error in YouTube API route:", error)
    return NextResponse.json({ subscriberCount: 1 })
  }
}

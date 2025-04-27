"use client"

import { useState, useEffect, useRef } from "react"
import { Youtube, Send } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const Stats = () => {
  const [youtubeCount, setYoutubeCount] = useState(1) // Default to 1
  const [telegramCount, setTelegramCount] = useState(1) // Default to 1
  const [loading, setLoading] = useState(true)
  const statsRef = useRef<HTMLDivElement>(null)
  const countersStarted = useRef(false)

  // Fetch stats from APIs
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)

        // Fetch YouTube subscribers
        try {
          const youtubeResponse = await fetch("/api/youtube")
          if (youtubeResponse.ok) {
            const youtubeData = await youtubeResponse.json()
            if (youtubeData.subscriberCount !== undefined) {
              setYoutubeCount(youtubeData.subscriberCount)
            }
          }
        } catch (error) {
          console.error("YouTube API error:", error)
          // Keep the default value
        }

        // Fetch Telegram members
        try {
          const telegramResponse = await fetch("/api/telegram")
          if (telegramResponse.ok) {
            const telegramData = await telegramResponse.json()
            if (telegramData.memberCount !== undefined) {
              setTelegramCount(telegramData.memberCount)
            }
          }
        } catch (error) {
          console.error("Telegram API error:", error)
          // Keep the default value
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching stats:", error)
        setLoading(false)
      }
    }

    fetchStats()

    // Set up a refresh interval (every 5 minutes)
    const intervalId = setInterval(fetchStats, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  // Animate counters when in view
  useEffect(() => {
    if (loading || countersStarted.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted.current) {
            countersStarted.current = true

            // Animate YouTube counter
            let startCount = 0
            const youtubeTarget = youtubeCount
            const youtubeIncrement = Math.max(1, Math.ceil(youtubeTarget / 50))
            const youtubeInterval = setInterval(() => {
              startCount += youtubeIncrement
              if (startCount >= youtubeTarget) {
                startCount = youtubeTarget
                clearInterval(youtubeInterval)
              }
              setYoutubeCount(startCount)
            }, 30)

            // Animate Telegram counter
            let telegramStartCount = 0
            const telegramTarget = telegramCount
            const telegramIncrement = Math.max(1, Math.ceil(telegramTarget / 50))
            const telegramInterval = setInterval(() => {
              telegramStartCount += telegramIncrement
              if (telegramStartCount >= telegramTarget) {
                telegramStartCount = telegramTarget
                clearInterval(telegramInterval)
              }
              setTelegramCount(telegramStartCount)
            }, 30)
          }
        })
      },
      { threshold: 0.5 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [loading, youtubeCount, telegramCount])

  return (
    <section id="stats" className="py-20 bg-white dark:bg-gray-900">
      <div className="section-container">
        <h2 className="section-title dark:text-white">Live Stats</h2>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* YouTube Stats */}
          <div className="stats-card dark:bg-gray-800 dark:border-gray-700 scroll-reveal">
            <div className="stats-icon text-white">
              <Youtube className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 dark:text-white">YouTube Subscribers</h3>
            {loading ? (
              <Skeleton className="w-24 h-10 rounded" />
            ) : (
              <div className="stats-value">{youtubeCount.toLocaleString()}</div>
            )}
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
              Real-time subscriber count from YouTube Data API
            </p>
          </div>

          {/* Telegram Stats */}
          <div
            className="stats-card dark:bg-gray-800 dark:border-gray-700 scroll-reveal"
            style={{ transitionDelay: "100ms" }}
          >
            <div className="stats-icon text-white">
              <Send className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 dark:text-white">Telegram Members</h3>
            {loading ? (
              <Skeleton className="w-24 h-10 rounded" />
            ) : (
              <div className="stats-value">{telegramCount.toLocaleString()}</div>
            )}
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
              Live channel member count from Telegram API
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats

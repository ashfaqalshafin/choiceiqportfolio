"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, FileText, Mail } from "lucide-react"
import { getProfile, type Profile } from "@/lib/supabase"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        setProfile(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching profile:", error)
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = heroRef.current?.querySelectorAll(".animate-item")
    elements?.forEach((el) => observer.observe(el))

    return () => {
      elements?.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950 dark:to-gray-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left order-2 md:order-1">
            <div className="animate-item animate-delay-100">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                Hi, I&apos;m{" "}
                <span className="text-emerald-600 dark:text-emerald-400 inline-block">
                  {loading ? "..." : profile?.name || "Shafin"}
                </span>
              </h1>
            </div>

            <div className="animate-item animate-delay-200">
              <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6">
                {loading ? "Loading..." : profile?.title || "Creative Coder & Editor from Sylhet, Bangladesh"}
              </h2>
            </div>

            <div className="animate-item animate-delay-300">
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                {loading
                  ? "Loading bio..."
                  : profile?.bio ||
                    "I blend technical skills with creative vision to build engaging digital experiences. Constantly learning and improving to create better solutions."}
              </p>
            </div>

            <div className="animate-item animate-delay-400 flex flex-wrap gap-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <FileText className="mr-2 h-4 w-4" />
                View Resume
              </Button>
              <Button
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
            </div>
          </div>

          <div className="flex justify-center order-1 md:order-2">
            <div className="animate-item animate-delay-200 avatar-container w-64 h-64 md:w-80 md:h-80">
              {loading ? (
                <Skeleton className="w-full h-full rounded-full" />
              ) : (
                <Avatar className="w-full h-full">
                  {profile?.avatar_url ? (
                    <AvatarImage
                      src={profile.avatar_url || "/placeholder.svg"}
                      alt={profile?.name || "Profile"}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-6xl bg-emerald-200 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200">
                      {profile?.name?.charAt(0) || "S"}
                    </AvatarFallback>
                  )}
                </Avatar>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a
          href="#skills"
          className="text-emerald-500 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md"
          aria-label="Scroll to skills section"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  )
}

export default Hero

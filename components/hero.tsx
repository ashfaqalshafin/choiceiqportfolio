"use client"

import { useEffect, useRef } from "react"
import { ArrowDown } from "lucide-react"

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)

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
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-item animate-delay-100">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Hi, I&apos;m <span className="text-blue-600 inline-block">Shafin</span>
          </h1>
        </div>
        <div className="animate-item animate-delay-200">
          <h2 className="text-xl md:text-3xl text-gray-700 mb-8">A Creative Coder & Editor from Sylhet, Bangladesh</h2>
        </div>
        <div className="animate-item animate-delay-300">
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
            I blend technical skills with creative vision to build engaging digital experiences. Constantly learning and
            improving to create better solutions for my clients and projects.
          </p>
        </div>
        <div className="animate-item animate-delay-400 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="btn-primary flex items-center justify-center gap-2">
            View My Work
          </a>
          <a href="#contact" className="btn-outline flex items-center justify-center gap-2">
            Get In Touch
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#skills" className="text-blue-500 hover:text-blue-700">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  )
}

export default Hero

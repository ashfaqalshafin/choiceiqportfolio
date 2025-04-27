"use client"

import { useEffect, useRef } from "react"
import { Code, Palette, Video } from "lucide-react"

const skills = [
  {
    name: "HTML, CSS, JS Coding",
    level: 30,
    description: "Learning Stage",
    icon: <Code className="w-8 h-8 text-white" />,
  },
  {
    name: "Thumbnail Designing",
    level: 60,
    description: "Good Level",
    icon: <Palette className="w-8 h-8 text-white" />,
  },
  {
    name: "Video Editing",
    level: 70,
    description: "Professional Level",
    icon: <Video className="w-8 h-8 text-white" />,
  },
]

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll(".progress-bar-fill")
            progressBars.forEach((bar, index) => {
              setTimeout(() => {
                ;(bar as HTMLElement).style.width = `${skills[index].level}%`
              }, 300)
            })

            // Add revealed class to all scroll-reveal elements
            const revealElements = entry.target.querySelectorAll(".scroll-reveal")
            revealElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("revealed")
              }, index * 150) // Staggered animation
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current)
      }
    }
  }, [])

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="section-container">
        <h2 className="section-title dark:text-white">My Skills</h2>
        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-card scroll-reveal dark:bg-gray-800 dark:border-gray-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-4 dark:text-white">{skill.name}</h3>
              <div className="progress-bar mb-2 dark:bg-gray-700">
                <div className="progress-bar-fill"></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{skill.description}</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

"use client"

import { useEffect, useRef } from "react"
import { Code, Palette, Video } from "lucide-react"

const skills = [
  {
    name: "HTML, CSS, JS Coding",
    level: 30,
    description: "Learning Stage",
    icon: <Code className="w-8 h-8 text-blue-500" />,
  },
  {
    name: "Thumbnail Designing",
    level: 60,
    description: "Good Level",
    icon: <Palette className="w-8 h-8 text-blue-500" />,
  },
  {
    name: "Video Editing",
    level: 70,
    description: "Professional Level",
    icon: <Video className="w-8 h-8 text-blue-500" />,
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
    <section id="skills" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title">My Skills</h2>
        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {skills.map((skill, index) => (
            <div key={skill.name} className="card p-6 animate-in" style={{ animationDelay: `${index * 100 + 100}ms` }}>
              <div className="flex items-center mb-4">
                {skill.icon}
                <h3 className="text-xl font-semibold ml-3">{skill.name}</h3>
              </div>
              <div className="progress-bar mb-2">
                <div className="progress-bar-fill"></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{skill.description}</span>
                <span className="font-medium">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

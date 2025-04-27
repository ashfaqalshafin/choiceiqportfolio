import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Stats from "@/components/stats"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Profile from "@/components/profile"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Skills />
      <Profile />
      <Projects />
      <Stats />
      <Contact />
      <Footer />
    </main>
  )
}

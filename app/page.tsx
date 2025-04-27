import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Stats from "@/components/stats"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Profile from "@/components/profile"
import Hobbies from "@/components/hobbies"
import ScrollInitializer from "@/components/scroll-initializer"
import ScrollToTop from "@/components/scroll-to-top"
import SetupHobbies from "@/components/setup-hobbies"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ScrollInitializer />
      <ScrollToTop />
      <Navbar />
      <Hero />
      <Skills />
      <Profile />
      <Hobbies />
      <SetupHobbies />
      <Projects />
      <Stats />
      <Contact />
      <Footer />
    </main>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { ExternalLink, AlertTriangle, Code, Eye } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getProjects, type Project } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

const Projects = () => {
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)
  const [showSqlDialog, setShowSqlDialog] = useState(false)

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)

        // Check if we're getting an error related to the table not existing
        try {
          const data = await getProjects()
          setProjects(data)

          // If we have exactly the same number of projects as our fallback data,
          // it's likely we're using the fallback data
          if (
            data.length === 3 &&
            data[0].title === "Personal Blog" &&
            data[1].title === "Weather App" &&
            data[2].title === "E-commerce Dashboard"
          ) {
            setUsingFallback(true)
          } else {
            setUsingFallback(false)
          }
        } catch (error) {
          console.error("Error fetching projects:", error)
          setUsingFallback(true)
          toast({
            title: "Warning",
            description: "Using sample project data. Please set up your database.",
            variant: "destructive",
          })
        }

        setLoading(false)
      } catch (error) {
        console.error("Error in fetchProjects:", error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [toast])

  const sqlScript = `
-- Create projects table with image_url field
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert sample projects with images
INSERT INTO projects (title, description, link, image_url)
VALUES 
  ('Personal Blog', 'A responsive blog built with Next.js and Tailwind CSS', 'https://example.com/blog', 'https://via.placeholder.com/600x400?text=Blog+Project'),
  ('Weather App', 'Real-time weather application using OpenWeather API', 'https://example.com/weather', 'https://via.placeholder.com/600x400?text=Weather+App'),
  ('E-commerce Dashboard', 'Admin dashboard for managing products and orders', 'https://example.com/dashboard', 'https://via.placeholder.com/600x400?text=Dashboard');
  `.trim()

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlScript)
    toast({
      title: "Copied!",
      description: "SQL script copied to clipboard",
    })
  }

  return (
    <section id="projects" className="py-20 bg-emerald-50 dark:bg-emerald-950">
      <div className="section-container">
        <h2 className="section-title dark:text-white">My Projects</h2>

        {usingFallback && (
          <>
            <Alert className="mb-4 bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400 mr-2" />
              <AlertDescription className="text-amber-700 dark:text-amber-300">
                Displaying sample projects. The projects table doesn't exist in your Supabase database yet.
              </AlertDescription>
            </Alert>
            <div className="flex justify-center mb-6">
              <Button
                onClick={() => setShowSqlDialog(true)}
                variant="outline"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
              >
                <Code className="mr-2 h-4 w-4" />
                View SQL Script
              </Button>
            </div>
          </>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="project-card dark:bg-gray-800 dark:border-gray-700">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
            <AlertDescription className="text-blue-700 dark:text-blue-300">No projects found.</AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card group scroll-reveal dark:bg-gray-800 dark:border-gray-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  {project.image_url ? (
                    <img
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      className="project-card-image"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">No image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-500 text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 mx-2"
                      aria-label={`View ${project.title} project`}
                    >
                      <Eye className="h-5 w-5" />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-500 text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 mx-2"
                      aria-label={`Open ${project.title} project`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{project.title}</h3>
                    <Badge
                      variant="outline"
                      className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
                    >
                      New
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center"
                    >
                      View Project <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SQL Script Dialog */}
        <Dialog open={showSqlDialog} onOpenChange={setShowSqlDialog}>
          <DialogContent className="sm:max-w-[600px] dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-white">SQL Script for Database Setup</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Copy this SQL script and run it in your Supabase SQL Editor.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto max-h-[400px]">
              <pre className="text-sm">{sqlScript}</pre>
            </div>
            <div className="flex justify-end">
              <Button onClick={copySqlToClipboard} className="bg-emerald-600 hover:bg-emerald-700">
                Copy to Clipboard
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

export default Projects

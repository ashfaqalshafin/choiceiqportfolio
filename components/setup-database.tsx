"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Database, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SetupDatabase() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const setupDatabase = async () => {
    try {
      setLoading(true)
      setError("")
      setMessage("")

      const response = await fetch("/api/setup-database")
      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setMessage(data.message || "Database setup complete!")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setError(data.error || "Failed to set up database")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Error setting up database:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
      <h3 className="text-lg font-medium mb-2">Database Setup</h3>
      <p className="text-gray-600 text-center mb-4">
        Click the button below to create the projects table in your Supabase database.
      </p>

      {error && (
        <Alert className="mb-4 bg-red-50 border-red-200">
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      {message && !error && (
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <AlertDescription className="text-blue-700">{message}</AlertDescription>
        </Alert>
      )}

      {success ? (
        <div className="flex items-center text-green-600">
          <Check className="mr-2 h-5 w-5" />
          Database setup complete! Reloading page...
        </div>
      ) : (
        <Button onClick={setupDatabase} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting Up...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Setup Database
            </>
          )}
        </Button>
      )}
    </div>
  )
}

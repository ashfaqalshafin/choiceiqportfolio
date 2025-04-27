"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Database, Check, Copy, Code } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function SetupHobbies() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [sqlScript, setSqlScript] = useState("")
  const [showSqlDialog, setShowSqlDialog] = useState(false)

  const setupHobbies = async () => {
    try {
      setLoading(true)
      setError("")
      setMessage("")
      setSqlScript("")

      const response = await fetch("/api/setup-hobbies")
      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setMessage(data.message || "Hobbies table setup complete!")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else if (response.status === 404 && data.sqlScript) {
        // Table doesn't exist, show SQL script
        setError(data.error || "Failed to set up hobbies table")
        setMessage(data.message || "")
        setSqlScript(data.sqlScript)
        setShowSqlDialog(true)
      } else {
        setError(data.error || "Failed to set up hobbies table")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Error setting up hobbies table:", err)
    } finally {
      setLoading(false)
    }
  }

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlScript)
    toast({
      title: "Copied!",
      description: "SQL script copied to clipboard",
    })
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mt-4">
      <h3 className="text-lg font-medium mb-2 dark:text-white">Hobbies Database Setup</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
        Click the button below to create the hobbies table in your Supabase database.
      </p>

      {error && (
        <Alert className="mb-4 bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800">
          <AlertDescription className="text-red-700 dark:text-red-300">{error}</AlertDescription>
        </Alert>
      )}

      {message && !error && (
        <Alert className="mb-4 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
          <AlertDescription className="text-emerald-700 dark:text-emerald-300">{message}</AlertDescription>
        </Alert>
      )}

      {success ? (
        <div className="flex items-center text-emerald-600 dark:text-emerald-400">
          <Check className="mr-2 h-5 w-5" />
          Hobbies database setup complete! Reloading page...
        </div>
      ) : (
        <Button onClick={setupHobbies} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting Up...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Setup Hobbies Database
            </>
          )}
        </Button>
      )}

      {/* SQL Script Dialog */}
      <Dialog open={showSqlDialog} onOpenChange={setShowSqlDialog}>
        <DialogContent className="sm:max-w-[600px] dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">SQL Script for Hobbies Table</DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              Copy this SQL script and run it in your Supabase SQL Editor to create the hobbies table.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto max-h-[400px]">
            <pre className="text-sm whitespace-pre-wrap">{sqlScript}</pre>
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={copySqlToClipboard} className="bg-emerald-600 hover:bg-emerald-700">
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
            <Button
              onClick={() => {
                window.open("https://app.supabase.com", "_blank")
              }}
              variant="outline"
            >
              <Code className="mr-2 h-4 w-4" />
              Open Supabase
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  Camera,
  BookOpen,
  Mountain,
  Code,
  Music,
  Gamepad2,
  Utensils,
  Plane,
  Film,
  Palette,
  Dumbbell,
  Heart,
  Coffee,
  Bike,
  type LucideIcon,
} from "lucide-react"
import { getHobbies, addHobby, updateHobby, deleteHobby, getProfile, type Hobby, type Profile } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Map of available icons
const iconMap: Record<string, LucideIcon> = {
  camera: Camera,
  "book-open": BookOpen,
  mountain: Mountain,
  code: Code,
  music: Music,
  gamepad2: Gamepad2,
  utensils: Utensils,
  plane: Plane,
  film: Film,
  palette: Palette,
  dumbbell: Dumbbell,
  heart: Heart,
  coffee: Coffee,
  bike: Bike,
}

export default function Hobbies() {
  const { toast } = useToast()
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAddingHobby, setIsAddingHobby] = useState(false)
  const [isEditingHobby, setIsEditingHobby] = useState(false)
  const [currentHobby, setCurrentHobby] = useState<Partial<Hobby>>({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const profileData = await getProfile()
        setProfile(profileData)

        const hobbiesData = await getHobbies(profileData.id)
        setHobbies(hobbiesData)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentHobby((prev) => ({ ...prev, [name]: value }))
  }

  const handleIconChange = (value: string) => {
    setCurrentHobby((prev) => ({ ...prev, icon: value }))
  }

  const handleAddHobby = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    try {
      setIsSaving(true)

      const newHobby = await addHobby({
        profile_id: profile.id,
        name: currentHobby.name || "",
        icon: currentHobby.icon,
        description: currentHobby.description,
      })

      setHobbies((prev) => [...prev, newHobby])
      setIsAddingHobby(false)
      setCurrentHobby({})

      toast({
        title: "Success",
        description: "Hobby added successfully",
      })
    } catch (error) {
      console.error("Error adding hobby:", error)
      toast({
        title: "Error",
        description: "Failed to add hobby. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditHobby = (hobby: Hobby) => {
    setCurrentHobby(hobby)
    setIsEditingHobby(true)
  }

  const handleUpdateHobby = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentHobby.id) return

    try {
      setIsSaving(true)

      const updatedHobby = await updateHobby(currentHobby.id, {
        name: currentHobby.name,
        icon: currentHobby.icon,
        description: currentHobby.description,
      })

      setHobbies((prev) => prev.map((h) => (h.id === updatedHobby.id ? updatedHobby : h)))
      setIsEditingHobby(false)
      setCurrentHobby({})

      toast({
        title: "Success",
        description: "Hobby updated successfully",
      })
    } catch (error) {
      console.error("Error updating hobby:", error)
      toast({
        title: "Error",
        description: "Failed to update hobby. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteHobby = async (id: number) => {
    if (!confirm("Are you sure you want to delete this hobby?")) return

    try {
      await deleteHobby(id)
      setHobbies((prev) => prev.filter((h) => h.id !== id))

      toast({
        title: "Success",
        description: "Hobby deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting hobby:", error)
      toast({
        title: "Error",
        description: "Failed to delete hobby. Please try again.",
        variant: "destructive",
      })
    }
  }

  const renderIcon = (iconName?: string) => {
    if (!iconName || !iconMap[iconName]) return null

    const IconComponent = iconMap[iconName]
    return <IconComponent className="w-5 h-5" />
  }

  return (
    <section className="py-20 bg-emerald-50">
      <div className="section-container">
        <h2 className="section-title">My Hobbies & Interests</h2>

        <div className="flex justify-end mb-6">
          <Button
            onClick={() => {
              setCurrentHobby({})
              setIsAddingHobby(true)
            }}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Hobby
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))}
          </div>
        ) : hobbies.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">No hobbies added yet. Add some to showcase your interests!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hobbies.map((hobby) => (
              <div
                key={hobby.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-100 hover:border-emerald-300 scroll-reveal"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-3">
                      {renderIcon(hobby.icon)}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{hobby.name}</h3>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEditHobby(hobby)}
                      className="text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteHobby(hobby.id)}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {hobby.description && <p className="text-gray-600 text-sm">{hobby.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Add Hobby Dialog */}
        <Dialog open={isAddingHobby} onOpenChange={setIsAddingHobby}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Hobby</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleAddHobby} className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Hobby Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={currentHobby.name || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., Photography"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="icon" className="text-sm font-medium">
                  Icon
                </label>
                <Select value={currentHobby.icon || ""} onValueChange={handleIconChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(iconMap).map(([key, Icon]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center">
                          <Icon className="w-4 h-4 mr-2" />
                          {key
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentHobby.description || ""}
                  onChange={handleInputChange}
                  placeholder="Brief description of your hobby"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddingHobby(false)
                    setCurrentHobby({})
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Hobby
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Hobby Dialog */}
        <Dialog open={isEditingHobby} onOpenChange={setIsEditingHobby}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Hobby</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleUpdateHobby} className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">
                  Hobby Name
                </label>
                <Input
                  id="edit-name"
                  name="name"
                  value={currentHobby.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-icon" className="text-sm font-medium">
                  Icon
                </label>
                <Select value={currentHobby.icon || ""} onValueChange={handleIconChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(iconMap).map(([key, Icon]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center">
                          <Icon className="w-4 h-4 mr-2" />
                          {key
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={currentHobby.description || ""}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditingHobby(false)
                    setCurrentHobby({})
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

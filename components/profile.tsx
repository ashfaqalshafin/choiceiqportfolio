"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Edit, Loader2, Save, X, Upload } from "lucide-react"
import { getProfile, updateProfile, uploadAvatar, type Profile as ProfileType } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Profile() {
  const { toast } = useToast()
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<ProfileType>>({})
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const data = await getProfile()
        setProfile(data)
        setFormData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching profile:", error)
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    try {
      setIsSaving(true)

      let avatarUrl = profile.avatar_url

      // Upload new avatar if selected
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile)
      }

      // Update profile with new data
      const updatedProfile = await updateProfile(profile.id, {
        ...formData,
        avatar_url: avatarUrl,
      })

      setProfile(updatedProfile)
      setIsEditing(false)
      setAvatarFile(null)
      setAvatarPreview(null)

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
        <span className="ml-2 text-gray-600">Loading profile...</span>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Profile not found.</p>
      </div>
    )
  }

  return (
    <section id="profile" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
          <Button onClick={() => setIsEditing(true)} className="bg-emerald-600 hover:bg-emerald-700">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-emerald-50 p-8 flex flex-col items-center justify-center">
              <Avatar className="w-40 h-40 border-4 border-white shadow-lg">
                {profile.avatar_url ? (
                  <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt={profile.name} />
                ) : (
                  <AvatarFallback className="text-4xl bg-emerald-200 text-emerald-700">
                    {profile.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <h3 className="mt-4 text-2xl font-bold text-gray-900">{profile.name}</h3>
              <p className="text-emerald-600 font-medium">{profile.title}</p>
              {profile.location && (
                <p className="mt-2 text-gray-600 text-center">
                  <span className="inline-block">📍 {profile.location}</span>
                </p>
              )}
            </div>

            <div className="md:w-2/3 p-8">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">About Me</h4>
                <p className="text-gray-700">{profile.bio}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.email && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">Email</h4>
                    <p className="text-gray-800">{profile.email}</p>
                  </div>
                )}

                {profile.phone && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">Phone</h4>
                    <p className="text-gray-800">{profile.phone}</p>
                  </div>
                )}

                {profile.resume_url && (
                  <div className="md:col-span-2 mt-4">
                    <a
                      href={profile.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-emerald-600 hover:text-emerald-800"
                    >
                      <span className="mr-2">View Resume</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    {avatarPreview ? (
                      <AvatarImage src={avatarPreview || "/placeholder.svg"} alt="Preview" />
                    ) : profile.avatar_url ? (
                      <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt={profile.name} />
                    ) : (
                      <AvatarFallback className="text-3xl bg-emerald-200 text-emerald-700">
                        {profile.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" name="name" value={formData.name || ""} onChange={handleInputChange} required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input id="title" name="title" value={formData.title || ""} onChange={handleInputChange} required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" name="email" value={formData.email || ""} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </label>
                  <Input id="phone" name="phone" value={formData.phone || ""} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Input id="location" name="location" value={formData.location || ""} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="resume_url" className="text-sm font-medium">
                    Resume URL
                  </label>
                  <Input
                    id="resume_url"
                    name="resume_url"
                    value={formData.resume_url || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </label>
                  <Textarea id="bio" name="bio" value={formData.bio || ""} onChange={handleInputChange} rows={4} />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setFormData(profile)
                    setAvatarFile(null)
                    setAvatarPreview(null)
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

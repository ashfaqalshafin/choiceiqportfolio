"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Send, Loader2, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Youtube } from "lucide-react"

const Contact = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-blue-50">
      <div className="section-container">
        <h2 className="section-title">Get In Touch</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Contact Information */}
          <div className="animate-in">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <p className="text-gray-600 mb-8">
              Feel free to reach out to me for collaborations, questions, or just to say hello!
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-blue-500 mt-1" />
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Email</h4>
                  <a
                    href="mailto:shafinff333@gmail.com"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    shafinff333@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 text-blue-500 mt-1" />
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Phone</h4>
                  <a href="tel:+8801797488769" className="text-gray-600 hover:text-blue-600 transition-colors">
                    +880 1797 488 769
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 text-green-500 mt-1" />
                <div className="ml-4">
                  <h4 className="text-lg font-medium">WhatsApp</h4>
                  <a
                    href="https://wa.me/8801797488769"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    +880 1797 488 769
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-500 mt-1" />
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Location</h4>
                  <p className="text-gray-600">Sylhet, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">Social Media</h4>
              <div className="flex space-x-4">
                <a
                  href="https://youtube.com/channel/UCseFEz1aC1qWq_YCAy7baAA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <Youtube className="w-5 h-5 text-red-600" />
                </a>
                <a
                  href="https://t.me/choiceiq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <Send className="w-5 h-5 text-blue-500" />
                </a>
                <a
                  href="https://www.facebook.com/share/12KrALwyc31/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-in animate-delay-100">
            <form onSubmit={handleSubmit} className="card p-8">
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message here..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

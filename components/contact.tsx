"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Send, Loader2, Facebook, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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
    <section id="contact" className="py-20 bg-emerald-50 dark:bg-emerald-950">
      <div className="section-container">
        <h2 className="section-title dark:text-white">Get In Touch</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Contact Information */}
          <div className="scroll-reveal">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Feel free to reach out to me for collaborations, questions, or just to say hello!
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium dark:text-white">Email</h4>
                    <a
                      href="mailto:shafinff333@gmail.com"
                      className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                    >
                      shafinff333@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium dark:text-white">Phone</h4>
                    <a
                      href="tel:+8801797488769"
                      className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                    >
                      +880 1797 488 769
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium dark:text-white">Location</h4>
                    <p className="text-gray-600 dark:text-gray-300">Sylhet, Bangladesh</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="text-lg font-medium mb-4 dark:text-white">Social Media</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://youtube.com/channel/UCseFEz1aC1qWq_YCAy7baAA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                    aria-label="YouTube Channel"
                  >
                    <Youtube className="w-5 h-5 text-red-600" />
                  </a>
                  <a
                    href="https://t.me/choiceiq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                    aria-label="Telegram Channel"
                  >
                    <Send className="w-5 h-5 text-blue-500" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/12KrALwyc31/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                    aria-label="Facebook Page"
                  >
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="scroll-reveal" style={{ transitionDelay: "100ms" }}>
            <form onSubmit={handleSubmit} className="contact-form dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">Send a Message</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="form-label dark:text-white">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="form-label dark:text-white">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="form-label dark:text-white">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message here..."
                    rows={5}
                    className="textarea dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={isSubmitting}
                >
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

"use client"

import { useEffect } from "react"
import { initScrollAnimation } from "@/lib/scroll-animation"

export default function ScrollInitializer() {
  useEffect(() => {
    initScrollAnimation()
  }, [])

  return null
}

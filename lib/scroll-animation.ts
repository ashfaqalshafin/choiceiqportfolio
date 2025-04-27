export function initScrollAnimation() {
  if (typeof window !== "undefined") {
    const scrollElements = document.querySelectorAll(".scroll-reveal")

    const elementInView = (el: Element, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top
      return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    }

    const displayScrollElement = (element: Element) => {
      element.classList.add("revealed")
    }

    const hideScrollElement = (element: Element) => {
      element.classList.remove("revealed")
    }

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el)
        } else {
          hideScrollElement(el)
        }
      })
    }

    window.addEventListener("scroll", () => {
      handleScrollAnimation()
    })

    // Initialize on load
    handleScrollAnimation()
  }
}

import { Heart } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">
              <span className="text-emerald-400">Choice</span>
              <span>IQ</span>
            </h2>
            <p className="text-gray-400 mt-1">Creative Coder & Editor</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400">&copy; {currentYear} Choice IQ. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-1">
              Designed with <Heart className="inline-block h-4 w-4 text-red-500 mx-1" /> in Sylhet, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

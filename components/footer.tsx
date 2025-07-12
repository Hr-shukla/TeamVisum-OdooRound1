import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Connect with learners and teachers worldwide. Share your skills, learn new ones, and grow together.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Explore Skills
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Join Community
                </Link>
              </li>
              <li>
                <Link href="/requests" className="text-gray-400 hover:text-purple-400 transition-colors">
                  My Requests
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            © 2025 SkillSwap. Built with <Heart className="h-4 w-4 text-red-500 mx-1" /> for community learning.
          </p>
        </div>
      </div>
    </footer>
  )
}

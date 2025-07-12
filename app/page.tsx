import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const featuredUsers = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=60&width=60",
    skillsOffered: ["React", "TypeScript", "Node.js"],
    skillsWanted: ["Python", "Machine Learning"],
    rating: 4.8,
    availability: "Weekends",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=60&width=60",
    skillsOffered: ["Photoshop", "UI/UX Design", "Figma"],
    skillsWanted: ["Video Editing", "3D Modeling"],
    rating: 4.9,
    availability: "Evenings",
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    avatar: "/placeholder.svg?height=60&width=60",
    skillsOffered: ["Guitar", "Music Theory", "Audio Production"],
    skillsWanted: ["Piano", "Singing"],
    rating: 4.7,
    availability: "Weekdays",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Exchange Knowledge.
            <br />
            Elevate Together.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect with learners and teachers worldwide. Share your skills, learn new ones, and grow together in our
            vibrant community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
                <Search className="mr-2 h-5 w-5" />
                Explore Skills
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-500/10 px-8 py-3 rounded-full bg-transparent"
              >
                Join Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
              <div className="text-gray-300">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-gray-300">Skills Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">25K+</div>
              <div className="text-gray-300">Successful Swaps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Users */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Community</h2>
            <p className="text-gray-400 text-lg">Discover talented individuals ready to share their expertise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredUsers.map((user) => (
              <Card
                key={user.id}
                className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">{user.name}</h3>
                      <div className="flex items-center text-sm text-gray-400">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {user.rating}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-400 mb-2">Skills Offered:</p>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsOffered.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-purple-900/30 text-purple-300 border-purple-700"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Skills Wanted:</p>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsWanted.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{user.availability}</span>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Request Swap
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/explore">
              <Button
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-500/10 bg-transparent"
              >
                <Users className="mr-2 h-4 w-4" />
                View All Users
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Simple steps to start your learning journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
              <p className="text-gray-400">Set up your profile with skills you offer and want to learn</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Matches</h3>
              <p className="text-gray-400">Browse and connect with users who have complementary skills</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
              <p className="text-gray-400">Exchange knowledge and grow together with your skill partner</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

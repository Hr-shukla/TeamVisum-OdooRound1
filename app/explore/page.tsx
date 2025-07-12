"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, MapPin, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/hooks/use-toast"

const users = [
  {
    id: 1,
    name: "Alex Chen",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=60&width=60",
    skillsOffered: ["React", "TypeScript", "Node.js", "GraphQL"],
    skillsWanted: ["Python", "Machine Learning", "Data Science"],
    rating: 4.8,
    reviews: 24,
    availability: "Weekends",
    isOnline: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=60&width=60",
    skillsOffered: ["Photoshop", "UI/UX Design", "Figma", "Illustrator"],
    skillsWanted: ["Video Editing", "3D Modeling", "Animation"],
    rating: 4.9,
    reviews: 31,
    availability: "Evenings",
    isOnline: false,
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=60&width=60",
    skillsOffered: ["Guitar", "Music Theory", "Audio Production", "Mixing"],
    skillsWanted: ["Piano", "Singing", "Songwriting"],
    rating: 4.7,
    reviews: 18,
    availability: "Weekdays",
    isOnline: true,
  },
  {
    id: 4,
    name: "Emily Davis",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=60&width=60",
    skillsOffered: ["Spanish", "French", "Translation", "Writing"],
    skillsWanted: ["Japanese", "Mandarin", "German"],
    rating: 4.6,
    reviews: 22,
    availability: "Flexible",
    isOnline: true,
  },
  {
    id: 5,
    name: "David Kim",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=60&width=60",
    skillsOffered: ["Photography", "Lightroom", "Portrait", "Wedding"],
    skillsWanted: ["Videography", "Drone Operation", "Color Grading"],
    rating: 4.8,
    reviews: 29,
    availability: "Weekends",
    isOnline: false,
  },
  {
    id: 6,
    name: "Lisa Wang",
    location: "Boston, MA",
    avatar: "/placeholder.svg?height=60&width=60",
    skillsOffered: ["Yoga", "Meditation", "Fitness", "Nutrition"],
    skillsWanted: ["Pilates", "Dance", "Martial Arts"],
    rating: 4.9,
    reviews: 35,
    availability: "Mornings",
    isOnline: true,
  },
]

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const { toast } = useToast()

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.skillsWanted.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesAvailability =
      availabilityFilter === "all" || user.availability.toLowerCase().includes(availabilityFilter.toLowerCase())

    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "4+" && user.rating >= 4.0) ||
      (ratingFilter === "4.5+" && user.rating >= 4.5)

    return matchesSearch && matchesAvailability && matchesRating
  })

  const handleRequestSwap = (userName: string) => {
    toast({
      title: "Swap request sent!",
      description: `Your request has been sent to ${userName}`,
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Explore Skills</h1>
          <p className="text-gray-400 text-lg">Discover talented individuals ready to share their knowledge</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or skill (e.g., React, Photography, Spanish)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
              />
            </div>

            <div className="flex gap-2">
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Times</SelectItem>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="evenings">Evenings</SelectItem>
                  <SelectItem value="mornings">Mornings</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-32 bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4+">4.0+ Stars</SelectItem>
                  <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"} found
            </p>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* User Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="relative">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{user.name}</h3>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="h-3 w-3 mr-1" />
                        {user.location}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-400">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {user.rating} ({user.reviews})
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-400 mb-2">Skills Offered:</p>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.slice(0, 3).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-900/30 text-purple-300 border-purple-700 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {user.skillsOffered.length > 3 && (
                      <Badge variant="secondary" className="bg-gray-800 text-gray-400 text-xs">
                        +{user.skillsOffered.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Skills Wanted:</p>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {user.skillsWanted.length > 3 && (
                      <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                        +{user.skillsWanted.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {user.availability}
                  </div>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleRequestSwap(user.name)}
                  >
                    Request Swap
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No users found matching your criteria</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

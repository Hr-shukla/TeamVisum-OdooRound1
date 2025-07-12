"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Plus, X, MapPin, Calendar } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/hooks/use-toast"

const availabilityOptions = [
  { id: "weekdays", label: "Weekdays" },
  { id: "weekends", label: "Weekends" },
  { id: "evenings", label: "Evenings" },
  { id: "mornings", label: "Mornings" },
  { id: "flexible", label: "Flexible" },
]

const skillSuggestions = [
  "React",
  "JavaScript",
  "Python",
  "Node.js",
  "TypeScript",
  "GraphQL",
  "Photoshop",
  "Figma",
  "UI/UX Design",
  "Illustrator",
  "Video Editing",
  "Guitar",
  "Piano",
  "Singing",
  "Music Theory",
  "Audio Production",
  "Spanish",
  "French",
  "Japanese",
  "German",
  "Translation",
  "Photography",
  "Lightroom",
  "Videography",
  "Drone Operation",
  "Yoga",
  "Fitness",
  "Meditation",
  "Nutrition",
  "Cooking",
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    bio: "Passionate developer and lifelong learner. Love sharing knowledge and learning from others.",
    skillsOffered: ["React", "JavaScript", "Node.js"],
    skillsWanted: ["Python", "Machine Learning", "Data Science"],
    availability: ["weekends", "evenings"],
    isPublic: true,
    joinedDate: "January 2024",
  })
  const [newSkillOffered, setNewSkillOffered] = useState("")
  const [newSkillWanted, setNewSkillWanted] = useState("")
  const { toast } = useToast()

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully.",
    })
  }

  const addSkill = (type: "offered" | "wanted", skill: string) => {
    if (!skill.trim()) return

    const key = type === "offered" ? "skillsOffered" : "skillsWanted"
    if (!profile[key].includes(skill)) {
      setProfile((prev) => ({
        ...prev,
        [key]: [...prev[key], skill],
      }))
    }

    if (type === "offered") {
      setNewSkillOffered("")
    } else {
      setNewSkillWanted("")
    }
  }

  const removeSkill = (type: "offered" | "wanted", skill: string) => {
    const key = type === "offered" ? "skillsOffered" : "skillsWanted"
    setProfile((prev) => ({
      ...prev,
      [key]: prev[key].filter((s) => s !== skill),
    }))
  }

  const toggleAvailability = (option: string) => {
    setProfile((prev) => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter((a) => a !== option)
        : [...prev.availability, option],
    }))
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-400">Manage your SkillSwap profile and preferences</p>
          </div>
          <Button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900 border-gray-800">
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">
              Profile
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-purple-600">
              Skills
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt={profile.name} />
                      <AvatarFallback className="text-lg">
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Joined {profile.joinedDate}
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-300">
                      Location
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                        className="pl-10 bg-gray-800 border-gray-700 text-white disabled:opacity-60"
                        placeholder="City, State/Country"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-300">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    className="bg-gray-800 border-gray-700 text-white disabled:opacity-60 min-h-[100px]"
                    placeholder="Tell others about yourself and your learning goals..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <div className="space-y-6">
              {/* Skills Offered */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Skills I Can Teach</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profile.skillsOffered.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-900/30 text-purple-300 border-purple-700 px-3 py-1"
                      >
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill("offered", skill)}
                            className="ml-2 text-purple-400 hover:text-purple-200"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Select value={newSkillOffered} onValueChange={setNewSkillOffered}>
                        <SelectTrigger className="flex-1 bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select a skill to add" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 max-h-60">
                          {skillSuggestions
                            .filter((skill) => !profile.skillsOffered.includes(skill))
                            .map((skill) => (
                              <SelectItem key={skill} value={skill}>
                                {skill}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={() => addSkill("offered", newSkillOffered)}
                        disabled={!newSkillOffered}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Skills Wanted */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Skills I Want to Learn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profile.skillsWanted.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 px-3 py-1">
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill("wanted", skill)}
                            className="ml-2 text-gray-400 hover:text-gray-200"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Select value={newSkillWanted} onValueChange={setNewSkillWanted}>
                        <SelectTrigger className="flex-1 bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select a skill to add" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 max-h-60">
                          {skillSuggestions
                            .filter((skill) => !profile.skillsWanted.includes(skill))
                            .map((skill) => (
                              <SelectItem key={skill} value={skill}>
                                {skill}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={() => addSkill("wanted", newSkillWanted)}
                        disabled={!newSkillWanted}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Availability */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {availabilityOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Switch
                          id={option.id}
                          checked={profile.availability.includes(option.id)}
                          onCheckedChange={() => toggleAvailability(option.id)}
                          disabled={!isEditing}
                          className="data-[state=checked]:bg-purple-600"
                        />
                        <Label htmlFor={option.id} className="text-gray-300">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Privacy & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300 text-base">Public Profile</Label>
                    <p className="text-sm text-gray-400 mt-1">Allow others to find and view your profile</p>
                  </div>
                  <Switch
                    checked={profile.isPublic}
                    onCheckedChange={(checked) => setProfile((prev) => ({ ...prev, isPublic: checked }))}
                    disabled={!isEditing}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-gray-800 border-gray-700 text-white opacity-60"
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Download My Data
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  AlertTriangle,
  BarChart3,
  Download,
  Search,
  Ban,
  CheckCircle,
  XCircle,
  MessageSquare,
  Star,
  TrendingUp,
} from "lucide-react"
import Navbar from "@/components/navbar"
import { useToast } from "@/hooks/use-toast"

const adminStats = {
  totalUsers: 10247,
  activeSwaps: 1834,
  completedSwaps: 25691,
  flaggedProfiles: 12,
  pendingReports: 8,
}

const flaggedUsers = [
  {
    id: 1,
    name: "Suspicious User",
    email: "suspicious@example.com",
    reason: "Inappropriate content in bio",
    reportedBy: "user123",
    date: "2024-01-15",
    status: "pending",
  },
  {
    id: 2,
    name: "Spam Account",
    email: "spam@example.com",
    reason: "Posting spam in skill descriptions",
    reportedBy: "user456",
    date: "2024-01-14",
    status: "pending",
  },
]

const recentSwaps = [
  {
    id: 1,
    user1: "Alice Johnson",
    user2: "Bob Smith",
    skill1: "React",
    skill2: "Python",
    status: "completed",
    rating: 4.8,
    date: "2024-01-15",
  },
  {
    id: 2,
    user1: "Carol Davis",
    user2: "David Wilson",
    skill1: "Photography",
    skill2: "Guitar",
    status: "active",
    date: "2024-01-14",
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [bannerMessage, setBannerMessage] = useState("")
  const { toast } = useToast()

  const handleBanUser = (userId: number, userName: string) => {
    toast({
      title: "User banned",
      description: `${userName} has been banned from the platform`,
      variant: "destructive",
    })
  }

  const handleApproveUser = (userId: number, userName: string) => {
    toast({
      title: "User approved",
      description: `${userName} has been approved and removed from flagged list`,
    })
  }

  const handleSendBanner = () => {
    if (!bannerMessage.trim()) return

    toast({
      title: "Banner sent!",
      description: "Banner message has been sent to all users",
    })
    setBannerMessage("")
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage users, monitor activity, and oversee platform operations</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900 border-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-600">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="flagged" className="data-[state=active]:bg-purple-600 relative">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Flagged
              {flaggedUsers.length > 0 && (
                <Badge className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5">{flaggedUsers.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="swaps" className="data-[state=active]:bg-purple-600">
              <MessageSquare className="h-4 w-4 mr-2" />
              Swaps
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-purple-600">
              <MessageSquare className="h-4 w-4 mr-2" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Users</p>
                      <p className="text-2xl font-bold text-white">{adminStats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400">+12%</span>
                    <span className="text-gray-400 ml-1">this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Active Swaps</p>
                      <p className="text-2xl font-bold text-white">{adminStats.activeSwaps.toLocaleString()}</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400">+8%</span>
                    <span className="text-gray-400 ml-1">this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Completed</p>
                      <p className="text-2xl font-bold text-white">{adminStats.completedSwaps.toLocaleString()}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-yellow-400">4.8</span>
                    <span className="text-gray-400 ml-1">avg rating</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Flagged</p>
                      <p className="text-2xl font-bold text-white">{adminStats.flaggedProfiles}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-red-400">Needs attention</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Reports</p>
                      <p className="text-2xl font-bold text-white">{adminStats.pendingReports}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-orange-400" />
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-orange-400">Pending review</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Swap Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSwaps.map((swap) => (
                    <div key={swap.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <span className="text-white font-medium">{swap.user1}</span>
                          <Badge
                            variant="secondary"
                            className="mx-2 bg-purple-900/30 text-purple-300 border-purple-700"
                          >
                            {swap.skill1}
                          </Badge>
                          <span className="text-gray-400 mx-2">↔</span>
                          <Badge variant="outline" className="border-gray-600 text-gray-300 mr-2">
                            {swap.skill2}
                          </Badge>
                          <span className="text-white font-medium">{swap.user2}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={swap.status === "completed" ? "default" : "secondary"}
                          className={
                            swap.status === "completed" ? "bg-green-900/30 text-green-400 border-green-700" : ""
                          }
                        >
                          {swap.status}
                        </Badge>
                        <span className="text-sm text-gray-400">{swap.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">User Management</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-gray-700 text-gray-300 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export Users
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users by name or email..."
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-center py-8 text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>User search and management interface would be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flagged" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                  Flagged Users ({flaggedUsers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flaggedUsers.map((user) => (
                    <div key={user.id} className="p-4 bg-red-900/10 border border-red-800 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-red-900 text-red-300">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-white">{user.name}</h3>
                            <p className="text-sm text-gray-400">{user.email}</p>
                            <p className="text-sm text-red-400 mt-1">Reason: {user.reason}</p>
                            <p className="text-xs text-gray-500">
                              Reported by {user.reportedBy} on {user.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveUser(user.id, user.name)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleBanUser(user.id, user.name)}>
                            <Ban className="h-4 w-4 mr-1" />
                            Ban
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Swap Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-400">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Swap monitoring and management interface would be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Send Platform Alert</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Banner Message</label>
                  <Textarea
                    placeholder="Enter message to display to all users..."
                    value={bannerMessage}
                    onChange={(e) => setBannerMessage(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                  />
                </div>
                <Button
                  onClick={handleSendBanner}
                  disabled={!bannerMessage.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Send Banner Alert
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Platform Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="border-gray-700 text-gray-300 justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    User Activity Report
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300 justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Swap History Report
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300 justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Feedback Report
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300 justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Platform Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

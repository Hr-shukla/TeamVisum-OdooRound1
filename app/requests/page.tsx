"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, Clock, MessageSquare, Star, Calendar } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/hooks/use-toast"

const swapRequests = {
  pending: [
    {
      id: 1,
      type: "sent",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 4.9,
      },
      skillOffered: "React",
      skillWanted: "UI/UX Design",
      message: "Hi! I'd love to learn UI/UX design from you. I can teach you React in return.",
      date: "2 days ago",
      status: "pending",
    },
    {
      id: 2,
      type: "received",
      user: {
        name: "Mike Rodriguez",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 4.7,
      },
      skillOffered: "Guitar",
      skillWanted: "JavaScript",
      message: "Hey! I saw your profile and would love to exchange guitar lessons for JavaScript tutoring.",
      date: "1 day ago",
      status: "pending",
    },
  ],
  accepted: [
    {
      id: 3,
      type: "mutual",
      user: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 4.8,
      },
      skillOffered: "Python",
      skillWanted: "React",
      message: "Looking forward to our skill exchange!",
      date: "1 week ago",
      status: "accepted",
      nextSession: "Tomorrow at 3 PM",
    },
  ],
  completed: [
    {
      id: 4,
      type: "mutual",
      user: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 4.6,
      },
      skillOffered: "Spanish",
      skillWanted: "Photography",
      message: "Great exchange! Learned a lot about photography techniques.",
      date: "2 weeks ago",
      status: "completed",
      rating: 5,
      feedback: "Emily was an excellent teacher! Very patient and knowledgeable.",
    },
  ],
}

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const { toast } = useToast()

  const handleAcceptRequest = (requestId: number, userName: string) => {
    toast({
      title: "Request accepted!",
      description: `You've accepted the swap request from ${userName}`,
    })
  }

  const handleRejectRequest = (requestId: number, userName: string) => {
    toast({
      title: "Request rejected",
      description: `You've rejected the swap request from ${userName}`,
      variant: "destructive",
    })
  }

  const handleCancelRequest = (requestId: number, userName: string) => {
    toast({
      title: "Request cancelled",
      description: `Your request to ${userName} has been cancelled`,
      variant: "destructive",
    })
  }

  const RequestCard = ({ request }: { request: any }) => (
    <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={request.user.avatar || "/placeholder.svg"} alt={request.user.name} />
              <AvatarFallback>
                {request.user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white">{request.user.name}</h3>
              <div className="flex items-center text-sm text-gray-400">
                <Star className="h-3 w-3 text-yellow-400 mr-1" />
                {request.user.rating}
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge
              variant={request.type === "sent" ? "outline" : request.type === "received" ? "secondary" : "default"}
              className={
                request.type === "sent"
                  ? "border-blue-500 text-blue-400"
                  : request.type === "received"
                    ? "bg-green-900/30 text-green-400 border-green-700"
                    : "bg-purple-900/30 text-purple-400 border-purple-700"
              }
            >
              {request.type === "sent" ? "Sent" : request.type === "received" ? "Received" : "Mutual"}
            </Badge>
            <p className="text-xs text-gray-500 mt-1">{request.date}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Badge variant="secondary" className="bg-purple-900/30 text-purple-300 border-purple-700 mr-2">
                {request.skillOffered}
              </Badge>
              <span className="text-gray-400 mx-2">↔</span>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                {request.skillWanted}
              </Badge>
            </div>
          </div>
          <p className="text-gray-300 text-sm">{request.message}</p>
        </div>

        {request.status === "accepted" && request.nextSession && (
          <div className="mb-4 p-3 bg-green-900/20 border border-green-800 rounded-lg">
            <div className="flex items-center text-green-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">Next session: {request.nextSession}</span>
            </div>
          </div>
        )}

        {request.status === "completed" && request.rating && (
          <div className="mb-4 p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-400 mr-2">Your rating:</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < request.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                  />
                ))}
              </div>
            </div>
            {request.feedback && <p className="text-sm text-gray-300">"{request.feedback}"</p>}
          </div>
        )}

        <div className="flex gap-2">
          {request.status === "pending" && request.type === "received" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 flex-1"
                onClick={() => handleAcceptRequest(request.id, request.user.name)}
              >
                <Check className="h-4 w-4 mr-1" />
                Accept
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="flex-1"
                onClick={() => handleRejectRequest(request.id, request.user.name)}
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </>
          )}

          {request.status === "pending" && request.type === "sent" && (
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              onClick={() => handleCancelRequest(request.id, request.user.name)}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel Request
            </Button>
          )}

          {request.status === "accepted" && (
            <>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 flex-1">
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Schedule
              </Button>
            </>
          )}

          {request.status === "completed" && (
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Contact Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Swap Requests</h1>
          <p className="text-gray-400">Manage your skill exchange requests and connections</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900 border-gray-800">
            <TabsTrigger value="pending" className="data-[state=active]:bg-purple-600 relative">
              <Clock className="h-4 w-4 mr-2" />
              Pending
              {swapRequests.pending.length > 0 && (
                <Badge className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5">
                  {swapRequests.pending.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="accepted" className="data-[state=active]:bg-purple-600">
              <Check className="h-4 w-4 mr-2" />
              Active
              {swapRequests.accepted.length > 0 && (
                <Badge className="ml-2 bg-green-600 text-white text-xs px-1.5 py-0.5">
                  {swapRequests.accepted.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-purple-600">
              <Star className="h-4 w-4 mr-2" />
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {swapRequests.pending.length > 0 ? (
              swapRequests.pending.map((request) => <RequestCard key={request.id} request={request} />)
            ) : (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-12 text-center">
                  <Clock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Pending Requests</h3>
                  <p className="text-gray-400 mb-4">You don't have any pending swap requests at the moment.</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">Explore Skills</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {swapRequests.accepted.length > 0 ? (
              swapRequests.accepted.map((request) => <RequestCard key={request.id} request={request} />)
            ) : (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-12 text-center">
                  <Check className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Active Swaps</h3>
                  <p className="text-gray-400 mb-4">You don't have any active skill swaps right now.</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">Find Learning Partners</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {swapRequests.completed.length > 0 ? (
              swapRequests.completed.map((request) => <RequestCard key={request.id} request={request} />)
            ) : (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-12 text-center">
                  <Star className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Completed Swaps</h3>
                  <p className="text-gray-400 mb-4">Complete your first skill swap to see it here!</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">Start Learning</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}

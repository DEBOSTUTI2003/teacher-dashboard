"use client"

import { useState, useEffect } from "react"
import { Camera, Download, Eye, Clock, Users, FileText, Upload, Mic } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for real-time attention graph
const generateInitialData = () => {
  const data = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 30000) // 30 seconds intervals
    data.push({
      time: time.toLocaleTimeString([], { hour12: false, minute: "2-digit", second: "2-digit" }),
      attention: Math.floor(Math.random() * 30) + 60, // Random between 60-90
    })
  }
  return data
}

// Sample student notes data
const studentNotes = [
  {
    id: 1,
    studentName: "Emma Johnson",
    imageUrl: "/placeholder.svg?height=200&width=300&query=handwritten math notes with equations",
    timestamp: "10:30 AM",
    subject: "Quadratic Equations",
  },
  {
    id: 2,
    studentName: "Michael Chen",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math notebook with graphs and formulas",
    timestamp: "10:25 AM",
    subject: "Function Graphs",
  },
  {
    id: 3,
    studentName: "Sarah Williams",
    imageUrl: "/placeholder.svg?height=200&width=300&query=detailed math notes with diagrams",
    timestamp: "10:28 AM",
    subject: "Algebraic Solutions",
  },
  {
    id: 4,
    studentName: "David Rodriguez",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math homework with calculations",
    timestamp: "10:20 AM",
    subject: "Problem Solving",
  },
  {
    id: 5,
    studentName: "Lisa Thompson",
    imageUrl: "/placeholder.svg?height=200&width=300&query=organized math notes with highlights",
    timestamp: "10:32 AM",
    subject: "Theorem Proofs",
  },
  {
    id: 6,
    studentName: "James Wilson",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math study notes with examples",
    timestamp: "10:27 AM",
    subject: "Practice Problems",
  },
]

// Sample student submissions data
const studentSubmissions = [
  {
    id: 1,
    studentName: "Emma Johnson",
    imageUrl: "/placeholder.svg?height=200&width=300&query=completed math assignment worksheet",
    timestamp: "10:45 AM",
    assignment: "Assignment 3",
    status: "submitted",
  },
  {
    id: 2,
    studentName: "Michael Chen",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math homework solutions on paper",
    timestamp: "10:40 AM",
    assignment: "Homework 5",
    status: "submitted",
  },
  {
    id: 3,
    studentName: "Sarah Williams",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math test paper with answers",
    timestamp: "10:50 AM",
    assignment: "Quiz 2",
    status: "submitted",
  },
  {
    id: 4,
    studentName: "David Rodriguez",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math project work on graph paper",
    timestamp: "10:35 AM",
    assignment: "Project Work",
    status: "submitted",
  },
  {
    id: 5,
    studentName: "Lisa Thompson",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math exercise book with solutions",
    timestamp: "10:48 AM",
    assignment: "Exercise 4",
    status: "submitted",
  },
  {
    id: 6,
    studentName: "Alex Kumar",
    imageUrl: "/placeholder.svg?height=200&width=300&query=math assignment in progress",
    timestamp: "10:30 AM",
    assignment: "Assignment 3",
    status: "in_progress",
  },
]

export default function TeacherLiveScreen() {
  const [attentionData, setAttentionData] = useState(generateInitialData())
  const [currentAttention, setCurrentAttention] = useState(75)
  const [isRecording, setIsRecording] = useState(false)

  const analyticsData = [
    {
      label: "Attentive Students",
      percentage: 63,
      count: 8,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      label: "Non-Attentive Students",
      percentage: 38,
      count: 4,
      color: "bg-pink-500",
      textColor: "text-pink-600",
    },
    {
      label: "Camera Off Students",
      percentage: 22,
      count: 2,
      color: "bg-orange-500",
      textColor: "text-orange-600",
    },
    {
      label: "Not in Camera Students",
      percentage: 14,
      count: 1,
      color: "bg-gray-600",
      textColor: "text-gray-600",
    },
  ]

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const newAttention = Math.floor(Math.random() * 30) + 60 // Random between 60-90

      setCurrentAttention(newAttention)
      setAttentionData((prevData) => {
        const newData = [...prevData.slice(1)] // Remove first element
        newData.push({
          time: now.toLocaleTimeString([], { hour12: false, minute: "2-digit", second: "2-digit" }),
          attention: newAttention,
        })
        return newData
      })
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Calculate max value for graph scaling
  const maxAttention = Math.max(...attentionData.map((d) => d.attention))
  const minAttention = Math.min(...attentionData.map((d) => d.attention))
  const range = maxAttention - minAttention || 1

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-9xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-orange-50 border-orange-100">
            <CardContent className="p-6">
              <div>
                <p className="text-lg font-bold text-gray-600">Active Students</p>
                <p className="text-4xl font-bold text-orange-500">18</p>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-orange-400">24</p>
              </div>
              <div className="absolute bottom-0 right-0 w-40 h-40">
                <Image src="/images/cartoon.svg" alt="Students" width={160} height={160} className="object-contain" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-100">
            <CardContent className="p-6">
              <div>
                <p className="text-lg font-bold text-gray-600">Average Attentiveness</p>
                <p className="text-4xl font-bold text-purple-500">78%</p>
                <p className="text-sm text-gray-600">Class Average</p>
                <p className="text-2xl font-bold text-purple-400">63%</p>
              </div>
              <div className="absolute bottom-0 right-0 w-40 h-40">
                <Image src="/images/leaderboard.svg" alt="Attentiveness" width={160} height={160} className="object-contain" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-6">
              <div>
                <p className="text-lg font-bold text-gray-600">High Performers</p>
                <p className="text-4xl font-bold text-green-500">3</p>
                <p className="text-sm text-gray-600">Active in class</p>
                <p className="text-2xl font-bold text-green-400">90%</p>
              </div>
              <div className="absolute bottom-0 right-0 w-40 h-40">
                <Image src="/images/target.svg" alt="High Performers" width={160} height={160} className="object-contain" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-100">
            <CardContent className="p-6">
              <div>
                <p className="text-lg font-bold text-gray-600">Needs Attention</p>
                <p className="text-4xl font-bold text-red-500">7</p>
                <p className="text-sm text-gray-600">Score</p>
                <p className="text-2xl font-bold text-red-400">44%</p>
              </div>
              <div className="absolute bottom-0 right-0 w-40 h-40">
                <Image src="/images/warning.svg" alt="Warning" width={160} height={160} className="object-contain" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Analytics Overview</CardTitle>
              <p className="text-sm text-gray-500">Real-time student engagement and camera status distribution</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {analyticsData.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{item.percentage}%</span>
                      <span className="text-sm text-gray-500">({item.count})</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Attentiveness Overview</CardTitle>
              <p className="text-sm text-gray-500">Analytics and Performance Metrics</p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {/* Add the line chart here using Recharts or your preferred charting library */}
                {/* The chart should show multiple lines for different metrics over time */}
                {/* Use the colors from the design: green, red, orange, and gray lines */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Student Notes and Submissions */}
        <div className="space-y-6">
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Student Notes ({studentNotes.length})
              </TabsTrigger>
              <TabsTrigger value="submissions" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Submissions ({studentSubmissions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="mt-6">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Student Notes</CardTitle>
                  <CardDescription>Real-time notes shared by students during the class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studentNotes.map((note) => (
                      <div key={note.id} className="space-y-3">
                        <div className="relative group">
                          <img
                            src={note.imageUrl || "/placeholder.svg"}
                            alt={`Notes by ${note.studentName}`}
                            className="w-full h-48 object-cover rounded-lg border shadow-sm group-hover:shadow-md transition-shadow"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="text-xs">
                              {note.timestamp}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium text-gray-900">{note.studentName}</h4>
                          <p className="text-sm text-gray-600">{note.subject}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submissions" className="mt-6">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Assignment Submissions</CardTitle>
                  <CardDescription>Student assignment and homework submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studentSubmissions.map((submission) => (
                      <div key={submission.id} className="space-y-3">
                        <div className="relative group">
                          <img
                            src={submission.imageUrl || "/placeholder.svg"}
                            alt={`Submission by ${submission.studentName}`}
                            className="w-full h-48 object-cover rounded-lg border shadow-sm group-hover:shadow-md transition-shadow"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge
                              variant={submission.status === "submitted" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {submission.status === "submitted" ? "Submitted" : "In Progress"}
                            </Badge>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge variant="outline" className="text-xs bg-white">
                              {submission.timestamp}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium text-gray-900">{submission.studentName}</h4>
                          <p className="text-sm text-gray-600">{submission.assignment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
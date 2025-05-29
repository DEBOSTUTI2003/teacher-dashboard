import { ChevronLeft, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const studentData = [
  {
    name: "Manish",
    score: 98,
    trend: "up",
    status: "Attentive",
    solutions: "4/9",
    notes: "5/8",
  },
  {
    name: "Ravi",
    score: 21,
    trend: "down",
    status: "Distractive",
    solutions: "4/9",
    notes: "5/8",
  },
  // ... rest of the student data
]

export default function StudentDashboardSummary() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white w-full flex items-center gap-4 mb-8 py-4 px-10">
          <Button variant="ghost" size="sm" className="p-0">
            <ChevronLeft className="h-5 w-5" />
            <span className="ml-1 text-lg">CSAT 55 : Permutation and Combination (Part 03), Probability</span>
          </Button>
        </div>

        <div className="px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Live Classroom */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle>Live Classroom</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  autoPlay
                  muted
                  controls={false}
                  className="w-full h-full object-cover"
                  poster="/placeholder.svg?height=300&width=400&query=video loading"
                >
                  <source src="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8" type="application/x-mpegURL" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-4 left-4 flex items-center gap-4 text-white">
                  <div className="flex items-center gap-2">
                    <span>Viewers : 12</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Duration : 18:45 Mins</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Class Attention */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle>Real-time Class Attention</CardTitle>
              <p className="text-sm text-gray-500">Live attention percentage tracking</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg flex items-center gap-4">
                  <span className="text-4xl font-bold text-green-600">9</span>
                  <div>
                    <p className="text-sm text-gray-600">Attentive Students</p>
                    <Image src="/images/target.svg" alt="Target" width={48} height={48} className="mt-2" />
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg flex items-center gap-4">
                  <span className="text-4xl font-bold text-red-600">4</span>
                  <div>
                    <p className="text-sm text-gray-600">Non-Attentive Students</p>
                    <Image src="/images/warning.svg" alt="Warning" width={48} height={48} className="mt-2" />
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg flex items-center gap-4">
                  <span className="text-4xl font-bold text-orange-600">3</span>
                  <div>
                    <p className="text-sm text-gray-600">Camera Off Students</p>
                    <Image src="/images/cartoon.svg" alt="Camera" width={48} height={48} className="mt-2" />
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-4">
                  <span className="text-4xl font-bold text-gray-600">2</span>
                  <div>
                    <p className="text-sm text-gray-600">Not in Camera Students</p>
                    <Image src="/images/leaderboard.svg" alt="Not in camera" width={48} height={48} className="mt-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Submissions */}
        <div className="px-10 mb-8">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Student Submission</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Solutions</Button>
                <Button variant="outline" size="sm">Notes</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden border">
                      <Image
                        src="/placeholder.svg?height=300&width=400&query=student submission"
                        alt="Student submission"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">Anirush Sharma</h4>
                      <p className="text-sm text-orange-500">Notes</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
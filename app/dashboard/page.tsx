'use client';

import { BookOpen, ChevronRight, Clock, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const readingData = [
  { name: 'Mon', pages: 20 },
  { name: 'Tue', pages: 35 },
  { name: 'Wed', pages: 15 },
  { name: 'Thu', pages: 45 },
  { name: 'Fri', pages: 30 },
  { name: 'Sat', pages: 25 },
  { name: 'Sun', pages: 40 },
];

const comprehensionData = [
  { name: 'Week 1', score: 75 },
  { name: 'Week 2', score: 82 },
  { name: 'Week 3', score: 78 },
  { name: 'Week 4', score: 85 },
  { name: 'Week 5', score: 88 },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books Read</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reading Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">
              Keep it up!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Comprehension</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reading Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Reading Progress</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={readingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pages" fill="var(--primary)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Comprehension Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={comprehensionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="var(--primary)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">📚</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Completed Chapter {i} of "The Great Gatsby"
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2 hours ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Reading Goals</CardTitle>
            <CardDescription>Your current reading goals and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Monthly Reading Goal</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Comprehension Target</span>
                  <span className="text-sm text-muted-foreground">90%</span>
                </div>
                <Progress value={85} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Sample data
const recommendedBooks = [
  {
    id: 1,
    title: "The Adventure Begins",
    author: "J.K. Rowling",
    level: "7-8",
    coverUrl: "/placeholder.svg?height=400&width=300&text=The+Adventure+Begins",
    color: "bg-blue-100",
  },
  {
    id: 2,
    title: "Mystery at Midnight",
    author: "R.L. Stine",
    level: "6-7",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Mystery+at+Midnight",
    color: "bg-purple-100",
  },
  {
    id: 3,
    title: "Science Explorers",
    author: "Neil deGrasse Tyson",
    level: "7-8",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Science+Explorers",
    color: "bg-green-100",
  },
]

const inProgressBooks = [
  {
    id: 4,
    title: "The Hidden Key",
    author: "Dan Brown",
    progress: 45,
    coverUrl: "/placeholder.svg?height=400&width=300&text=The+Hidden+Key",
    color: "bg-amber-100",
  },
  {
    id: 5,
    title: "Ocean Adventures",
    author: "Jacques Cousteau",
    progress: 72,
    coverUrl: "/placeholder.svg?height=400&width=300&text=Ocean+Adventures",
    color: "bg-cyan-100",
  },
]

const completedBooks = [
  {
    id: 6,
    title: "The Last Chapter",
    author: "Agatha Christie",
    completedDate: "Mar 15, 2023",
    coverUrl: "/placeholder.svg?height=400&width=300&text=The+Last+Chapter",
    color: "bg-red-100",
  },
  {
    id: 7,
    title: "Stars Above",
    author: "Carl Sagan",
    completedDate: "Feb 28, 2023",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Stars+Above",
    color: "bg-indigo-100",
  },
]


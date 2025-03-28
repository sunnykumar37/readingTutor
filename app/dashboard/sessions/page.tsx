import { Calendar, Clock, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SessionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reading Sessions</h1>
        <p className="text-muted-foreground">Track your reading progress and view your session history.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reading Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.5 hrs</div>
            <p className="text-xs text-muted-foreground">+3.2 hrs this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reading Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 days</div>
            <p className="text-xs text-muted-foreground">Your longest streak: 21 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reading Speed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">240 wpm</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList>
          <TabsTrigger value="recent">Recent Sessions</TabsTrigger>
          <TabsTrigger value="stats">Reading Stats</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="mt-6">
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <Card key={session.id} className="group hover:shadow-md transition-all duration-300">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-9 ${session.color} rounded overflow-hidden shadow`}>
                        <img
                          src={session.coverUrl || "/placeholder.svg"}
                          alt={session.bookTitle}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg">{session.bookTitle}</CardTitle>
                    </div>
                    <CardDescription>{session.date}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-2xl font-bold">{session.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pages Read</p>
                      <p className="text-2xl font-bold">{session.pagesRead}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Comprehension</p>
                      <div className="flex items-center gap-2">
                        <Progress value={session.comprehension} className="h-2 flex-1 bg-muted/60" />
                        <span className="text-sm font-medium">{session.comprehension}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="transition-all duration-200 hover:bg-primary/10 group-hover:bg-primary/5"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reading Statistics</CardTitle>
              <CardDescription>Your reading patterns and progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                <p className="text-muted-foreground">Reading statistics visualization would appear here</p>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Average Reading Time</h3>
                  <p className="text-2xl font-bold">45 min/day</p>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Vocabulary Growth</h3>
                  <p className="text-2xl font-bold">+124 words</p>
                  <p className="text-xs text-muted-foreground">New words learned this month</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Comprehension Rate</h3>
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-xs text-muted-foreground">+8% from initial assessment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="achievements" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`${achievement.unlocked ? "" : "opacity-70"} border ${achievement.color} transition-all duration-300 hover:shadow-md ${achievement.unlocked ? "hover:scale-102" : "hover:opacity-80"}`}
              >
                <CardHeader className="p-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    {achievement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.unlocked ? (
                    <p className="mt-2 text-sm font-medium text-green-500 flex items-center gap-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                      Unlocked on {achievement.unlockedDate}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm font-medium">{achievement.progress}% complete</p>
                  )}
                  {!achievement.unlocked && <Progress value={achievement.progress} className="mt-2 h-2 bg-muted/60" />}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const recentSessions = [
  {
    id: 1,
    bookTitle: "The Adventure Begins",
    date: "Today, 2:30 PM",
    duration: "45 min",
    pagesRead: 32,
    comprehension: 92,
    coverUrl: "/placeholder.svg?height=100&width=75&text=The+Adventure+Begins",
    color: "bg-blue-100",
  },
  {
    id: 2,
    bookTitle: "Mystery at Midnight",
    date: "Yesterday, 7:15 PM",
    duration: "30 min",
    pagesRead: 24,
    comprehension: 88,
    coverUrl: "/placeholder.svg?height=100&width=75&text=Mystery+at+Midnight",
    color: "bg-purple-100",
  },
  {
    id: 3,
    bookTitle: "Science Explorers",
    date: "Mar 25, 2023",
    duration: "1 hr 15 min",
    pagesRead: 45,
    comprehension: 95,
    coverUrl: "/placeholder.svg?height=100&width=75&text=Science+Explorers",
    color: "bg-green-100",
  },
]

const achievements = [
  {
    id: 1,
    title: "Bookworm",
    icon: "📚",
    description: "Read for 10 days in a row",
    unlocked: true,
    unlockedDate: "Mar 20, 2023",
    progress: 100,
    color: "bg-green-50 border-green-200",
  },
  {
    id: 2,
    title: "Speed Reader",
    icon: "⚡",
    description: "Read at a pace of 300 words per minute",
    unlocked: false,
    progress: 80,
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    id: 3,
    title: "Vocabulary Master",
    icon: "🔤",
    description: "Learn 200 new words",
    unlocked: false,
    progress: 65,
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: 4,
    title: "Genre Explorer",
    icon: "🧭",
    description: "Read books from 5 different genres",
    unlocked: true,
    unlockedDate: "Feb 15, 2023",
    progress: 100,
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: 5,
    title: "Deep Thinker",
    icon: "🧠",
    description: "Answer 50 comprehension questions correctly",
    unlocked: false,
    progress: 72,
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    id: 6,
    title: "Literary Journey",
    icon: "🌍",
    description: "Complete 10 books",
    unlocked: false,
    progress: 70,
    color: "bg-cyan-50 border-cyan-200",
  },
]


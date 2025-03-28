import Link from "next/link"
import { BookOpen, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LibraryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Library</h1>
        <p className="text-muted-foreground">Browse your personal library and discover new books.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search books..." className="w-full bg-background pl-8 shadow-none" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="h-9 w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fiction">Fiction</SelectItem>
              <SelectItem value="non-fiction">Non-Fiction</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="history">History</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="recent">
            <SelectTrigger className="h-9 w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Added</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="level">Reading Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Books</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recommended" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="favorites" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {favoriteBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BookCard({ book }: { book: any }) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
      <div className={`aspect-[3/4] w-full ${book.color} relative overflow-hidden`}>
        <img
          src={book.coverUrl || "/placeholder.svg"}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white font-medium">{book.title}</p>
          <p className="text-white/80 text-sm">{book.genre}</p>
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-lg">{book.title}</CardTitle>
        <CardDescription className="line-clamp-1">{book.author}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <BookOpen className="mr-1 h-4 w-4" />
          <span>Level: {book.level}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button asChild className="w-full transition-colors duration-200 hover:bg-primary/90">
          <Link href={`/dashboard/reader/${book.id}`}>Read Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// Sample data
const allBooks = [
  {
    id: 1,
    title: "The Adventure Begins",
    author: "J.K. Rowling",
    level: "7-8",
    coverUrl: "/placeholder.svg?height=400&width=300&text=The+Adventure+Begins",
    color: "bg-blue-100",
    genre: "Fantasy",
  },
  {
    id: 2,
    title: "Mystery at Midnight",
    author: "R.L. Stine",
    level: "6-7",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Mystery+at+Midnight",
    color: "bg-purple-100",
    genre: "Mystery",
  },
  {
    id: 3,
    title: "Science Explorers",
    author: "Neil deGrasse Tyson",
    level: "7-8",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Science+Explorers",
    color: "bg-green-100",
    genre: "Science",
  },
  {
    id: 4,
    title: "The Hidden Key",
    author: "Dan Brown",
    level: "8-9",
    coverUrl: "/placeholder.svg?height=400&width=300&text=The+Hidden+Key",
    color: "bg-amber-100",
    genre: "Thriller",
  },
  {
    id: 5,
    title: "Ocean Adventures",
    author: "Jacques Cousteau",
    level: "6-7",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Ocean+Adventures",
    color: "bg-cyan-100",
    genre: "Adventure",
  },
  {
    id: 6,
    title: "The Last Chapter",
    author: "Agatha Christie",
    level: "7-8",
    coverUrl: "/placeholder.svg?height=400&width=300&text=The+Last+Chapter",
    color: "bg-red-100",
    genre: "Mystery",
  },
  {
    id: 7,
    title: "Stars Above",
    author: "Carl Sagan",
    level: "8-9",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Stars+Above",
    color: "bg-indigo-100",
    genre: "Science",
  },
  {
    id: 8,
    title: "Historical Journeys",
    author: "Doris Kearns Goodwin",
    level: "7-8",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Historical+Journeys",
    color: "bg-orange-100",
    genre: "History",
  },
]

const recommendedBooks = [
  {
    id: 1,
    title: "The Adventure Begins",
    author: "J.K. Rowling",
    level: "7-8",
    coverUrl: "/placeholder.svg?height=400&width=300&text=The+Adventure+Begins",
    color: "bg-blue-100",
    genre: "Fantasy",
  },
  {
    id: 3,
    title: "Science Explorers",
    author: "Neil deGrasse Tyson",
    level: "7-8",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Science+Explorers",
    color: "bg-green-100",
    genre: "Science",
  },
  {
    id: 8,
    title: "Historical Journeys",
    author: "Doris Kearns Goodwin",
    level: "7-8",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Historical+Journeys",
    color: "bg-orange-100",
    genre: "History",
  },
  {
    id: 9,
    title: "Mathematical Wonders",
    author: "Ian Stewart",
    level: "7-8",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Mathematical+Wonders",
    color: "bg-yellow-100",
    genre: "Mathematics",
  },
]

const favoriteBooks = [
  {
    id: 2,
    title: "Mystery at Midnight",
    author: "R.L. Stine",
    level: "6-7",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Mystery+at+Midnight",
    color: "bg-purple-100",
    genre: "Mystery",
  },
  {
    id: 5,
    title: "Ocean Adventures",
    author: "Jacques Cousteau",
    level: "6-7",
    coverUrl: "/placeholder.svg?height=400&width=300&text=Ocean+Adventures",
    color: "bg-cyan-100",
    genre: "Adventure",
  },
]


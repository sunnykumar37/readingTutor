'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Star, Clock, BookOpen } from 'lucide-react';

// Mock data for books
const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: '/placeholder.jpg',
    progress: 75,
    status: 'in-progress',
    level: 'Advanced',
    lastRead: '2024-03-28',
    rating: 4.5,
    timeSpent: '2h 30m',
    genre: 'Classic Literature',
    description: 'A story of decadence and excess, Gatsby explores the darker aspects of the Jazz Age.'
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    coverUrl: '/placeholder.jpg',
    progress: 100,
    status: 'completed',
    level: 'Advanced',
    lastRead: '2024-03-25',
    rating: 5,
    timeSpent: '4h 15m',
    genre: 'Science Fiction',
    description: 'A dystopian masterpiece that explores themes of surveillance, control, and truth.'
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: '/placeholder.jpg',
    progress: 30,
    status: 'in-progress',
    level: 'Intermediate',
    lastRead: '2024-03-27',
    rating: 4.8,
    timeSpent: '1h 45m',
    genre: 'Classic Literature',
    description: 'A powerful story about racial injustice and the loss of innocence in the American South.'
  },
  {
    id: 4,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverUrl: '/placeholder.jpg',
    progress: 0,
    status: 'not-started',
    level: 'Intermediate',
    lastRead: null,
    rating: 4.7,
    timeSpent: '0m',
    genre: 'Fantasy',
    description: 'Follow Bilbo Baggins on an epic adventure through Middle-earth.'
  },
  {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: '/placeholder.jpg',
    progress: 60,
    status: 'in-progress',
    level: 'Advanced',
    lastRead: '2024-03-26',
    rating: 4.6,
    timeSpent: '3h 20m',
    genre: 'Classic Literature',
    description: 'A timeless romance that explores social class and marriage in Georgian-era England.'
  },
  {
    id: 6,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverUrl: '/placeholder.jpg',
    progress: 100,
    status: 'completed',
    level: 'Advanced',
    lastRead: '2024-03-24',
    rating: 4.3,
    timeSpent: '3h 45m',
    genre: 'Classic Literature',
    description: 'A classic coming-of-age story that captures the essence of teenage alienation.'
  }
];

export default function ReadingListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('lastRead');

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'lastRead') {
      if (!a.lastRead) return 1;
      if (!b.lastRead) return -1;
      return new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime();
    }
    return b.progress - a.progress;
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reading List</h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-[300px]">
            <Input
              type="search"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
            <BookOpen className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastRead">Last Read</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Books</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedBooks.map((book) => (
              <Card key={book.id} className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-12 w-9 rounded bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{book.title}</CardTitle>
                        <CardDescription>{book.author}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{book.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{book.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{book.progress}%</span>
                    </div>
                    <Progress value={book.progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{book.timeSpent}</span>
                      </div>
                      <span>{book.genre}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105">
                    {book.status === 'completed' ? 'Read Again' : 'Continue Reading'}
                  </Button>
                  <Button size="sm" className="transition-all duration-300 hover:scale-105">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedBooks
              .filter(book => book.status === 'in-progress')
              .map((book) => (
                <Card key={book.id} className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-12 w-9 rounded bg-primary/10 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{book.title}</CardTitle>
                          <CardDescription>{book.author}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{book.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{book.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{book.progress}%</span>
                      </div>
                      <Progress value={book.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{book.timeSpent}</span>
                        </div>
                        <span>{book.genre}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105">
                      Continue Reading
                    </Button>
                    <Button size="sm" className="transition-all duration-300 hover:scale-105">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedBooks
              .filter(book => book.status === 'completed')
              .map((book) => (
                <Card key={book.id} className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-12 w-9 rounded bg-primary/10 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{book.title}</CardTitle>
                          <CardDescription>{book.author}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{book.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{book.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{book.progress}%</span>
                      </div>
                      <Progress value={book.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{book.timeSpent}</span>
                        </div>
                        <span>{book.genre}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105">
                      Read Again
                    </Button>
                    <Button size="sm" className="transition-all duration-300 hover:scale-105">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';

// Mock data for books
const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: '/books/gatsby.jpg',
    progress: 75,
    status: 'in-progress',
    level: 'Advanced',
    lastRead: '2024-03-28',
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    coverUrl: '/books/1984.jpg',
    progress: 100,
    status: 'completed',
    level: 'Advanced',
    lastRead: '2024-03-25',
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: '/books/mockingbird.jpg',
    progress: 30,
    status: 'in-progress',
    level: 'Intermediate',
    lastRead: '2024-03-27',
  },
  // Add more books as needed
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
      return new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime();
    }
    if (sortBy === 'progress') {
      return b.progress - a.progress;
    }
    return 0;
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reading List</h2>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[200px]"
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastRead">Last Read</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="title">Title</SelectItem>
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
              <Card key={book.id} className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
                <div className="aspect-[3/4] w-full bg-muted relative overflow-hidden">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-medium">{book.title}</p>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription>{book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{book.progress}%</span>
                    </div>
                    <Progress value={book.progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Level: {book.level}</span>
                      <span>Last read: {new Date(book.lastRead).toLocaleDateString()}</span>
                    </div>
                    <Button className="w-full gap-1 transition-all duration-200 hover:gap-2">
                      {book.progress === 100 ? 'Read Again' : 'Continue Reading'}
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedBooks
              .filter(book => book.status === 'in-progress')
              .map((book) => (
                <Card key={book.id} className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
                  <div className="aspect-[3/4] w-full bg-muted relative overflow-hidden">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white font-medium">{book.title}</p>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{book.title}</CardTitle>
                    <CardDescription>{book.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{book.progress}%</span>
                      </div>
                      <Progress value={book.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Level: {book.level}</span>
                        <span>Last read: {new Date(book.lastRead).toLocaleDateString()}</span>
                      </div>
                      <Button className="w-full gap-1 transition-all duration-200 hover:gap-2">
                        {book.progress === 100 ? 'Read Again' : 'Continue Reading'}
                        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedBooks
              .filter(book => book.status === 'completed')
              .map((book) => (
                <Card key={book.id} className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
                  <div className="aspect-[3/4] w-full bg-muted relative overflow-hidden">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white font-medium">{book.title}</p>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{book.title}</CardTitle>
                    <CardDescription>{book.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{book.progress}%</span>
                      </div>
                      <Progress value={book.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Level: {book.level}</span>
                        <span>Last read: {new Date(book.lastRead).toLocaleDateString()}</span>
                      </div>
                      <Button className="w-full gap-1 transition-all duration-200 hover:gap-2">
                        {book.progress === 100 ? 'Read Again' : 'Continue Reading'}
                        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
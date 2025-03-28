"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Maximize2, Minimize2, Settings, Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ReaderPage({ params }: { params: { id: string } }) {
  const [fontSize, setFontSize] = useState(16)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  // This would normally be fetched based on the ID
  const book = {
    id: params.id,
    title: "The Adventure Begins",
    author: "J.K. Rowling",
    totalPages: 24,
    coverUrl: "/placeholder.svg?height=400&width=300&text=The+Adventure+Begins",
    color: "bg-blue-100",
    content: `
    <h1>Chapter 1: The Beginning</h1>
    <p>It was a bright, sunny morning when Alex woke up. Today was going to be different, they could feel it. The air seemed charged with possibility, and a gentle breeze carried the scent of adventure through the open window.</p>
    <p>Alex had been waiting for this day for months. The letter had arrived exactly one week ago, sealed with red wax and addressed in flowing script. It contained an invitation—no, more than that—a summons to a place they had only dreamed about.</p>
    <p>"The Academy welcomes those with curious minds and brave hearts," the letter had said. "Your journey begins now."</p>
    <p>As Alex packed the last of their belongings, they couldn't help but wonder what challenges awaited. Would there be tests of knowledge? Feats of courage? Or perhaps something entirely unexpected?</p>
    <p>The clock on the wall chimed nine times. It was time to go. With one last look at the room that had been their sanctuary for so many years, Alex picked up their bag and stepped out into the unknown.</p>
    <p>The path to the Academy was not a straight one. It wound through dense forests and across babbling brooks. At times, it seemed to disappear altogether, only to reappear when Alex least expected it.</p>
    <p>Along the way, they encountered others who had received similar letters. There was Maya, whose quick wit and quicker reflexes had saved her from many scrapes. Then there was Eliot, quiet and thoughtful, with an uncanny ability to solve puzzles that left others baffled.</p>
    <p>Together, the three travelers shared stories and supplies, forming a bond that grew stronger with each step of their journey.</p>
    <p>As the sun began to set on their third day of travel, they crested a hill and gasped in unison. There, nestled in a valley and bathed in the golden light of dusk, stood the Academy.</p>
    <p>Its towers reached toward the sky like fingers stretching to touch the clouds. Windows glinted like jewels, and the massive wooden doors stood open in welcome.</p>
    <p>"We made it," whispered Maya, her voice filled with awe.</p>
    <p>"This is just the beginning," replied Eliot with a smile.</p>
    <p>Alex nodded, heart racing with anticipation. "Let's go meet our destiny."</p>
    <p>And with that, the three friends descended the hill, ready to embark on the greatest adventure of their lives.</p>
  `,
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const nextPage = () => {
    if (currentPage < book.totalPages) {
      setCurrentPage(currentPage + 1)
      setProgress(((currentPage + 1) / book.totalPages) * 100)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      setProgress(((currentPage - 1) / book.totalPages) * 100)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/library">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to library</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">{book.title}</h1>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Volume2 className="h-5 w-5" />
                  <span className="sr-only">Text to speech</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Text to speech</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reader settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                  <span className="sr-only">{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-between p-4">
        <Card className="mx-auto w-full max-w-3xl flex-1 overflow-auto p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className={`h-16 w-12 ${book.color} rounded overflow-hidden shadow`}>
              <img src={book.coverUrl || "/placeholder.svg"} alt={book.title} className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </div>
          </div>
          <div
            className="prose prose-sm max-w-none dark:prose-invert sm:prose-base lg:prose-lg"
            style={{ fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: book.content }}
          />
        </Card>

        <div className="mt-4 flex w-full max-w-3xl flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {book.totalPages}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Font Size</span>
              <Slider
                value={[fontSize]}
                min={12}
                max={24}
                step={1}
                className="w-32"
                onValueChange={(value) => setFontSize(value[0])}
              />
            </div>
          </div>

          <Progress value={progress} className="h-2 w-full" />

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="transition-all duration-200 hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              disabled={currentPage === book.totalPages}
              className="transition-all duration-200 hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


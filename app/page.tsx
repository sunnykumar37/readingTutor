"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Brain, LineChartIcon as ChartLineUp, UserRound } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>ReadSmart AI</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    AI-Powered Reading Tutor That <span className="text-primary">Adapts To Your Level</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Personalized reading experiences that grow with you. Our AI analyzes your reading patterns and
                    adjusts lessons to match your unique learning pace.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1.5 group transition-all duration-300 hover:gap-3">
                      Start Your Journey
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline" className="transition-colors duration-300 hover:bg-primary/10">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last">
                <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
                <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
                <img
                  src="/placeholder.jpg"
                  width={550}
                  height={550}
                  alt="Reading with AI"
                  className="relative z-10 mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full bg-muted/40 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need to <span className="text-primary">Improve Reading</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform combines cutting-edge AI with proven reading methodologies to create a personalized
                  learning experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <Brain className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">AI Personalization</h3>
                  <p className="text-muted-foreground">
                    Our AI engine analyzes reading patterns and adjusts content difficulty in real-time to match your
                    level.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Extensive Library</h3>
                  <p className="text-muted-foreground">
                    Access thousands of books, articles, and reading materials across various genres and difficulty
                    levels.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <ChartLineUp className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Progress Tracking</h3>
                  <p className="text-muted-foreground">
                    Detailed analytics and progress reports to help you visualize your improvement over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How ReadSmart AI Works</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform uses advanced AI to create a personalized reading experience that adapts to your unique
                needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
            <div className="grid gap-6 lg:col-span-2 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Initial Assessment</h3>
                  <p className="text-muted-foreground">
                    Take a quick reading assessment to determine your current reading level and areas for improvement.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Personalized Plan</h3>
                  <p className="text-muted-foreground">
                    Our AI creates a customized reading plan with materials that match your interests and current
                    ability.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Adaptive Learning</h3>
                  <p className="text-muted-foreground">
                    As you read, our system continuously adjusts difficulty and provides real-time feedback to optimize
                    your progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full bg-muted/40 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Success Stories</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See how ReadSmart AI has helped students and educators improve reading skills.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    "My son struggled with reading for years. After just 3 months with ReadSmart AI, his reading level
                    improved by two grades. The personalized approach made all the difference."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <UserRound className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Parent</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    "As a teacher, I've seen remarkable improvements in my students' reading comprehension since
                    implementing ReadSmart AI in our classroom. The data insights are invaluable."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <UserRound className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">Michael Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Elementary Teacher</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    "I'm an adult learner who always struggled with reading. ReadSmart AI's approach is non-judgmental
                    and effective. I'm finally enjoying books for the first time in my life."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <UserRound className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">Jamie Chen</p>
                    <p className="text-sm text-muted-foreground">Adult Learner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2 font-bold">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>ReadSmart AI</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} ReadSmart AI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


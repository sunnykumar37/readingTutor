"use client"

import { useState, useEffect } from "react"
import { Save, User, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Default profile data
const defaultProfileData = {
  name: "John Doe",
  email: "john@example.com",
  bio: "",
  readingLevel: "intermediate",
  dailyGoal: "30",
  darkMode: false,
  notifications: {
    email: true,
    push: true,
    weeklyReport: true,
  },
}

export default function ProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState(defaultProfileData)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)

  // Load saved data when component mounts
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedData = localStorage.getItem("profileData")
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          setFormData(parsedData)
          setAvatar(parsedData.avatar || null)
        }
      } catch (error) {
        console.error("Error loading profile data:", error)
        toast.error("Failed to load profile data")
      } finally {
        setIsLoading(false)
      }
    }

    loadSavedData()
  }, [])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const reader = new FileReader()
        reader.onloadend = () => {
          setAvatar(reader.result as string)
          setHasChanges(true)
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error("Error uploading image:", error)
        toast.error("Failed to upload image")
      }
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Validate form data
      if (!formData.name.trim()) {
        toast.error("Name is required")
        return
      }
      if (!formData.email.trim()) {
        toast.error("Email is required")
        return
      }
      if (!formData.email.includes("@")) {
        toast.error("Please enter a valid email address")
        return
      }

      // Save to localStorage
      const dataToSave = {
        ...formData,
        avatar,
      }
      localStorage.setItem("profileData", JSON.stringify(dataToSave))
      
      setHasChanges(false)
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("Error saving profile:", error)
      toast.error("Failed to save profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setHasChanges(true)
  }

  const handleNotificationChange = (type: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }))
    setHasChanges(true)
  }

  const handleLogout = () => {
    // Clear all stored data
    localStorage.clear()
    // Redirect to login page
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
        <div className="flex items-center space-x-4">
          <Button 
            onClick={handleSave} 
            disabled={isSaving || !hasChanges}
            className="min-w-[120px] transition-all duration-200 hover:scale-105"
          >
            {isSaving ? (
              <>
                <Save className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="transition-all duration-200 hover:scale-105"
          >
            Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="reading">Reading Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and avatar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 transition-transform duration-200 hover:scale-105">
                    <AvatarImage src={avatar || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-white shadow-sm hover:bg-primary/90 cursor-pointer transition-all duration-200 hover:scale-110"
                  >
                    <Camera className="h-4 w-4" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Profile Photo</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a photo to personalize your profile
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="John Doe"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john@example.com"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input 
                  id="bio" 
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell us about yourself"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reading" className="mt-6">
          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Reading Preferences</CardTitle>
              <CardDescription>
                Customize your reading experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reading-level">Reading Level</Label>
                <Select 
                  value={formData.readingLevel} 
                  onValueChange={(value) => handleInputChange("readingLevel", value)}
                >
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Select reading level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="daily-goal">Daily Reading Goal (minutes)</Label>
                <Input
                  id="daily-goal"
                  type="number"
                  value={formData.dailyGoal}
                  onChange={(e) => handleInputChange("dailyGoal", e.target.value)}
                  min="5"
                  max="120"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable dark mode for reading
                  </p>
                </div>
                <Switch
                  checked={formData.darkMode}
                  onCheckedChange={(checked) => handleInputChange("darkMode", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.push}
                  onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reading Report</Label>
                  <p className="text-sm text-muted-foreground">
                    Get a weekly summary of your reading progress
                  </p>
                </div>
                <Switch
                  checked={formData.notifications.weeklyReport}
                  onCheckedChange={(checked) => handleNotificationChange("weeklyReport", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


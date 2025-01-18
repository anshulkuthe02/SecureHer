'use client'

import { useState } from 'react'
import { MessageSquare, Users, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const SupportBoxes = () => {
  const [isSharing, setIsSharing] = useState(false)

  const shareLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Geolocation is not supported by your browser"
      })
      return
    }

    setIsSharing(true)
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      // In a real app, this would send the location to trusted contacts
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        timestamp: new Date().toISOString()
      }

      console.log('Location shared:', location)
      toast({
        title: "Location Shared",
        description: "Your location has been shared with your trusted contacts"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get your location"
      })
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 animate-fade-in">
      <Card className="hover-scale bg-white">
        <CardContent className="p-6 flex flex-col items-center justify-center h-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full h-full flex flex-col items-center justify-center gap-4"
              >
                <MessageSquare className="h-8 w-8 text-pink-600" />
                <div className="text-center">
                  <h3 className="font-semibold mb-1">Chat Support</h3>
                  <p className="text-sm text-muted-foreground">24/7 Emergency Support</p>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className={cn("sm:max-w-[425px]", "bg-white")}>
              <DialogHeader>
                <DialogTitle>24/7 Chat Support</DialogTitle>
                <DialogDescription>
                  Connect with our support team instantly. We're here to help you 24/7.
                </DialogDescription>
              </DialogHeader>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">Support agent will connect with you shortly...</p>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card className="hover-scale bg-white">
        <CardContent className="p-6 flex flex-col items-center justify-center h-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full h-full flex flex-col items-center justify-center gap-4"
              >
                <Users className="h-8 w-8 text-pink-600" />
                <div className="text-center">
                  <h3 className="font-semibold mb-1">One-on-One Session</h3>
                  <p className="text-sm text-muted-foreground">Schedule a Counseling Session</p>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className={cn("sm:max-w-[425px]", "bg-white")}>
              <DialogHeader>
                <DialogTitle>Schedule a Session</DialogTitle>
                <DialogDescription>
                  Book a private counseling session with our experienced professionals.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm">Available time slots will be displayed here...</p>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card className="hover-scale bg-white">
        <CardContent className="p-6 flex flex-col items-center justify-center h-full">
          <Button 
            variant="ghost" 
            className="w-full h-full flex flex-col items-center justify-center gap-4"
            onClick={shareLocation}
            disabled={isSharing}
          >
            <Share2 className="h-8 w-8 text-pink-600" />
            <div className="text-center">
              <h3 className="font-semibold mb-1">Share Location</h3>
              <p className="text-sm text-muted-foreground">
                {isSharing ? 'Sharing...' : 'Share with Trusted Contacts'}
              </p>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default SupportBoxes


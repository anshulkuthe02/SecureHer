'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import SupportBoxes from './SupportBoxes'
import { toast } from "@/components/ui/use-toast"
import Footer from './Footer'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', { name, email, message })
    // Reset form fields
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
        Send Message
      </Button>
    </form>
  )
}

const SOSAlert = () => {
  const [shakeDetected, setShakeDetected] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      const { name } = JSON.parse(storedUserData)
      setUserName(name)
    }
  }, [])

  useEffect(() => {
    let lastX, lastY, lastZ
    let moveCounter = 0

    const handleMotion = (event) => {
      const { accelerationIncludingGravity } = event
      if (!accelerationIncludingGravity) return

      let { x, y, z } = accelerationIncludingGravity
      if (lastX) {
        const deltaX = Math.abs(x - lastX)
        const deltaY = Math.abs(y - lastY)
        const deltaZ = Math.abs(z - lastZ)

        if (deltaX + deltaY + deltaZ > 30) {
          moveCounter++
          if (moveCounter > 5) {
            setShakeDetected(true)
            sendSOS()
          }
        } else {
          moveCounter = 0
        }
      }

      lastX = x
      lastY = y
      lastZ = z
    }

    window.addEventListener('devicemotion', handleMotion, true)

    return () => {
      window.removeEventListener('devicemotion', handleMotion, true)
    }
  }, [])

  const sendSOS = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Your emergency contacts and local authorities have been notified of your situation.",
      variant: "destructive",
    })
    // In a real app, this would send the SOS alert
    console.log('SOS alert sent!')
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Welcome back, {userName}
      </h2>
      <div className="relative">
        {/* Multiple glowing rings */}
        <div className="absolute inset-0 rounded-full animate-ping bg-red-500 opacity-25"></div>
        <div className="absolute inset-0 rounded-full animate-pulse bg-red-500 opacity-20 blur-xl"></div>
        <div className="absolute -inset-4 rounded-full animate-pulse bg-red-500 opacity-10 blur-2xl"></div>
        <button
          onClick={sendSOS}
          className="relative w-48 h-48 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-red-500 before:animate-ping before:opacity-20"
        >
          <div className="relative flex flex-col items-center justify-center z-10">
            <AlertTriangle size={64} className="mb-2" />
            <span className="text-2xl">SOS</span>
          </div>
        </button>
      </div>
      <p className="mt-8 text-center text-gray-600">
        Shake your device or press the button above to send an SOS alert.
      </p>
      {shakeDetected && (
        <p className="mt-4 text-red-500 font-bold animate-bounce">Shake detected! SOS sent.</p>
      )}

      <SupportBoxes />

      <div className="mt-8 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-start bg-pink-100 rounded-lg p-8">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-890051976-612x612-removebg-preview-nX5oJslNjIxKV7isZ2Rq69QtS5n5zs.png"
              alt="SecureHer Logo"
              className="w-32 h-32 object-contain mb-4"
            />
            <h3 className="text-2xl font-bold text-pink-600 mb-2">SecureHer</h3>
            <p className="text-gray-700 mb-4">
              SecureHer is an innovative app that uses cutting-edge technology to ensure the safety of people at all times.
            </p>
          </div>
          <div className="md:w-1/2">
            <h4 className="text-xl font-semibold text-pink-600 mb-4">Contact Us</h4>
            <ContactForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SOSAlert


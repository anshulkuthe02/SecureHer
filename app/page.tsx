'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
    }
    localStorage.setItem('userData', JSON.stringify(userData))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-center text-pink-600">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500" />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input type="tel" id="mobile" name="mobile" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500" />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password" 
              required 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500" 
            />
            <button 
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
            </button>
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 ease-in-out">
            Register
          </button>
        </form>
        <div className="text-center">
          <Link href="/login" className="font-medium text-pink-600 hover:text-pink-500 transition duration-150 ease-in-out">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { User, Mail, Phone, LogOut, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    avatar: '/placeholder.svg'
  })
  const [isEditing, setIsEditing] = useState(false)
  const [updatedUser, setUpdatedUser] = useState(user)

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      const userData = JSON.parse(storedUserData)
      setUser(prevUser => ({
        ...prevUser,
        ...userData
      }))
    }
  }, [])

  const router = useRouter()

  const handleLogout = () => {
    // Here you would typically handle the logout logic
    // For now, we'll just redirect to the login page
    router.push('/login')
  }

  const handleEdit = () => {
    setIsEditing(true)
    setUpdatedUser(user)
  }

  const handleSave = () => {
    setIsEditing(false)
    setUser(updatedUser)
    localStorage.setItem('userData', JSON.stringify(updatedUser))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedUser(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto relative">
      <button
        onClick={handleEdit}
        className="absolute top-4 right-4 text-pink-500 hover:text-pink-600 transition-colors duration-200"
      >
        <Pencil size={20} />
      </button>
      <div className="flex flex-col items-center">
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="w-32 h-32 rounded-full mb-4 border-4 border-pink-500"
        />
        {isEditing ? (
          <Input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleChange}
            className="text-2xl font-bold text-gray-800 mb-4 text-center"
          />
        ) : (
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{user.name}</h2>
        )}
      </div>
      <div className="space-y-4">
        <div className="flex items-center">
          <Mail className="text-pink-500 mr-2" />
          {isEditing ? (
            <Input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>
        <div className="flex items-center">
          <Phone className="text-pink-500 mr-2" />
          {isEditing ? (
            <Input
              type="tel"
              name="mobile"
              value={updatedUser.mobile}
              onChange={handleChange}
            />
          ) : (
            <span>{user.mobile}</span>
          )}
        </div>
      </div>
      {isEditing && (
        <Button
          onClick={handleSave}
          className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white"
        >
          Save Changes
        </Button>
      )}
      <button
        onClick={handleLogout}
        className="mt-8 w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 ease-in-out"
      >
        <LogOut className="mr-2" size={18} />
        Logout
      </button>
    </div>
  )
}

export default Profile


'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { getDB } from '../lib/db'
import { v4 as uuidv4 } from 'uuid'

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    try {
      const db = await getDB()
      const allContacts = await db.getAll('contacts')
      setContacts(allContacts.sort((a, b) => b.timestamp - a.timestamp))
    } catch (error) {
      console.error('Error loading contacts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addContact = async (e) => {
    e.preventDefault()
    if (name && phone) {
      const newContact = {
        id: uuidv4(),
        name,
        phone,
        timestamp: Date.now()
      }

      try {
        const db = await getDB()
        await db.add('contacts', newContact)
        setContacts([newContact, ...contacts])
        setName('')
        setPhone('')
      } catch (error) {
        console.error('Error adding contact:', error)
      }
    }
  }

  const removeContact = async (id) => {
    try {
      const db = await getDB()
      await db.delete('contacts', id)
      setContacts(contacts.filter(contact => contact.id !== id))
    } catch (error) {
      console.error('Error removing contact:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-pink-600" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Emergency Contacts</h2>
      <form onSubmit={addContact} className="mb-4">
        <input
          type="text"
          placeholder="Contact Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
        />
        <input
          type="tel"
          placeholder="Contact Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center w-full"
        >
          <Plus className="mr-2" />
          Add Contact
        </button>
      </form>
      <div className="space-y-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{contact.name}</h3>
              <p className="text-gray-600">{contact.phone}</p>
            </div>
            <button
              onClick={() => removeContact(contact.id)}
              className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmergencyContacts


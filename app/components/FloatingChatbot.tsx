'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }])
      setInput('')
      // Simulate AI response
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { 
          text: "I understand your concern. Here's a safety tip: Always be aware of your surroundings and trust your instincts.", 
          sender: 'ai' 
        }])
      }, 1000)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl animate-slide-in">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-gray-800">AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.sender === 'user'
                      ? 'ml-auto bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  } rounded-lg p-3 max-w-[80%]`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-pink-500"
                />
                <button
                  type="submit"
                  className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  )
}

export default FloatingChatbot


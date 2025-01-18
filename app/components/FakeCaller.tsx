'use client'

import { useState, useRef } from 'react'
import { Phone, Calendar } from 'lucide-react'

const FakeCaller = () => {
  const [scheduledCall, setScheduledCall] = useState(null)
  const [isCallActive, setIsCallActive] = useState(false)
  const audioRef = useRef(null)

  const toggleFakeCall = () => {
    if (isCallActive) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    } else {
      audioRef.current.play()
    }
    setIsCallActive(!isCallActive)
  }

  const scheduleCall = (e) => {
    e.preventDefault()
    const name = e.target.fakeName.value
    const number = e.target.fakeNumber.value
    const time = e.target.fakeTime.value
    setScheduledCall({ name, number, time })
    e.target.reset()
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Fake Caller</h2>
      <button
        onClick={toggleFakeCall}
        className={`${isCallActive ? 'bg-red-500 hover:bg-red-600' : 'bg-pink-500 hover:bg-pink-600'} text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center w-full mb-4 hover-scale`}
      >
        <Phone className="mr-2" />
        {isCallActive ? 'Deactivate Fake Call' : 'Activate Fake Call'}
      </button>
      <audio ref={audioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/He's%20a%20pirete-5WvKhFso8ax27xxL3imJFLAGs17U32.mp3" />
      <h3 className="text-xl font-semibold mb-2">Schedule Fake Call</h3>
      <form onSubmit={scheduleCall} className="space-y-2">
        <input
          type="text"
          name="fakeName"
          placeholder="Caller Name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="tel"
          name="fakeNumber"
          placeholder="Caller Number"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="datetime-local"
          name="fakeTime"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center w-full hover-scale"
        >
          <Calendar className="mr-2" />
          Schedule Call
        </button>
      </form>
      {scheduledCall && (
        <div className="mt-4 p-2 bg-pink-100 rounded animate-slide-in">
          <p className="font-semibold">Scheduled Call:</p>
          <p>From: {scheduledCall.name}</p>
          <p>Number: {scheduledCall.number}</p>
          <p>Time: {new Date(scheduledCall.time).toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}

export default FakeCaller


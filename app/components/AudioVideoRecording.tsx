'use client'

import { useState, useRef, useEffect } from 'react'
import { Video, Mic, StopCircle, Loader2, Trash2 } from 'lucide-react'
import { getDB } from '../lib/db'
import { v4 as uuidv4 } from 'uuid'

const AudioVideoRecording = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [recordings, setRecordings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const mediaRecorderRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    loadRecordings()
  }, [])

  const loadRecordings = async () => {
    try {
      const db = await getDB()
      const allRecordings = await db.getAll('recordings')
      setRecordings(allRecordings.sort((a, b) => b.timestamp - a.timestamp))
    } catch (error) {
      console.error('Error loading recordings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      const chunks = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        const recording = {
          id: uuidv4(),
          blob,
          type: 'video/webm',
          timestamp: Date.now(),
          name: `Recording ${new Date().toLocaleString()}`
        }

        try {
          const db = await getDB()
          await db.add('recordings', recording)
          setRecordings([recording, ...recordings])
        } catch (error) {
          console.error('Error saving recording:', error)
        }
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing media devices:', err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
  }

  const deleteRecording = async (id) => {
    try {
      const db = await getDB()
      await db.delete('recordings', id)
      setRecordings(recordings.filter(recording => recording.id !== id))
    } catch (error) {
      console.error('Error deleting recording:', error)
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
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Audio-Video Recording</h2>
      {!isRecording && (
        <button
          onClick={startRecording}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center w-full mb-4 hover:scale-105 transform"
        >
          <Video className="mr-2" />
          Start Recording
        </button>
      )}
      {isRecording && (
        <button
          onClick={stopRecording}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center w-full mb-4 hover:scale-105 transform"
        >
          <StopCircle className="mr-2" />
          Stop Recording
        </button>
      )}
      <div className="space-y-4">
        {recordings.map((recording) => (
          <div
            key={recording.id}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">{recording.name}</h3>
              <button
                onClick={() => deleteRecording(recording.id)}
                className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <video
              src={URL.createObjectURL(recording.blob)}
              controls
              className="w-full rounded"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AudioVideoRecording


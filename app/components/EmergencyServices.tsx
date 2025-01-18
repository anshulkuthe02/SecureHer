'use client'

import { useState, useEffect } from 'react'
import { MapPin, Navigation, Shield, Hospital } from 'lucide-react'
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api'

const EmergencyServices = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 })
  const [address, setAddress] = useState("Loading...")
  const [activeTab, setActiveTab] = useState('path')
  const [directions, setDirections] = useState(null)
  const [nearbyPlaces, setNearbyPlaces] = useState([])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setLocation(currentLocation)
          fetchAddress(currentLocation)
          if (activeTab === 'services') {
            fetchNearbyPlaces(currentLocation)
          }
        },
        () => {
          setAddress("Unable to retrieve your location")
        }
      )
    }
  }, [activeTab])

  const fetchAddress = async (location) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      )
      const data = await response.json()
      if (data.results[0]) {
        setAddress(data.results[0].formatted_address)
      }
    } catch (error) {
      console.error('Error fetching address:', error)
    }
  }

  const fetchNearbyPlaces = async (location) => {
    // In a real app, you would implement this using the Google Places API
    // For now, we'll use dummy data
    const dummyPlaces = [
      { name: 'Central Police Station', type: 'police', distance: '0.5 km' },
      { name: 'City Hospital', type: 'hospital', distance: '1.2 km' },
      { name: 'Women\'s Safety Center', type: 'safety', distance: '0.8 km' },
    ]
    setNearbyPlaces(dummyPlaces)
  }

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  }

  const tabs = [
    { id: 'path', label: 'Safest Path', icon: Navigation },
    { id: 'authority', label: 'Nearby Authority', icon: Shield },
    { id: 'services', label: 'Emergency Services', icon: Hospital },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Emergency Services Locator</h2>
        <div className="mb-4 p-4 bg-gray-50 rounded-lg flex items-center">
          <MapPin className="text-pink-600 mr-2" />
          <span className="font-medium">{address}</span>
        </div>

        <div className="flex space-x-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={location}
              zoom={14}
            >
              <Marker position={location} />
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </div>

        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nearbyPlaces.map((place, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-semibold text-gray-800">{place.name}</h3>
                <p className="text-gray-600 text-sm">{place.distance}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EmergencyServices


'use client'

import { useState } from 'react'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import SOSAlert from '../components/SOSAlert'
import EmergencyContacts from '../components/EmergencyContacts'
import SafetyActs from '../components/SafetyActs'
import SelfDefense from '../components/SelfDefense'
import EmergencyServices from '../components/EmergencyServices'
import HelplineDirectory from '../components/HelplineDirectory'
import FakeCaller from '../components/FakeCaller'
import FloatingChatbot from '../components/FloatingChatbot'
import AudioVideoRecording from '../components/AudioVideoRecording'
import Profile from '../components/Profile'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('sos')

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 overflow-auto">
          {activeSection === 'sos' && <SOSAlert />}
          {activeSection === 'contacts' && <EmergencyContacts />}
          {activeSection === 'acts' && <SafetyActs />}
          {activeSection === 'self-defense' && <SelfDefense />}
          {activeSection === 'services' && <EmergencyServices />}
          {activeSection === 'helpline' && <HelplineDirectory />}
          {activeSection === 'fake-call' && <FakeCaller />}
          {activeSection === 'recording' && <AudioVideoRecording />}
          {activeSection === 'profile' && <Profile />}
        </main>
        <FloatingChatbot />
      </div>
    </div>
  )
}


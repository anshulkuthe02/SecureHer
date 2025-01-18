import Link from 'next/link'
import { Shield, Phone, Book, Video, MapPin, HeartPulse, PhoneCall, Mic, User } from 'lucide-react'

const navItems = [
  { id: 'sos', label: 'SOS', icon: Shield },
  { id: 'contacts', label: 'Contacts', icon: Phone },
  { id: 'acts', label: 'Safety Acts', icon: Book },
  { id: 'self-defense', label: 'Self Defense', icon: Video },
  { id: 'services', label: 'Emergency Services', icon: MapPin },
  { id: 'helpline', label: 'Helpline', icon: HeartPulse },
  { id: 'fake-call', label: 'Fake Call', icon: PhoneCall },
  { id: 'recording', label: 'Recording', icon: Mic },
  { id: 'profile', label: 'Profile', icon: User },
]

const Sidebar = ({ setActiveSection, activeSection }) => {
  return (
    <nav className="bg-pink-600 text-white w-full md:w-64 md:min-h-screen p-4">
      <div className="flex md:flex-col md:h-full">
        <div className="flex items-center space-x-3 mb-8">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-890051976-612x612-removebg-preview-nX5oJslNjIxKV7isZ2Rq69QtS5n5zs.png" 
            alt="SECURE HER" 
            className="w-10 h-10 object-contain filter brightness-0 invert"
          />
          <h1 className="text-2xl font-bold hidden md:block">SECURE HER</h1>
        </div>
        <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-x-visible">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 w-full ${
                  activeSection === item.id ? 'bg-pink-700' : 'hover:bg-pink-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-auto hidden md:block">
          <Link href="/login" className="block text-center py-2 px-4 bg-pink-700 rounded-lg hover:bg-pink-800 transition-colors duration-200">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar


import { Phone } from 'lucide-react'

const helplines = [
  { name: "Women's Helpline", number: "1091" },
  { name: "Police", number: "100" },
  { name: "Ambulance", number: "102" },
  { name: "Domestic Abuse Helpline", number: "181" },
  { name: "Child Helpline", number: "1098" },
]

const HelplineDirectory = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {helplines.map((helpline, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center transition-transform duration-300 ease-in-out transform hover:scale-105">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{helpline.name}</h3>
          <a
            href={`tel:${helpline.number}`}
            className="flex items-center text-pink-600 hover:text-pink-700 transition-colors duration-200"
          >
            <Phone className="mr-2" size={18} />
            <span className="text-xl font-bold">{helpline.number}</span>
          </a>
        </div>
      ))}
    </div>
  )
}

export default HelplineDirectory


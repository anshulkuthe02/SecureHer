import { Book } from 'lucide-react'

const acts = [
  {
    title: "The Sexual Harassment of Women at Workplace Act, 2013",
    description: "This Act provides protection against sexual harassment of women at workplace and for the prevention and redressal of complaints of sexual harassment."
  },
  {
    title: "The Protection of Women from Domestic Violence Act, 2005",
    description: "This Act provides for more effective protection of the rights of women guaranteed under the Constitution who are victims of violence of any kind occurring within the family."
  },
  {
    title: "The Dowry Prohibition Act, 1961",
    description: "This Act prohibits the giving or taking of dowry at or before or any time after the marriage from women."
  },
  {
    title: "The Indecent Representation of Women (Prohibition) Act, 1986",
    description: "This Act prohibits indecent representation of women through advertisements or in publications, writings, paintings, figures or in any other manner."
  },
  {
    title: "The Immoral Traffic (Prevention) Act, 1956",
    description: "This Act provides for the prevention of immoral traffic in women and girls and for matters connected therewith or incidental thereto."
  }
]

const SafetyActs = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {acts.map((act, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 ease-in-out transform hover:scale-105">
          <div className="flex items-center mb-4">
            <Book className="text-pink-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">{act.title}</h3>
          </div>
          <p className="text-gray-600">{act.description}</p>
        </div>
      ))}
    </div>
  )
}

export default SafetyActs


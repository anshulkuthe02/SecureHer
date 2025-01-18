const videos = [
  { id: 'dQw4w9WgXcQ', title: 'Basic Self-Defense Moves' },
  { id: 'KVpxP3ZZtAc', title: 'Women\'s Self-Defense Techniques' },
  { id: 'T7aNSRoDCmg', title: 'Street Smart Self-Defense' },
  { id: 'pLjvqyfnqKI', title: 'Krav Maga for Women' },
  { id: 'Gx3_x6RH1J4', title: 'Situational Awareness Tips' },
  { id: 'T61ENi_DR_w', title: 'Pepper Spray Usage Guide' },
]

const SelfDefense = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <a
          key={video.id}
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform group-hover:scale-105">
            <img
              src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                {video.title}
              </h3>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

export default SelfDefense


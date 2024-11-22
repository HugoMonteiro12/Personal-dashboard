import React from 'react'
import { Music, Disc, SkipBack, Play, SkipForward } from 'lucide-react'

const Spotify: React.FC = () => {
    return (
        <div className="col-span-4 bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-300 flex items-center">
                <Music className="w-6 h-6 mr-2" />
                Spotify
            </h2>
            <div className="flex items-center">
                <div className="w-24 h-24 bg-gray-700 rounded-lg mr-4 flex items-center justify-center">
                    <Disc className="w-12 h-12 text-gray-500" />
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-200">Song Title</p>
                    <p className="text-lg text-gray-400">Artist Name</p>
                    <p className="text-sm text-gray-500">Album Name</p>
                </div>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
                <button className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600">
                    <SkipBack className="w-6 h-6" />
                </button>
                <button className="p-2 rounded-full bg-green-600 text-white hover:bg-green-500">
                    <Play className="w-6 h-6" />
                </button>
                <button className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600">
                    <SkipForward className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}

export default Spotify


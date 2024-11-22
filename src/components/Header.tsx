import React from 'react'
import { Clock } from 'lucide-react'

const Header: React.FC = () => {
    const [currentTime, setCurrentTime] = React.useState(new Date())

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <div className="col-span-12 bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg flex justify-between items-center">
            <div>
                <p className="text-3xl text-gray-300 mb-2">
                    {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div className="flex items-center">
                    <Clock className="w-12 h-12 mr-4 text-gray-300" />
                    <p className="text-6xl font-bold text-gray-200">
                        {currentTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-2xl text-gray-300">Welcome, User</p>
                <p className="text-xl text-gray-400">Here's your daily overview</p>
            </div>
        </div>
    )
}

export default Header


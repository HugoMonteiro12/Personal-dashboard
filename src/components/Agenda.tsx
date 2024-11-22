import React from 'react'
import { List } from 'lucide-react'

const Agenda: React.FC = () => {
    const events = [
        { date: 'May 15', events: ['Meeting with Team', 'Lunch with Client'] },
        { date: 'May 16', events: ['Project Deadline', 'Gym Session'] },
        { date: 'May 17', events: ['Conference Call', 'Dinner with Family'] },
    ]

    return (
        <div className="col-span-4 bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-300 flex items-center">
                <List className="w-6 h-6 mr-2" />
                Agenda
            </h2>
            <div className="space-y-4">
                {events.map((day, index) => (
                    <div key={index}>
                        <h3 className="font-semibold text-lg mb-2 text-gray-400">{day.date}</h3>
                        <ul className="space-y-2">
                            {day.events.map((event, eventIndex) => (
                                <li key={eventIndex} className="flex items-center">
                                    <span className="w-4 h-4 rounded-full bg-gray-600 mr-2"></span>
                                    <span className="text-gray-300">{event}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Agenda
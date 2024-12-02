import React from 'react'
import { CalendarIcon, List } from 'lucide-react'

interface Event { date: string; events: string[]; }

const Calendar: React.FC = () => { const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const events: Event[] = [
        { date: 'Nov 15', events: ['Meeting with Team', 'Lunch with Client'] },
        { date: 'Nov 16', events: ['Project Deadline', 'Gym Session'] },
        { date: 'Nov 17', events: ['Conference Call', 'Dinner with Family'] },
    ]

    const renderCalendar = () => {
        const days = []
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`}></div>)
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = i === currentDate.getDate()
            days.push(
                <div
                    key={i}
                    className={`flex items-center justify-center ${
                        isToday ? 'bg-blue-600 text-white rounded-full' : ''
                    }`}
                >
                    <span className="text-lg">{i}</span>
                </div>
            )
        }
        return days
    }

    return (
        <div className="col-span-6 bg-gray-800 p-6 rounded-2xl shadow-lg h-full">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-x-8 gap-y-6 h-full">
                <div className="md:col-span-4 flex flex-col h-full">
                    <h2 className="text-2xl font-bold mb-6 text-gray-300 flex items-center">
                        <CalendarIcon className="w-6 h-6 mr-2" />
                        Calendar
                    </h2>
                    <div className="grid grid-cols-7 gap-0.5 text-center text-base font-medium text-gray-400 mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                            <div key={day} className="flex items-center justify-center">{day}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-0.5 text-gray-300 flex-1" style={{ gridAutoRows: '1fr' }}>
                        {renderCalendar()}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6 text-gray-300 flex items-center">
                        <List className="w-6 h-6 mr-2" />
                        Agenda
                    </h2>
                    <div className="space-y-6">
                        {events.map((day, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-xl mb-3 text-gray-400">{day.date}</h3>
                                <ul className="space-y-3">
                                    {day.events.map((event, eventIndex) => (
                                        <li key={eventIndex} className="flex items-center">
                                            <span className="w-4 h-4 rounded-full bg-gray-600 mr-3"></span>
                                            <span className="text-gray-300 text-lg">{event}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar
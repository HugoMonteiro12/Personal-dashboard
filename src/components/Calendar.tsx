import React, { useState } from 'react'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

interface Event {
    date: Date;
    title: string;
}

const Calendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    // Sample events
    const events: Event[] = [
        { date: new Date(2023, 4, 15), title: "Team Meeting" },
        { date: new Date(2023, 4, 20), title: "Project Deadline" },
        { date: new Date(2023, 4, 25), title: "Birthday Party" },
    ]

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

    const renderCalendar = () => {
        const days = []
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="text-center p-2"></div>)
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
            const isToday = currentDate.toDateString() === new Date().toDateString()
            const hasEvent = events.some(event => event.date.toDateString() === currentDate.toDateString())

            days.push(
                <div
                    key={i}
                    className={`text-center p-2 relative ${
                        isToday ? 'bg-blue-600 text-white rounded-full' :
                            hasEvent ? 'bg-blue-100 rounded-full' : ''
                    }`}
                >
                    {i}
                    {hasEvent && <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>}
                </div>
            )
        }
        return days
    }

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    }

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    }

    return (
        <div className="col-span-5 bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-300 flex items-center">
                <CalendarIcon className="w-6 h-6 mr-2" />
                Calendar
            </h2>
            <div className="mb-4 flex justify-between items-center">
                <button onClick={prevMonth} className="text-gray-400 hover:text-gray-200">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h3 className="text-xl font-semibold text-gray-300">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={nextMonth} className="text-gray-400 hover:text-gray-200">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-2 text-gray-400">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-gray-300">
                {renderCalendar()}
            </div>
            <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-300 mb-2">Upcoming Events</h4>
                <ul className="space-y-2">
                    {events.map((event, index) => (
                        <li key={index} className="flex items-center text-gray-400">
                            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                            {event.date.toLocaleDateString()} - {event.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Calendar


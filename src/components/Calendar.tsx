import React from 'react'
import { CalendarIcon } from 'lucide-react'

const Calendar: React.FC = () => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const renderCalendar = () => {
        const days = []
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="text-center p-2"></div>)
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = i === currentDate.getDate()

            days.push(
                <div
                    key={i}
                    className={`text-center p-2 relative ${
                        isToday ? 'bg-blue-600 text-white rounded-full' : ''
                    }`}
                >
                    {i}
                </div>
            )
        }
        return days
    }

    return (
        <div className="col-span-5 bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-300 flex items-center">
                <CalendarIcon className="w-6 h-6 mr-2" aria-hidden="true" />
                <span>Calendar</span>
            </h2>
            <div className="mb-4 flex justify-center items-center">
                <h3 className="text-xl font-semibold text-gray-300">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-2 text-gray-400">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-gray-300">
                {renderCalendar()}
            </div>
        </div>
    )
}

export default Calendar


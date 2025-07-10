'use client'

import { Card, CardContent } from "@/components/ui/card"
import { FiUsers, FiBook, FiCalendar } from 'react-icons/fi'

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, Admin!</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition duration-300 ease-in-out">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-500">Total Teachers</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
            <FiUsers className="text-3xl text-blue-500" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition duration-300 ease-in-out">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-500">Students Assigned</p>
              <p className="text-2xl font-semibold">312</p>
            </div>
            <FiBook className="text-3xl text-green-500" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition duration-300 ease-in-out">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-500">Upcoming Classes</p>
              <p className="text-2xl font-semibold">5 Today</p>
            </div>
            <FiCalendar className="text-3xl text-purple-500" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition duration-300 ease-in-out">
        <h2 className="text-lg font-semibold mb-2">Recent Teachers</h2>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>👩‍🏫 Ms. Rhea Sharma added on July 8</li>
          <li>👨‍🏫 Mr. Kiran Das added on July 7</li>
          <li>👩‍🏫 Ms. Alisha Jain added on July 5</li>
        </ul>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { FiEdit2 } from 'react-icons/fi'

export default function TeacherDetail() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-2xl font-bold text-gray-800">Teachers / Alynia Allan</div>

      {/* Top Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Details',
            content: (
              <>
                <p><strong>Name:</strong> Alynia Allan</p>
                <p><strong>Role:</strong> Teacher</p>
                <p><strong>Birth Date:</strong> Jan 1, 1980</p>
              </>
            ),
            onEdit: () => router.push('/teachers/1/edit/details')
          },
          {
            title: 'Email',
            content: <p>alyniaallan@example.com</p>,
            onEdit: () => router.push('/teachers/1/edit/email')
          },
          {
            title: 'Phone',
            content: <p>+1 416-649-9057</p>,
            onEdit: () => router.push('/teachers/1/edit/phone')
          }
        ].map((section, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow border">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-700">{section.title}</h2>
              <FiEdit2
                className="text-gray-500 hover:text-blue-600 cursor-pointer"
                onClick={section.onEdit}
              />
            </div>
            {section.content}
          </div>
        ))}
      </div>

      {/* Address */}
      <div className="bg-white p-4 rounded shadow border">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-700">Address</h2>
          <FiEdit2
            className="text-gray-500 hover:text-blue-600 cursor-pointer"
            onClick={() => router.push('/teachers/1/edit/address')}
          />
        </div>
        <p>36 Odorado Di Santo Dr, North York, Ontario, Canada</p>
      </div>

      {/* Qualifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow border">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700">Private Qualifications</h2>
            <FiEdit2
              className="text-gray-500 hover:text-blue-600 cursor-pointer"
              onClick={() => router.push('/teachers/1/edit/private-qualifications')}
            />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th>Name</th>
                <th>Rate ($/hr)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Vocal Contemporary</td><td>$30</td></tr>
              <tr><td>Vocal Core</td><td>$28</td></tr>
              <tr><td>Vocal Hybrid</td><td>$26</td></tr>
              <tr><td>Vocal Plus</td><td>$30</td></tr>
              <tr><td>Instrument</td><td>$26</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded shadow border">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700">Group Qualifications</h2>
            <FiEdit2
              className="text-gray-500 hover:text-blue-600 cursor-pointer"
              onClick={() => router.push('/teachers/1/edit/group-qualifications')}
            />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th>Name</th>
                <th>Rate ($/hr)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Choir</td><td>$25</td></tr>
              <tr><td>Band</td><td>$22</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Placeholder */}
      <div className="bg-white p-4 rounded shadow border">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-700">Schedule (Coming soon...)</h2>
          <FiEdit2
            className="text-gray-400 cursor-not-allowed"
            title="Editing not available yet"
          />
        </div>
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-500">
          Weekly schedule grid will be shown here.
        </div>
      </div>
    </div>
  )
}

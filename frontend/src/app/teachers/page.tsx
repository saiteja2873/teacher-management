'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const teachers = [
  { id: 1, name: 'Alynia Allan', subject: 'Vocal, Choir' },
  { id: 2, name: 'Rhea Sharma', subject: 'Math, Science' },
  { id: 3, name: 'Kiran Das', subject: 'History, Geography' },
]

export default function TeachersListPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <Button className='cursor-pointer' onClick={() => router.push('/teachers/add')}>+ Add Teacher</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teachers.map((teacher) => (
          <Card key={teacher.id} onClick={() => router.push(`/teachers/${teacher.id}`)} className="cursor-pointer hover:shadow-lg transition">
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg">{teacher.name}</h2>
              <p className="text-sm text-gray-600">Subjects: {teacher.subject}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

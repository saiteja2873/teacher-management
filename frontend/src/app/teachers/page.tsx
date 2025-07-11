'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const teachers = [
  { id: 1, name: 'Nandhini', subject: 'Vocal, Choir' },
  { id: 2, name: 'Tina', subject: 'Math, Science' },
  { id: 3, name: 'Kiran', subject: 'History, Geography' },
]

export default function TeachersListPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-6 text-foreground bg-background transition-colors not-sm:ml-[-8%]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <Button className="cursor-pointer" onClick={() => router.push('/teachers/add')}>
          + Add Teacher
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teachers.map((teacher) => (
          <Card
            key={teacher.id}
            onClick={() => router.push(`/teachers/${teacher.id}`)}
            className="cursor-pointer hover:shadow-lg transition bg-card text-card-foreground"
          >
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg">{teacher.name}</h2>
              <p className="text-sm text-muted-foreground">Subjects: {teacher.subject}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

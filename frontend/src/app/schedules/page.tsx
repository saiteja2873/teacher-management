"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

interface ClassSlot {
  day: string;
  time: string;
  subject: string;
  location: string;
}

interface Teacher {
  id: number;
  name: string;
  classes: ClassSlot[];
}

const timeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 01:00",
  "01:00 - 02:00",
];

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const teachers: Teacher[] = [
  {
    id: 1,
    name: "Alynia Allan",
    classes: [
      {
        day: "Monday",
        time: "10:00 - 11:00",
        subject: "Math",
        location: "Room 101",
      },
      {
        day: "Monday",
        time: "12:00 - 01:00",
        subject: "Physics",
        location: "Room 102",
      },
      {
        day: "Tuesday",
        time: "12:00 - 01:00",
        subject: "Algebra",
        location: "Room 102",
      },
    ],
  },
  {
    id: 2,
    name: "Priya Kapoor",
    classes: [
      {
        day: "Monday",
        time: "09:00 - 10:00",
        subject: "Chemistry",
        location: "Lab 1",
      },
      {
        day: "Friday",
        time: "11:00 - 12:00",
        subject: "Organic Chem",
        location: "Lab 2",
      },
    ],
  },
];

export default function SchedulePage() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const getClassAt = (teacher: Teacher, day: string, time: string) => {
    return teacher.classes.find((cls) => cls.day === day && cls.time === time);
  };

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Teacher Timetable</h1>

      <AnimatePresence mode="wait">
        {!selectedTeacher ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {teachers.map((teacher) => (
              <motion.button
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher)}
                className="border bg-white shadow p-4 rounded hover:bg-blue-50 transition text-left w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <p className="font-semibold text-lg">{teacher.name}</p>
                <p className="text-sm text-gray-600">View Weekly Timetable</p>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <motion.button
              onClick={() => setSelectedTeacher(null)}
              className="text-blue-600 flex items-center gap-1 cursor-pointer mb-10"
              whileHover={{ scale: 1.05 }}
            >
              <FiArrowLeft className="text-base" />
              Back to Teacher List
            </motion.button>

            <h2 className="text-xl font-semibold mb-4">
              Weekly Timetable for {selectedTeacher.name}
            </h2>

            <div className="overflow-x-auto border rounded">
              <table className="min-w-full table-fixed border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 w-32">Time</th>
                    {weekdays.map((day) => (
                      <th key={day} className="border px-4 py-2 w-36">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time}>
                      <td className="border px-4 py-2 font-medium bg-gray-50">
                        {time}
                      </td>
                      {weekdays.map((day) => {
                        const cls = getClassAt(selectedTeacher, day, time);
                        return (
                          <td
                            key={day}
                            className="border px-4 py-2 text-center"
                          >
                            {cls ? (
                              <>
                                <div className="font-semibold">
                                  {cls.subject}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  {cls.location}
                                </div>
                              </>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

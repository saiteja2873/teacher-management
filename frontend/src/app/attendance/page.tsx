"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Teacher {
  id: number;
  name: string;
}

const mockTeachers: Teacher[] = [
  { id: 1, name: "Nandhini" },
  { id: 2, name: "Tina Prakash" },
  { id: 3, name: "Kiran" },
  { id: 4, name: "Rahul Singh" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<{ [id: number]: boolean }>({});

  const toggleAttendance = (id: number) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = () => {
    const result = mockTeachers.map((teacher) => ({
      id: teacher.id,
      name: teacher.name,
      status: attendance[teacher.id] ? "Present" : "Absent",
    }));

    console.log("Submitted Attendance:", result);
    alert("Attendance submitted! (Check console for data)");
  };

  return (
    <motion.div
      className="p-6 max-w-3xl mx-auto text-gray-800 dark:text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Mark Teacher Attendance
      </motion.h1>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {mockTeachers.map((teacher) => (
          <motion.div
            key={teacher.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow"
            variants={cardVariants}
          >
            <span className="font-medium">{teacher.name}</span>
            <motion.button
              onClick={() => toggleAttendance(teacher.id)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1 rounded-full font-medium transition ${
                attendance[teacher.id]
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {attendance[teacher.id] ? "Present" : "Absent"}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        onClick={handleSubmit}
        whileTap={{ scale: 0.97 }}
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Submit Attendance
      </motion.button>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Teacher {
  id: number;
  name: string;
}

const mockTeachers: Teacher[] = [
  { id: 1, name: "Alynia Allan" },
  { id: 2, name: "James Carter" },
  { id: 3, name: "Priya Kapoor" },
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
      className="p-6 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-2xl font-bold mb-6 text-blue-700"
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
            className="flex items-center justify-between p-4 border rounded-lg bg-white shadow"
            variants={cardVariants}
          >
            <span className="font-medium">{teacher.name}</span>
            <motion.button
              onClick={() => toggleAttendance(teacher.id)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1 rounded-full font-medium transition ${
                attendance[teacher.id]
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
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
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Attendance
      </motion.button>
    </motion.div>
  );
}

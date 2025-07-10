"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FiUsers, FiBook, FiCalendar } from "react-icons/fi";
import { motion, Variants } from "framer-motion";

export default function DashboardPage() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="p-6 space-y-6"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <motion.h1 className="text-2xl font-bold" variants={fadeIn} custom={0}>
        Welcome back, Admin!
      </motion.h1>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={fadeIn}
        custom={0.1}
      >
        {[
          {
            label: "Total Teachers",
            value: 24,
            icon: <FiUsers className="text-3xl text-blue-500" />,
          },
          {
            label: "Students Assigned",
            value: 312,
            icon: <FiBook className="text-3xl text-green-500" />,
          },
          {
            label: "Upcoming Classes",
            value: "5 Today",
            icon: <FiCalendar className="text-3xl text-purple-500" />,
          },
        ].map((card, i) => (
          <motion.div key={i} variants={fadeIn} custom={i}>
            <Card className="hover:shadow-md transition duration-300 ease-in-out">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-2xl font-semibold">{card.value}</p>
                </div>
                {card.icon}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Teachers */}
      <motion.div
        className="bg-white rounded-lg p-4 shadow hover:shadow-md transition duration-300 ease-in-out"
        variants={fadeIn}
        custom={4}
      >
        <h2 className="text-lg font-semibold mb-2">Recent Teachers</h2>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>👩‍🏫 Ms. Rhea Sharma added on July 8</li>
          <li>👨‍🏫 Mr. Kiran Das added on July 7</li>
          <li>👩‍🏫 Ms. Alisha Jain added on July 5</li>
        </ul>
      </motion.div>

      {/* Schedule Table */}
      <motion.div
        className="bg-white rounded-lg p-4 shadow hover:shadow-md transition duration-300 ease-in-out mt-6"
        variants={fadeIn}
        custom={5}
      >
        <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left w-28">Room</th>
                <th className="border px-4 py-2 text-left w-32">09:00–10:00</th>
                <th className="border px-4 py-2 text-left w-32">10:00–11:00</th>
                <th className="border px-4 py-2 text-left w-32">11:00–12:00</th>
                <th className="border px-4 py-2 text-left w-32">12:00–01:00</th>
                <th className="border px-4 py-2 text-left w-32">02:00–03:00</th>
                <th className="border px-4 py-2 text-left w-32">03:00–04:00</th>
                <th className="border px-4 py-2 text-left w-32">04:00–05:00</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  room: "Room 101",
                  slots: ["—", "Alynia Allan (Math)", "—", "—", "—", "—", "—"],
                },
                {
                  room: "Room 102",
                  slots: [
                    "—",
                    "—",
                    "James Carter (Physics)",
                    "—",
                    "—",
                    "—",
                    "—",
                  ],
                },
                {
                  room: "Lab 1",
                  slots: [
                    "—",
                    "—",
                    "—",
                    "Priya Kapoor (Chemistry)",
                    "—",
                    "—",
                    "—",
                  ],
                },
              ].map((row, index) => (
                <motion.tr key={index} variants={fadeIn} custom={index + 6}>
                  <td className="border px-4 py-2 font-medium">{row.room}</td>
                  {row.slots.map((cell, i) => (
                    <td
                      key={i}
                      className={`border px-4 py-2 ${
                        cell === "—" ? "text-gray-400" : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

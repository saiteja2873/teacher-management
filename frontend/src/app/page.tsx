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
      className="p-4 sm:p-6 space-y-6 text-foreground bg-background transition-colors"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      <motion.h1
        className="text-lg sm:text-2xl font-bold"
        variants={fadeIn}
        custom={0}
      >
        Welcome back, Admin!
      </motion.h1>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={fadeIn}
        custom={0.1}
      >
        {[
          {
            label: "Total Teachers",
            value: 24,
            icon: <FiUsers className="text-xl sm:text-2xl text-blue-500" />,
          },
          {
            label: "Students Assigned",
            value: 312,
            icon: <FiBook className="text-xl sm:text-2xl text-green-500" />,
          },
          {
            label: "Upcoming Classes",
            value: "5 Today",
            icon: (
              <FiCalendar className="text-xl sm:text-2xl text-purple-500" />
            ),
          },
        ].map((card, i) => (
          <motion.div key={i} variants={fadeIn} custom={i}>
            <Card className="bg-card text-card-foreground hover:shadow-md transition duration-300 ease-in-out">
              <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2 px-3 py-2 sm:p-4">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="text-lg sm:text-2xl font-semibold">
                    {card.value}
                  </p>
                </div>
                <div className="text-xl sm:text-3xl">{card.icon}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Teachers */}
      <motion.div
        className="bg-card text-card-foreground rounded-lg p-4 shadow hover:shadow-md transition duration-300 ease-in-out"
        variants={fadeIn}
        custom={4}
      >
        <h2 className="text-base sm:text-lg font-semibold mb-2">
          Recent Teachers
        </h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>👩‍🏫 Ms. Tina Joined us on July 8</li>
          <li>👨‍🏫 Mr. Kiran has a leave from July 8(today) to July 10</li>
          <li>👩‍🏫 Ms. Priya Requested a leave for 2 days</li>
        </ul>
      </motion.div>

      {/* Schedule Table */}
      <motion.div
        className="bg-card text-card-foreground rounded-lg p-4 shadow hover:shadow-md transition duration-300 ease-in-out mt-6"
        variants={fadeIn}
        custom={5}
      >
        <h2 className="text-base sm:text-lg font-semibold mb-4">
          Today's Schedule
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm border border-border">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="border px-4 py-2 text-left">Room</th>
                <th className="border px-4 py-2 text-left">09:00–10:00</th>
                <th className="border px-4 py-2 text-left">10:00–11:00</th>
                <th className="border px-4 py-2 text-left">11:00–12:00</th>
                <th className="border px-4 py-2 text-left">12:00–01:00</th>
                <th className="border px-4 py-2 text-left">02:00–03:00</th>
                <th className="border px-4 py-2 text-left">03:00–04:00</th>
                <th className="border px-4 py-2 text-left">04:00–05:00</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  room: "Room 101",
                  slots: ["—", "Regina (Math)", "—", "—", "—", "—", "—"],
                },
                {
                  room: "Room 102",
                  slots: ["—", "—", "Ankush (Physics)", "—", "—", "—", "—"],
                },
                {
                  room: "Lab 1",
                  slots: [
                    "—",
                    "—",
                    "—",
                    "Nandhini Warrior (Chemistry)",
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
                        cell === "—" ? "text-muted-foreground/40" : ""
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

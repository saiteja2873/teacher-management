"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LeaveRequest {
  id: number;
  teacherName: string;
  date: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const initialRequests: LeaveRequest[] = [
  {
    id: 1,
    teacherName: "Tina Prakash",
    date: "2025-07-09",
    days: 2,
    reason: "Medical leave",
    status: "Pending",
  },
  {
    id: 2,
    teacherName: "John Martin",
    date: "2025-07-08",
    days: 1,
    reason: "Personal work",
    status: "Approved",
  },
  {
    id: 3,
    teacherName: "Priya Singh",
    date: "2025-07-10",
    days: 3,
    reason: "Family event",
    status: "Pending",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LeaveRequestsPage() {
  const [requests, setRequests] = useState(initialRequests);

  const updateStatus = (id: number, newStatus: "Approved" | "Rejected") => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto text-gray-800 dark:text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-2xl font-bold mb-6 text-blue-800 dark:text-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Leave Requests
      </motion.h1>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {requests.map((req) => (
            <motion.div
              key={req.id}
              variants={cardVariants}
              className="border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              layout
            >
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {req.teacherName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📅 Date: {req.date} &nbsp;|&nbsp; 🕒 Days: {req.days}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📝 Reason: {req.reason}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <motion.span
                  key={req.status}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    req.status === "Approved"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                      : req.status === "Rejected"
                      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {req.status}
                </motion.span>

                {req.status === "Pending" && (
                  <>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateStatus(req.id, "Approved")}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                    >
                      Approve
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateStatus(req.id, "Rejected")}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Reject
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

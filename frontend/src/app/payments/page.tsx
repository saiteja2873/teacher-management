"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define payment structure
interface Payment {
  id: number;
  teacherName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "Pending" | "Paid";
}

// Initial data
const initialPayments: Payment[] = [
  {
    id: 1,
    teacherName: "Tina Prakash",
    amount: 5000,
    dueDate: "2025-07-01",
    status: "Pending",
  },
  {
    id: 2,
    teacherName: "John Martin",
    amount: 7000,
    dueDate: "2025-06-30",
    paidDate: "2025-06-30",
    status: "Paid",
  },
  {
    id: 3,
    teacherName: "Priya Singh",
    amount: 6200,
    dueDate: "2025-07-05",
    status: "Pending",
  },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);

  const markAsPaid = (id: number) => {
    const today = new Date().toISOString().split("T")[0];
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id
          ? { ...payment, status: "Paid", paidDate: today }
          : payment
      )
    );
  };

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto text-gray-800 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h1
        className="text-2xl font-bold mb-6 text-blue-800 dark:text-blue-400"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Teacher Payments
      </motion.h1>

      <div className="space-y-4">
        <AnimatePresence>
          {payments.map((payment) => (
            <motion.div
              key={payment.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row md:items-center justify-between bg-white dark:bg-gray-800 p-4 border dark:border-gray-700 rounded-lg shadow gap-2"
            >
              {/* Left Section */}
              <div>
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  {payment.teacherName}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  💰 Amount: ₹{payment.amount}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  📅 Due Date: {payment.dueDate}
                </p>
                {payment.paidDate && (
                  <p className="text-sm text-green-700 dark:text-green-300">
                    ✅ Paid Date: {payment.paidDate}
                  </p>
                )}
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-3">
                <motion.span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    payment.status === "Paid"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                  layout
                >
                  {payment.status}
                </motion.span>

                {payment.status === "Pending" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => markAsPaid(payment.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                  >
                    Mark as Paid
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

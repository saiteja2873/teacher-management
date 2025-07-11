"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export default function UpiPage() {
  return (
    <motion.div
      className="max-w-md mx-auto mt-10 bg-white dark:bg-zinc-900 dark:text-white p-6 rounded-xl shadow-md space-y-6 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-2xl font-semibold text-blue-700 dark:text-blue-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        UPI Options
      </motion.h2>

      <motion.p
        className="text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Choose what you'd like to do:
      </motion.p>

      <div className="flex flex-col gap-4">
        <motion.div
          variants={buttonVariants}
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            href="/upi/send"
            className="block bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition"
          >
            Send Money
          </Link>
        </motion.div>

        <motion.div
          variants={buttonVariants}
          whileHover="whileHover"
          whileTap="whileTap"
        >
          <Link
            href="/upi/receive"
            className="block bg-green-600 hover:bg-green-700 dark:hover:bg-green-800 text-white py-2 px-4 rounded-lg transition"
          >
            Receive Money
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

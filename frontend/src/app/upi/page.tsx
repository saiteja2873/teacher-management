"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function UpiPage() {
  return (
    <motion.div
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md space-y-6 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-semibold text-blue-700">UPI Options</h2>
      <p className="text-gray-600">Choose what you'd like to do:</p>

      <div className="flex flex-col gap-4">
        <Link
          href="/upi/send"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
        >
          Send Money
        </Link>
        <Link
          href="/upi/receive"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
        >
          Receive Money
        </Link>
      </div>
    </motion.div>
  );
}

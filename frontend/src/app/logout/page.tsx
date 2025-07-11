"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogoutPage() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirmLogout = () => {
    // Clear tokens or session here
    localStorage.clear(); // or cookies, auth tokens etc.
    toast.success("Logged out successfully!");

    setTimeout(() => {
      router.push("/login"); // Redirect to login or landing page
    }, 1500);
  };

  useEffect(() => {
    if (confirmed) {
      handleConfirmLogout();
    }
  }, [confirmed]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-white transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ToastContainer />
      <motion.div
        className="bg-white dark:bg-zinc-800 shadow-xl rounded-xl p-8 max-w-md w-full text-center space-y-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-semibold">Are you sure you want to logout?</h1>

        <div className="flex justify-center gap-4">
          <motion.button
            onClick={() => setConfirmed(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all"
            whileTap={{ scale: 0.95 }}
          >
            Yes, Logout
          </motion.button>

          <motion.button
            onClick={() => router.back()}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-lg transition-all"
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

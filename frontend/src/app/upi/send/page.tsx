"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FiSend, FiCamera, FiArrowLeft } from "react-icons/fi";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";

// Dynamically import QR Scanner
const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
  {
    ssr: false,
    loading: () => <p>Loading Scanner...</p>,
  }
);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

export default function UpiPage() {
  const router = useRouter();

  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handlePayment = () => {
    if (!upiId.match(/^[\w.-]+@[\w.-]+$/)) {
      toast.error("Enter a valid UPI ID");
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    const upiLink = `upi://pay?pa=${upiId}&pn=Payee&am=${amount}&cu=INR&tn=${encodeURIComponent(
      remark || "Payment"
    )}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = upiLink;
    } else {
      toast.error("UPI payment links can only be opened on mobile devices.");
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto bg-white dark:bg-zinc-900 dark:text-white shadow-xl rounded-2xl p-6 space-y-6 mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer theme="dark" />

      {/* 🔙 Back Button */}
      <motion.button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <FiArrowLeft />
        Back
      </motion.button>

      <motion.h2
        className="text-xl font-semibold text-gray-800 dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Send Money via UPI
      </motion.h2>

      <motion.button
        onClick={() => setShowScanner((prev) => !prev)}
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiCamera />
        {showScanner ? "Close Scanner" : "Scan QR Code"}
      </motion.button>

      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <div className="block sm:hidden w-full">
              <Scanner
                onScan={(codes) => {
                  if (codes.length > 0) {
                    const text = codes[0].rawValue;
                    setUpiId(text);
                    setShowScanner(false);
                    toast.success(`Scanned UPI ID: ${text}`);
                  }
                }}
                onError={(err) => {
                  console.error("Scanner error:", err);
                  toast.error("Failed to scan QR.");
                  setShowScanner(false);
                }}
                constraints={{ facingMode: "environment" }}
                scanDelay={500}
              />
            </div>
            <div className="hidden sm:flex items-center justify-center p-4 text-sm text-red-500 dark:text-red-400">
              QR scanning is only available on mobile devices.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={fadeInUp} custom={1} initial="hidden" animate="visible">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Recipient UPI ID</label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="example@upi"
          className="w-full mt-1 border dark:border-gray-700 dark:bg-zinc-800 dark:text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </motion.div>

      <motion.div variants={fadeInUp} custom={2} initial="hidden" animate="visible">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
          }}
          placeholder="₹0.00"
          className="w-full mt-1 border dark:border-gray-700 dark:bg-zinc-800 dark:text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </motion.div>

      <motion.div variants={fadeInUp} custom={3} initial="hidden" animate="visible">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Remark (optional)</label>
        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter message"
          className="w-full mt-1 border dark:border-gray-700 dark:bg-zinc-800 dark:text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handlePayment}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 rounded-xl transition-all"
        variants={fadeInUp}
        custom={4}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          <span className="animate-pulse">Processing...</span>
        ) : (
          <>
            <FiSend />
            Send Payment
          </>
        )}
      </motion.button>
    </motion.div>
  );
}

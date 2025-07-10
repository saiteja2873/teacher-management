"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FiSend, FiCamera } from "react-icons/fi";
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

export default function UpiPage() {
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
      // Open in UPI app on mobile
      window.location.href = upiLink;
    } else {
      toast.error("UPI payment links can only be opened on mobile devices.");
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6 mt-10 transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ToastContainer />
      <h2 className="text-xl font-semibold text-gray-800">
        Send Money via UPI
      </h2>
      {/* QR Scanner toggle */}
      <button
        onClick={() => setShowScanner((prev) => !prev)}
        className="inline-flex items-center gap-2 text-blue-600 hover:underline focus:outline-none"
      >
        <FiCamera />
        {showScanner ? "Close Scanner" : "Scan QR Code"}
      </button>
      {/* QR Scanner */}
      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border rounded-xl overflow-hidden"
          >
            {/* Mobile-only QR Scanner */}
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

            {/* Optional message for larger devices */}
            <div className="hidden sm:flex items-center justify-center p-4 text-sm text-red-500">
              QR scanning is only available on mobile devices.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* UPI ID */}
      <div>
        <label className="text-sm font-medium text-gray-600">
          Recipient UPI ID
        </label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="example@upi"
          className="w-full mt-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      {/* Amount */}
      <div>
        <label className="text-sm font-medium text-gray-600">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
          }}
          placeholder="₹0.00"
          className="w-full mt-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      {/* Remark */}
      <div>
        <label className="text-sm font-medium text-gray-600">
          Remark (optional)
        </label>
        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter message"
          className="w-full mt-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      {/* Submit */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handlePayment}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition-all"
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

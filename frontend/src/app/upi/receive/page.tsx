"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiArrowLeft } from "react-icons/fi";

export default function ReceivePage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [upiId, setUpiId] = useState("yourupi@bank");
  const [generated, setGenerated] = useState(false);

  const upiURL = `upi://pay?pa=${upiId}&pn=Receiver&am=${amount}&cu=INR&tn=${encodeURIComponent(
    remark || "Payment"
  )}`;

  const handleGenerate = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Enter a valid amount to receive");
      return;
    }
    setGenerated(true);
    toast.success("QR Code generated");
  };

  return (
    <motion.div
      className="max-w-md mx-auto bg-white dark:bg-zinc-900 dark:text-white shadow-xl rounded-2xl p-6 space-y-6 mt-10 transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ToastContainer theme="dark" />

      {/* 🔙 Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium cursor-pointer"
      >
        <FiArrowLeft />
        Back
      </button>

      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Receive Money via UPI
      </h2>

      {/* UPI ID */}
      <div>
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Your UPI ID
        </label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="yourupi@bank"
          className="w-full mt-1 border border-gray-300 dark:border-gray-700 dark:bg-zinc-800 dark:text-white rounded-xl px-4 py-2"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
          }}
          placeholder="₹0.00"
          className="w-full mt-1 border border-gray-300 dark:border-gray-700 dark:bg-zinc-800 dark:text-white rounded-xl px-4 py-2"
        />
      </div>

      {/* Remark */}
      <div>
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Remark (optional)
        </label>
        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter purpose"
          className="w-full mt-1 border border-gray-300 dark:border-gray-700 dark:bg-zinc-800 dark:text-white rounded-xl px-4 py-2"
        />
      </div>

      {/* Generate QR */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleGenerate}
        className="w-full bg-green-600 hover:bg-green-700 dark:hover:bg-green-800 text-white font-medium py-2 rounded-xl transition"
      >
        Generate QR
      </motion.button>

      {/* QR Code Output */}
      {generated && (
        <div className="flex flex-col items-center gap-2 mt-4">
          <QRCode value={upiURL} size={180} />
        </div>
      )}
    </motion.div>
  );
}

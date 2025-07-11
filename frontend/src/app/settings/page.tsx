"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [adminName, setAdminName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    console.log("Settings saved:", { adminName, email, darkMode, notifications });
    toast.success("Saved Successfully!");
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <motion.div
      className="p-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Settings
      </motion.h1>

      {/* Profile Section */}
      <motion.div
        className="bg-white dark:bg-zinc-900 dark:text-white rounded-xl shadow p-6 mb-6 space-y-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">👤 Profile</h2>
        <div className="space-y-4">
          <div>
            <Label className="block mb-1 text-gray-600 dark:text-gray-300">Name</Label>
            <Input
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="rounded-lg dark:bg-zinc-800 dark:text-white dark:border-gray-700"
            />
          </div>
          <div>
            <Label className="block mb-1 text-gray-600 dark:text-gray-300">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg dark:bg-zinc-800 dark:text-white dark:border-gray-700"
            />
          </div>
        </div>
      </motion.div>

      {/* Preferences Section */}
      <motion.div
        className="bg-white dark:bg-zinc-900 dark:text-white rounded-xl shadow p-6 space-y-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">⚙️ Preferences</h2>
        <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
          <Label className="text-gray-600 dark:text-gray-300">Dark Mode</Label>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
        <div className="flex items-center justify-between py-2">
          <Label className="text-gray-600 dark:text-gray-300">Notifications</Label>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-2 rounded-xl transition-all"
          whileTap={{ scale: 0.95 }}
        >
          Save Changes
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

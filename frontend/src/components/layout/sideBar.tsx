"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiUserPlus,
  FiCalendar,
  FiClipboard,
  FiCreditCard,
  FiClock,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const navItems = [
  { name: "Dashboard", href: "/", icon: <FiHome /> },
  { name: "All Teachers", href: "/teachers", icon: <FiUsers /> },
  { name: "Add Teacher", href: "/teachers/add", icon: <FiUserPlus /> },
  { name: "Attendance", href: "/attendance", icon: <FiCalendar /> },
  { name: "Leave Requests", href: "/leaves", icon: <FiClipboard /> },
  { name: "Payments", href: "/payments", icon: <FiCreditCard /> },
  { name: "Schedules", href: "/schedules", icon: <FiClock /> },
  { name: "UPI", href: "/upi", icon: <FiCreditCard /> },
  { name: "Settings", href: "/settings", icon: <FiSettings /> },
  { name: "Logout", href: "/logout", icon: <FiLogOut /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-background text-foreground shadow-sm">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={toggleMenu}
          className="text-foreground absolute top-12 cursor-pointer"
        >
          <FiMenu size={24} />
        </motion.button>
        <div className="w-6" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-md transition-colors">
        <div className="p-4 text-xl font-bold text-sidebar-primary border-b border-sidebar-border">
          Admin Panel
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    : "hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={toggleMenu}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-64 h-full bg-sidebar text-sidebar-foreground z-50 shadow-lg transition-colors"
            >
              <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
                <span className="text-sidebar-primary font-bold text-xl">
                  Admin Panel
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMenu}
                  className="text-foreground cursor-pointer"
                >
                  <FiX size={24} />
                </motion.button>
              </div>

              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      onClick={toggleMenu}
                      className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-300 ${
                        pathname === item.href
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                          : "hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

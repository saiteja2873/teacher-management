"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";
import { motion, Variants } from "framer-motion";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function TeacherDetail() {
  const router = useRouter();

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {/* Header */}
      <motion.div
        className="text-2xl font-bold text-gray-800"
        variants={fadeIn}
      >
        Teachers / Alynia Allan
      </motion.div>

      {/* Top Info Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={fadeIn}
      >
        {[
          {
            title: "Details",
            content: (
              <>
                <p>
                  <strong>Name:</strong> Alynia Allan
                </p>
                <p>
                  <strong>Role:</strong> Teacher
                </p>
                <p>
                  <strong>Birth Date:</strong> Jan 1, 1980
                </p>
              </>
            ),
            onEdit: () => router.push("/teachers/1/edit/details"),
          },
          {
            title: "Email",
            content: <p>alyniaallan@example.com</p>,
            onEdit: () => router.push("/teachers/1/edit/email"),
          },
          {
            title: "Phone",
            content: <p>+1 416-649-9057</p>,
            onEdit: () => router.push("/teachers/1/edit/phone"),
          },
        ].map((section, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-4 rounded shadow border hover:shadow-md transition-all duration-300"
            variants={fadeIn}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-700">{section.title}</h2>
              <FiEdit2
                className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                onClick={section.onEdit}
              />
            </div>
            {section.content}
          </motion.div>
        ))}
      </motion.div>

      {/* Address */}
      <motion.div
        className="bg-white p-4 rounded shadow border hover:shadow-md transition-all duration-300"
        variants={fadeIn}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-700">Address</h2>
          <FiEdit2
            className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200"
            onClick={() => router.push("/teachers/1/edit/address")}
          />
        </div>
        <p>36 Odorado Di Santo Dr, North York, Ontario, Canada</p>
      </motion.div>

      {/* Qualifications */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={fadeIn}
      >
        {[
          {
            title: "Private Qualifications",
            data: [
              ["Vocal Contemporary", "$30"],
              ["Vocal Core", "$28"],
              ["Vocal Hybrid", "$26"],
              ["Vocal Plus", "$30"],
              ["Instrument", "$26"],
            ],
            route: "private-qualifications",
          },
          {
            title: "Group Qualifications",
            data: [
              ["Choir", "$25"],
              ["Band", "$22"],
            ],
            route: "group-qualifications",
          },
        ].map((section, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-4 rounded shadow border hover:shadow-md transition-all duration-300"
            variants={fadeIn}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-gray-700">{section.title}</h2>
              <FiEdit2
                className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                onClick={() => router.push(`/teachers/1/edit/${section.route}`)}
              />
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th>Name</th>
                  <th>Rate ($/hr)</th>
                </tr>
              </thead>
              <tbody>
                {section.data.map(([name, rate], i) => (
                  <tr key={i}>
                    <td>{name}</td>
                    <td>{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ))}
      </motion.div>

      {/* Schedule Placeholder */}
      <motion.div
        className="bg-white p-4 rounded shadow border hover:shadow-md transition-all duration-300"
        variants={fadeIn}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-700">
            Schedule (Coming soon...)
          </h2>
          <FiEdit2
            className="text-gray-400 cursor-not-allowed"
            title="Editing not available yet"
          />
        </div>
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-500">
          Weekly schedule grid will be shown here.
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FiEdit2, FiPlus, FiCheck, FiX } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const mockTeachers = [
  {
    id: "1",
    name: "Nandhini Warrior",
    email: "nandhini20@example.com",
    phone: "+91 916-649-9057",
    address: "Kukatpally, Hyderabad",
    role: "Teacher",
    privateQualifications: [
      { name: "Vocal Contemporary", rate: 30 },
      { name: "Vocal Core", rate: 28 },
    ],
    groupQualifications: [
      { name: "Choir", rate: 25 },
      { name: "Band", rate: 22 },
    ],
  },
];

export default function TeacherDetailPage() {
  const { id } = useParams();
  const teacher = mockTeachers.find((t) => t.id === id);

  const router = useRouter();

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [editedDetails, setEditedDetails] = useState({
    name: teacher?.name || "",
    email: teacher?.email || "",
    role: teacher?.role || "",
  });
  const [editedPhone, setEditedPhone] = useState(teacher?.phone || "");
  const [editedAddress, setEditedAddress] = useState(teacher?.address || "");

  const [isEditingPrivate, setIsEditingPrivate] = useState(false);
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  const [privateQuals, setPrivateQuals] = useState(
    teacher?.privateQualifications || []
  );
  const [groupQuals, setGroupQuals] = useState(
    teacher?.groupQualifications || []
  );
  const [newPrivate, setNewPrivate] = useState({ name: "", rate: "" });
  const [newGroup, setNewGroup] = useState({ name: "", rate: "" });

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDetails = () => {
    if (!editedDetails.name || !editedDetails.email || !editedDetails.role) {
      alert("All fields are required.");
      return;
    }
    if (!teacher) return;
    teacher.name = editedDetails.name;
    teacher.email = editedDetails.email;
    teacher.role = editedDetails.role;
    setIsEditingDetails(false);
  };

  const handleAdd = (type: "private" | "group") => {
    if (type === "private") {
      if (!newPrivate.name.trim() || !newPrivate.rate)
        return alert("All fields required.");
      setPrivateQuals([
        ...privateQuals,
        { ...newPrivate, rate: Number(newPrivate.rate) },
      ]);
      setNewPrivate({ name: "", rate: "" });
    } else {
      if (!newGroup.name.trim() || !newGroup.rate)
        return alert("All fields required.");
      setGroupQuals([
        ...groupQuals,
        { ...newGroup, rate: Number(newGroup.rate) },
      ]);
      setNewGroup({ name: "", rate: "" });
    }
  };

  const handleSave = (type: "private" | "group") => {
    if (type === "private") {
      const valid = privateQuals.every((q) => q.name.trim() && q.rate);
      if (!valid) return alert("No field can be empty.");
      if (teacher) {
        teacher.privateQualifications = privateQuals;
      }
      setIsEditingPrivate(false);
    } else {
      const valid = groupQuals.every((q) => q.name.trim() && q.rate);
      if (!valid) return alert("No field can be empty.");
      if (teacher) {
        teacher.groupQualifications = groupQuals;
      }
      setIsEditingGroup(false);
    }
  };

  const handleEditChange = (
    type: "private" | "group",
    idx: number,
    field: "name" | "rate",
    value: string
  ) => {
    const list = type === "private" ? [...privateQuals] : [...groupQuals];
    list[idx] = {
      ...list[idx],
      [field]: field === "rate" ? Number(value) : value,
    };

    if (type === "private") {
      setPrivateQuals(list);
    } else {
      setGroupQuals(list);
    }
  };

  if (!teacher) return <div className="p-6">Teacher not found</div>;

  const totalPrivate = privateQuals.reduce(
    (acc, q) => acc + (typeof q.rate === "number" ? q.rate : 0),
    0
  );
  const totalGroup = groupQuals.reduce(
    (acc, q) => acc + (typeof q.rate === "number" ? q.rate : 0),
    0
  );

  return (
    <div className="p-6 space-y-6 not-sm:ml-[-5%]">
      <div className="text-2xl font-bold text-gray-800 dark:text-gray-400 not-sm:ml-[-7%]">
        <motion.button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 mb-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <FiArrowLeft className="mr-1" />
          Back
        </motion.button>
        Teachers / {teacher.name}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Details */}
        <div className="bg-white p-4 rounded shadow border dark:bg-gray-800">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700 dark:text-gray-400">
              Details
            </h2>
            {!isEditingDetails && (
              <FiEdit2
                className="text-gray-500 hover:text-blue-600 cursor-pointer"
                onClick={() => setIsEditingDetails(true)}
              />
            )}
          </div>
          {isEditingDetails ? (
            <div className="space-y-2">
              <input
                name="name"
                value={editedDetails.name}
                onChange={handleDetailsChange}
                className="w-full border px-2 py-1 rounded"
                placeholder="Name"
              />
              <input
                name="role"
                value={editedDetails.role}
                onChange={handleDetailsChange}
                className="w-full border px-2 py-1 rounded"
                placeholder="Role"
              />
              <input
                name="email"
                value={editedDetails.email}
                onChange={handleDetailsChange}
                className="w-full border px-2 py-1 rounded"
                placeholder="Email"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSaveDetails}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingDetails(false)}
                  className="border px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {teacher.name}
              </p>
              <p>
                <strong>Role:</strong> {teacher.role}
              </p>
              <p>
                <strong>Email:</strong> {teacher.email}
              </p>
            </>
          )}
        </div>

        {/* Phone */}
        <div className="bg-white p-4 rounded shadow border dark:bg-gray-800">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700 dark:text-gray-400">
              Phone
            </h2>
            {!isEditingPhone && (
              <FiEdit2
                className="text-gray-500 hover:text-blue-600 cursor-pointer"
                onClick={() => setIsEditingPhone(true)}
              />
            )}
          </div>
          {isEditingPhone ? (
            <>
              <input
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                className="w-full border px-2 py-1 rounded"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    teacher.phone = editedPhone;
                    setIsEditingPhone(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingPhone(false)}
                  className="border px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p>{teacher.phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="bg-white p-4 rounded shadow border dark:bg-gray-800">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700 dark:text-gray-400">
              Address
            </h2>
            {!isEditingAddress && (
              <FiEdit2
                className="text-gray-500 hover:text-blue-600 cursor-pointer"
                onClick={() => setIsEditingAddress(true)}
              />
            )}
          </div>
          {isEditingAddress ? (
            <>
              <textarea
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
                className="w-full border px-2 py-1 rounded"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    teacher.address = editedAddress;
                    setIsEditingAddress(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingAddress(false)}
                  className="border px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p>{teacher.address}</p>
          )}
        </div>
      </div>

      {/* Qualifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Private Qualifications */}
        <div className="bg-white p-4 rounded shadow border dark:bg-gray-800">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700 dark:text-gray-400">
              Private Qualifications
            </h2>
            <div className="flex gap-2">
              {isEditingPrivate ? (
                <>
                  <FiCheck
                    className="text-green-600 cursor-pointer"
                    onClick={() => handleSave("private")}
                  />
                  <FiX
                    className="text-red-600 cursor-pointer"
                    onClick={() => setIsEditingPrivate(false)}
                  />
                </>
              ) : (
                <FiEdit2
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setIsEditingPrivate(true)}
                />
              )}
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Rate ($/hr)</th>
              </tr>
            </thead>

            <tbody>
              {privateQuals.map((q, idx) => (
                <tr key={idx}>
                  <td>
                    {isEditingPrivate ? (
                      <input
                        value={q.name}
                        onChange={(e) =>
                          handleEditChange(
                            "private",
                            idx,
                            "name",
                            e.target.value
                          )
                        }
                        className="border w-full px-2 py-1"
                      />
                    ) : (
                      q.name
                    )}
                  </td>
                  <td>
                    {isEditingPrivate ? (
                      <input
                        type="number"
                        value={q.rate}
                        onChange={(e) =>
                          handleEditChange(
                            "private",
                            idx,
                            "rate",
                            e.target.value
                          )
                        }
                        className="border w-full px-2 py-1"
                      />
                    ) : (
                      `$${q.rate}`
                    )}
                  </td>
                </tr>
              ))}
              {isEditingPrivate && (
                <tr>
                  <td>
                    <input
                      value={newPrivate.name}
                      onChange={(e) =>
                        setNewPrivate({ ...newPrivate, name: e.target.value })
                      }
                      className="border w-full px-2 py-1"
                      placeholder="New Name"
                    />
                  </td>
                  <td className="flex gap-2">
                    <input
                      value={newPrivate.rate}
                      type="number"
                      onChange={(e) =>
                        setNewPrivate({ ...newPrivate, rate: e.target.value })
                      }
                      className="border w-full px-2 py-1"
                      placeholder="Rate"
                    />
                    <FiPlus
                      className="text-blue-600 cursor-pointer h-8 w-8"
                      onClick={() => handleAdd("private")}
                    />
                  </td>
                </tr>
              )}
              <tr className="border-t font-semibold">
                <td>Total</td>
                <td>${totalPrivate}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Group Qualifications */}
        <div className="bg-white p-4 rounded shadow border dark:bg-gray-800">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-gray-700 dark:text-gray-400">
              Group Qualifications
            </h2>
            <div className="flex gap-2">
              {isEditingGroup ? (
                <>
                  <FiCheck
                    className="text-green-600 cursor-pointer"
                    onClick={() => handleSave("group")}
                  />
                  <FiX
                    className="text-red-600 cursor-pointer"
                    onClick={() => setIsEditingGroup(false)}
                  />
                </>
              ) : (
                <FiEdit2
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setIsEditingGroup(true)}
                />
              )}
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Rate ($/hr)</th>
              </tr>
            </thead>

            <tbody>
              {groupQuals.map((q, idx) => (
                <tr key={idx}>
                  <td>
                    {isEditingGroup ? (
                      <input
                        value={q.name}
                        onChange={(e) =>
                          handleEditChange("group", idx, "name", e.target.value)
                        }
                        className="border w-full px-2 py-1"
                      />
                    ) : (
                      q.name
                    )}
                  </td>
                  <td>
                    {isEditingGroup ? (
                      <input
                        type="number"
                        value={q.rate}
                        onChange={(e) =>
                          handleEditChange("group", idx, "rate", e.target.value)
                        }
                        className="border w-full px-2 py-1"
                      />
                    ) : (
                      `$${q.rate}`
                    )}
                  </td>
                </tr>
              ))}
              {isEditingGroup && (
                <tr>
                  <td>
                    <input
                      value={newGroup.name}
                      onChange={(e) =>
                        setNewGroup({ ...newGroup, name: e.target.value })
                      }
                      className="border w-full px-2 py-1"
                      placeholder="New Name"
                    />
                  </td>
                  <td className="flex gap-2">
                    <input
                      value={newGroup.rate}
                      type="number"
                      onChange={(e) =>
                        setNewGroup({ ...newGroup, rate: e.target.value })
                      }
                      className="border w-full px-2 py-1"
                      placeholder="Rate"
                    />
                    <FiPlus
                      className="text-blue-600 cursor-pointer h-8 w-8"
                      onClick={() => handleAdd("group")}
                    />
                  </td>
                </tr>
              )}
              <tr className="border-t font-semibold">
                <td>Total</td>
                <td>${totalGroup}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Remove Button */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          onClick={() => {
            const confirmDelete = window.confirm(
              `Are you sure you want to remove ${teacher.name}?`
            );
            if (confirmDelete) {
              const index = mockTeachers.findIndex((t) => t.id === teacher.id);
              if (index !== -1) {
                mockTeachers.splice(index, 1);
              }
              router.push("/teachers"); // 🔁 Replace with your actual teacher list route
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition-all"
        >
          Remove Teacher
        </button>
      </motion.div>
    </div>
  );
}

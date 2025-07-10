"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FiEdit2, FiPlus, FiCheck, FiX } from "react-icons/fi";

const mockTeachers = [
  {
    id: "1",
    name: "Alynia Allan",
    email: "alyniaallan@example.com",
    phone: "+1 416-649-9057",
    address: "36 Odorado Di Santo Dr, North York, Ontario, Canada",
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

type Qualification = { name: string; rate: number };
type NewQualification = { name: string; rate: string };

export default function TeacherDetailPage() {
  const { id } = useParams();
  const teacher = mockTeachers.find((t) => t.id === id);

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

  const [privateQuals, setPrivateQuals] = useState<Qualification[]>(
    teacher?.privateQualifications || []
  );
  const [groupQuals, setGroupQuals] = useState<Qualification[]>(
    teacher?.groupQualifications || []
  );

  const [newPrivate, setNewPrivate] = useState<NewQualification>({
    name: "",
    rate: "",
  });
  const [newGroup, setNewGroup] = useState<NewQualification>({
    name: "",
    rate: "",
  });

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
      setPrivateQuals((prev) => [
        ...prev,
        { name: newPrivate.name, rate: Number(newPrivate.rate) },
      ]);
      setNewPrivate({ name: "", rate: "" });
    } else {
      if (!newGroup.name.trim() || !newGroup.rate)
        return alert("All fields required.");
      setGroupQuals((prev) => [
        ...prev,
        { name: newGroup.name, rate: Number(newGroup.rate) },
      ]);
      setNewGroup({ name: "", rate: "" });
    }
  };

  const handleSave = (type: "private" | "group") => {
    const list = type === "private" ? privateQuals : groupQuals;
    const isValid = list.every((q) => q.name.trim() && q.rate);

    if (!isValid) return alert("No field can be empty.");
    if (!teacher) return;

    if (type === "private") {
      teacher.privateQualifications = privateQuals;
      setIsEditingPrivate(false);
    } else {
      teacher.groupQualifications = groupQuals;
      setIsEditingGroup(false);
    }
  };

  const handleEditChange = (
    type: "private" | "group",
    index: number,
    field: keyof Qualification,
    value: string
  ) => {
    const update = type === "private" ? [...privateQuals] : [...groupQuals];
    update[index] = {
      ...update[index],
      [field]: field === "rate" ? Number(value) : value,
    };
    if (type === "private") {
      setPrivateQuals(update);
    } else {
      setGroupQuals(update);
    }
  };

  if (!teacher) return <div className="p-6">Teacher not found</div>;

  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">Teacher Details</h2>

      {/* Editable Details */}
      <div className="bg-white rounded-lg p-4 shadow space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Basic Info</h3>
          {!isEditingDetails && (
            <button onClick={() => setIsEditingDetails(true)}>
              <FiEdit2 />
            </button>
          )}
        </div>
        {isEditingDetails ? (
          <div className="space-y-2">
            <input
              className="w-full p-2 border rounded"
              name="name"
              value={editedDetails.name}
              onChange={handleDetailsChange}
              placeholder="Name"
            />
            <input
              className="w-full p-2 border rounded"
              name="email"
              value={editedDetails.email}
              onChange={handleDetailsChange}
              placeholder="Email"
            />
            <input
              className="w-full p-2 border rounded"
              name="role"
              value={editedDetails.role}
              onChange={handleDetailsChange}
              placeholder="Role"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveDetails}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                <FiCheck />
              </button>
              <button
                onClick={() => setIsEditingDetails(false)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                <FiX />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-700 space-y-1">
            <div>Name: {teacher.name}</div>
            <div>Email: {teacher.email}</div>
            <div>Role: {teacher.role}</div>
          </div>
        )}
      </div>

      {/* Qualifications (shared layout for private & group) */}
      {[
        {
          title: "Private Qualifications",
          type: "private" as const,
          list: privateQuals,
          newItem: newPrivate,
          setNewItem: setNewPrivate,
          isEditing: isEditingPrivate,
          setIsEditing: setIsEditingPrivate,
        },
        {
          title: "Group Qualifications",
          type: "group" as const,
          list: groupQuals,
          newItem: newGroup,
          setNewItem: setNewGroup,
          isEditing: isEditingGroup,
          setIsEditing: setIsEditingGroup,
        },
      ].map(
        ({
          title,
          type,
          list,
          newItem,
          setNewItem,
          isEditing,
          setIsEditing,
        }) => (
          <div key={type} className="bg-white rounded-lg p-4 shadow space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{title}</h3>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)}>
                  <FiEdit2 />
                </button>
              )}
            </div>
            {isEditing ? (
              <div className="space-y-2">
                {list.map((qual, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2">
                    <input
                      value={qual.name}
                      onChange={(e) =>
                        handleEditChange(type, idx, "name", e.target.value)
                      }
                      className="p-2 border rounded"
                      placeholder="Name"
                    />
                    <input
                      value={qual.rate}
                      type="number"
                      onChange={(e) =>
                        handleEditChange(type, idx, "rate", e.target.value)
                      }
                      className="p-2 border rounded"
                      placeholder="Rate"
                    />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="p-2 border rounded"
                    placeholder="New Qualification Name"
                  />
                  <input
                    value={newItem.rate}
                    type="number"
                    onChange={(e) =>
                      setNewItem((prev) => ({ ...prev, rate: e.target.value }))
                    }
                    className="p-2 border rounded"
                    placeholder="New Rate"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAdd(type)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    <FiPlus />
                  </button>
                  <button
                    onClick={() => handleSave(type)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    <FiCheck />
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ) : (
              <ul className="list-disc list-inside text-gray-700">
                {list.map((qual, idx) => (
                  <li key={idx}>
                    {qual.name} – ${qual.rate}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      )}
    </div>
  );
}

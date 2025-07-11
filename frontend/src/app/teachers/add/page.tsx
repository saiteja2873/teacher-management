"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function AddTeacherPage() {
  const router = useRouter();

type TeacherFormFields = {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  subjects: string;
  availability: string;
  address: string;
};

  const [formData, setFormData] = useState<TeacherFormFields>({
  name: "",
  email: "",
  phone: "",
  qualification: "",
  subjects: "",
  availability: "",
  address: "",
});

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated backend call
    setTimeout(() => {
      setLoading(false);
      toast.success("Teacher added successfully!");
      router.push("/teachers");
    }, 1000);
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Add New Teacher
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { name: "name", label: "Full Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone Number", type: "tel" },
          { name: "qualification", label: "Qualification", type: "text" },
          { name: "subjects", label: "Subjects", type: "text" },
        ].map(({ name, label, type }, i) => (
          <motion.div
            key={name}
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <Label htmlFor={name} className="text-foreground">
              {label}
            </Label>
            <Input
              id={name}
              type={type}
              name={name}
              value={(formData)[name as keyof TeacherFormFields]}
              onChange={handleChange}
              required
              className="bg-background text-foreground border border-gray-300 dark:border-gray-700"
            />
          </motion.div>
        ))}

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Label htmlFor="address" className="text-foreground">
            Address
          </Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            required
            className="bg-background text-foreground border border-gray-300 dark:border-gray-700"
          />
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Label htmlFor="availability" className="text-foreground">
            Availability
          </Label>
          <Textarea
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            rows={3}
            required
            className="bg-background text-foreground border border-gray-300 dark:border-gray-700"
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-2 px-4 rounded transition"
        >
          {loading ? "Submitting..." : "Add Teacher"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

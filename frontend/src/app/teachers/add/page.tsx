"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "../../../components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AddTeacherPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    subjects: "",
    availability: "",
    address: "", // ✅ Added address
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
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Teacher</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {[
          { name: "name", label: "Full Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone Number", type: "tel" },
          { name: "qualification", label: "Qualification", type: "text" },
          { name: "subjects", label: "Subjects", type: "text" },
        ].map(({ name, label, type }) => (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              type={type}
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {/* ✅ Address Field */}
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability">Availability</Label>
          <Textarea
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Submitting..." : "Add Teacher"}
        </Button>
      </form>
    </div>
  );
}

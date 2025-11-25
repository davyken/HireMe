"use client";

import React, { useState } from "react";
import { Job } from "@/types/types";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface JobEditFormProps {
  job: Job;
  onCancel: () => void;
  onUpdate: (updatedJob: Job) => void;
}

const JobEditForm: React.FC<JobEditFormProps> = ({ job, onCancel, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: job.title || "",
    description: job.description || "",
    location: job.location || "",
    salary: job.salary || 0,
    jobType: job.jobType ? job.jobType[0] : "", // Assuming jobType is array
    tags: job.tags.join(", ") || "",
    skills: job.skills.join(", ") || "",
    salaryType: job.salaryType || "",
    negotiable: job.negotiable || false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedData = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      salary: Number(formData.salary),
      jobType: formData.jobType,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      salaryType: formData.salaryType,
      negotiable: formData.negotiable,
    };

    try {
      const response = await fetch(`/api/jobs/${job._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update job");
      }

      const updatedJob = await response.json();
      toast.success("Job updated successfully");
      onUpdate(updatedJob);
    } catch (error: any) {
      toast.error(error.message || "Error updating job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Job Details</h2>

      <label className="block mb-2">
        Title
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Description
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Location
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Salary
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Job Type
        <input
          type="text"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Tags (comma separated)
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Skills (comma separated)
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Salary Type
        <input
          type="text"
          name="salaryType"
          value={formData.salaryType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-4 flex items-center space-x-2">
        <input
          type="checkbox"
          name="negotiable"
          checked={formData.negotiable}
          onChange={handleChange}
        />
        <span>Negotiable</span>
      </label>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
        <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default JobEditForm;

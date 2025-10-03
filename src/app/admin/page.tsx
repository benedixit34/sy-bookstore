"use client";

import { useState } from "react";

export default function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [editSchoolId, setEditSchoolId] = useState<number | null>(null);
  const [schools, setSchools] = useState([
    { id: 1, name: "Harvard University", location: "USA", type: "Private" },
    { id: 2, name: "University of Lagos", location: "Nigeria", type: "Public" },
    { id: 3, name: "Oxford University", location: "UK", type: "Private" },
  ]);

  const handleAddOrEditSchool = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSchool = {
      id: editSchoolId ? editSchoolId : schools.length + 1,
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      type: formData.get("type") as string,
    };

    if (editSchoolId) {
      setSchools(
        schools.map((s) => (s.id === editSchoolId ? { ...newSchool } : s))
      );
    } else {
      setSchools([...schools, newSchool]);
    }

    setShowForm(false);
    setEditSchoolId(null);
    e.currentTarget.reset();
  };

  const handleDeleteSchool = (id: number) => {
    setSchools(schools.filter((school) => school.id !== id));
  };

  const handleEditSchool = (id: number) => {
    setEditSchoolId(id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Manage schools in the system</p>
        </div>

        <button
          onClick={() => {
            setEditSchoolId(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add School
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3">ID</th>
              <th className="p-3">School Name</th>
              <th className="p-3">Location</th>

              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school, index) => (
              <tr
                key={school.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3">{school.id}</td>
                <td className="p-3">{school.name}</td>
                <td className="p-3">{school.location}</td>
    
                <td className="p-3">
                  <button
                    onClick={() => handleEditSchool(school.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSchool(school.id)}
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            onClick={() => {
              setShowForm(false);
              setEditSchoolId(null);
            }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          ></div>

          {/* Form Card */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 z-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {editSchoolId ? "Edit School" : "Add New School"}
            </h2>
            <form onSubmit={handleAddOrEditSchool} className="space-y-5">
              {/* School Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={
                    editSchoolId
                      ? schools.find((s) => s.id === editSchoolId)?.name
                      : ""
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={
                    editSchoolId
                      ? schools.find((s) => s.id === editSchoolId)?.location
                      : ""
                  }
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>

              {/* Type */}
              

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditSchoolId(null);
                  }}
                  className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
                >
                  {editSchoolId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

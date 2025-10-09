"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/WebButton";

type Book = {
  id: number;
  name: string;
  description: string;
  file: string;
  price: number;
  image: string;
};


async function fetchBooks(): Promise<Book[]> {
  const res = await fetch("/api/books");
  if (!res.ok) throw new Error("Failed to fetch books");
  const data = await res.json();
  return data.books;
}

// Delete book
async function deleteBook(id: number) {
  const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete book");
  return id;
}

// Add/Edit book
async function saveBook(formData: FormData, editBookId: number | null) {
  const url = editBookId ? `/api/books/${editBookId}` : "/api/books";
  const method = editBookId ? "PATCH" : "POST";

  const res = await fetch(url, {
    method,
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to save book");
  return res.json();
}

export default function Page() {
  const [showForm, setShowForm] = useState(false);
  const [editBookId, setEditBookId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const queryClient = useQueryClient();

  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const saveMutation = useMutation({
    mutationFn: ({ formData, id }: { formData: FormData; id: number | null }) =>
      saveBook(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setShowForm(false);
      setEditBookId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books</p>;

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentBook = editBookId
    ? books.find((b) => b.id === editBookId)
    : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-[#53007B] font-[raleway]">Books</h1>
        <PrimaryButton hyperlink="#" text="Add Book" action={() => {
            setEditBookId(null);
            setShowForm(true);
          }} />
        
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
        />

        {showSuggestions && searchTerm && filteredBooks.length > 0 && (
          <ul className="absolute z-10 w-full md:w-1/3 bg-white border rounded-lg mt-1 shadow">
            {filteredBooks.slice(0, 5).map((book) => (
              <li
                key={book.id}
                onClick={() => {
                  setSearchTerm(book.name);
                  setShowSuggestions(false);
                }}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {book.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Books Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3">ID</th>
              <th className="p-3">Thumbnail</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">File</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <tr
                  key={book.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3">{book.id}</td>
                  <td className="p-3">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{book.name}</td>
                  <td className="p-3">${book.price}</td>
                  <td className="p-3 font-medium text-[#53007B] hover:text-[#53007B]/50">
                    {book.file && <Link href={book.file}>Download</Link>}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setEditBookId(book.id);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(book.id)}
                      disabled={deleteMutation.isPending}
                      className="ml-2 px-3 py-1 bg-red-500 text-white font-bold rounded text-sm hover:bg-red-600 disabled:opacity-50"
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            onClick={() => {
              setShowForm(false);
              setEditBookId(null);
            }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          ></div>

          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 z-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {editBookId ? "Edit Book" : "Add New Book"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                saveMutation.mutate({ formData, id: editBookId });
              }}
              encType="multipart/form-data"
              className="space-y-5"
            >
              {/* Book Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentBook?.name || ""}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={currentBook?.price || ""}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required={!editBookId}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File
                </label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.epub,.mobi"
                  required={!editBookId}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={currentBook?.description || ""}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditBookId(null);
                  }}
                  className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="px-5 py-2.5 bg-[#53007B] text-white font-medium rounded-lg shadow hover:bg-[#53007B]/70 transition disabled:opacity-50"
                >
                  {saveMutation.isPending
                    ? "Saving..."
                    : editBookId
                    ? "Update"
                    : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

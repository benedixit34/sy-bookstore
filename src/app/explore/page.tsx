"use client";

import {
  TextInput,
  Button,
  Dropdown,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import { ThemeInit } from "../../../.flowbite-react/init";
import { NavBar } from "@/components/NavBar";
import { EcomCard } from "@/components/ui/EcomCard";
import { FooterBottom } from "@/components/Footer";
import { ToastItem } from "@/components/ui/ToastItem";
import { useState, useEffect } from "react";

export default function Page() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("/api/books");
      const data = await res.json();
      if (!res.ok) {
        console.error("Supabase fetch error:", data.error);
      }
      setBooks(data.books ?? []);
    };
    fetchBooks();
  }, []);
  if (!books) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Loading book...</p>
        </div>
        <FooterBottom />
      </>
    );
  }

  const showToast = (msg: string, duration = 3000) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), duration);
  };

  const filteredBooks = books.filter(
    (book: any) =>
      book.name.toLowerCase().includes(query.toLowerCase())
  );


   const suggestions = query
    ? books.filter((book: any) =>
        book.name.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <>
      <ThemeInit />
      <NavBar />
      {toastMessage && <ToastItem message={toastMessage} />}

      <section className="mx-auto container font-[lexend]">
        <div className="flex flex-col justify-center mx-4 lg:mx-32 pt-48">
          <h1 className="text-5xl font-[raleway] font-bold pb-4 tracking-tight">
            Explore Our Books
          </h1>
          <p className="text-lg text-gray-600 lg:w-1/2 w-full leading-loose">
            Discover a wide range of books across various genres and categories.
            Find your next favorite read today!
          </p>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center content-center gap-y-6 justify-center mt-16 mx-4 xl:mx-32">
          <form className="w-full mx-auto">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
              Search
            </label>
            <div className="relative">
              <TextInput
                type="search"
                id="default-search"
                sizing="lg"
                placeholder="Search For Books"
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
                required
              />

              {query && (
              <ul className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-md w-full mt-1 max-h-60 overflow-y-auto">
                {suggestions.length > 0 ? (
                  suggestions.map((book: any) => (
                    <li
                      key={book.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setQuery(book.name)} // fill input
                    >
                      {book.name}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">
                    No matches found
                  </li>
                )}
              </ul>
            )}
              <Button
                type="submit" onClick={() => setQuery("")}
                className="text-white absolute end-2.5 bottom-2.5 bg-[#53007B]/90 hover:bg-[#53007B] focus:ring-4 focus:outline-none 
              focus:ring-[#53007B]/40 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="lg:mx-32 mx-4 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book: any) => (
              <EcomCard
                key={book.id}
                bookId={book.id}
                imgSrc={book.image}
                bookName={book.name}
                action="Save In Library"
                library={true}
                price={book.price}
              />
            ))
          ) : (
            <p className="text-gray-500 font-[lexend]">No books found.</p>
          )}
        </div>
      </section>
      <FooterBottom />
    </>
  );
}

"use client"

import {
    TextInput,
    Button,
    Dropdown,
    DropdownItem,
    DropdownDivider,

} from "flowbite-react";
import { ThemeInit } from "../../../.flowbite-react/init";
import { NavBar } from "@/app/components/NavBar";
import { EcomCard } from "@/app/components/ui/EcomCard";
import { FooterBottom } from "@/app/components/Footer";
import { ToastItem } from "@/app/components/ui/ToastItem";
import { useState, useEffect } from 'react'



export default function Page() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [books, setBooks] = useState<any[]>([])
  

  useEffect (() => {
    const fetchBooks = async () => {
      const res = await fetch("/api/books")
      const data = await res.json();
      if (!res.ok) {
        console.error("Supabase fetch error:", data.error);
      }
      setBooks(data.books ?? []);


    }
    fetchBooks()
  }, [])
  
  
  

  const showToast = (msg: string, duration = 3000) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), duration);
    };


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
                                required
                            />
                            <Button
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-[#53007B]/90 hover:bg-[#53007B] focus:ring-4 focus:outline-none 
              focus:ring-[#53007B]/40 font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Search
                            </Button>
                        </div>
                    </form>
                    <div className="lg:justify-self-end justify-self-start">
                        <Dropdown
                            label="Filter Books"
                            renderTrigger={() => (
                                <Button
                                    className="flex items-center rounded-lg px-4 py-2 text-white"
                                    style={{ backgroundColor: "#53007B" }}
                                >
                                    Filter Books
                                </Button>
                            )}
                        >
                            <DropdownItem>Dashboard</DropdownItem>
                            <DropdownItem>Settings</DropdownItem>
                            <DropdownItem>Earnings</DropdownItem>
                            <DropdownDivider />
                            <DropdownItem>Separated link</DropdownItem>
                        </Dropdown>
                    </div>
                </div>
            </section>

            <section className="container mx-auto">
                <div className="lg:mx-32 mx-4 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {books && books?.map((book: any) => (
                        <EcomCard key={book.id} bookId={book.id} imgSrc={book.image} bookName={book.name} action="Save In Library"
                            library={true} />
                    ))}

                </div>


            </section>
            <FooterBottom />
        </>

    );
}

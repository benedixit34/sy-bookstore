"use client"

import { NavBar } from "@/components/NavBar";
import { ThemeInit } from "../../.flowbite-react/init"
import { Hero } from "@/components/Hero";
import { EcomCard } from "@/components/ui/EcomCard";
import { FooterBottom } from "@/components/Footer";
import { PrimaryButton } from "@/components/ui/WebButton";
import { useEffect, useState } from "react";
import { BookProps } from "@/lib/types/components";


export default function Page() {
   const [books, setBooks] = useState<BookProps[]>([])

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

    for (const book of books){
      console.log(book.price)

    }
  return (
    <>
      <ThemeInit />
      <NavBar />
      <Hero />
      <section className="mx-auto container">
        <div className="flex flex-col justify-center mx-4 lg:mx-10 xl:mx-32">
        <h1 className="text-5xl font-[raleway] font-bold pb-16 tracking-tight text-center">Latest Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between gap-2 w-full">
          {books &&  [...books].reverse().slice(0, 3).map((book)=>
          <EcomCard key={book.id} bookId={book.id} imgSrc={book.image} bookName={book.name} 
          action="Add To Cart"  price={book.price} />
          )}
          
          




        </div>
        </div>
      </section>
      <section className="my-32 container mx-auto font-[lexend]">
        <div className="font-[raleway] grid grid-cols-1 lg:grid-cols-2 border-[0.5px] border-zinc-400 
        rounded-xl shadow-lg mx-4 lg:mx-10 xl:mx-32">
        <div className="px-4 lg:px-16 content-center py-16 space-y-10">
          <h1 className="text-3xl font-bold tracking-tighter mb-5">Get Culture Books For Your School</h1>
          <p className="leading-loose font-regular font-[lexend] ">Bring culture alive in your classrooms with digital learning resources designed for today’s
            students. Our curated collection of eBooks helps schools introduce children to local traditions,
            folklore, history, and global cultures in a fun and interactive way.</p>
          <PrimaryButton hyperlink="https://sabiyou.com/contact" text="Get In Touch"/>


        </div>
        <div className="md:block hidden bg-[url('/school.svg')] bg-cover border-l-[0.5px] bg-center h-full rounded-tr-xl rounded-br-xl">

        </div>
        </div>
      </section>
      <FooterBottom />


    </>
  );
}

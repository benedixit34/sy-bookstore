"use client";

import { FooterBottom } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PrimaryButton } from "@/components/ui/WebButton";
import { handleSave } from "@/utils/handleSave";
import { BookProps } from "@/lib/types/components";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const [book, setBook] = useState<BookProps | null>(null);

  useEffect(() => {
    const getBook = async () => {
      const res = await fetch(`/api/books/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      setBook(data.book);
    };
    getBook();
  }, [id]);

  console.log(book);
  if (!book) {
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

  return (
    <>
      <NavBar />
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:px-32 xl:pt-64 xl:pb-32 md:px-10 py-32 px-4 gap-12 place-items-center">
        <div className="">
          <Image
            src={book.image.trimStart() || "/book_cover.jpg"}
            alt={book.name}
            width={500}
            height={700}
            className="w-full h-auto"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tighter font-[raleway]">
            {book.name}
          </h1>
          <p className="text-md text-gray-400 font-[lexend]">By Afroeuropean</p>
          <h5 className="text-3xl font-medium font-[lexend]">${book.price}</h5>
          <p className="text-md leading-loose font-[lexend]">{book.description} </p>

          <PrimaryButton hyperlink="/cart" text="Add to Cart" action={() => handleSave(book.id, book.name, book.image)} />
        </div>
      </section>
      <FooterBottom />
    </>
  );
}

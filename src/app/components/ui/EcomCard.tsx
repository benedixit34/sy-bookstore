"use client";


import { Card, Button } from "flowbite-react";
import StarRating from "./StarRating";
import Link from "next/link";
import { ToastItem } from "./ToastItem";
import Cookies from "js-cookie";
import { useState } from "react";


type EcomCardProps = {
  imgSrc: string;
  bookName: string;
  action?: string;
  library?: boolean;
  
};

type LibraryItem = {
  bookName: string;
  imgSrc: string;
};


export function EcomCard({ imgSrc, bookName, action, library }: EcomCardProps) {

   const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string, duration = 3000) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), duration);
    };

   
  const handleSave = () => {
    
    const existing: LibraryItem[] = JSON.parse(Cookies.get("library") || "[]");
     const alreadyExists = existing.some(
      (item: LibraryItem) => item.bookName === bookName && item.imgSrc === imgSrc
    );

    if (alreadyExists) {
      showToast?.(`${bookName} is already in your library!`);
      return;
    }
    if (!existing.includes({bookName: bookName, imgSrc: imgSrc})) {
      existing.push({bookName: bookName, imgSrc: imgSrc});
      Cookies.set("library", JSON.stringify(existing), { expires: 7 }); // expires in 7 days
    }
    

    showToast?.(`${bookName} has been added to your library!`);
    console.log(Cookies.get("library"));
  };
  return (
    <>
    {toastMessage && <ToastItem message={toastMessage} />}
    <Card
      className="w-full border-zinc-400 font-[lexend]"
      imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
      imgSrc={imgSrc}
    >
      <Link href="/book/detail">
        <h5 className="text-lg font-medium tracking-tight text-gray-900 ">
          {bookName}
        </h5>
        <p className="text-sm font-extralight text-gray-500 mt-2">
          Afroeuropean
        </p>
      </Link>
      <div className="mb-5 mt-1 flex items-center">
        <StarRating rating={4.8} />
        <span className="ml-3 mr-2 rounded bg-[#53007B]/20 px-2.5 py-0.5 text-xs font-semibold text-[#53007B]">
          5.0
        </span>
      </div>
      <div className="flex items-center justify-between">
        {
          library == false ?
          <span className="text-3xl font-bold text-gray-900">$599</span>: null
        }

        <Button onClick={handleSave}
          className="rounded-lg bg-[#53007B] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#53007B]/80 focus:outline-none 
          focus:ring-4 focus:ring-[#53007B]/40">
          {action}
        </Button>
      </div>
      
    </Card>
  </>
  );
}

"use client"
import Image from "next/image";
import React from "react";
import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

type CartItemProps = {
  imgSrc: string;
  bookName: string;
  price?: number;
  school?: boolean;
};

export default function CartItemCard({
  imgSrc,
  bookName,
  price,
  school

}: CartItemProps) {


  const [library, setLibrary] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(true);


  

  useEffect(() => {
    const cookieLibrary = Cookies.get("library");
    if (cookieLibrary) {
      setLibrary(JSON.parse(cookieLibrary));
    }
  }, []);

  const removeItem = (bookNameToRemove: string) => {
    const updatedLibrary = library.filter(item => {
      return item.bookName.trim() !== bookNameToRemove.trim();
    });
    setVisible(false);
    setLibrary(updatedLibrary);
    Cookies.set("library", JSON.stringify(updatedLibrary));
  };

  if (!visible) return null;

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-zinc-500 flex 
    items-center gap-4 p-4 font-[lexend]">
      {/* Product Image */}
      <Image
        src={imgSrc.trimStart()}
        alt={bookName}
        className="w-20 h-20 object-cover rounded-lg border"
        width={80}
        height={80}
      />

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{bookName}</h3>
        {!school && price !== undefined && price !== null && (
          <p className="text-gray-600">{`$${price?.toFixed(2)}`}</p>
        )}
      </div>


      <Button onClick={() => removeItem(bookName)}
        className="text-red-500 hover:text-red-700 font-medium"
      
      >
        ✕
      </Button>
    </div>
  );
}

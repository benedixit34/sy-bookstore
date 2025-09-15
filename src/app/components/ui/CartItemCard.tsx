"use client"
import Image from "next/image";
import React from "react";
import { Button } from "flowbite-react";
import { XMarkIcon } from "@heroicons/react/20/solid";

type CartItemProps = {
  imgSrc: string;
  bookName: string;
  price?: number;
  school?: boolean;
  onRemoveAction: (bookName: string) => void;

};

export default function CartItemCard({
  imgSrc,
  bookName,
  price,
  school,
  onRemoveAction

}: CartItemProps) {


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


        <XMarkIcon onClick={() => onRemoveAction(bookName)} className="text-[#53007B] w-12" />
    
    </div>
  );
}

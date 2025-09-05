"use client"
import Image from "next/image";
import React from "react";

type CartItemProps = {
  imgSrc: string;
  name: string;
  price: number;
  quantity: number;
  
};

export default function CartItemCard({
  imgSrc,
  name,
  price,
  quantity,

}: CartItemProps) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-zinc-500 flex items-center gap-4 p-4">
      {/* Product Image */}
      <Image
        src={imgSrc}
        alt={name}
        className="w-20 h-20 object-cover rounded-lg border"
        width={80}
        height={80}
      />

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">${price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100"
            
          >
            -
          </button>

          <span className="px-2 font-medium">{quantity}</span>

          <button
            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100"
            
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        className="text-red-500 hover:text-red-700 font-medium"
      
      >
        ✕
      </button>
    </div>
  );
}

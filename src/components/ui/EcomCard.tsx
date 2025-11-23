"use client";

import { Card, Button } from "flowbite-react";
import StarRating from "./StarRating";
import Link from "next/link";
import { ToastItem } from "./ToastItem";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { handleSave } from "@/utils/handleSave";
import { EcomCardProps } from "@/lib/types/components"


async function fetchRole() {
  const res = await fetch("/api/auth/role");
  if (!res.ok) throw new Error("Failed to fetch role");
  return res.json();
}

export function EcomCard({
  bookId,
  imgSrc,
  bookName,
  action,
  price,
}: EcomCardProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["role"],
    queryFn: fetchRole,
  });

  const isSchoolAdmin = data?.isSchoolAdmin ?? false;
  const item = { bookId, bookName, imgSrc, price };

  const showToast = (msg: string, duration = 3000) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), duration);
  };

  return (
    <>
      {toastMessage && <ToastItem message={toastMessage} />}

      <Card
        className="w-full border-zinc-400 font-[lexend]"
        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
        imgSrc={imgSrc || "/book-placeholder.png"}
      >
        <Link href={`/explore/book/${bookId}`}>
          <h5 className="text-lg font-medium tracking-tight text-gray-900 hover:text-[#53007B]">
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
         
          {!isSchoolAdmin && (
            <span className="text-3xl font-bold text-gray-900">£{price}</span>
          )}

          <Button
            onClick={() => handleSave(item, showToast)}
            className="rounded-lg bg-[#53007B] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#53007B]/80 focus:outline-none 
            focus:ring-4 focus:ring-[#53007B]/40"
          >
            {action}
          </Button>
        </div>
      </Card>
    </>
  );
}

import { Card } from "flowbite-react";
import StarRating from "./StarRating";
import Link from "next/link";

type EcomCardProps = {
  imgSrc: string;
  bookName: string;
};

export function EcomCard({ imgSrc, bookName }: EcomCardProps) {
  return (
    <Card
      className="w-full border-zinc-400"
      imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
      imgSrc={imgSrc}
    >
      <Link href="/book/detail">
        <h5 className="text-lg font-medium tracking-tight text-gray-900 ">
          {bookName}
        </h5>
        <p className="text-sm font-extralight text-gray-500 mt-2">
          Author Name
        </p>
      </Link>
      <div className="mb-5 mt-1 flex items-center">
        <StarRating rating={4.8} />
        <span className="ml-3 mr-2 rounded bg-[#53007B]/20 px-2.5 py-0.5 text-xs font-semibold text-[#53007B]">
          5.0
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900">$599</span>
        <Link
          href="#"
          className="rounded-lg bg-[#53007B] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#53007B]/80 focus:outline-none 
          focus:ring-4 focus:ring-[#53007B]/40">
          Add to cart
        </Link>
      </div>
    </Card>
  );
}

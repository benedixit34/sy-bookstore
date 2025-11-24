"use client";

import Image from "next/image";
import { useToast } from "@/hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PrimaryButton } from "@/components/ui/WebButton";
import { ToastItem } from "@/components/ui/ToastItem";
import { handleSave } from "@/utils/handleSave";
import { LoadingMsg } from "@/components/Loader";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;
  const { toastMessage, showToast } = useToast();

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await fetch(`/api/books/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch book");
      const data = await res.json();
      return data.book;
    },
    enabled: !!id,
  });

  const item = {
    bookId: book?.id ?? "",
    bookName: book?.name ?? "",
    imgSrc: book?.image ?? "",
    price: book?.price ?? "",
  };

  if (isLoading) {
    return (
     <LoadingMsg msg="Loading Book" />
    );
  }

  return (
    <>
      {toastMessage && <ToastItem message={toastMessage} />}

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
          <p className="text-md leading-loose font-[lexend]">
            {book.description}{" "}
          </p>

          <PrimaryButton
            hyperlink="/cart"
            text="Add to Cart"
            action={() => handleSave(item, showToast)}
          />
        </div>
      </section>
    </>
  );
}

"use client"

import { useQuery } from "@tanstack/react-query";
import { PrimaryButton } from "@/components/ui/WebButton";
import { EcomCard } from "@/components/ui/EcomCard";
import { Hero } from "@/components/Hero";
import { BookProps } from "@/lib/types/components";
import { LoadingMsg } from "@/components/Loader";

export default function Page() {
  
  const {
    data: books = [],
    isLoading,
    
  } = useQuery<BookProps[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await fetch("/api/books");
      const data = await res.json();

      if (!res.ok) {
        console.error("Supabase fetch error:", data.error);
        throw new Error(data.error || "Failed to fetch books");
      }

      return data.books ?? [];
    },
    staleTime: 1000 * 60 * 2, // 2 minutes caching
  });

  if (isLoading) {
    return (
      <LoadingMsg msg="Loading...." />
    );
  }

  return (
    <>
      <Hero />
      <>
        {/* Latest Books Section */}
        <section className="mx-auto container">
          <div className="flex flex-col justify-center mx-4 lg:mx-10 xl:mx-32">
            <h1 className="text-5xl font-[raleway] font-bold pb-16 tracking-tight text-center">
              Latest Books
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between gap-2 w-full">
              {[...books]
                .reverse()
                .slice(0, 3)
                .map((book) => (
                  <EcomCard
                    key={book.id ?? Math.random().toString()}
                    bookId={book.id ?? ""}
                    imgSrc={book.image ?? ""}
                    bookName={book.name ?? ""}
                    action="Add To Cart"
                    price={book.price ?? ""}
                  />
                ))}
            </div>
          </div>
        </section>

        {/* School Promo Section */}
        <section className="my-32 container mx-auto font-[lexend]">
          <div
            className="font-[raleway] grid grid-cols-1 lg:grid-cols-2 border-[0.5px] border-zinc-400 
            rounded-xl shadow-lg mx-4 lg:mx-10 xl:mx-32"
          >
            <div className="px-4 lg:px-16 content-center py-16 space-y-10">
              <h1 className="text-3xl font-bold tracking-tighter mb-5">
                Get Culture Books For Your School
              </h1>
              <p className="leading-loose font-regular font-[lexend]">
                Bring culture alive in your classrooms with digital learning
                resources designed for today’s students. Our curated collection
                of eBooks helps schools introduce children to local traditions,
                folklore, history, and global cultures in a fun and interactive
                way.
              </p>
              <PrimaryButton
                hyperlink="https://sabiyou.com/contact"
                text="Get In Touch"
              />
            </div>
            <div className="md:block hidden bg-[url('/school.svg')] bg-cover bg-center h-full rounded-tr-xl rounded-br-xl"></div>
          </div>
        </section>
      </>
    </>
  );
}

"use client"

import { LibraryCard } from "@/components/ui/LibraryCard"
import { ThemeInit } from "../../../.flowbite-react/init"
import { BookProps } from "@/lib/types/components"
import { useQuery } from "@tanstack/react-query"
import { LoadingMsg } from "@/components/Loader"


interface LibraryItem {
  id: string;
  book: BookProps;
}

export default function LibraryPage() {

   const {
    data: libraryData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["library"],
    queryFn: async () => {
      const res = await fetch("/api/library");
      if (!res.ok) throw new Error("Failed to fetch library");
      const data = await res.json();
      return data.library ?? [];
    },
  });





  const library = libraryData ?? []

   if (isLoading) {
      return (
        <LoadingMsg msg="Loading Library" />
      );
    }
  
    if (isError) {
      return (
        <LoadingMsg msg="Error Fetching Library" />
      );
    }


  return (
    <>
      <ThemeInit />
      <section className="mx-auto container">
        <div className="pt-48 flex flex-col items-center justify-center min-h-screen pb-16">
          <h1 className="text-5xl font-[raleway] font-bold pb-4 tracking-tight">
            My Library
          </h1>
          {library.length > 0 ?

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between gap-6 w-full mt-16 px-4 xl:px-32">
            {library?.map((item: LibraryItem) => (
              <LibraryCard
                key={item.book.id}
                imgSrc={item.book.image}
                bookName={item.book.name}
                bookDescription={item.book.description}
                fileLink={item.book.file}
              />
            ))}
          </div>
: <p className="text-gray-600 font-[lexend]">Your library is empty. Start browsing our collection!</p>}
        </div>
      </section>
    </>
  );
}

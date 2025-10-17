import { FooterBottom } from "@/components/Footer"
import { NavBar } from "@/components/NavBar"
import { LibraryCard } from "@/components/ui/LibraryCard"
import { ThemeInit } from "../../../.flowbite-react/init"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { BookProps } from "@/lib/types/components"


interface LibraryItem {
  id: string;
  book: BookProps;
}

export default async function LibraryPage() {
  const supabase = await createClient()

  const {data: { user }} = await supabase.auth.getUser()
  if (!user){
    redirect("/auth/login")
  }


  const { data, error } = await supabase
    .from("library")
    .select(`
      id,
      book (
        id,
        name,
        description,
        image,
        file
      )
    `)

  const library = data?.map(item => ({...item, book: item.book[0]})) as LibraryItem[] || [];

  if (error) {
    console.error("Supabase fetch error:", error.message)
  }

  return (
    <>
      <ThemeInit />
      <NavBar />
      <section className="mx-auto container">
        <div className="pt-48 flex flex-col items-center justify-center min-h-screen pb-16">
          <h1 className="text-5xl font-[raleway] font-bold pb-4 tracking-tight">
            My Library
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between gap-6 w-full mt-16 px-4 xl:px-32">
            {library?.map((item) => (
              <LibraryCard
                key={item.book.id}
                imgSrc={item.book.image}
                bookName={item.book.name}
                bookDescription={item.book.description}
                fileLink={item.book.file}
              />
            ))}
          </div>
        </div>
      </section>
      <FooterBottom />
    </>
  );
}

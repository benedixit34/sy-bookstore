import { FooterBottom } from "@/app/components/Footer"
import { NavBar } from "@/app/components/NavBar"
import { LibraryCard } from "@/app/components/ui/LibraryCard"
import { ThemeInit } from "../../../../.flowbite-react/init"

export default function Page () {
    return (
    <>
    <ThemeInit />
    <NavBar />
    <section className="mx-auto container">
      <div className="pt-48 flex flex-col items-center justify-center min-h-screen pb-16">
        <h1 className="text-5xl font-[raleway] font-bold pb-4 tracking-tight">My Library</h1>
      
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between gap-6 w-full mt-16 px-4 xl:px-32">
          <LibraryCard />
          <LibraryCard />
          <LibraryCard />
          <LibraryCard />
          <LibraryCard />
          <LibraryCard />
          <LibraryCard />
          <LibraryCard />

        </div>
        
      </div>
    </section>
    <FooterBottom />
      </>
    )
  }
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
          <LibraryCard imgSrc="/Pierogi.png" bookName="Milo's Pierogi: A Krakow Adventure of Flavors and Surprises" bookDescription="Join Milo on a delightful journey through Krakow as he discovers the magic of pierogi-making, friendship, and the joy of sharing culture." />
          <LibraryCard imgSrc="/Kwame.png" bookName="Kwame's Kente Adventure: Threads of Joy from Ghana" bookDescription="Follow Kwame as he embarks on an exciting adventure to learn about the vibrant tradition of Kente weaving in Ghana, celebrating heritage and creativity." />
          <LibraryCard imgSrc="/Chopsticks.png" bookName="The Mismatched Chopsticks: A Tale of Lanterns, Noodles, and New Luck" bookDescription="Dive into a heartwarming story of friendship and cultural discovery as two children from different backgrounds bond over a shared meal and the magic of lantern festivals." />

        </div>
        
      </div>
    </section>
    <FooterBottom />
      </>
    )
  }
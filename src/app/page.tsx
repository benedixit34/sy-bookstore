import { NavBar } from "@/app/components/NavBar";
import { ThemeInit } from "../../.flowbite-react/init"
import { Hero } from "@/app/components/Hero";
import { EcomCard } from "@/app/components/ui/EcomCard";
import { FooterBottom } from "@/app/components/Footer";
import { PrimaryButton } from "@/app/components/ui/WebButton";


export default function Home() {
  return (
    <>
      <ThemeInit />
      <NavBar />
      <Hero />
      <section className="mx-auto container">
        <div className="flex flex-col justify-center mx-4 lg:mx-10 xl:mx-32">
        <h1 className="text-5xl font-[raleway] font-bold pb-16 tracking-tight text-center">Latest Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-between gap-2 w-full">
          <EcomCard imgSrc="./Pierogi.png" bookName="Milo's Pierogi: A Krakow Adventure of Flavors and Surprises" />
          <EcomCard imgSrc="./Kwame.png" bookName="Kwame's Kente Adventure: Threads of Joy from Ghana" />
          <EcomCard imgSrc="./Chopsticks.png" bookName="The Mismatched Chopsticks: A Tale of Lanterns, Noodles, and New Luck" />
          




        </div>
        </div>
      </section>
      <section className="my-32 container mx-auto font-[lexend]">
        <div className="font-[raleway] grid grid-cols-1 lg:grid-cols-2 border-[0.5px] border-zinc-400 
        rounded-xl shadow-lg mx-4 lg:mx-10 xl:mx-32">
        <div className="px-4 lg:px-16 content-center py-16 space-y-10">
          <h1 className="text-3xl font-bold tracking-tighter mb-5">Get Culture Books For Your School</h1>
          <p className="leading-loose font-regular font-[lexend] ">Bring culture alive in your classrooms with digital learning resources designed for today’s
            students. Our curated collection of eBooks helps schools introduce children to local traditions,
            folklore, history, and global cultures in a fun and interactive way.</p>
          <PrimaryButton hyperlink="https://sabiyou.com/contact" text="Get In Touch"/>


        </div>
        <div className="md:block hidden bg-[url('/school.svg')] bg-cover border-l-[0.5px] bg-center h-full rounded-tr-xl rounded-br-xl">

        </div>
        </div>
      </section>
      <FooterBottom />


    </>
  );
}

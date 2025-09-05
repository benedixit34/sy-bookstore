import { NavBar } from "./components/NavBar";
import { ThemeInit } from "../../.flowbite-react/init"
import { Hero } from "./components/Hero";
import { EcomCard } from "./components/ui/EcomCard";
import { FooterBottom } from "./components/Footer";


export default function Home() {
  return (
    <>
      <ThemeInit />
      <NavBar />
      <Hero />
      <section className="mx-auto container">
        <div className="flex flex-col justify-center mx-4 lg:mx-10 xl:mx-32">
        <h1 className="text-5xl font-[raleway] font-bold pb-16 tracking-tight text-center">Latest Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-between gap-2 w-full">
          <EcomCard imgSrc="./book_cover.jpg" bookName="Create Your Own Business" />
          <EcomCard imgSrc="./book_cover.jpg" bookName="Create Your Own Business" />
          <EcomCard imgSrc="./book_cover.jpg" bookName="Create Your Own Business" />
          <EcomCard imgSrc="./book_cover.jpg" bookName="Create Your Own Business" />
          
          


        </div>
        </div>
      </section>
      <section className="my-32 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 border-[0.5px] border-zinc-400 rounded-xl shadow-lg mx-4 lg:mx-10 xl:mx-32">
        <div className="px-4 lg:px-16 content-center py-16">
          <h1 className="text-2xl font-bold tracking-tighter mb-5">Get Culture Books For Your School</h1>
          <p className="leading-loose">Bring culture alive in your classrooms with digital learning resources designed for today’s
            students. Our curated collection of eBooks helps schools introduce children to local traditions,
            folklore, history, and global cultures in a fun and interactive way.</p>
          <a href="#" className="mt-5 inline-block rounded-lg bg-[#53007B] px-6 py-3.5 text-center font-medium text-white
         hover:bg-[#53007B]/90 focus:outline-none focus:ring-4 focus:ring-[#53007B]/50 
         ">Get In Touch</a>


        </div>
        <div className="md:block hidden bg-[url('/school.svg')] bg-cover border-l-[0.5px] bg-center h-full rounded-tr-xl rounded-br-xl">

        </div>
        </div>
      </section>
      <FooterBottom />


    </>
  );
}

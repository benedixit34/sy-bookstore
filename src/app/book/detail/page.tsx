import { FooterBottom } from "@/app/components/Footer";
import { NavBar } from "@/app/components/NavBar";
import Image from "next/image";

export default function BookDetail() {

    return (
        <>
        <NavBar />
        <section className="grid grid-cols-2 p-32 gap-x-12 place-items-center">
            <div className="">
                <Image
      src="/book_cover.jpg"
      alt="Book cover"
      width={500}
      height={700}
      className="w-full h-auto"
    />

            </div>
            <div className="space-y-6">
                <h1 className="text-4xl font-semibold tracking-tighter">Create A Great Business Today</h1>
                <p className="text-md text-gray-400">By Aaron Greene</p>
                <h5 className="text-3xl font-medium">$99.99</h5>
                <p className="text-md leading-loose">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a lacus odio. 
                    Suspendisse condimentum justo erat, eget luctus risus commodo non. Nulla et ultrices purus, vel elementum velit. 
                    Integer at gravida dolor. Ut rhoncus risus et nibh cursus, id malesuada 
                    enim finibus. Duis semper pretium iaculis. Quisque ornare efficitur turpis, eu facilisis arcu pellentesque 
                    tristique. </p>
                
                <a href="#" className="inline-block rounded-lg bg-[#53007B] px-6 py-3.5 text-center font-medium text-white
         hover:bg-[#53007B]/90 focus:outline-none focus:ring-4 focus:ring-primary-300 
         ">Add To Cart</a>

            </div>
        
        </section>
        <FooterBottom />
        </>
    )



}
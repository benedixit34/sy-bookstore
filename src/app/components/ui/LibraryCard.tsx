import Image from "next/image";
import Link from "next/link";

export function LibraryCard() {
    return (
           <div className="border-1 border-zinc-400 flex flex-col space-y-10 justify-center gap-x-20 bg-[#f7c6ff]/20 shadow-lg rounded-2xl">

            <Image src="/school.svg" alt="Featured Story on SabiYou"
              width={500} height={500} className="rounded-t-2xl w-full h-full object-top object-cover" />

            <div className="flex flex-col gap-y-2 self-center px-6 pb-16">
              <h2 className="text-xl text-[#282829] tracking-tighter font-bold">Lorem Ipsum</h2>
  
              <p className=" text-[18px]/[30px]">Indian culture is among the oldest, as the people of India can trace their civilization back as far as 4,500 years ago. Today, India is a very diverse…</p>
              <div className="mt-6">
                <Link href=""
                  className="px-6 py-3  font-medium border-2 border-transparent hover:border-[#53007B] bg-[#53007B] hover:bg-transparent
                             text-white hover:text-[#53007B] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#53007B] focus:ring-offset-2 transition duration-300 ease-in-out">
                  Download
                </Link>

              </div>

            </div>
          </div>
    )
}
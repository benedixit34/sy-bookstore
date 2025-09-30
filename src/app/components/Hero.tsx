import Image from "next/image";

export function Hero() {
    return (
        <section className="container mx-auto">
            <div className="flex flex-col pt-24 lg:pt-48 pb-16 mx-4 xl:mx-32 justify-center ">
                <div className="px-4 pb-8 flex flex-col gap-y-12 lg:gap-12 lg:pb-16">
                    <div className="content-center justify-self-center md:text-center mt-12 lg:mt-0">
                        <h1 className="mb-4 text-3xl text-left md:text-center font-bold leading-12 xl:leading-18 
                        tracking-tight font-[raleway] md:text-5xl xl:text-6xl">
                            Get Culture E-Books
                            <br />
                            At A Discounted Price!
                        </h1>
                        <p className="mb-4 text-gray-500 md:mb-12 lg:mb-5 text-md font-[lexend]">
                            Don&apos;t Wait - Limited Stock at Unbeatable Prices!
                        </p>
                        <a
                            href="#"
                            className="inline-block rounded-lg bg-[#53007B] px-6 py-3.5 text-center font-medium text-white
         hover:bg-[#53007B]/90 focus:outline-none focus:ring-4 focus:ring-[#53007B]/50 font-[lexend]         "
                        >
                            Shop Now
                        </a>
                    </div>

                    <div className="flex justify-center rounded-2xl flex-col place-content-center w-full">
                        <div
                            className="flex flex-col lg:shadow-2xl bg-white/50 backdrop-blur-2xl relative 
                z-10 border-zinc-400 border-[0.5px] rounded-xl"
                        >
                            <Image
                                src="/book_flat.svg"
                                className="w-full h-96 object-cover rounded-xl"
                                alt="Book Cover"
                                height={384}
                                width={256}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

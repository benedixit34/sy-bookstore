"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid"
import { signOutAction } from "@/utils/authActions"
import { PrimaryButton, SecondaryButton }from "./ui/WebButton"
import { getCookie } from "@/lib/getCookie"
import { CartItemProps } from "@/lib/types/components"


export function NavBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [ cartCookie, setCartCookie ] = useState<Partial<CartItemProps>[]>([])

    useEffect(() => {
      async function verifyUser() {
        const res = await fetch("/api/auth");
        const data = await res.json();
        setIsLoggedIn(data?.loggedIn);
      }
      verifyUser();

      async function cookie_getter(){
        const cookie_array = await getCookie()
        setCartCookie(cookie_array)
      }
      cookie_getter()

      
    }, []);
    

    return (
        <header className={`bg-white fixed border-b-1 border-zinc-400 w-full font-medium text-[#282829] font-[family-name:var(--font-lexend)] tracking-tighter transition-all duration-300 ease-in-out text-[18px]} z-50`}>
            <nav className="grid grid-cols-2 lg:grid-cols-3 justify-center py-6 lg:mx-32 4xl:mx-64 mx-4 sm:mx-10 rounded-2xl">
                <Link href="/"><Image src="/sabiyou.png" alt="Sabiyou Logo" width={150} height={150} className="lg:w-20 w-14" /></Link>
                <ul className="lg:flex gap-x-4 hidden place-items-center place-self-center">
                    <li className="py-2 px-4 rounded-lg hover:text-[#53007B]"><Link href="/">Home</Link></li>
                    <li className="py-2 px-4 rounded-lg hover:text-[#53007B]"><Link href="/explore">Explore</Link></li>
                    <li className="py-2 px-4 rounded-lg hover:text-[#53007B] space-x-3"><Link href="/cart">Cart 
                    {cartCookie.length > 0 ? <span className="bg-[#53007B] text-white py-1 px-2 ml-2 rounded-lg"> 
                        {cartCookie.length}</span> : ""}</Link></li>
                    
                </ul>

                <ul className="lg:flex gap-x-4 hidden place-items-center place-self-end">
                    {isLoggedIn ? 
                    <>
                    <li><SecondaryButton hyperlink="/library" text="Check Library"/></li>
                    <li><PrimaryButton hyperlink="#" text="Logout" action={signOutAction} /></li></>:
                     <>
                     <li><PrimaryButton hyperlink="/auth/login" text="Login"/></li>
                     <li><SecondaryButton hyperlink="/auth/register" text="Register"/></li>
                     </>}

                        
                </ul>


                <div className="relative w-10 h-10 flex lg:hidden place-content-start place-self-end">
                    <button onClick={() => setIsOpen(!isOpen)} className="relative w-full h-full">
                        {/* Menu Icon */}
                        <Bars3Icon className={`absolute text-[#53007B] inset-0 transition-all duration-300 ease-in-out transform 
                        ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                          }`} />
                        {/* Close Icon */}
                        <XMarkIcon className={`absolute text-[#53007B] inset-0 transition-all duration-300 ease-in-out transform 
                        ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                                }`}
                        />
                    </button>
                </div>


            </nav>
            {isOpen &&
                <div className="transition-all duration-300 ease-in-out transform lg:hidden flex flex-col bg-white gap-y-10 h-[90vh] pt-12 pl-10 text-[22px] tracking-tighter font-bold overflow-hidden max-h-screen">
                    <Link href="/" className="py-2 px-4 rounded-lg hover:text-[#53007B]">Home</Link>
                    <Link href="/explore" className="py-2 px-4 rounded-lg hover:text-[#53007B]">Explore</Link>
                    <Link href="/library" className="py-2 px-4 rounded-lg hover:text-[#53007B]">Library</Link>
                    <Link href="/cart" className="py-2 px-4 rounded-lg hover:text-[#53007B]">Cart <span></span></Link>
                    {isLoggedIn ? <Link href="/auth/login" className="py-2 px-4 rounded-lg hover:text-[#53007B]">Logout</Link>:<>
                    <Link href="/auth/login" className="py-2 px-4 rounded-lg hover:text-[#53007B]">Login</Link>
                    <Link href="/auth/register" className="py-2 px-4 rounded-lg hover:text-[#53007B]">Register</Link></>
                    
                
                }
                </div>
            }


        </header>


    );
}

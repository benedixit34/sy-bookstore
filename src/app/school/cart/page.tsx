"use client"

import { ThemeInit } from "../../../../.flowbite-react/init"
import { FooterBottom } from "@/app/components/Footer"
import { NavBar } from "../../components/NavBar"
import CartItemCard from "../../components/ui/CartItemCard";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
type CartItem = {
  imgSrc: string;
  bookName: string;
  price: number;
  school?: boolean;
};

import { Button } from "flowbite-react";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cookieCart = Cookies.get("library");
    if (cookieCart) {
      try {
        setCartItems(JSON.parse(cookieCart));
      } catch (err) {
        console.error("Failed to parse cart cookie", err);
      }
    }
  }, []);
  return (
    <>
    <ThemeInit />
    <NavBar />
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-4 pt-48 mb-32 mx-4">
      <h1 className="text-3xl font-[raleway] font-bold text-gray-800 mb-8">Cart Summary</h1>

    {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <CartItemCard
            key={index}
            imgSrc={item.imgSrc}
            bookName={item.bookName}
            school={item.school}
          />
        ))
      )}

      <div className="mt-4 font-[lexend]">
        <Button className="bg-[#53007B] mt-4">Proceed to Checkout</Button>
      </div>

    </div>
    <FooterBottom />
    </>
                                            
  );
}
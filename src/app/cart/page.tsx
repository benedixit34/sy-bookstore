"use client";

import { ThemeInit } from "../../../.flowbite-react/init";
import { useState } from "react"
import CartItemCard from "@/components/ui/CartItemCard";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/getCookie";
import { useQuery } from "@tanstack/react-query";
import { useRemoveItem } from "@/hooks/useRemoveItem";
import { useCartAction } from "@/hooks/useCartAction";
import { CartItemProps } from "@/lib/types/components"; 



const calculateCartTotal = (cart: CartItemProps[]): string => {
  const total = cart.reduce((sum, item) => {
    const price = item.price;
    return sum + price;
  }, 0);
  return total.toFixed(2);
};


export default function Page() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItemProps[]>([]);
  
    const { data: authData, isLoading } = useQuery({
      queryKey: ["authStatus"],
      queryFn: async () => {
        const res = await fetch("/api/auth");
        if (!res.ok) throw new Error("Failed to fetch auth status");
        return res.json();
      },
    });
  
    const isLoggedIn = authData?.loggedIn ?? false;
  
    useQuery({
      queryKey: ["libraryCookie"],
      queryFn: async () => {
        const cookie = await getCookie();
        setCart(cookie);
        console.log(cookie)
        return cookie;
      },
    });
  
  
    const { removeItem } = useRemoveItem(cart, setCart);
    const { handleCartAction } = useCartAction();
  

  const cartTotal = calculateCartTotal(cart);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen font-[lexend]">
        <p>Loading Cart...</p>
      </div>
    );
  }

  // --- Render ---
  return (
    <>
      <ThemeInit />

      <div className="min-h-screen flex flex-col items-center justify-center gap-y-4 pt-48 mb-32 mx-4">
        <h1 className="text-3xl font-[raleway] font-bold text-gray-800 mb-8">
          Cart Summary
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 font-[lexend]">Your cart is empty. Start browsing our collection!</p>
        ) : (
          cart.map((item) => (
            <CartItemCard
              key={item.bookId}
              bookId={item.bookId}
              imgSrc={item.imgSrc}
              bookName={item.bookName}
              price={item.price}
              onRemoveAction={removeItem}
            />
          ))
        )}


        {cart.length > 0 && (
          <div className="mt-4 font-[lexend] w-full max-w-xs">
            <div className="flex justify-between items-center text-xl font-bold mb-6">
              <span>Cart Total:</span>
              <span className="text-[#53007B]">${cartTotal}</span>
            </div>
            <Button
              onClick={
                isLoggedIn
                  ? handleCartAction
                  : () => router.push("/auth/login")
              }
              className="w-full bg-[#53007B] hover:bg-[#400060] focus:ring-4 focus:ring-[#6b009e] mt-4"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
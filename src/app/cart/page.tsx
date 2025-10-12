"use client";

import { ThemeInit } from "../../../.flowbite-react/init";
import { FooterBottom } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import CartItemCard from "@/components/ui/CartItemCard";
import { Button } from "flowbite-react";
import { useState } from "react";
import { redirect } from "next/navigation";
import { getCookie } from "@/lib/getCookie";
import { useQuery } from "@tanstack/react-query";
import { useRemoveItem } from "@/hooks/useRemoveItem";
import { useCartAction } from "@/hooks/useCartAction";
import { LibraryItem } from "@/lib/types/components";

export default function Page() {
  const [cart, setCart] = useState<LibraryItem[]>([]);

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
      return cookie;
    },
  });


  const { removeItem } = useRemoveItem(cart, setCart);
  const { handleCartAction } = useCartAction();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <ThemeInit />
      <NavBar />
      <div className="min-h-screen flex flex-col items-center justify-center gap-y-4 pt-48 mb-32 mx-4">
        <h1 className="text-3xl font-[raleway] font-bold text-gray-800 mb-8">
          Cart Summary
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <CartItemCard
              key={index}
              bookId={item.bookId}
              imgSrc={item.imgSrc}
              bookName={item.bookName}
              onRemoveAction={removeItem}
            />
          ))
        )}

        {cart.length > 0 && (
          <div className="mt-4 font-[lexend]">
            <Button
              onClick={
                isLoggedIn
                  ? handleCartAction
                  : () => redirect("/auth/login")
              }
              className="bg-[#53007B] mt-4"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
      <FooterBottom />
    </>
  );
}

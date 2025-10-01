"use client";

import { ThemeInit } from "../../../.flowbite-react/init";
import { FooterBottom } from "@/app/components/Footer";
import { NavBar } from "@/app/components/NavBar";
import CartItemCard from "@/app/components/ui/CartItemCard";
import Cookies from "js-cookie";
import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { redirect } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Page() {
  const [library, setLibrary] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  
 
  useEffect(() => {
    const cookieLibrary = Cookies.get("library");
    const verifyUser = async () => {
      const res = await fetch("/api/auth")
      const data = await res.json()
      setIsLoggedIn(data.loggedIn)

    }
    const getCartDB = async () => {
        try {
          const res = await fetch("/api/cart");
          const data = await res.json();
          console.log(data)

          if (!res.ok) {
            console.error(data.error || "Failed to fetch cart");
            return;
          }

          const cartItems = data.cart || [];
          const booksWithDetails = await Promise.all(
            cartItems.map(async (item: any) => {
              const bookRes = await fetch(`/api/books/${item.book_id}`);
              const bookData = await bookRes.json();

              return {
                bookId: item.book_id,
                imgSrc: bookData.book.image,
                bookName: bookData.book.name,
                school: false,
              };
            })
          );

  
          setLibrary(booksWithDetails);
          Cookies.set("library", JSON.stringify(booksWithDetails), {
            expires: 7,
          });
        } catch (err) {
          console.error("Failed to fetch cart from DB", err);
        }
      };

    verifyUser()

    if (cookieLibrary) {
      try {
        const parsed = JSON.parse(cookieLibrary);
        const flatParsed = Array.isArray(parsed) ? parsed.flat() : [];

        if (flatParsed.length > 0) {
          setLibrary(flatParsed);
        } else {

          getCartDB();
        }
      } catch (err) {
        console.error("Failed to parse cart cookie", err);
        getCartDB();
      }
    } else {
      getCartDB();
    }
  }, []);

  const removeItem = async (bookNameToRemove: string, bookId: string) => {
    const updatedLibrary = library.filter((item) => {
      return item.bookName.trim() !== bookNameToRemove.trim();
    });
    setVisible(false);
    setLibrary(updatedLibrary);
    Cookies.set("library", JSON.stringify(updatedLibrary));

    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Failed to remove from cart:", data.error);
      } else {
        console.log("Removed from cart:", data.message);
      }
    } catch (err) {
      console.error("Error deleting from cart:", err);
    }
  };

  const handleCartAction = async () => {
  try {
    const res = await fetch('/api/library', { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed');

    if (data.inserted) {
      alert('Books added to library!');
    } else if (data.sessionId) {
      const stripe = await stripePromise;
      await stripe!.redirectToCheckout({ sessionId: data.sessionId });
    }
  } catch (err) {
    console.error(err);
  }
}

  



  return (
    <>
      <ThemeInit />
      <NavBar />
      <div className="min-h-screen flex flex-col items-center justify-center gap-y-4 pt-48 mb-32 mx-4">
        <h1 className="text-3xl font-[raleway] font-bold text-gray-800 mb-8">
          Cart Summary
        </h1>

        {library.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          library.map((item, index) => (
            <CartItemCard
              key={index}
              bookId={item.bookId}
              imgSrc={item.imgSrc}
              bookName={item.bookName}
              
              school={item.school}
              onRemoveAction={removeItem}
            />
          ))
        )}
        {library.length > 0 && (
          <div className="mt-4 font-[lexend]">
            <Button onClick={isLoggedIn ? () => handleCartAction
              : () => {redirect("/auth/login")}
            } className="bg-[#53007B] mt-4">Proceed to Checkout</Button>
          </div>
        )}
      </div>
      <FooterBottom />
    </>
  );
}

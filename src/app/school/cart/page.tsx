"use client";

import { ThemeInit } from "../../../../.flowbite-react/init";
import { FooterBottom } from "@/app/components/Footer";
import { NavBar } from "../../components/NavBar";
import CartItemCard from "../../components/ui/CartItemCard";
import Cookies from "js-cookie";
import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { saveToLibrary } from "@/app/actions/saveToLibrary";

export default function Page() {
  const [library, setLibrary] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const cookieLibrary = Cookies.get("library");
    if (cookieLibrary) {
      try {
        setLibrary(JSON.parse(cookieLibrary));
      } catch (err) {
        console.error("Failed to parse cart cookie", err);
      }
    }
  }, []);

  const removeItem = (bookNameToRemove: string) => {
    const updatedLibrary = library.filter((item) => {
      return item.bookName.trim() !== bookNameToRemove.trim();
    });
    setVisible(false);
    setLibrary(updatedLibrary);
    Cookies.set("library", JSON.stringify(updatedLibrary));
  };






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
              imgSrc={item.imgSrc}
              bookName={item.bookName}
              school={item.school}
              onRemoveAction={removeItem}
            />
          ))
        )}
        {library.length > 0 && (
          <div className="mt-4 font-[lexend]">
            <Button onClick={async () => {
              try {
                await saveToLibrary(library);
                alert("Books added to your library!");
                Cookies.remove("library");
                setLibrary([]);
              } catch (err: any) {
                alert(err.message);
              }
            }} className="bg-[#53007B] mt-4">Proceed to Checkout</Button>
          </div>
        )}
      </div>
      <FooterBottom />
    </>
  );
}

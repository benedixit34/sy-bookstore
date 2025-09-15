"use client";

import { ThemeInit } from "../../../../.flowbite-react/init";
import { FooterBottom } from "@/app/components/Footer";
import { NavBar } from "../../components/NavBar";
import CartItemCard from "../../components/ui/CartItemCard";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "flowbite-react";
import { createClient } from "@/app/utils/supabase/server";

export default function CheckoutPage() {
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

  const SaveToLibrary = async () => {
    const supabase = await createClient();

    const { data: { user }, error: userError} = await supabase.auth.getUser();
    if (userError || !user) {
      alert("You must be logged in to add to your library.");
      return;
    }
    const { data, error } = await supabase.from("user_libraries").insert(
      library.map((item) => ({
        user_id: user.id,
        book_name: item.bookName,
        img_src: item.imgSrc,
        school: item.school,
      }))
    );

     if (error) {
      console.error("Error saving to user library:", error.message);
    } else {
      alert("Books added to your library!");
      Cookies.remove("library");
      setLibrary([]);
    }


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
            <Button onClick={SaveToLibrary} className="bg-[#53007B] mt-4">Proceed to Checkout</Button>
          </div>
        )}
      </div>
      <FooterBottom />
    </>
  );
}

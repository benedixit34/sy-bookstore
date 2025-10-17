import Cookies from "js-cookie";
import { useState } from "react";
import { CartItemProps } from "@/lib/types/components";

export const useRemoveItem = (
  cart: CartItemProps[],
  setCart: (val: CartItemProps[]) => void
) => {
  const [visible, setVisible] = useState<boolean>(true);

  const removeItem = async (bookNameToRemove: string, bookId: string) => {
    const updatedCart = cart.filter(
      (item) => item.bookName.trim() !== bookNameToRemove.trim()
    );
    setVisible(false);
    setCart(updatedCart);
    Cookies.set("library", JSON.stringify(updatedCart));

    try {
      const userRes = await fetch("api/auth");
      const userData = await userRes.json();
      const isLoggedIn = await userData.loggedIn;
      if (isLoggedIn) {
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
      }
    } catch (err) {
      console.error("Error deleting from cart:", err);
    }
  };

  return { removeItem, visible };
};

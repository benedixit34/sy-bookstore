import Cookies from "js-cookie";
import { useState } from "react";

export const useRemoveItem = (
  library: any[],
  setLibrary: (val: any[]) => void
) => {
  const [visible, setVisible] = useState<boolean>(true);

  const removeItem = async (bookNameToRemove: string, bookId: string) => {
    const updatedLibrary = library.filter(
      (item) => item.bookName.trim() !== bookNameToRemove.trim()
    );
    setVisible(false);
    setLibrary(updatedLibrary);
    Cookies.set("library", JSON.stringify(updatedLibrary));

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

import Cookies from "js-cookie";
import { LibraryItem } from "@/lib/types/components"

export async function handleSave(item: LibraryItem, showToast?: (msg: string) => void) {
  const { bookId, bookName, imgSrc } = item;
  if (!bookId || !bookName || !imgSrc) {
    showToast?.("Invalid book data");
    return;
  }

  const userRes = await fetch("api/auth")
  const userData = await userRes.json()
  const isLoggedIn = userData.loggedIn

  if (isLoggedIn){
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId }),
    });
    const libraryRes = await fetch("/api/cart")
    const libraryData = await libraryRes.json()
    if (libraryData?.isPresent) {
      showToast?.(`${bookName} is already in your library!`);
      return;
    }

  }



  const existing: LibraryItem[] = JSON.parse(Cookies.get("library") || "[]");
  const alreadyExists = existing.some(
    (item: LibraryItem) => item.bookName === bookName && item.imgSrc === imgSrc
  );

  if (alreadyExists) {
    showToast?.(`${bookName} is already in your cart!`);
    return;
  }

  existing.push({ bookId!, bookName, imgSrc });
  Cookies.set("library", JSON.stringify(existing), { expires: 7 });

  showToast?.(`${bookName} has been added to your cart!`);
  console.log(Cookies.get("library"));
}

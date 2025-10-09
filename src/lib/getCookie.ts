import Cookies from "js-cookie";
import { BookAPIProps } from "./types/components";

export const getCookie = async () => {
  let cart_cookie = JSON.parse(Cookies.get("library") || "[]");
  if (!cart_cookie || cart_cookie.length === 0) {
    const res = await fetch("/api/cart");
    const data = await res.json();

    if (data && data.cart) {
      const updatedCart = await Promise.all(
        data.cart.map(async (item: BookAPIProps) => {
          const res = await fetch(`/api/books/${item.book_id}`);
          const bookData = await res.json();
          const book = bookData.book;

        
          const libraryCheckRes = await fetch(`/api/library/${item.book_id}`);
          const libraryCheckData = await libraryCheckRes.json();
          const isPresent = libraryCheckData.isPresent;

          if (isPresent) return null; 

          return {
            bookId: item.book_id,
            bookName: book.name,
            imgSrc: book.image,
          };
        })
      );

      const validCart = updatedCart.filter(Boolean);

      cart_cookie = validCart;
      Cookies.set("library", JSON.stringify(cart_cookie));
    }
  }

  return cart_cookie;
};
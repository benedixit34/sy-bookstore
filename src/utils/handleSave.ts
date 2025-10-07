import Cookies from "js-cookie";

type LibraryItem = {
  bookId?: string;
  bookName: string;
  imgSrc: string;
};

export async function handleSave(bookId?: string, bookName?: string, 
                                imgSrc?: string, showToast?: (msg: string) => void) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookId }),
  });

  if (!res.ok) return

  const existing: LibraryItem[] = JSON.parse(Cookies.get("library") || "[]");
  const alreadyExists = existing.some(
    (item: LibraryItem) => item.bookName === bookName && item.imgSrc === imgSrc
  );

  if (alreadyExists) {
    showToast?.(`${bookName} is already in your library!`);
    return;
  }

  existing.push({ bookId, bookName: bookName || "", imgSrc: imgSrc || "" });
  Cookies.set("library", JSON.stringify(existing), { expires: 7 });

  showToast?.(`${bookName} has been added to your library!`);
  console.log(Cookies.get("library"));
}

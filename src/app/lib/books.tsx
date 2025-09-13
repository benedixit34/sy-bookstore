import { createClient } from "@/app/utils/supabase/server";
import { EcomCard } from "@/app/components/ui/EcomCard";

export async function getBooks(showToast: (msg: string) => void) {
  const supabase = await createClient();

  const { data: library, error } = await supabase
    .from("library")
    .select();

  if (error) {
    console.error("Error fetching books:", error.message);
    return (
      <p className="text-red-500">Failed to load books.</p>
    );
  }

  if (!library || library.length === 0) {
    return (
      <p className="text-gray-500">No books found.</p>
    );
  }

  return library.map((book: any) => (
    <EcomCard
      key={book.id}
      imgSrc={book.image_source}
      bookName={book.book_name}
      action="In Library"
      library={true}
      showToast={showToast}
    />
  ));
}


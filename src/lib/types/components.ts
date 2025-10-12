type BaseBookProps = {
  imgSrc: string;
  bookName: string;
};


export type EcomCardProps = BaseBookProps & {
  action?: string;
  bookId?: string;
  price?: number | string;
};


export type LibraryCardProps = BaseBookProps & {
  bookDescription: string;
  fileLink: string;
};


export type WebButtonProps = {
  hyperlink: string;
  text: string;
  action?: () => void;
};


export type CartItemProps = BaseBookProps & {
  bookId: string;
  price?: number;
  school?: boolean;
  onRemoveAction?: (bookName: string, bookId: string) => void;

};


export type BookAPIProps = {
    book_id: string;
    user_id: string;
}


export type LibraryItem = BaseBookProps & {
  bookId: string;
};


export type BookProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: number;
  file?: string;
};
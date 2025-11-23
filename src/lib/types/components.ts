type BaseBookProps = {
  imgSrc: string;
  bookName: string;
};

type Price = {
  price: number | string;
}


export type EcomCardProps = BaseBookProps & Price & {
  action?: string;
  bookId: string;
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


export type CartItemProps = BaseBookProps & Price & {
  bookId: string;
  school?: boolean;
  onRemoveAction: (bookName: string, bookId: string) => void;

};

export type BookAPIProps = {
    book_id: string;
    user_id: string;
}


export type LibraryItem = BaseBookProps & Price & {
  bookId: string;
};

export type BookProps = Price & {
  id?: string;
  name: string;
  description: string;
  image: string;
  file: string;
};
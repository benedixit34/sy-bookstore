import { ThemeInit } from "../../../.flowbite-react/init";
import { FooterBottom } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import CartItemCard from "../components/ui/CartItemCard";
import { CartSummaryCard } from "../components/ui/CartSummaryCard";

export default function CheckoutPage() {
  return (
    <>
    <ThemeInit />
    <NavBar />
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-4 pt-48 mb-32 mx-4">
      <h1 className="text-3xl font-[raleway] font-bold text-gray-800 mb-8">Cart Summary</h1>
      <CartItemCard
        imgSrc="/school.svg"
        name="Create A Big Business By Sabiyou"
        price={19.99}
        quantity={1}
      />
      

      <CartItemCard
        imgSrc="/school.svg"
        name="Sample Book"
        price={19.99}
        quantity={1}
       
      />

      <CartItemCard
        imgSrc="/school.svg"
        name="Sample Book"
        price={19.99}
        quantity={1}
       
      />

      <CartItemCard
        imgSrc="/school.svg"
        name="Sample Book"
        price={19.99}
        quantity={1}

      />
      <CartSummaryCard
        subtotal={39.98}
        shipping={5.99}
        onCheckout={() => console.log("Proceed to Checkout")}
      />

    </div>
    <FooterBottom />
    </>
                                            
  );
}
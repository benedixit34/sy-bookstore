import React from "react";

type CartSummaryProps = {
  subtotal: number;
  shipping: number;
  onCheckout: () => void;
};

export function CartSummaryCard({
  subtotal,
  shipping,
  
}: CartSummaryProps) {
  const total = subtotal + shipping;

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-zinc-500 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-8">Order Summary</h2>

      {/* Summary */}
      <div className="space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-gray-800">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      
      <button
        className="w-full bg-[#53007B] hover:bg-[#53007B]/90 border border-zinc-500 text-white rounded-xl py-3 mt-4 font-medium transition"
       
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const useCartAction = () => {
  const handleCartAction = async () => {
    try {
      const res = await fetch("/api/library", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      if (data.inserted) {
        alert("Books added to library!");
      } else if (data.sessionId) {
        const stripe = await stripePromise;
        await stripe!.redirectToCheckout({ sessionId: data.sessionId });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { handleCartAction };
};

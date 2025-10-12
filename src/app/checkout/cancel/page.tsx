"use client";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-red-600">
        Payment Cancelled
      </h1>
      <p className="text-gray-600 mt-2">
        Your payment was not completed. Please try again.
      </p>
    </div>
  );
}

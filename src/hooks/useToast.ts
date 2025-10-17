import { useState } from "react";

export function useToast(duration = 3000) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), duration);
  };

  return { toastMessage, showToast };
}

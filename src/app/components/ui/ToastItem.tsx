import { Toast, ToastToggle, createTheme } from "flowbite-react";
import { ThemeProvider } from "flowbite-react";

const customTheme = createTheme({
  toast: {
    root: {
      base: "flex w-full max-w-4xl items-center rounded-lg bg-white shadow-lg text-gray-800", 
      closed: "opacity-0 transition-opacity duration-300 ease-out",
    },
  },
});
export function ToastItem({ message }: { message: string }) {
  return (
    <ThemeProvider theme={customTheme}>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 ">
        <Toast className="bg-[#f3e8ff]/90 rounded-lg shadow-lg">
          <div className="ml-3 text-sm font-normal font-[lexend]">{message}</div>
          <ToastToggle />
        </Toast>
      </div>
    </ThemeProvider>
  );
}

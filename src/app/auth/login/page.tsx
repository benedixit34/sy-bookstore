"use client";

import Link from "next/link";
import { Button, Card, Label, TextInput, ThemeProvider } from "flowbite-react";
import { createTheme } from "flowbite-react";
import { signInAction } from "@/utils/authActions";
import { Suspense } from "react";
import { Message } from "@/components/AuthMessage";

const customTheme = createTheme({
  textInput: {
    field: {
      input: {
        base: "border-2 border-gray-900 focus:ring-2 focus:ring-offset-1",
        colors: {
          gray: "focus:ring-[#53007B]/80 ring-[#53007B]",
        },
      },
    },
  },
});

export default function Page() {

 
  return (
    <ThemeProvider theme={customTheme}>
     

      <section className="font-[lexend] bg-yellow-50 flex justify-center pt-15 lg:pt-30 min-h-[100vh]">
        <div className="flex flex-col justify-center py-24">
          <div className="w-full place-items-center flex flex-col">
            <h1
              className="text-center mb-8 text-4xl font-bold leading-none
                         tracking-tight font-[raleway]"
            >
              Login To Store
            </h1>
          </div>

          <Card className="w-xs sm:w-sm lg:w-md mx-auto border-gray-400">
            <form className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1">Your email</Label>
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  name="email"
                  required
                  className="ring-[#53007B] border-gray-900"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1">Your password</Label>
                </div>
                <TextInput
                  id="password1"
                  type="password"
                  name="password"
                  required
                />
              </div>

              <Button
                formAction={signInAction}
                type="submit"
                className="bg-[#53007B]"
              >
                Submit
              </Button>
            </form>
            <p className="text-sm font-medium">
              <Link
                href="/auth/forgot-password"
                className="hover:text-[#53007B] cursor-pointer ml-2"
              >
                Forgot Password?
              </Link>
            </p>
          </Card>
          <Suspense fallback={null}>
            <Message />
          </Suspense>
        </div>
      </section>
    </ThemeProvider>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Card, Label, TextInput, ThemeProvider } from "flowbite-react";
import { ThemeInit } from "../../../../.flowbite-react/init";
import { NavBar } from "@/components/NavBar"
import { createTheme } from "flowbite-react";
import { resetPasswordAction } from "@/utils/authActions";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { Message } from "@/components/AuthMessage"
import { Suspense } from "react";

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


function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";

  return (
    <Card className="w-sm lg:w-md mx-auto border-gray-400">
      <Form action={resetPasswordAction} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">New Password</Label>
          </div>
          <TextInput
            id="password"
            type="password"
            name="password"
            required
            className="ring-[#53007B] border-gray-900"
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
          </div>
          <TextInput
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
            className="ring-[#53007B] border-gray-900"
          />
        </div>

     
        <TextInput id="code" name="code" value={code} hidden readOnly />

        <Button type="submit" className="bg-[#53007B]">
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={customTheme}>
        <ThemeInit />
        <NavBar />

        <section className="font-[lexend] bg-yellow-50 flex justify-center min-h-[100vh]">
          <div className="flex flex-col justify-center py-16">
            <div className="w-full flex flex-col items-center">
          
              <h1
                className="text-center mb-8 text-4xl font-bold leading-none
                tracking-tight font-[raleway]"
              >
                Reset Your Password
              </h1>
            </div>
            <ResetPasswordForm />
            <Message />
          </div>
        </section>
      </ThemeProvider>
    </Suspense>
  );
}
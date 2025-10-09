"use client"

import Image from "next/image";
import Link from "next/link";
import { Button, Card, Label, TextInput, ThemeProvider } from "flowbite-react";
import { ThemeInit } from "../../../../.flowbite-react/init";
import { createTheme } from "flowbite-react";
import { resetPasswordAction } from "@/utils/authActions";
import Form from "next/form";
import { useSearchParams } from "next/navigation";







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
      <ThemeInit />

      <section className="font-[lexend] bg-yellow-50 flex justify-center min-h-[100vh]">
        <div className="flex flex-col justify-center place-content-center py-16">
          <div className="w-full place-items-center flex flex-col">
            <Link href="/" className="mb-8 self-center">
              <Image src="/sabiyou.png" height={70} width={70} alt="Logo" /></Link>
            <h1 className="text-center mb-8 text-4xl font-bold leading-none
                         tracking-tight font-[raleway]">Reset Your Password</h1>
          </div>

          <Card className="w-sm lg:w-md min-h-80 mx-auto border-gray-900">

            <Form action={resetPasswordAction} className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1">New Password</Label>
                </div>
                <TextInput id="password" type="password" name="password" required
                  className="ring-[#53007B] border-gray-900" />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1">Confirm new password</Label>
                </div>
                <TextInput id="password" type="password" name="confirmPassword" required
                  className="ring-[#53007B] border-gray-900" />
              </div>
              <TextInput id="code" name="code" value={useSearchParams().get("code") || ""} hidden readOnly />

              <Button type="submit" className="bg-[#53007B]">Submit</Button>
            </Form>

          </Card>
        </div>

      </section>


    </ThemeProvider>
  );
}
"use client";

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { ThemeInit } from "../../../../.flowbite-react/init";
import { signUpAction } from "@/utils/authActions";
import { useState, useEffect, Suspense } from "react";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Message } from "@/components/AuthMessage";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    async function verifyUser() {
      const res = await fetch("/api/auth");
      const data = await res.json();
      setIsLoggedIn(data?.loggedIn);
    }
    verifyUser();
  });

  if (isLoggedIn) {
    redirect("/");
  }
  return (
    <div className="min-h-[100vh]">
      <ThemeInit />
      <NavBar />

      <section className="font-[lexend] bg-yellow-50 flex justify-center pt-30 min-h-[100vh]">
        <div className="flex flex-col justify-center py-16">
          <div className="w-full place-items-center flex flex-col">
          
            <h1
              className="text-center mb-8 text-4xl font-bold leading-none
                         tracking-tight font-[raleway]"
            >
              Sign Up To Store
            </h1>
          </div>

          <Card className="w-md h-min-100 mx-auto border-gray-300">
            <form className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name">Full Name</Label>
                </div>
                <TextInput
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="border-gray-900"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1">Your email</Label>
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  name="email"
                  placeholder=""
                  required
                  className="border-gray-900"
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

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1">Confirm Password</Label>
                </div>
                <TextInput
                  id="password1"
                  type="password"
                  name="confirmPassword"
                  required
                />
              </div>

             
              <Button
                formAction={signUpAction}
                type="submit"
                className="bg-[#53007B]"
              >
                Submit
              </Button>
            </form>
          </Card>
          <Suspense fallback={null}>
                      <Message />
                    </Suspense>
        </div>
      </section>
    </div>
  );
}

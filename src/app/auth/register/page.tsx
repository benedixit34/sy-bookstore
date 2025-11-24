"use client";

import { Button, Card, Label, TextInput } from "flowbite-react";
import { ThemeInit } from "../../../../.flowbite-react/init";
import { signUpAction } from "@/utils/authActions";
import { Suspense } from "react";
import { Message } from "@/components/AuthMessage";

export default function Page() {

  return (
    <div className="min-h-[100vh]">
      <ThemeInit />

      <section className="font-[lexend] bg-yellow-50 flex justify-center pt-15 lg:pt-30 px-4 lg:px-0 min-h-[100vh]">
        <div className="flex flex-col justify-center py-16">
          <div className="w-full place-items-center flex flex-col">
          
            <h1
              className="text-center mb-8 text-4xl font-bold leading-none
                         tracking-tight font-[raleway]"
            >
              Sign Up To Store
            </h1>
          </div>

          <Card className="w-xs sm:w-sm lg:w-md mx-auto border-gray-400">
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

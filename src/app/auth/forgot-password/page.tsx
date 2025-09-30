"use client"


import Image from "next/image";
import Link from "next/link";
import { Button, Card, Label, TextInput, ThemeProvider } from "flowbite-react";
import { ThemeInit } from "../../../../.flowbite-react/init";
import { createTheme } from "flowbite-react";
import { forgotPasswordAction } from "@/app/actions/authActions";
import Form from "next/form";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";



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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  
    useEffect(() => {
      async function verifyUser() {
          const res = await fetch("/api/auth");
          const data = await res.json();
          setIsLoggedIn(data?.loggedIn);
        }
        verifyUser();
  
    })
  
    if (isLoggedIn){
      redirect("/")
  
    }
  
    return (
       <ThemeProvider theme={customTheme}>
            <ThemeInit />
          
            <section className="font-[lexend] bg-yellow-50 flex justify-center min-h-[100vh]">
                <div className="flex flex-col justify-center place-content-center py-16">
                    <div className="w-full place-items-center flex flex-col">
                      <Link href="/" className="mb-8 self-center">
                      <Image src="/sabiyou.png" height={70} width={70} alt="Logo" /></Link>
                        <h1 className="text-center mb-8 text-4xl font-bold leading-none
                         tracking-tight font-[raleway]">Forgot Password?</h1>
                    </div>
                    
                    <Card className="w-sm lg:w-md min-h-60 mx-auto border-gray-900">
                        
                          <Form action={forgotPasswordAction} className="flex flex-col gap-4">
                            <div>
                              <div className="mb-2 block">
                                <Label htmlFor="email1">Your email</Label>
                              </div>
                              <TextInput id="email1" type="email" name="email" required 
                              className="ring-[#53007B] border-gray-900" />
                            </div>
                       
                            <Button type="submit" className="bg-[#53007B]">Submit</Button>
                          </Form>
                          
                        </Card>
                </div>
              
            </section>

            
        </ThemeProvider>
    );
}
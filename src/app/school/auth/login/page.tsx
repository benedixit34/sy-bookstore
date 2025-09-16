import Image from "next/image";
import Link from "next/link";
import { Button, Card, Checkbox, Label, TextInput, ThemeProvider } from "flowbite-react";
import { ThemeInit } from "../../../../../.flowbite-react/init";
import { createTheme } from "flowbite-react";
import { signInAction } from "@/app/actions/authActions";
import Form from "next/form";



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




export default function UserForm() {
    return (
       <ThemeProvider theme={customTheme}>
            <ThemeInit />
          
            <section className="font-[lexend]">
                <div className="flex flex-col justify-center py-16">
                    <div className="w-full place-items-center flex flex-col">
                      <Link href="/" className="mb-8 self-center">
                      <Image src="/sabiyou.png" height={70} width={70} alt="Logo" /></Link>
                        <h1 className="text-center mb-8 text-4xl font-bold leading-none
                         tracking-tight font-[raleway]">School Login</h1>
                    </div>
                    
                    <Card className="w-sm lg:w-md h-96 mx-auto border-gray-900">

                          <Form action={signInAction} className="flex flex-col gap-4">
                            <div>
                              <div className="mb-2 block">
                                <Label htmlFor="email1">Your email</Label>
                              </div>
                              <TextInput id="email1" type="email" placeholder="Enter Your Email" required 
                              className="ring-[#53007B] border-gray-900" />
                            </div>
                            <div>
                              <div className="mb-2 block">
                                <Label htmlFor="password1">Your password</Label>
                              </div>
                              <TextInput id="password1" type="password" required />
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="remember" />
                              <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <Button formAction={signInAction} type="submit" className="bg-[#53007B]">Submit</Button>
                          </Form>
                          
                        </Card>
                </div>
              
            </section>

            
        </ThemeProvider>
    );
}
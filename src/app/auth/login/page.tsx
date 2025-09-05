import Image from "next/image";
import Link from "next/link";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { ThemeInit } from "../../../../.flowbite-react/init";



export default function UserForm() {
    return (
        <div className="min-h-[100vh]">
            <ThemeInit />
          
            <section className="h-[100vh]">
                <div className="flex flex-col justify-center py-16">
                    <div className="w-full place-items-center flex flex-col">
                      <Link href="/" className="mb-8 self-center">
                      <Image src="/sabiyou.png" height={70} width={70} alt="Logo" /></Link>
                        <h1 className="text-center mb-8 text-4xl font-bold leading-none
                         tracking-tight font-[raleway]">Login To Store</h1>
                    </div>
                    
                    <Card className="w-md h-96 mx-auto border-gray-900">
                        
                          <form className="flex flex-col gap-4">
                            <div>
                              <div className="mb-2 block">
                                <Label htmlFor="email1">Your email</Label>
                              </div>
                              <TextInput id="email1" type="email" placeholder="Enter Your Email" required className="border-gray-900" />
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
                            <Button type="submit" className="bg-[#53007B]">Submit</Button>
                          </form>
                          <p className="py-4 text-sm">Don&apos;t have an account? 
                            <Link href="/auth/register" className="hover:text-[#53007B] cursor-pointer ml-2">Sign Up</Link></p>
                        </Card>
                </div>
              
            </section>

            
        </div>
    );
}

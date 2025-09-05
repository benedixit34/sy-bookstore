
"use client";

import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
 
} from "flowbite-react";
import Image from "next/image";




export function FooterBottom() {
  return (
 
    <Footer container className="border-t-[0.5px] border-zinc-400 bg-gradient-to-r from-[#F3E8FF] to-[#E9D5FF] 
    px-10 lg:px-32 text-[16px] pt-12">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 gap-y-8">
          <div>
            <Image
              className="h-18 w-full"
              src="/sabiyou.png"
              alt="Flowbite Logo"
              width={70} 
              height={70}
             
            />

          
          </div>
          
            <div>
              <FooterTitle title="Quicklinks" className="text-xl text-[#333333]" />
              <FooterLinkGroup col className="text-md text-[#333333]">
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Stories</FooterLink>
                <FooterLink href="#">Store</FooterLink>
                 <FooterLink href="#">Books</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" className="text-xl text-[#333333]" />
              <FooterLinkGroup col className="text-md text-[#333333]">
                <FooterLink href="#">Instagram</FooterLink>
                <FooterLink href="#">TikTok</FooterLink>
                <FooterLink href="#">YouTube</FooterLink>
              
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal"  className="text-xl text-[#333333]" />
              <FooterLinkGroup col className="text-md text-[#333333]">
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Afroeuropean Business Services" year={new Date().getFullYear()} className="text-md"/>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
           
          </div>
        </div>
      </div>
    </Footer>
    
  );
}

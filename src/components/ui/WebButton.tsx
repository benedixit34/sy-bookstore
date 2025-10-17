import Link from "next/link";
import { WebButtonProps } from "@/lib/types/components";


export function PrimaryButton({ hyperlink, text, action }: WebButtonProps){


    return <Link href={hyperlink} className="inline-block rounded-lg bg-[#53007B] px-6 py-3.5 text-center font-medium text-white
         hover:bg-[#53007B]/90 focus:outline-none focus:ring-4 focus:ring-[#53007B]/50 font-[lexend]" onClick={action}>{text}</Link>
}



export function SecondaryButton({ hyperlink, text, action }: WebButtonProps){


    return <Link href={hyperlink} className="inline-block rounded-lg px-6 py-3.5 text-center font-medium text-[#313131] border-1 hover:text-white
         hover:bg-[#53007B]/90 border-[#53007B] focus:outline-none focus:ring-4 focus:ring-[#53007B]/50 font-[lexend]" onClick={action}>{text}</Link>
}

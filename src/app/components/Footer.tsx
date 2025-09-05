import Image from "next/image";
import Link from "next/link";

export function FooterBottom() {
    return (
        <footer
            className="border-t-1 border-zinc-400 font-[family-name:var(--font-lexend)] font-light lg:p-32 py-24 px-4 sm:px-10 tracking-tight bg-[#f7c6ff]/30 flex flex-col lg:flex-row text-[#282829] gap-x-48 gap-y-10 justify-center">
            <div className="space-y-6">
                <Link href="/" ><Image src="/images/sabiyou_logo.png" alt="Sabiyou Logo" width={150} height={150} className="lg:w-20 w-14" /></Link>
                <p className="text-[18px] leading-loose">Embracing Culture <br /> Reconnecting Roots.</p>
            </div>

            <div className="space-y-4 lg:space-x-10">
                <h6 className="text-[25px] font-bold tracking-tight font-[family-name:var(--font-raleway)]">Quick links</h6>
                <div className="flex flex-col space-y-2 text-[18px]">
                    <Link href="/about" className="hover:text-[#53007B]">About</Link>
                    <Link href="/blog" className="hover:text-[#53007B]">Stories</Link>
                    <Link href="/contact" className="hover:text-[#53007B]">Contact Us</Link>
                    <Link href="/store" className="hover:text-[#53007B]">Stores</Link>
                    <Link href="/community" className="hover:text-[#53007B]">Community</Link>
                </div>
            </div>


            <div className="space-y-4 lg:space-x-10">
                <h6 className="text-[25px] font-bold tracking-tigh font-[family-name:var(--font-raleway)]">Other links</h6>
                <div className="flex flex-col space-y-2 text-[18px]">
                    <Link href="/privacy" className="hover:text-[#53007B]">Privacy</Link>
                    <Link href="/terms" className="hover:text-[#53007B]">Terms and Conditions</Link>
                    <Link href="/disclaimer" className="hover:text-[#53007B]">Disclaimer</Link>
                </div>
            </div>

            <div className="space-y-4 lg:space-x-10">
                <h6 className="text-[25px] font-bold tracking-tigh font-[family-name:var(--font-raleway)]">Follow Us</h6>
                <div className="flex flex-col space-y-2 text-[18px]">
                    <Link href="https://www.instagram.com/heartofafrica2025/" className="hover:text-[#53007B]">Instagram</Link>
                    <Link href="https://tiktok.com/@sabiyouculture" className="hover:text-[#53007B]">TikTok</Link>
                    <Link href="https://youtube.com/@heartofafrica2025" className="hover:text-[#53007B]">YouTube</Link>
                </div>
            </div>
        </footer>

    );
}

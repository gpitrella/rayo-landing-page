import { Separator } from "@/components/ui/separator";
import { ChevronsDownIcon } from "lucide-react";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className=" w-[90%] md:w-[85%] lg:w-[85%] lg:max-w-screen-xl m-auto py-24 sm:py-32">
      <div className="shadow-inner p-8 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link href="#" className="flex font-black italic items-center" >
              <h3 className="text-2xl font-black italic ">RAYO</h3>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-base">About</h3>
            <div>
              <Link href="/about/privacypolicies" className="opacity-60 hover:opacity-100 text-sm">
                Política de Privacidad
              </Link>
            </div>
            <div>
              <Link href="/about/terms" className="opacity-60 hover:opacity-100 text-sm">
                Terminos y Condiciones
              </Link>
            </div>
            <div>
              <Link href="/about/cookies" className="opacity-60 hover:opacity-100 text-sm">
                Política de Cookies
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-base">Plataformas</h3>
            <div>
              <Link href="https://www.instagram.com/rayo.ok?igsh=MXRwcmJhbzllN290cQ==" className="opacity-60 hover:opacity-100 text-sm" target="_blank" >
                Instagram
              </Link>
            </div>
            <div>
              <Link href="/" className="opacity-60 hover:opacity-100 text-sm">
                Web
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-base">Help</h3>
            <div>
              <Link href="/#contact" className="opacity-60 hover:opacity-100 text-sm">
                Contactanos
              </Link>
            </div>

            <div>
              <Link href="/#faq" className="opacity-60 hover:opacity-100 text-sm">
                Consultas
              </Link>
            </div>

          </div>
{/* 
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Socials</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Twitch
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Discord
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Dribbble
              </Link>
            </div>
          </div> */}
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3 className="">
            &copy; 2025 Designed and developed by
            <Link
              target=""
              href="/"
              className="text-primary font-black italic transition-all border-primary hover:border-b-2 ml-1"
            >
              RAYO
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";

export const Banner = () => {

  const router = useRouter();

      const startAppointment = ()=> {
          router.push('/home')
        }
      

  
  return (
    <div className="relative !flex h-auto w-[85%] md:w-[85%] lg:w-[85%] mt-6 lg:max-w-screen-xl mx-auto items-center justify-between">
      <Image
        width={1200}
        height={1200}
        src="/BG_Rayo.png"
        alt="bg-img"
        className="absolute inset-0 ml-auto w-[770px] h-[580px] rounded-bl-[100px] object-cover object-center"
      />
      <div className="container mx-auto px-0 w-full mt-[20px]">
        <div className="grid grid-cols-12 text-left lg:text-left">
          <div className="col-span-full rounded-xl border border-white bg-white/90 dark:bg-card dark:border-zinc-800 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">

            <div className="max-w-screen-sm mx-auto mb-5 text-left text-3xl md:text-5xl font-bold">
              <h1 className="leading-tight">
                Lava tu vehículo donde y cuando quieras con <span className="font-black italic">RAYO</span> 
              </h1>
            </div>

            <p className="max-w-screen-sm mx-auto text-lg mb-8 text-muted-foreground">
              {`¿No crees que el lavado de tu vehículo debería ser una experiencia más cómoda y sin complicaciones? 
              Simplifica el lavado de manera eficiente, cómoda y ecológica usando la app RAYO.`}
            </p>

            <div className="max-w-screen-sm mx-auto">
            {/* <Link href="#process" passHref legacyBehavior> */}
              <Button className="w-auto font-bold group/arrow" onClick={startAppointment}> 
                Agendar Lavado
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Button>
            {/* </Link> */}
            </div>
          </div>       
          
        </div>
      </div>
    </div>
  );
}

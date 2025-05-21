"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const BannerWasher = () => {
  
  return (
    <div id="whoweare" className="relative !flex h-auto w-[90%] md:w-[85%] lg:w-[85%] mt-20 mb-[220px] lg:max-w-screen-xl mx-auto items-center justify-between">
      <Image
        width={1200}
        height={1200}
        src="/washerClean1.jpg"
        alt="Washer clean"
        className="absolute inset-0 mr-auto w-[770px] h-[480px] rounded-[50px] object-cover object-center"
      />
      <div className="container mx-auto px-0 w-full mt-[20px] mb-30">
        <div className="grid grid-cols-12 justify-items-end text-left lg:text-left">
          <div className="col-span-full rounded-xl border border-white bg-white/90 dark:bg-card dark:border-zinc-800 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200">

            <div className="max-w-screen-sm mx-auto mb-5 text-left text-3xl md:text-5xl font-bold">
              <h2 className="leading-tight">
                Lava, ganá, Lava, ganá
              </h2>
            </div>

            <p className="max-w-screen-sm mx-auto text-lg mb-8 text-muted-foreground">
              {`En Rayo, empezá a lavar autos y volvés con ingresos asegurados. En nuestro servicio de lavado de autos, cada esfuerzo 
              se transforma en oportunidades. Con horarios flexibles y pagos semanales, vos decidís cómo organizar tu tiempo 
              mientras generás ganancias. Sumate y convertí tu trabajo en estabilidad y crecimiento.`}
            </p>

            <div className="max-w-screen-sm mx-auto">
            <Link href="/auth/washer/login" passHref > 
              <Button className="w-auto font-bold group/arrow" > 
                Empezar
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Button>
            </Link>
            </div>
          </div>       
          
        </div>
      </div>
    </div>
  );
}

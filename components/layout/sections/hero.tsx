"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  // const { theme } = useTheme();
  return (
    
    <section className="w-screen m-auto mt-10 pt-20 bg-[#282929]">
      <div className="grid place-items-center lg:max-w-screen-x2 gap-8 mx-auto pt-2 pb-0 md:pt-4 md:pb-0 mb-24">
        <div className="text-center space-y-8 mb-24">

          <div className="max-w-screen-md mx-auto text-center text-5xl md:text-4xl font-bold text-[#fff] w-[550px]">
            <h1>
              
              <span className="px-2 font-black italic bg-clip-text text-[#fff]">
                RAYO
              </span>
              es la primera superapp de lavado a domicilio.
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-[#fff]">
            {`Queremos simplificar la vida de las personas, mediante una plataforma para el mantenimiento del vehículo 
            de manera eficiente, cómoda y ecológica. Revolucionando la forma en que las personas cuidan su vehículo.`}
          </p>

          {/* <div className="space-y-4 md:space-y-0 md:space-x-4">
           <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
              Get Started
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button> 

            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold"
            >
              <Link
                href="https://github.com/nobruf/shadcn-landing-page.git"
                target="_blank"
              >
                Github respository
              </Link>
            </Button> 
          </div> */}
        </div> 

        <div className="relative h-[550px] w-screen">
          <Image
            src="/BannerRayo1.jpg" // Reemplaza con la ruta de tu imagen
            alt="Imagen de fondo"
            layout="fill"
            objectFit="cover"
            objectPosition="center" // Opcional: Centrar la imagen
            priority // Opcional: Cargar la imagen de forma prioritaria
          />
        </div>    


      </div>
    </section>
  );
};

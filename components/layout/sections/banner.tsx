"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Banner = () => {
  
  return (
    <div id="whoweare" className="relative !flex h-auto w-[90%] md:w-[85%] lg:w-[85%] mt-6 lg:max-w-screen-xl mx-auto items-center justify-between">
      <Image
        width={1200}
        height={1200}
        src="/man-clean-car.jpg"
        alt="bg-img"
        className="absolute inset-0 ml-auto w-[770px] h-[580px] rounded-[50px] object-cover object-center"
      />
      <div className="container mx-auto px-0 w-full mt-[20px]">
        <div className="grid grid-cols-12 text-left lg:text-left">
          <div className="col-span-full rounded-xl border border-white bg-white/90 dark:bg-card dark:border-zinc-800 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">

            <div className="max-w-screen-sm mx-auto mb-5 text-left text-3xl md:text-5xl font-bold">
              <h2 className="leading-tight">
                Quienes somos?
              </h2>
            </div>

            <p className="max-w-screen-sm mx-auto text-lg mb-8 text-muted-foreground">
              {`En Rayo, sabemos que tu tiempo es un recurso valioso y el agua también. Por eso, 
              ofrecemos un servicio de lavado a domicilio que combina comodidad, eficiencia y sustentabilidad. 
              Olvídate de los lavaderos tradicionales y las largas esperas, nosotros vamos a donde estés, sin 
              necesidad de trasladarte ni desperdiciar agua. Utilizamos productos biodegradables y técnicas 
              especializadas que garantizan un lavado excelente, acabado encerado y protegiendo la pintura de 
              tu vehículo mientras cuidamos el planeta. Además, puedes programar tu lavado en minutos.`}
            </p>

            <div className="max-w-screen-sm mx-auto">
            <Link href="#process" passHref > 
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

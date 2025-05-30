"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [  
  {
    icon: "Clock",
    title: "Ahorro de tiempo",
    description:
      "Olvídate de llevar tu auto al lavadero y esperar horas. Nosotros vamos a donde estés, ahorrándote valiosos minutos para lo que realmente importa.",
  },
  {
    icon: "Goal",
    title: "Comodidad a domicilio",
    description:
      "No te preocupes por el tráfico ni por cargar con productos de limpieza. Nosotros nos encargamos de todo.",
  },
  {
    icon: "TabletSmartphone",
    title: "Fácil de usar desde tu celular",
    description:
      "Con nuestra app intuitiva, puedes programar tu lavado en minutos, elegir el día y la hora que más te convenga, y realizar el pago de forma segura.",
  },
  {
    icon: "Star",
    title: "Resultados impecables",
    description:
      "Nuestro equipo de profesionales utiliza técnicas especializadas para garantizar una limpieza profunda y detallada, dejando tu auto reluciente.",
  },
  {
    icon: "Globe",
    title: "Cuidado del medio ambiente",
    description:
      "Utilizamos productos de limpieza biodegradables y ecológicos que no dañan el suelo, el agua ni la fauna.",
  },
  {
    icon: "Sun",
    title: "Ahorro de agua",
    description:
      "Reducimos drásticamente el consumo de agua en comparación con los lavados tradicionales, contribuyendo a la conservación de este recurso vital.",
  },
];

function getDeviceWidth(): number | null {
  if (typeof window !== 'undefined') {
    return window.innerWidth;
  }
  return null;
}

export const FeaturesSection = () => {

  const [deviceWidth, setDeviceWidth] = useState<number | null>(null);

  useEffect(() => {
    setDeviceWidth(getDeviceWidth());
  }, []);

  return (
    <section id="features" className="w-[85%] md:w-[85%] lg:w-[85%] lg:max-w-screen-xl m-auto mt-10 pt-10 pb-12 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Beneficios
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Que nos hace diferentes
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Facil de usar desde tu celular: Podes programar tu lavado por whatsapp en minutos, 
        elegir el día y hora que más te convenga y realizar el pago de forma segura.
      </h3>

      {deviceWidth !== null && deviceWidth > 768 ? (<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle className="text-center">{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>) : (
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 4000
          })
        ]}        
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {featureList.map(({ icon, title, description }) => (
          <CarouselItem
            key={title}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <Card className="w-full h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle className="text-center">{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>)}

    </section>
  );
};

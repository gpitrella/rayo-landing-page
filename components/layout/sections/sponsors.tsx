"use client";

import { Icon } from "@/components/ui/icon";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { icons } from "lucide-react";
import Image from "next/image";
interface sponsorsProps {
  icon: string;
  name: string;
  width: number;
  height: number;
}

const sponsors: sponsorsProps[] = [
  {
    icon: "/visa.svg",
    name: "Visa",
    width: 50,
    height: 50
  },
  {
    icon: "/modo.webp",
    name: "Modo",
    width: 50,
    height: 50
  },
  {
    icon: "/mercado-pago.svg",
    name: "Mercado Pago",
    width: 50,
    height: 50
  },
  {
    icon: "/mastercard.svg",
    name: "Mastercard",
    width: 40,
    height: 40
  },
  {
    icon: "/apple-pay.png",
    name: "Apple Pay",
    width: 250,
    height: 250
  }
];

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6">
        Medios de Pago
      </h2>

      <div className="mx-auto">
        <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {sponsors.map(({ icon, name, width, height }) => (
            <div
              key={name}
              className="flex items-center text-xl md:text-2xl font-medium"
            >
                <Image
                  width={width}
                  height={height}
                  src={icon}
                  alt={name}
                  className="relative inset-0 ml-auto w-[120px] h-auto object-cover object-center"
                />             
              
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

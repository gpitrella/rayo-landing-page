"use client";

import Image from "next/image";

interface SponsorsProps {
  icon: string;
  name: string;
  width: number;
  height: number;
}

const sponsors: SponsorsProps[] = [
  { icon: "/visa.svg", name: "Visa", width: 100, height: 100 },
  { icon: "/modo.webp", name: "Modo", width: 100, height: 100 },
  { icon: "/mercado-pago.svg", name: "Mercado Pago", width: 100, height: 100 },
  { icon: "/mastercard.svg", name: "Mastercard", width: 90, height: 90 },
  { icon: "/apple-pay.png", name: "Apple Pay", width: 190, height: 190 },
];

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-20 sm:pb-24 overflow-hidden">
      <h2 className="text-lg md:text-xl text-center mb-6">Medios de pago disponibles</h2>

      <div className="flex w-full gap-3 flex-wrap md:gap-5 justify-evenly">
        {sponsors.map(({ icon, name, width, height }, index) => (
          <div key={name + index} className="flex items-center justify-center">
            <Image width={width} height={height} src={icon} alt={name} className="h-auto object-cover object-center" />
          </div>
        ))}
      </div>
    </section>
  );
};
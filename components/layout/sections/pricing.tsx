import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import { Check } from "lucide-react";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
  imageSrc: string;
  imgsize: string;
}

const plans: PlanProps[] = [
  {
    title: "Auto chico (HATCHBACK)",
    popular: 1,
    price: 9900,
    description:
      "Ideal para vehículos compactos, servicio de lavado exterior completo, dejando tu auto impecable con aplicación de cera para un brillo duradero.", 
    buttonText: "Reservar",
    benefitList: [
      "Lavado exterior completo",
      "Limpieza de llantas y cubiertas",      
      "Revividor de cubiertas",
      "Limpieza de cristales",
      "Secado a mano",
      "Aplicación de cera exterior",
    ],
    imageSrc: "/HatchpackEtios.png",
    imgsize: '230'
  },
  {
    title: "Auto Mediano (SEDÁN O SUV)",
    popular: 1,
    price: 12900,
    description:
      "Perfecto para sedanes y SUVs, servicio de lavado exterior completo, dejando tu auto impecable con aplicación de cera para un brillo duradero.",
    buttonText: "Reservar",
    benefitList: [
      "Lavado exterior completo",
      "Limpieza de llantas y cubiertas",      
      "Revividor de cubiertas",
      "Limpieza de cristales",
      "Secado a mano",
      "Aplicación de cera exterior",
    ],
    imageSrc: "/sedanAuto.png",
    imgsize: '270'
  },
  {
    title: "Camioneta (4x4 o PICK UP)",
    popular: 1,
    price: 15900,
    description:
      "Un servicio pensado para camionetas robustas, servicio de lavado exterior completo, dejandolo impecable con aplicación de cera con brillo duradero.",
    buttonText: "Reservar",
    benefitList: [
      "Lavado exterior completo",
      "Limpieza de llantas y cubiertas",      
      "Revividor de cubiertas",
      "Limpieza de cristales",
      "Secado a mano",
      "Aplicación de cera exterior",
    ],
    imageSrc: "/Pickup_big.png",
    imgsize: '220'
  },
];

export const PricingSection = () => {
  return (
    <section className="relative h-auto w-[90%] md:w-[85%] lg:w-[85%] mt-6 mb-[220px] lg:max-w-screen-xl mx-auto">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Mira todas las opciones disponibles
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Precios
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        Podes elegir la opción que más se ajusta a tus necesidades.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(
          ({ title, popular, price, description, buttonText, benefitList, imageSrc, imgsize}) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1px] border-primary lg:scale-[1]"
                  : ""
              }
            >
              <CardHeader>
                <span className="min-h-[155px]">
                  <img src={imageSrc} alt={title} style={{ width: `${imgsize}px` }}  className="h-auto object-cover m-auto mb-5" loading="lazy"/>
                </span>
                <CardTitle className="pb-2 m-auto">{title}</CardTitle>

                <CardDescription className="pb-4 text-center">
                  {description}
                </CardDescription>

                <div className="text-center m-auto w-auto">
                  <span className="text-4xl font-bold text-center m-auto">$ {price}</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check color="green" className="text-primary mr-2 color" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={
                    popular === PopularPlan?.YES ? "default" : "secondary"
                  }
                  className="w-full"
                >
                  <Link href='/home' >                                       
                    <span>{buttonText}</span>                  
                  </Link>                   
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};

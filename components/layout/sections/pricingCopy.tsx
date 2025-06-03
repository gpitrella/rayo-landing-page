"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import {
  Card,
  CardContent,
  // CardDescription, // No se usa directamente en el JSX modificado
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import { useState } from "react";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface ServicePlan {
  name: string;
  price: number;
  strongDescription: string;
  description: string;
  benefitList: string[];
  buttonText: string;
}

interface VehicleCardProps {
  vehicleTypeTitle: string;
  vehicleTypeSubtitle: string;  
  popular: PopularPlan;
  imageSrc: string;
  imgsize: string;
  services: ServicePlan[];
}

const vehicleData: VehicleCardProps[] = [
  {
    vehicleTypeTitle: "Vehículo Chico",
    vehicleTypeSubtitle: "(HATCHBACK)",    
    popular: PopularPlan.YES,
    imageSrc: "/HatchpackEtios.png",
    imgsize: '200', // Podría necesitar ajuste si la tarjeta es más ancha
    services: [
      {
        name: "Lavado Exterior",
        price: 9900,
        strongDescription: "NO ES NECESARIA TU PRESENCIA",        
        description: "Servicio de lavado exterior completo, dejando tu auto impecable con aplicación de cera.",
        benefitList: [          
          "Lavado exterior completo",
          "Limpieza de llantas y cubiertas",
          "Limpieza de cristales",
          "Secado a mano",
          "Aplicación de cera exterior"
        ],
        buttonText: "Reservar Exterior",
      },
      {
        name: "Lavado Completo",
        price: 12900,
        strongDescription: "ES NECESARIA TU PRESENCIA",
        description: "Lavado exterior e interior profundo para una limpieza total de tu vehículo.",
        benefitList: [
          "Lavado exterior completo",
          "Limpieza de llantas y cubiertas",
          "Limpieza de cristales",
          "Secado a mano",
          "Aplicación de cera exterior",
          "Todo lo de Lavado Exterior",
          "Aspirado completo de interior",
          "Limpieza de alfombras y tapizados (superficial)",
          "Limpieza de plásticos y tablero",
          "Aromatización"
        ],
        buttonText: "Reservar Completo",
      },
    ],
  },
  {
    vehicleTypeTitle: "Vehículo Mediano",
    vehicleTypeSubtitle: "(SEDÁN O SUV)",
    popular: PopularPlan.YES,    
    imageSrc: "/sedanAuto.png",
    imgsize: '230', // Podría necesitar ajuste
    services: [
      {
        name: "Lavado Exterior",
        price: 12900,
        strongDescription: "NO ES NECESARIA TU PRESENCIA",
        description: "Perfecto para sedanes y SUVs, lavado exterior completo y encerado.",
        benefitList: [
          "Lavado exterior completo",
          "Limpieza de llantas y cubiertas",
          "Limpieza de cristales",
          "Secado a mano",
          "Aplicación de cera exterior"
        ],
        buttonText: "Reservar Exterior",
      },
      {
        name: "Lavado Completo",
        price: 15900,
        strongDescription: "ES NECESARIA TU PRESENCIA",
        description: "Limpieza exhaustiva exterior e interior para tu sedán o SUV.",
        benefitList: [
          "Lavado exterior completo",
          "Limpieza de llantas y cubiertas",
          "Limpieza de cristales",
          "Secado a mano",
          "Aplicación de cera exterior",
          "Todo lo de Lavado Exterior",
          "Aspirado completo de interior",
          "Limpieza de alfombras y tapizados (superficial)",
          "Limpieza de plásticos y tablero",
          "Aromatización"
        ],
        buttonText: "Reservar Completo",
      },
    ],
  },
  {
    vehicleTypeTitle: "Camioneta",
    vehicleTypeSubtitle: "(4x4 o PICK UP)",
    popular: PopularPlan.YES,
    imageSrc: "/Pickup_big.png",
    imgsize: '200', // Podría necesitar ajuste
    services: [
      {
        name: "Lavado Exterior",
        price: 15900,
        strongDescription: "NO ES NECESARIA TU PRESENCIA",
        description: "Servicio robusto para camionetas, lavado exterior y encerado protector.",
        benefitList: [
          "Lavado exterior completo",
          "Limpieza de llantas y cubiertas",
          "Limpieza de cristales",
          "Secado a mano",
          "Aplicación de cera exterior"
        ],
        buttonText: "Reservar Exterior",
      },
      {
        name: "Lavado Completo",
        price: 18900,
        strongDescription: "ES NECESARIA TU PRESENCIA",
        description: "El tratamiento más completo para tu camioneta, impecable por dentro y por fuera.",
        benefitList: [
          "Todo lo de Lavado Exterior",
          "Aspirado profundo de cabina y caja (si aplica)",
          "Limpieza detallada de tapizados/cuero",
          "Limpieza y protección de plásticos interiores y exteriores",
          "Aromatización premium",
        ],
        buttonText: "Reservar Completo",
      },
    ],
  },
];

const baseTabClasses = "py-3 font-medium border-b-4 transition-all duration-300 ease-in-out focus:outline-none relative whitespace-nowrap";

export const PricingSectionCopy = () => {
  const [selectedVehicleTitle, setSelectedVehicleTitle] = useState<string>(
    vehicleData[0].vehicleTypeTitle
  );

  const selectedVehicle = vehicleData.find(
    (v) => v.vehicleTypeTitle === selectedVehicleTitle
  );

  return (
    <section className="relative h-auto w-[95%] md:w-[90%] lg:w-[85%] mt-6 mb-[110px] lg:max-w-screen-xl mx-auto">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Mira todas las opciones disponibles
      </h2>
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Precios Detallados por Servicio
      </h2>
      <h3 className="md:w-2/3 mx-auto text-xl text-center text-muted-foreground pb-8">
        Selecciona tu tipo de vehículo y elige el plan que más se ajusta a tus necesidades.
      </h3>

      {/* Tabs de Selección de Vehículo */}
      {/* Contenedor de pestañas: permite scroll horizontal en móvil si es necesario, y aplica solapamiento en desktop */}
      <div className="flex justify-center items-end mb-12">
        <div className="inline-flex items-end md:space-x-[-0.75rem]"> {/* Ajuste el valor de space-x negativo para el solapamiento deseado */}
          {vehicleData.map((vehicle) => {
            const isActive = selectedVehicleTitle === vehicle.vehicleTypeTitle;
            return (
              <button
                key={vehicle.vehicleTypeTitle}
                onClick={() => setSelectedVehicleTitle(vehicle.vehicleTypeTitle)}
                className={`
                  ${baseTabClasses}
                  ${isActive
                    ? 'px-3 sm:px-4 md:px-5 lg:px-6 text-xs sm:text-sm md:text-base text-primary scale-105 md:scale-105 z-20 bg-card dark:bg-slate-800 rounded-t-lg shadow-md' // Pestaña activa
                    : 'px-2 sm:px-3 md:px-4 lg:px-6 text-xs sm:text-xs md:text-base border-transparent text-muted-foreground hover:text-primary hover:border-primary/50 scale-100 md:scale-100 opacity-70 md:opacity-80 md:-mb-1 z-10' // Pestañas inactivas
                  }
                `}
              >
                {vehicle.vehicleTypeTitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sección para mostrar la tarjeta seleccionada */}
      <div className="mt-10">
        {selectedVehicle && (
          <Card
            key={selectedVehicle.vehicleTypeTitle} // Forzar re-render y posible animación al cambiar
            className={`
              w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[65%] mx-auto
              flex flex-col shadow-2xl rounded-xl
              border-2 border-primary dark:border-primary
              transition-opacity duration-500 ease-in-out  /* Para una transición suave si se usa */
              ${selectedVehicle.popular === PopularPlan.YES ? "ring-primary dark:ring-offset-slate-900" : ""}
            `}
            // Si quieres una animación de entrada, puedes añadir clases de Tailwind para animaciones aquí
            // o usar una librería como framer-motion.
          >
            <CardHeader className="flex-shrink-0 pt-6">
              <div className="min-h-[160px] md:min-h-[180px] flex items-center justify-center px-4">
                <img
                  src={selectedVehicle.imageSrc}
                  alt={selectedVehicle.vehicleTypeTitle}
                  style={{ width: `${selectedVehicle.imgsize}px`, maxHeight: '180px' }} // Ajusta maxHeight si es necesario
                  className="object-contain m-auto mb-3"
                  loading="lazy"
                />
              </div>
              <CardTitle className="pb-1 text-center text-2xl md:text-3xl">
                {selectedVehicle.vehicleTypeTitle}
                <br />
                <span className="text-sm md:text-base font-normal text-muted-foreground">{selectedVehicle.vehicleTypeSubtitle}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
              {selectedVehicle.services.map((service) => (
                <div key={service.name} className="border border-border/50 p-3 md:p-4 rounded-lg flex flex-col bg-background/30 dark:bg-slate-800/30">
                  <h4 className="text-lg md:text-xl font-semibold text-primary mb-1">{service.name}</h4>
                  <div className="text-2xl md:text-3xl font-bold mb-2">${service.price}</div>
                  { service.name === "Lavado Exterior"  
                    ? <p className="text-base font-extrabold md:text-base text-muted-foreground text-lime-600 mb-4">{service.strongDescription}</p>
                    : <p className="text-base font-bold md:text-base text-muted-foreground text-amber-400 mb-4">{service.strongDescription}</p> }
                  <p className="text-xs md:text-sm text-muted-foreground mb-3">{service.description}</p>
                  <div className="space-y-1 mb-4 flex-grow">
                    {service.benefitList.map((benefit) => (
                      <span key={benefit} className="flex items-start text-xs md:text-sm">
                        <Check color="green" className="text-primary mr-2 mt-0.5 flex-shrink-0" size={16} />
                        <span>{benefit}</span>
                      </span>
                    ))}
                  </div>
                  <Button variant="default" size="sm" className="w-full mt-auto group/arrow text-sm md:text-base py-2.5 md:py-3">
                    <Link href='/auth/login' className="w-full flex items-center justify-center">
                      <span>{service.buttonText}</span>
                      <ArrowRight className="size-4 md:size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      <h4 className="md:w-1/2 mx-auto text-base text-center text-muted-foreground pt-10">
        * Los precios son referenciales y pueden estar sujetos a cambios. La limpieza de tapizados es superficial.
      </h4>
    </section>
  );
};
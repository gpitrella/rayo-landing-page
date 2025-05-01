import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "¿Cómo reservo un servicio de lavado a domicilio?",
    answer: "Puedes reservar a través de nuestra aplicación móvil. Solo necesitas ingresar tus datos de contacto, la dirección donde quieres que lavemos tu auto y el servicio que deseas.",
    value: "item-1",
  },
  {
    question: "¿Qué servicios de lavado de autos ofrecen a domicilio?",
    answer:
      "Ofrecemos un lavado exterior, limpieza de vidrios, lavado de llantas y estamos trabajando para poder ofrecer un servicio de lavado y aspirado interior.",
    value: "item-2",
  },
  {
    question: "¿Qué días y horarios están disponibles para el servicio a domicilio?",
    answer:
      "Tenemos disponibilidad de 24hs. Tienes que ingresar en la aplicación y ver la disponibilidad de washer que hay donde este tu vehículo o puedes programar el lavado para el día y hora que tu puedas.",
    value: "item-3",
  },
  {
    question: "¿Qué pasa si necesito cancelar o reprogramar mi servicio?",
    answer: "Puedes cancelar o reprogramar tu servicio en cualquier momento sin costo adicional.",
    value: "item-4",
  },
  {
    question: "¿Qué medidas de seguridad toman para proteger mi auto y mi propiedad?",
    answer: "Todos nuestros técnicos están altamente capacitados y cuentan con seguro de responsabilidad civil. Además, utilizamos productos de limpieza biodegradables y equipos de lavado que no dañan la pintura ni otras partes del vehículo.",
    value: "item-5",
  },
  {
    question: "¿Cómo debo preparar mi auto para el servicio de lavado a domicilio?",
    answer: "No necesitas hacer nada especial. Solo asegúrate de que tu auto esté estacionado en un lugar accesible.",
    value: "item-6",
  },
  {
    question: "¿Qué garantía ofrecen si no estoy satisfecho con el servicio?",
    answer: "Si por alguna razón no estás satisfecho con nuestro servicio, por favor contáctanos y haremos todo lo posible para solucionar el problema. Tu satisfacción es nuestra prioridad.",
    value: "item-7",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[850px] py-16 sm:py-20">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">FAQS</h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold">Preguntas Frecuentes</h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

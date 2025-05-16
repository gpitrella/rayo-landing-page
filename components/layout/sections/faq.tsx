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
    answer: "Podés hacer tu reserva directamente por WhatsApp o la web. Solo necesitás enviarnos tus datos de contacto, la dirección donde querés que lavemos tu auto y el tipo de servicio que deseas. Así de simple, sin complicaciones.",
    value: "item-1",
  },
  {
    question: "¿Qué servicios de lavado de autos ofrecen a domicilio?",
    answer:
      "Ofrecemos un lavado exterior, encerado, limpieza de vidrios, lavado de llantas, renovador de neumáticos y estamos trabajando para poder ofrecer un servicio de lavado y aspirado interior.",
    value: "item-2",
  },
  {
    question: "¿Qué días y horarios están disponibles para el servicio a domicilio?",
    answer:
      "Trabajamos de Lunes a Domingo de 9hs a 18hs. Estamos trabajando para estar disponibles las 24hs.",
    value: "item-3",
  },  
  {
    question: "¿Qué medidas de seguridad toman para proteger mi auto y mi propiedad?",
    answer: "Todos nuestros técnicos están altamente capacitados y cuentan con seguro de responsabilidad civil. Además, utilizamos productos de limpieza biodegradables y equipos de lavado que no dañan la pintura ni otras partes del vehículo.",
    value: "item-5",
  },
  {
    question: "¿Cómo debo preparar mi auto para el servicio de lavado a domicilio?",
    answer: "No necesitas hacer nada especial. Solo asegúrate de que tu auto esté estacionado en un lugar donde nos indicas.",
    value: "item-6",
  }
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[850px] py-6 sm:py-20">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">Consultas</h2>
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

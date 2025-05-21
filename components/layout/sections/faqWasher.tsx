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
    question: "¿Cuáles son los materiales y productos que debo llevar para cada lavado?",
    answer: "Se brindamos toda la capacitación de materiales y metodos cuando te registes entre los materiales tendrás detergente biodegradable, microfibras, microfibras para vidrios. El primer kit de limpieza te lo brindamos nosotros",
    value: "item-1",
  },
  {
    question: "¿Cómo se calcula la tarifa por servicio y cómo se realizan los pagos?",
    answer:
      "La tarifa puede depender del tamaño del vehículo. Los pagos se realizan por transferencia bancaria o mediante apps de pago, los mismos se realizan semanalmente.",
    value: "item-2",
  },
  {
    question: "¿Qué hacer si un cliente no está satisfecho con el resultado del lavado?",
    answer:
      "Se recomienda escuchar la inquietud del cliente con atención y ofrecer correcciones si es posible. La mejora en los detalles de limpieza pueden generarte propinas adicionales.",
    value: "item-3",
  },  
  {
    question: "¿Cómo manejar situaciones en las que el vehículo tiene daños preexistentes?",
    answer: "Antes de comenzar el lavado, siempre es bueno inspeccionar el vehículo y avisar al cliente sobre posibles daños (rayones, golpes). También es recomendable tomar fotos antes del lavado para evitar malos entendidos.",
    value: "item-5",
  }
];

export const FAQWasherSection = () => {
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

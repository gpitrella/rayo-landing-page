import { ContactSection } from "@/components/layout/sections/contact";
export default function ReservarLavadoPage() {  

  return (
    <div className="w-[85%] md:w-[85%] lg:w-[85%] lg:max-w-screen-xl sm:px-0 top-5 mx-auto z-40 py-0 px-0 mt-32">
      <h1 className="text-2xl font-bold mb-6 text-center">Contactanos</h1>
      <p className="text-center w-full md:w-[65%] m-auto">Déjanos tu consulta a través del siguiente formulario y nuestro equipo se pondrá en 
        contacto contigo lo antes posible. Ya sea para solicitar una cotización o 
        conocer más sobre nuestros procesos de lavado sustentable, estamos listos para atenderte.</p>
      <ContactSection />
    </div>
  )
}


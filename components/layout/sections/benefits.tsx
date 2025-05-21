import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}


const benefitList: BenefitsProps[] = [
  {
    icon: "Blocks",
    title: "Sin sistema de turnos",
    description:
      "Elegí cuándo y dónde conectarte dentro de nuestras zonas habilitadas. Trabajá con total libertad y organizá tu tiempo a tu manera.",
  },
  {
    icon: "LineChart",
    title: "Ganancias semanales",
    description:
      "Recibí tus pagos todas las semanas y aprovechá los bonos diarios disponibles para aumentar tus ingresos.",
  },
  {
    icon: "Wallet",
    title: "Club de beneficios",
    description:
      "Accedé a descuentos exclusivos y financiación en productos seleccionados para que disfrutes más ventajas mientras trabajás. ",
  },
  {
    icon: "Sparkle",
    title: "Flexibilidad total",
    description:
      "Trabajá según tu disponibilidad sin horarios fijos ni compromisos rígidos. Vos decidís cómo y cuándo generar ingresos.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="relative !flex h-auto w-[90%] md:w-[85%] lg:w-[85%] mt-20 mb-[120px] lg:max-w-screen-xl mx-auto items-center justify-between">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Beneficios</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Beneficios con Rayo
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
              Trabajá con total libertad, sin turnos fijos, eligiendo cuándo y dónde operar. 
              Recibí pagos semanales con bonos diarios para aumentar tus ingresos. Además, disfrutá descuentos y 
              financiación exclusiva con nuestro club de beneficios.  
              Si querés aún más concisión o un ajuste de tono, decime y lo refinamos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

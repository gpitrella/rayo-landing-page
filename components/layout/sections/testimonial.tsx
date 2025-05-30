"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "https://github.com/shadcn.png",
    name: "Valeria R.",
    userName: "Colegiales, CABA",
    comment:
      "Quedé muy satisfecho con el servicio, mi auto está impecable. ¡Sin duda volveré a contratarlos, gracias por el excelente servicio!",
    rating: 5.0,
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Martín D.",
    userName: "Villa Martelli, Bs As",
    comment:
      "Confío plenamente en este servicio, son profesionales y cuidan los autos. Siempre dejan mi auto impecable, ¡los recomiendo con total confianza!",
    rating: 5,
  },

  {
    image: "https://github.com/shadcn.png",
    name: "Laura F.",
    userName: "Núñez, CABA",
    comment:
      "El servicio fue rápido y eficiente, mi auto quedó como nuevo en poco tiempo. ¡Cumplieron con los tiempos acordados!",
    rating: 5,
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Luis G.",
    userName: "Retiro, CABA",
    comment:
      "El lavado fue muy minucioso, mi auto quedó impecable por dentro y por fuera. ¡Gracias por el excelente trabajo y la atención al detalle!",
    rating: 5.0,
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Sofía M.",
    userName: "Puerto Madero, CABA",
    comment:
      "La reserva fue muy sencilla y la atención al cliente fue excelente, ¡muy amables! Recomiendo este servicio por su rapidez y la facilidad para reservar.",
    rating: 5.0,
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Pedro S.",
    userName: "Avellaneda, Bs As",
    comment:
      "Excelente servicio a un precio razonable, ¡muy buena relación calidad-precio! Volveré a contratarlos sin duda, ¡quedé muy satisfecho!",
    rating: 5,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container pt-8 pb-8 sm:pt-10 sm:pb-14">
      <div className="text-center mb-8">
        <h2 className="text-lg md:text-xl text-primary text-center mb-2 tracking-wider">
          Testimonials
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Lo que dicen nuestros clientes
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    {/* <Avatar>
                      <AvatarImage
                        src="https://avatars.githubusercontent.com/u/75042455?v=4"
                        alt="radix"
                      />
                      <AvatarFallback>SV</AvatarFallback>
                    </Avatar> */}

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

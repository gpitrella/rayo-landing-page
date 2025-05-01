import DiscordIcon from "@/components/icons/discord-icon";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CommunitySection = () => {
  return (
    <section id="community" className="py-12 ">
      <div className="container py-20 sm:py-20">
        <div className="lg:w-[70%] mx-auto">
          <Card className="bg-background border-none shadow-none text-center flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl font-bold flex flex-col items-center">
                <div>
                  Lava tu vehículo donde y cuando <br></br>quieras con 
                  <span className="text-transparent font-black pl-2 bg-gradient-to-r from-[#04c55b] to-primary bg-clip-text">
                    RAYO
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="lg:w-[80%] text-xl text-muted-foreground">
                Simplifica el lavado de tu vehículo de manera cómoda, eficiente y ecológica.
            </CardContent>

            <CardFooter>
              <Button className="w-auto font-bold group/arrow py-4 px-7 h-12 text-lg"> 
                <Link href='/home' >                                       
                      <span>Agendar Lavado</span>                  
                </Link>                
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

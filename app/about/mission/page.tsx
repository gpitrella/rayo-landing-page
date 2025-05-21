"use client";

import '../../styles/auth.css';
import Image from "next/image";
import { useTheme } from "next-themes";

const Page = () => {
    const { theme, setTheme } = useTheme(); 

    return (
        <div id="termsandconditions" className="pt-12 pb-8">      
           <div className="container py-20 sm:py-30 max-w-5xl px-8">
            <div className="lg:w-[70%] mx-auto"> 
                <h1 className="font-black align-center text-2xl mb-5">Misión y Visión</h1> 
                <h3 className="font-black align-center text-xl mb-5">Misión</h3>               
                <p className="text">
                    Simplificar la vida de las personas, mediante una plataforma para el mantenimiento del 
                    vehículo de manera eficiente, cómoda y ecológica. Revolucionando la forma en que las 
                    personas cuidan su vehículo.
                </p>
                <h3 className="font-black align-center text-xl mb-5 mt-8">Visión</h3>               
                <p className="text">
                    Ser la plataforma de cuidado del vehículo mas grande y confiable del mundo, operando en todas las ciudades 
                    y ofreciendo una amplia gama de servicios de mantenimiento automotor.
                </p>
                <Image
                   src={theme === 'light' ? '/LogoNegativo.png' : '/LogoPositivo.png'}
                   alt={theme === 'light' ? "Logo Rayo Black" : "Logo Rayo White"}
                   className="h-[320px] m-auto w-auto rounded-md object-cover p-14 mt-10"
                   width={70}
                   height={70}
                 />
            </div>
          </div>
        </div>          

    );
}

 
export default Page;
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { FooterSection } from "@/components/layout/sections/footer";
import { Providers } from "@/app/store/provider";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/components/layout/theme-provider";
import { analytics } from "../app/config/firebase";
import { logEvent } from "firebase/analytics";
import 'leaflet/dist/leaflet.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rayo Lavados | Lavado de autos a domicilio",
  description:
    "Lava tu vehículo donde y cuando quieras con RAYO. Vamos donde este tu vehículo, sin necesidad de tu presencia, mientras vos seguís con tus actividades. Simplifica el lavado de tu vehículo de manera cómoda, eficiente y ecológica.",
  keywords: ["lavado a domicilio de auto", "lavado de autos", "comodidad", "innovación", "lavado de autos", "auto", "simplificar la vida"],
  authors: [{ name: "Rayo Lavados", url: "https://rayolavados.com" }],
  openGraph: {
    title: "Rayo Lavados | Lavado de autos a domicilio",
    description:
      "Lava tu vehículo donde y cuando quieras con RAYO. Vamos donde este tu vehículo, sin necesidad de tu presencia, mientras vos seguís con tus actividades. Simplifica el lavado de tu vehículo de manera cómoda, eficiente y ecológica.",
    url: "https://rayolavados.com",
    siteName: "Rayo",
    images: [{ url: "/LogoPositivo.png", width: 640, height: 630, alt: "Rayo lavados" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayo Lavados | Lavado de autos a domicilio",
    description:
      "Lava tu vehículo donde y cuando quieras con RAYO. Vamos donde este tu vehículo, sin necesidad de tu presencia, mientras vos seguís con tus actividades. Simplifica el lavado de tu vehículo de manera cómoda, eficiente y ecológica.",
    images: ["/LogoPositivo.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  if (analytics) {
    logEvent(analytics, "page_view");
  }

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", inter.className)}>
      <ThemeProvider>
        <Toaster           
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options            
            className: '',
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />         
          <Providers>             
            <Navbar />
              {children}  
            <FooterSection />        
          </Providers> 
        </ThemeProvider>        
      </body>
    </html>
  );
}

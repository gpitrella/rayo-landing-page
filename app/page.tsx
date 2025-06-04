// 'use client'
// import { useEffect } from 'react'
// import { checkUserLoggedIn } from './services/auth.service'
// import { useRouter } from 'next/navigation'

import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { PricingSectionCopy } from "@/components/layout/sections/pricingCopy";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { Banner } from "@/components/layout/sections/banner";
import { Process } from "@/components/layout/sections/process";
// import { AnimatedNumbers } from"@/components/layout/sections/numbers";
import dynamic from 'next/dynamic';
import { StoreImg } from "@/components/layout/sections/store";

export const metadata = {
  title: "Rayo Lavados",
  description: "Rayo  Lavados",
  openGraph: {
    type: "website",
    url: "https://rayolavados.com",
    title: "Rayo Lavados",
    description: "Rayo Lavados",
    images: [
      {
        url: "/LogoPositivo.png",
        width: 1200,
        height: 630,
        alt: "Rayo Lavados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://rayolavados.com",
    title: "Rayo Lavados",
    description: "Rayo lavados",
    images: [
      "/LogoPositivo.png",
    ],
  },
};

export default function Home() {

  return (
    <>
      <CommunitySection />
      <Banner />
      {/* <AnimatedNumbers /> */}
      <Process />
      <FeaturesSection />      
      <HeroSection />        
      {/* <BenefitsSection />
      <ServicesSection /> */}      
      {/* <TeamSection />*/}      
      {/* <PricingSection /> */}
      <PricingSectionCopy />
      <SponsorsSection />
      <TestimonialSection />
      <FAQSection />
      <StoreImg />
      {/* <ContactSection />       */}
    </>
  );
}

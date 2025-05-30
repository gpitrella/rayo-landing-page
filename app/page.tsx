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
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { Banner } from "@/components/layout/sections/banner";
import { Process } from "@/components/layout/sections/process";
// import { AnimatedNumbers } from"@/components/layout/sections/numbers";
import dynamic from 'next/dynamic';

export const metadata = {
  title: "Rayo - Landing template",
  description: "RAYO landing page",
  openGraph: {
    type: "website",
    url: "https://rayolavados.com",
    title: "Rayo - Landing template",
    description: "Rayo - Landing template",
    images: [
      {
        url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
        width: 1200,
        height: 630,
        alt: "Shadcn - Landing template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://rayolavados.com",
    title: "Rayo Lavados - Page",
    description: "Rayo lavados landing page for developers",
    images: [
      "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
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
      {/* <SponsorsSection /> */}
      {/* <BenefitsSection />
      <ServicesSection /> */}      
      {/* <TeamSection />*/}      
      <PricingSection /> 
      <TestimonialSection />
      <FAQSection />
      {/* <ContactSection />       */}
    </>
  );
}

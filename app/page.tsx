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
import dynamic from 'next/dynamic';

export const metadata = {
  title: "Rayo - Landing template",
  description: "RAYO landing page",
  openGraph: {
    type: "website",
    url: "https://github.com/gpitrella",
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
    site: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Shadcn - Landing template",
    description: "Free Shadcn landing page for developers",
    images: [
      "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
    ],
  },
};

export default function Home() {
  // const router = useRouter();

  // useEffect(()=>{
  //   const isAuthenticated = checkUserLoggedIn();
  //   if(isAuthenticated){
  //     router.push('/home')
  //   }
  //   else{
  //     router.push('/auth/login')
  //   }
  // })


  return (
    <>
      <CommunitySection />
      <Banner />
      <Process />
      <FeaturesSection />      
      <HeroSection />      
      {/* <SponsorsSection /> */}
      {/* <BenefitsSection />
      <ServicesSection /> */}
      {/* <TestimonialSection />
      <TeamSection />
      
      <PricingSection /> */}
      <ContactSection />
      <FAQSection />
    </>
  );
}

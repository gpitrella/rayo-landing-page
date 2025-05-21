// 'use client'
// import { useEffect } from 'react'
// import { checkUserLoggedIn } from './services/auth.service'
// import { useRouter } from 'next/navigation'

import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQWasherSection } from "@/components/layout/sections/faqWasher";
import { FeaturesSection } from "@/components/layout/sections/features";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { BannerWasher } from "@/components/layout/sections/bannerWasher";
import { ProcessWasher } from "@/components/layout/sections/processWasher";
import dynamic from 'next/dynamic';

export default function Home() {

  return (
    <>
      {/* <CommunitySection /> */}
      <BannerWasher />
      <ProcessWasher />
      {/* <FeaturesSection />       */}
      {/* <HeroSection />       */}
      {/* <SponsorsSection />  */}
      <BenefitsSection />
      {/* <ServicesSection />  */}
      {/* <TestimonialSection /> */}
      {/* <TeamSection /> */}      
      {/* <PricingSection />  */}
      <FAQWasherSection />
      {/* <ContactSection />      */}
    </>
  );
}
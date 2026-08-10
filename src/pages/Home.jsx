import React from 'react'
import Hero from '../sections/Hero'
import CategoryStrip from '../sections/CategoryStrip'
import AboutSnippet from '../sections/AboutSnippet'
import CategoryCards from '../sections/CategoryCards'
import FeaturedProducts from '../sections/FeaturedProducts'
import ProcessSteps from '../sections/ProcessSteps'
import QualitySection from '../sections/QualitySection'
import WhyKarshak from '../sections/WhyKarshak'
import B2BSection from '../sections/B2BSection'
import SustainabilitySnippet from '../sections/SustainabilitySnippet'
import ContactCTA from '../sections/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <AboutSnippet />
      <CategoryCards />
      <FeaturedProducts />
      <ProcessSteps />
      <QualitySection />
      <WhyKarshak />
      <B2BSection />
      <SustainabilitySnippet />
      <ContactCTA />
    </>
  )
}

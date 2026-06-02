import Nav from '@/components/nav'
import Hero from '@/components/hero/hero'
import Problem from '@/components/problem'
import HowItWorks from '@/components/how-it-works'
import DigestMock from '@/components/digest-mock'
import Features from '@/components/features'
import Pricing from '@/components/pricing'
import CtaFinal from '@/components/cta'
import Footer from '@/components/footer'
import ScrollReveal from '@/components/scroll-reveal'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="section-divider" />
        <ScrollReveal>
          <Problem />
        </ScrollReveal>
        <div className="section-divider" />
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>
        <div className="section-divider" />
        <ScrollReveal>
          <DigestMock />
        </ScrollReveal>
        <div className="section-divider" />
        <ScrollReveal>
          <Features />
        </ScrollReveal>
        <div className="section-divider" />
        <ScrollReveal>
          <Pricing />
        </ScrollReveal>
        <div className="section-divider" />
        <ScrollReveal>
          <CtaFinal />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  )
}

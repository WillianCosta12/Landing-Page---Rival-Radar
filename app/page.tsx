import Nav from '@/components/nav'
import Hero from '@/components/hero/hero'
import Marquee from '@/components/marquee'
import Problem from '@/components/problem'
import HowItWorks from '@/components/how-it-works'
import DigestMock from '@/components/digest-mock'
import Features from '@/components/features'
import Pricing from '@/components/pricing'
import Faq from '@/components/faq'
import CtaFinal from '@/components/cta'
import Footer from '@/components/footer'
import ScrollReveal from '@/components/scroll-reveal'
import StickyCtaBar from '@/components/sticky-cta-bar'

export default function Home() {
  return (
    <>
      <Nav />
      <StickyCtaBar />
      <main>
        <Hero />
        <Marquee />
        <div className="section-divider" />
        <ScrollReveal><Problem /></ScrollReveal>
        <div className="section-divider" />
        <ScrollReveal><HowItWorks /></ScrollReveal>
        <div className="section-divider" />
        <ScrollReveal><DigestMock /></ScrollReveal>
        <div className="section-divider" />
        <ScrollReveal><Features /></ScrollReveal>
        <div className="section-divider" />
        <ScrollReveal><Pricing /></ScrollReveal>
        <div className="section-divider" />
        <ScrollReveal><Faq /></ScrollReveal>
        <div className="section-divider" />
        <ScrollReveal><CtaFinal /></ScrollReveal>
      </main>
      <Footer />
    </>
  )
}

import HeroSection from './components/hero-section'
import GuardianSection from './components/guardian-section'
import SunshineSection from './components/sunshine-section'
import FooterSection from './components/footer-section'

export default function Home() {
  return (
    <article className="mx-auto grid max-w-6xl gap-2 pt-16 md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto]">
      <HeroSection />
      <GuardianSection />
      <SunshineSection />
      <FooterSection />
    </article>
  )
}

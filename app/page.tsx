import { Navigation } from '@/components/layout/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { CertificatesSection } from '@/components/sections/CertificatesSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { AchievementsSection } from '@/components/sections/AchievementsSection'
import { InterestsSection } from '@/components/sections/InterestsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { HumanTouchSection } from '@/components/sections/HumanTouchSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/layout/Footer'
import { SearchModal } from '@/components/features/SearchModal/SearchModal'

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg text-content-primary selection:bg-accent/25 selection:text-white">
      {/* Deep Black & Delicate White Lines Background Grid */}
      <div className="pointer-events-none fixed inset-0 grid-pattern opacity-40 z-0" />

      {/* Subtle Overhead Ambient Skylight (Gentle skylight glow, not full/harsh) */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[720px] max-w-full h-[280px] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.13),transparent_70%)] blur-2xl z-0" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-bg/30 to-bg/90 z-0" />

      {/* Top Fixed Navigation */}
      <Navigation />

      {/* Main 2D Landing Page Content */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Landing Section */}
        <HeroSection />

        {/* About Me Section */}
        <AboutSection />

        {/* Skills & Tech Stack Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Verified Certificates & Honors */}
        <CertificatesSection />

        {/* Experience Timeline */}
        <ExperienceSection />

        {/* Milestones & Achievements */}
        <AchievementsSection />

        {/* Technical Interests & Passions */}
        <InterestsSection />

        {/* Human Side & Developer Values */}
        <HumanTouchSection />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Contact Form & Information */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Search Modal (Ctrl/Cmd+K) */}
      <SearchModal />
    </div>
  )
}

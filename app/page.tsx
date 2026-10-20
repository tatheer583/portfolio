import { Navigation } from '@/components/layout/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { IntroSection } from '@/components/sections/IntroSection'
import { TechMarquee } from '@/components/sections/TechMarquee'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { GitHubSection } from '@/components/sections/GitHubSection'
import { CertificatesSection } from '@/components/sections/CertificatesSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { AchievementsSection } from '@/components/sections/AchievementsSection'
import { InterestsSection } from '@/components/sections/InterestsSection'
import { HumanTouchSection } from '@/components/sections/HumanTouchSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/layout/Footer'
import { SearchModal } from '@/components/features/SearchModal/SearchModal'

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg text-content-primary selection:bg-accent/25 selection:text-content-primary">
      {/* Ambient page backdrop */}
      <div className="pointer-events-none fixed inset-0 grid-pattern opacity-40 z-0" />

      {/* Top Fixed Navigation */}
      <Navigation />

      {/* Main 2D Landing Page Content */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Landing Section */}
        <HeroSection />

        {/* Introduction — who I am and what I actually build */}
        <IntroSection />

        {/* Animated technology ticker */}
        <TechMarquee />

        {/* About Me Section */}
        <AboutSection />

        {/* Skills & Tech Stack Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Live GitHub Activity */}
        <GitHubSection />

        {/* Verified Certificates & Honors */}
        <CertificatesSection />

        {/* Experience Timeline */}
        <ExperienceSection />

        {/* Education */}
        <EducationSection />

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

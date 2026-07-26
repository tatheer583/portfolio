import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { SecuritySection } from '@/components/sections/SecuritySection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { AchievementsSection } from '@/components/sections/AchievementsSection'
import { AIExpertiseSection } from '@/components/sections/AIExpertiseSection'
import { GitHubSection } from '@/components/sections/GitHubSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <main id="main">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <SecuritySection />
      <ProjectsSection />
      <AchievementsSection />
      <AIExpertiseSection />
      <GitHubSection />
      <ContactSection />
    </main>
  )
}
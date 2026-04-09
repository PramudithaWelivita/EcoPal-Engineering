import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PodcastSection } from './components/PodcastSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { CookiePolicy } from './components/CookiePolicy';
import { WatchOurStory } from './components/WatchOurStory';
import { ViewOurProjects } from './components/ViewOurProjects';
import { GetConsultation } from './components/GetConsultation';
import { LandingPage } from './components/LandingPage';

type Page = 'landing' | 'home' | 'privacy' | 'terms' | 'cookies' | 'story' | 'projects' | 'consultation';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = () => navigateToPage('home');
  const enterMainSite = () => navigateToPage('home');

  if (currentPage === 'landing') {
    return <LandingPage onEnter={enterMainSite} />;
  }

  if (currentPage === 'privacy') {
    return <PrivacyPolicy onBack={navigateHome} />;
  }

  if (currentPage === 'terms') {
    return <TermsOfService onBack={navigateHome} />;
  }

  if (currentPage === 'cookies') {
    return <CookiePolicy onBack={navigateHome} />;
  }

  if (currentPage === 'story') {
    return <WatchOurStory onBack={navigateHome} onNavigate={navigateToPage} />;
  }

  if (currentPage === 'projects') {
    return <ViewOurProjects onBack={navigateHome} />;
  }

  if (currentPage === 'consultation') {
    return <GetConsultation onBack={navigateHome} />;
  }

  return (
    <div className="min-h-screen bg-[#0B3D2E]">
      <Navigation onNavigate={navigateToPage} />
      <HeroSection onNavigate={navigateToPage} />
      <AboutSection />
      <ServicesSection />
      <PodcastSection />
      <FAQSection />
      <ContactSection />
      <Footer onNavigate={navigateToPage} />
    </div>
  );
}
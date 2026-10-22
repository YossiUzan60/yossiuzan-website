import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Team } from '@/components/Team';
import { FAQ } from '@/components/FAQ';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { AccessibilityWidget } from '@/components/AccessibilityWidget';

const Index = () => {
  return (
    <div className="min-h-screen">
      <AccessibilityWidget />
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <Team />
        <FAQ />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

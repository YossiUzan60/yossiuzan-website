import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const navLinks = [
  { href: '/#home', label: 'ראשי' },
  { href: '/#services', label: 'תחומי עיסוק' },
  { href: '/#about', label: 'אודות' },
  { href: '/#team', label: 'הצוות' },
  { href: '/#faq', label: 'שאלות נפוצות' },
  { href: '/#testimonials', label: 'המלצות' },
  { href: '/publications', label: 'פרסומים' },
  { href: '/#contact', label: 'צור קשר' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar - Desktop */}
      <div className="bg-navy-dark text-primary-foreground py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:054-7841200" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone className="w-4 h-4" />
              <span>054-7841200</span>
            </a>
            <a href="mailto:uzan86@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail className="w-4 h-4" />
              <span>uzan86@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gold-light">משרד ראשי: התחיה 2, חדרה</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-gold-light">סניף חיפה: הצבעוני 7</span>
          </div>
        </div>
      </div>
      
      {/* Top Bar - Mobile */}
      <div className="bg-navy-dark text-primary-foreground py-2 md:hidden">
        <div className="container mx-auto px-4 flex justify-center items-center gap-4 text-xs">
          <a href="tel:054-7841200" className="flex items-center gap-1.5 hover:text-gold transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span>054-7841200</span>
          </a>
          <span className="text-gold">|</span>
          <a href="mailto:uzan86@gmail.com" className="flex items-center gap-1.5 hover:text-gold transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span>uzan86@gmail.com</span>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-card/95 backdrop-blur-lg shadow-lg border-b border-border'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/#home" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center group">
              <img 
                src={logo} 
                alt="יוסי אוזן - שמאי מקרקעין" 
                className="h-10 sm:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gold/10 hover:text-gold ${
                    isScrolled ? 'text-foreground' : 'text-navy-dark'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/#contact">קבע פגישה</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gold/10 transition-colors"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-navy-dark'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-navy-dark'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 top-full max-h-[calc(100dvh-7rem)] overflow-y-auto lg:hidden bg-card border-t border-border shadow-lg"
            >
              <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="px-4 py-3 rounded-lg font-medium text-foreground hover:bg-gold/10 hover:text-gold transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border mt-4">
                  <Button variant="gold" size="lg" className="w-full" asChild>
                    <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)}>קבע פגישה</Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

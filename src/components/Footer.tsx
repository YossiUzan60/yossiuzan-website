import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'ליקויי בניה', href: '#services' },
    { label: 'הערכות שווי', href: '#services' },
    { label: 'מס שבח והיטל השבחה', href: '#services' },
    { label: 'פינוי בינוי ותמ"א 38', href: '#services' },
    { label: 'דוחות אפס', href: '#services' },
    { label: 'שמאות נחלות', href: '#services' },
  ],
  quickLinks: [
    { label: 'אודות', href: '#about' },
    { label: 'הצוות שלנו', href: '#team' },
    { label: 'שאלות נפוצות', href: '#faq' },
    { label: 'המלצות', href: '#testimonials' },
    { label: 'צור קשר', href: '#contact' },
  ],
};

const socialLinks = [
  {
    label: 'מקצוענים',
    href: 'https://www.pro.co.il/real-estate-appraisers/business-id-15375',
  },
  {
    label: 'לשכת שמאי מקרקעין',
    href: 'https://landvalue.org.il/index2.php?id=17&memberId=3018&lang=HEB',
  },
];

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer ref={ref} className="bg-navy-dark border-t border-navy-medium pb-24">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center shadow-gold/30 shadow-lg">
                <span className="text-navy-dark font-bold text-xl">י.א</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary-foreground">יוסי אוזן</h3>
                <p className="text-xs text-primary-foreground/60">שמאי מקרקעין</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              משרד שמאות מקרקעין מוביל המתמחה בהערכות שווי, ליקויי בניה, וייצוג משפטי. שירות מקצועי ואישי.
            </p>
            
            {/* External Links */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-primary-foreground mb-2">קישורים מקצועיים:</p>
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-6">השירותים שלנו</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={`/${link.href}`}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-6">קישורים מהירים</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={`/${link.href}`}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-6">צור קשר</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold" />
                <div className="flex flex-col">
                  <a href="tel:04-6300904" className="text-primary-foreground/70 hover:text-gold transition-colors">
                    04-6300904
                  </a>
                  <a href="tel:054-7841200" className="text-primary-foreground/70 hover:text-gold transition-colors">
                    054-7841200
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold" />
                <a href="mailto:uzan86@gmail.com" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  uzan86@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <div className="text-primary-foreground/70">
                  <p>משרד ראשי: התחיה 2, חדרה</p>
                  <p>סניף חיפה: הצבעוני 7, חיפה</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-navy-medium flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm text-center md:text-right">
            © {new Date().getFullYear()} יוסי אוזן - שמאי מקרקעין. כל הזכויות שמורות.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-primary-foreground/70">
            <Link to="/regulations" className="hover:text-gold transition-colors">תקנון</Link>
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">מדיניות פרטיות</Link>
            <Link to="/accessibility" className="hover:text-gold transition-colors">הצהרת נגישות</Link>
            <button type="button" onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))} className="hover:text-gold transition-colors">הגדרות עוגיות</button>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

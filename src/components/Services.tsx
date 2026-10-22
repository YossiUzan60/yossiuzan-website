import { motion } from 'framer-motion';
import { 
  Building, 
  FileText, 
  Scale, 
  TrendingUp, 
  Home, 
  Hammer,
  Gavel,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Gavel,
    title: 'ייצוג בית משפט',
    subtitle: 'חוות דעת מומחה',
    description: 'מתן חוות דעת מקצועיות כמומחה מטעם בית המשפט. ניסיון רב בהופעות בבתי משפט וליווי הליכים משפטיים בתחום הנדל"ן והשמאות.',
    features: ['חוות דעת מומחה', 'עדות בבית משפט', 'ליווי הליכים משפטיים'],
  },
  {
    icon: Hammer,
    title: 'ליקויי בניה',
    subtitle: 'ופחת ערך נכס',
    description: 'טיפול מקצועי בנושאי תכנון לקוי ובניה רשלנית. אנו מסייעים בהערכת נזקים, חישוב פיצויים וליווי בהליכים משפטיים מול קבלנים ויזמים.',
    features: ['הערכת נזקים', 'חישוב פיצויים', 'ליווי משפטי'],
  },
  {
    icon: TrendingUp,
    title: 'הערכות שווי',
    subtitle: 'נכסים',
    description: 'הערכת שווי מקצועית לכל סוגי הנכסים - דירות, בתים פרטיים, מגרשים, נחלות וקרקעות חקלאיות. בדיקות כדאיות לקנייה ומכירה.',
    features: ['דירות ובתים', 'מגרשים וקרקעות', 'נחלות'],
  },
  {
    icon: Scale,
    title: 'מס שבח',
    subtitle: 'והיטל השבחה',
    description: 'ייעוץ וטיפול בנושאי מס שבח והיטל השבחה. אנו מסייעים בהפחתת תשלומי מס וייצוג מול רשויות המס.',
    features: ['הפחתת מס', 'ערעורים', 'ייצוג מול רשויות'],
  },
  {
    icon: Home,
    title: 'פינוי בינוי',
    subtitle: 'ותמ"א 38',
    description: 'ליווי מקצועי בפרויקטי התחדשות עירונית, פינוי בינוי ותמ"א 38. הערכת זכויות דיירים והשוואת הצעות יזמים.',
    features: ['הערכת זכויות', 'השוואת הצעות', 'ליווי מו"מ'],
  },
  {
    icon: FileText,
    title: 'דוחות אפס',
    subtitle: 'ושמאות בנקאית',
    description: 'הכנת דוחות אפס לבנקים לצורך קבלת מימון בנקאי. שמאות למשכנתאות ולהלוואות כנגד נכסים.',
    features: ['מימון בנקאי', 'משכנתאות', 'הלוואות נדל"ן'],
  },
  {
    icon: Building,
    title: 'שמאות נחלות',
    subtitle: 'וקרקעות חקלאיות',
    description: 'התמחות מיוחדת בשמאות נחלות חקלאיות, משקים ומושבים. הערכת שווי לקרקעות חקלאיות וזכויות במינהל.',
    features: ['נחלות ומשקים', 'קרקעות חקלאיות', 'זכויות במינהל'],
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold font-semibold text-sm tracking-wider mb-4">
            השירותים שלנו
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            תחומי ההתמחות
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            אנו מספקים מגוון רחב של שירותי שמאות מקרקעין ויעוץ נדל"ני מקצועי
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-xl md:rounded-2xl p-5 md:p-8 shadow-card hover:shadow-card-hover transition-all duration-500 border border-border hover:border-gold/30 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 group-hover:bg-gold/10 transition-colors duration-500" />
                
                {/* Icon */}
                <div className="relative mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-navy-dark rounded-lg md:rounded-xl flex items-center justify-center group-hover:bg-gold transition-colors duration-500 shadow-lg">
                    <service.icon className="w-6 h-6 md:w-8 md:h-8 text-gold group-hover:text-navy-dark transition-colors duration-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                    {service.title}
                  </h3>
                  <p className="text-gold text-xs md:text-sm font-medium mb-3 md:mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button 
                    variant="ghost" 
                    className="text-gold hover:text-gold-dark hover:bg-gold/10 p-0 h-auto font-semibold group/btn"
                  >
                    <span>קרא עוד</span>
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover/btn:-translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            צריכים עזרה בבחירת השירות המתאים?
          </p>
          <Button variant="gold" size="lg" asChild>
            <a href="#contact">דברו איתנו</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

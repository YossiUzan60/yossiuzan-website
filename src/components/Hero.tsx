import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Award, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import yossiUzanPhoto from '@/assets/yossi-uzan.jpg';

const stats = [
  { icon: Award, value: '15+', label: 'שנות ניסיון' },
  { icon: Users, value: '1000+', label: 'לקוחות מרוצים' },
  { icon: Building2, value: '2', label: 'סניפים' },
];

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden py-12 md:py-0">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center lg:justify-end mb-4 md:mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                <Award className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <span className="text-center leading-tight">מומחה מטעם בית המשפט לשמאות מקרקעין</span>
              </div>
            </motion.div>

            {/* Mobile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="flex lg:hidden justify-center mb-4"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/50 shadow-lg">
                <img 
                  src={yossiUzanPhoto} 
                  alt="יוסי אוזן - שמאי מקרקעין" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4 md:mb-6"
            >
              <span className="text-gold">שמאות מקרקעין</span>
              <br />
              מקצועית ואמינה
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-primary-foreground/80 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 lg:mr-0 leading-relaxed"
            >
              משרדנו מתמחה בשמאות מקרקעין, ליקויי בניה, הערכות שווי, וייצוג משפטי. 
              אנו מספקים שירות מקצועי ואישי ללקוחות פרטיים, עסקים ומשרדי עורכי דין.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4 mb-8 md:mb-12"
            >
              <Button variant="hero" size="lg" className="md:!h-14 md:!px-8" asChild>
                <a href="#contact" className="flex items-center justify-center gap-2">
                  <span>קבע פגישת ייעוץ</span>
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </Button>
              <Button variant="hero-outline" size="lg" className="md:!h-14 md:!px-8" asChild>
                <a href="tel:054-7841200" className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  <span>054-7841200</span>
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center lg:justify-start gap-4 sm:gap-8 md:gap-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-primary-foreground/60">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="w-80 h-96 bg-gradient-to-br from-gold/20 to-gold/5 rounded-3xl backdrop-blur-sm border border-gold/30 shadow-2xl overflow-hidden">
                <div className="w-full h-3/4 overflow-hidden">
                  <img 
                    src={yossiUzanPhoto} 
                    alt="יוסי אוזן - שמאי מקרקעין" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="text-center p-4 bg-navy-dark/80 backdrop-blur">
                  <h2 className="text-xl font-bold text-primary-foreground mb-1">יוסי אוזן</h2>
                  <p className="text-primary-foreground/70 text-sm">שמאי מקרקעין מוסמך</p>
                  <p className="text-gold text-xs mt-1">מומחה לבית המשפט</p>
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 bg-card p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">מוסמך משפטית</p>
                    <p className="text-xs text-muted-foreground">חוות דעת לבית משפט</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-12 bg-card p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">צוות מקצועי</p>
                    <p className="text-xs text-muted-foreground">שמאים ומומחים</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(220, 25%, 97%)"
          />
        </svg>
      </div>
    </section>
  );
};

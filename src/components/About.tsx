import { motion } from 'framer-motion';
import { Award, GraduationCap, Briefcase, Scale } from 'lucide-react';
import yossiUzanPhoto from '@/assets/yossi-uzan.jpg';

export const About = () => {
  return (
    <section id="about" className="py-24 bg-navy-dark relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image / Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              {/* Main Image Container */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-navy-medium to-navy-light shadow-2xl">
                <img 
                  src={yossiUzanPhoto} 
                  alt="יוסי אוזן - שמאי מקרקעין" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-gold p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-gold shadow-lg"
              >
                <div className="text-center">
                  <span className="text-2xl sm:text-4xl font-bold text-navy-dark block">15+</span>
                  <span className="text-xs sm:text-sm font-medium text-navy-dark/80">שנות ניסיון</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block text-gold font-semibold text-sm tracking-wider mb-4">
              אודות המשרד
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 md:mb-6 leading-tight">
              מומחיות ומקצועיות
              <br />
              <span className="text-gold">ללא פשרות</span>
            </h2>
            
            <p className="text-base md:text-lg text-primary-foreground/80 mb-6 md:mb-8 leading-relaxed">
              יוסי אוזן הוא שמאי מקרקעין מוסמך ומומחה מטעם בתי המשפט. בעל תואר ראשון בגיאוגרפיה וסביבה מאוניברסיטת חיפה, עם ניסיון עשיר בעולם העסקים והנדל"ן.
            </p>
            
            <p className="text-sm md:text-base text-primary-foreground/70 mb-8 md:mb-10 leading-relaxed">
              המשרד מספק שירותי שמאות מקרקעין ברמה הגבוהה ביותר, תוך שילוב ידע מקצועי מעמיק עם גישה אישית ומותאמת לכל לקוח. אנו מתמחים בטיפול בתיקים מורכבים הדורשים מומחיות וניסיון.
            </p>

            {/* Credentials */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground mb-1">השכלה אקדמית</h3>
                  <p className="text-sm text-primary-foreground/60">B.A גיאוגרפיה וסביבה, אוניברסיטת חיפה</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Scale className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground mb-1">מומחה לבית המשפט</h3>
                  <p className="text-sm text-primary-foreground/60">מוסמך לחוות דעת משפטיות</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground mb-1">ניסיון עסקי</h3>
                  <p className="text-sm text-primary-foreground/60">ניסיון רב בעולם העסקים והנדל"ן</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground mb-1">רישיון שמאות</h3>
                  <p className="text-sm text-primary-foreground/60">שמאי מקרקעין מוסמך</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

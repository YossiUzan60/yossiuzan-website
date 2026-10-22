import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqItems = [
  {
    question: 'מתי כדאי להזמין שמאי מקרקעין?',
    answer: 'מומלץ להזמין שמאי מקרקעין לפני כל עסקת נדל"ן משמעותית - קנייה, מכירה, ירושה, גירושין, או מיסוי. שמאי מקצועי יכול לחסוך לכם כסף רב על ידי הערכה מדויקת של שווי הנכס ואיתור בעיות פוטנציאליות.'
  },
  {
    question: 'מה לעשות במקרה של ליקויי בניה?',
    answer: 'במקרה של גילוי ליקויי בניה, חשוב לתעד את הליקויים ולפנות לשמאי מקרקעין מומחה בתחום. השמאי יעריך את הנזק, יחשב את עלות התיקון ופחת ערך הנכס, ויכין חוות דעת שתוכל לשמש כבסיס למשא ומתן או להליך משפטי.'
  },
  {
    question: 'מהי תמ"א 38 וכיצד היא משפיעה על הנכס?',
    answer: 'תמ"א 38 היא תוכנית לחיזוק מבנים מפני רעידות אדמה, המאפשרת תוספת זכויות בנייה. הזכויות הנוספות משפיעות משמעותית על שווי הנכס. שמאי מקצועי יכול להעריך את ההשפעה על שווי הדירה ולסייע במו"מ מול יזמים.'
  },
  {
    question: 'כיצד נקבע מס השבח?',
    answer: 'מס שבח מחושב על הרווח ממכירת נכס מקרקעין. המס מחושב כהפרש בין מחיר המכירה למחיר הרכישה (בניכוי הוצאות מוכרות). שמאי מקרקעין יכול לסייע בהפחתת מס השבח על ידי הערכה נכונה של שווי הנכס ואיתור פטורים והקלות.'
  },
  {
    question: 'מהו היטל השבחה ומתי צריך לשלם?',
    answer: 'היטל השבחה הוא תשלום לרשות המקומית בגין עליית ערך הנכס כתוצאה מאישור תוכנית בניין עיר. ההיטל נגבה בעת מימוש הזכויות - מכירה, היתר בנייה או שימוש חורג. שמאי מקצועי יכול לסייע בהפחתת ההיטל.'
  },
  {
    question: 'מהם הפרטרי לגביית קרקעות על ידי המדינה?',
    answer: 'הפקעת קרקעות לצרכי ציבור מחייבת פיצוי הולם לבעלי הקרקע. הפיצוי נקבע על פי שווי הקרקע במועד ההפקעה. חשוב להיעזר בשמאי מקרקעין על מנת לוודא שהפיצוי המוצע משקף את השווי האמיתי של הנכס.'
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-block text-gold font-semibold text-sm tracking-wider mb-4">
              שאלות נפוצות
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              שאלות ותשובות
              <br />
              <span className="text-gold">נפוצות</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
              ריכזנו עבורכם את השאלות הנפוצות ביותר בתחום שמאות המקרקעין
            </p>
            
            <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 bg-muted rounded-xl md:rounded-2xl">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gold rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-6 h-6 md:w-7 md:h-7 text-navy-dark" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm md:text-base mb-0.5 md:mb-1">יש לכם שאלה נוספת?</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  צרו קשר ונשמח לעזור
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full text-right p-4 md:p-6 rounded-xl transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-navy-dark text-primary-foreground shadow-lg'
                      : 'bg-card hover:bg-muted border border-border'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 md:gap-4">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg">{item.question}</h3>
                    <ChevronDown
                      className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180 text-gold' : ''
                      }`}
                    />
                  </div>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

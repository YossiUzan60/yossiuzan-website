import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'דוד כהן',
    location: 'קריית טבעון',
    rating: 5,
    text: 'יוסי הפגין מקצועיות יוצאת דופן בהערכת הנכס שלנו. הדוח היה מפורט ומדויק, והתהליך כולו היה חלק ומהיר. ממליץ בחום!',
    service: 'הערכת שווי דירה',
  },
  {
    name: 'מיכל לוי',
    location: 'חיפה',
    rating: 5,
    text: 'פנינו ליוסי לאחר שגילינו ליקויי בניה בדירה החדשה. הוא טיפל בכל התהליך באופן מקצועי והצלחנו לקבל פיצוי הוגן מהקבלן.',
    service: 'ליקויי בניה',
  },
  {
    name: 'אברהם ישראלי',
    location: 'יקנעם',
    rating: 5,
    text: 'קיבלתי שירות מצוין בנושא היטל השבחה. יוסי הצליח להפחית משמעותית את התשלום שנדרשתי לשלם. מומלץ מאוד!',
    service: 'היטל השבחה',
  },
  {
    name: 'רחל גולן',
    location: 'חדרה',
    rating: 5,
    text: 'במסגרת הליך גירושין נדרשתי לשמאות מקצועית. יוסי סיפק חוות דעת מקיפה ומפורטת שהתקבלה על ידי בית המשפט.',
    service: 'חוות דעת לבית משפט',
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-muted/50">
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
            המלצות
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            לקוחות ממליצים
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            שמחים לשתף אתכם בחלק מהמשובים של לקוחותינו המרוצים
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 border border-border relative">
                {/* Quote Icon */}
                <div className="absolute top-6 left-6">
                  <Quote className="w-10 h-10 text-gold/20" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground leading-relaxed mb-6 text-lg">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-navy-dark rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gold font-bold text-sm sm:text-base">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full font-medium self-start sm:self-auto">
                    {testimonial.service}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

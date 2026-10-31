import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import yossiUzanPhoto from '@/assets/yossi-uzan.jpg';
import oriyaLevyPhoto from '@/assets/oriya-levy.webp';
import tuvalGuetaPhoto from '@/assets/tuval-gueta.webp';
import shaniBochbotPhoto from '@/assets/shani-bochbot.webp';

const team = [
  {
    name: 'יוסי אוזן',
    role: 'שמאי מקרקעין - בעלים ומייסד המשרד',
    description: 'מעל 12 שנות ניסיון בעריכת שומות מקרקעין והערכת שווי נכסים - מגורים, מסחר וקרקעות. בוגר התוכנית לשמאות מקרקעין מטעם הטכניון ובעל B.A בגיאוגרפיה והסביבה. מביא לכל שומה ראייה עסקית רחבה מניסיונו כמנהל ובעלים של מפעל יצרני.',
    credentials: ['B.A גיאוגרפיה והסביבה', 'שמאי מקרקעין מוסמך', '12+ שנות ניסיון'],
    initials: 'י.א',
    photo: yossiUzanPhoto,
    email: 'uzan86@gmail.com',
  },
  {
    name: 'אוריה לוי',
    role: 'שמאי מקרקעין - שותף',
    description: 'אחראי על תחום שומות המימון והבטוחות במשרד. בוגר התוכנית לשמאות מקרקעין מטעם הטכניון ובעל B.A בתקשורת וניהול (המסלול האקדמי של המכללה למינהל). בעל ניסיון רב בעריכת שומות לנכסי מגורים, קרקעות ונכסים מורכבים, ובמגזר הערבי בפרט.',
    credentials: ['B.A תקשורת וניהול', 'בוגר התוכנית לשמאות בטכניון', 'שומות מימון ובטוחות'],
    initials: 'א.ל',
    photo: oriyaLevyPhoto,
    photoPosition: 'center 25%',
  },
  {
    name: 'תובל גואטה',
    role: 'שמאי מקרקעין',
    description: 'בעל תואר ראשון ושני בכלכלה, מימון ומערכות מידע, ובוגר התוכנית לשמאות מקרקעין בטכניון חיפה. הגיע לשמאות אחרי מעל 15 שנה בתפקידי ניהול בכירים בהייטק, ומביא עמו רקע כלכלי וניהולי נרחב.',
    credentials: ['B.A ו-M.A כלכלה ומימון', 'בוגר התוכנית לשמאות בטכניון', '15+ שנה בהייטק'],
    initials: 'ת.ג',
    photo: tuvalGuetaPhoto,
    showFullPortrait: true,
    email: 'tuval.g@gmail.com',
  },
  {
    name: 'שני בוחבוט',
    role: 'בוגרת התמחות',
    description: 'בוגרת התמחות במשרדנו. בעלת תואר ראשון בפסיכולוגיה, תקשורת וניהול משאבי אנוש מאוניברסיטת בן-גוריון בנגב - רקע המוסיף לצוות נקודת מבט ייחודית.',
    credentials: ['B.A פסיכולוגיה ותקשורת', 'ניהול משאבי אנוש', 'אוניברסיטת בן-גוריון'],
    initials: 'ש.ב',
    photo: shaniBochbotPhoto,
    showFullPortrait: true,
  },
];

export const Team = () => {
  return (
    <section id="team" className="py-24 bg-muted/50">
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
            הצוות שלנו
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            המומחים שלנו
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            שמאים מנוסים, שני סניפים בהררית ובחדרה, ועשרות שומות שאושרו בבנקים ובגופים מממנים.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-border hover:border-gold/30">
                {/* Avatar */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-navy-dark to-navy-medium flex items-center justify-center overflow-hidden">
                  {member.photo ? (
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      style={{ objectPosition: member.photoPosition }}
                      loading="lazy"
                      className={member.showFullPortrait
                        ? 'w-full h-full object-contain'
                        : 'w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'}
                    />
                  ) : (
                    <div className="w-28 h-28 bg-gold rounded-full flex items-center justify-center shadow-gold/40 shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <span className="text-4xl font-bold text-navy-dark">{member.initials}</span>
                    </div>
                  )}
                  
                  {/* Social Links */}
                  {member.email && <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 md:opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-card/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-gold hover:text-navy-dark transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-gold text-sm font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  
                  {/* Credentials */}
                  <div className="flex flex-wrap gap-2">
                    {member.credentials.map((credential, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full"
                      >
                        {credential}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

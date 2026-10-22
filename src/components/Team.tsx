import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import yossiUzanPhoto from '@/assets/yossi-uzan.jpg';

const team = [
  {
    name: 'יוסי אוזן',
    role: 'בעלים ושמאי מקרקעין ראשי',
    description: 'בעל תואר ראשון בגיאוגרפיה וסביבה מאוניברסיטת חיפה. מומחה מטעם בית המשפט עם ניסיון עשיר בעולם העסקים.',
    credentials: ['B.A גיאוגרפיה וסביבה', 'מומחה לבית המשפט', 'ניסיון עסקי נרחב'],
    initials: 'י.א',
    photo: yossiUzanPhoto,
    linkedin: '#',
    email: 'yossi@yossiuzan.com',
  },
  {
    name: 'אשר הינדי',
    role: 'שמאי מקרקעין ונזקי רכוש',
    description: 'בעל תואר ראשון ושני במדעי המדינה ומינהל ציבורי. מתמחה בהערכות שווי ונזקי רכוש.',
    credentials: ['B.A מדעי המדינה', 'M.A מינהל ציבורי', 'מומחה נזקי רכוש'],
    initials: 'א.ה',
    linkedin: '#',
    email: 'asher@yossiuzan.com',
  },
  {
    name: 'אוריה לוי',
    role: 'שמאית מקרקעין',
    description: 'בעלת תואר ראשון בתקשורת וניהול. מסייעת בהערכות שווי ובליווי לקוחות המשרד.',
    credentials: ['B.A תקשורת וניהול', 'שמאית מתמחה', 'ליווי לקוחות'],
    initials: 'א.ל',
    linkedin: '#',
    email: 'oria@yossiuzan.com',
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
            צוות מקצועי ומנוסה של שמאים ומומחים בתחום הנדל"ן
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-border hover:border-gold/30">
                {/* Avatar */}
                <div className="relative h-64 bg-gradient-to-br from-navy-dark to-navy-medium flex items-center justify-center overflow-hidden">
                  {member.photo ? (
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-gold rounded-full flex items-center justify-center shadow-gold/40 shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <span className="text-4xl font-bold text-navy-dark">{member.initials}</span>
                    </div>
                  )}
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 bg-card/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-gold hover:text-navy-dark transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-card/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-gold hover:text-navy-dark transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
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

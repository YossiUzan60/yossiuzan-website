import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const publications = [
  {
    title: 'עליית מחירי הדירות במרכז: מה זה אומר לשוק?',
    date: '3 במרץ 2026',
    source: 'גלובס',
    url: 'https://www.globes.co.il/news/article.aspx?did=1001400000',
    excerpt:
      'המשקיעים ממשיכים לקנות, ומחירי הדירות מרכזיים ממשיכים לעלות – מה המשמעות לקונים ולשוכרים?',
  },
  {
    title: 'בניית תשתיות בשכונות חדשות: האם זה יוריד את המחירים?',
    date: '28 בפברואר 2026',
    source: 'דה מרקר',
    url: 'https://www.themarker.com/realestate',
    excerpt:
      'תוכנית בנייה חדשה שנועדה להגדיל את היצע הדירות עשויה לשנות את היחס בין היצע לביקוש.',
  },
  {
    title: 'האם השכרת דירות לתקופות קצרות עדיין משתלמת?',
    date: '15 בפברואר 2026',
    source: 'כלכליסט',
    url: 'https://www.calcalist.co.il/real_estate',
    excerpt:
      'הצמיחה בשוק השכרת התיירים נמשכת, אך ישנם אינדיקטורים שמעידים על רוויה בקרוב.',
  },
];

const Publications = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" tabIndex={-1} className="bg-navy-dark text-white py-24">
      <div className="container mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block text-gold font-semibold text-sm tracking-wider mb-4">
            פרסומים
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            חדשות נדל"ן עדכניות
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            כאן תמצאו את החדשות החשובות ביותר בשוק הנדל"ן הישראלי — סיכומי שוק,
            עדכוני רגולציה ומגמות שמשפיעות על רוכשים, משכירים ומשקיעים.
          </p>
        </motion.header>

        <div className="grid gap-6">
          {publications.map((item) => (
            <motion.a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="block rounded-3xl border border-white/15 bg-white/5 p-6 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/60"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 leading-snug text-white">
                    {item.title}
                  </h2>
                  <p className="text-base text-white/70 mb-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm uppercase tracking-wide text-white/50">
                    {item.source}
                  </p>
                  <p className="text-sm text-white/50">{item.date}</p>
                </div>
              </div>

              <div className="mt-5 inline-flex items-center gap-2 text-gold font-semibold text-base">
                <span>קרא עוד</span>
                <span aria-hidden="true">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default Publications;

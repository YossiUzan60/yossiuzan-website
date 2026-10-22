import { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const contactInfo = [
  {
    icon: Phone,
    title: 'טלפון',
    details: ['04-6300904', '054-7841200'],
    action: 'tel:04-6300904',
  },
  {
    icon: Mail,
    title: 'דוא"ל',
    details: ['uzan86@gmail.com'],
    action: 'mailto:uzan86@gmail.com',
  },
  {
    icon: MapPin,
    title: 'משרד ראשי - חדרה',
    details: ['התחיה 2, חדרה'],
    action: 'https://maps.google.com/?q=התחיה+2+חדרה',
  },
  {
    icon: MapPin,
    title: 'סניף חיפה',
    details: ['הצבעוני 7, חיפה'],
    action: 'https://maps.google.com/?q=הצבעוני+7+חיפה',
  },
];

export const Contact = forwardRef<HTMLElement>((_, ref) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: 'הודעה נשלחה בהצלחה!',
        description: 'ניצור איתך קשר בהקדם האפשרי.',
      });
      
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'שגיאה בשליחת ההודעה',
        description: 'אנא נסה שוב או התקשר אלינו ישירות.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="py-24 bg-navy-dark relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold font-semibold text-sm tracking-wider mb-4">
            צור קשר
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 md:mb-6">
            נשמח לשמוע מכם
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/70 max-w-2xl mx-auto px-4">
            השאירו פרטים ונחזור אליכם בהקדם, או התקשרו אלינו ישירות
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">
                שלחו לנו הודעה
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                      שם מלא
                    </label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="הזן את שמך"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-muted border-border focus:border-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-2">
                      טלפון
                    </label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="050-0000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-muted border-border focus:border-gold"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                    דוא"ל
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-muted border-border focus:border-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                    הודעה
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder="ספרו לנו במה נוכל לעזור..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-muted border-border focus:border-gold resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="gold" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>שולח...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5 ml-2" />
                      <span>שלח הודעה</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.action}
                target={item.action.startsWith('http') ? '_blank' : undefined}
                rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-navy-medium/50 rounded-xl hover:bg-navy-medium transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-gold group-hover:text-navy-dark transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-foreground mb-1">{item.title}</h4>
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="text-primary-foreground/70">{detail}</p>
                  ))}
                </div>
              </motion.a>
            ))}

            {/* Working Hours */}
            <div className="p-6 bg-gold/10 rounded-xl border border-gold/30">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-gold" />
                <h4 className="font-semibold text-primary-foreground">שעות פעילות</h4>
              </div>
              <div className="space-y-2 text-primary-foreground/80">
                <p>ראשון - חמישי: 09:00 - 18:00</p>
                <p>שישי: 09:00 - 13:00</p>
                <p>שבת: סגור</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
});

Contact.displayName = 'Contact';

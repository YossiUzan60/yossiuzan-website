import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, X, ZoomIn, ZoomOut, Moon, Sun, RotateCcw, Type, Contrast } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [linkHighlight, setLinkHighlight] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    if (grayscale) {
      document.body.classList.add('grayscale-mode');
    } else {
      document.body.classList.remove('grayscale-mode');
    }
  }, [grayscale]);

  useEffect(() => {
    if (linkHighlight) {
      document.body.classList.add('highlight-links');
    } else {
      document.body.classList.remove('highlight-links');
    }
  }, [linkHighlight]);

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 10, 150));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 10, 80));
  };

  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setGrayscale(false);
    setLinkHighlight(false);
  };

  return (
    <>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-[100] focus:bg-gold focus:text-navy-dark focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium"
      >
        דלג לתוכן הראשי
      </a>

      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gold text-navy-dark rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
        aria-label="פתח תפריט נגישות"
      >
        <Accessibility className="w-7 h-7" />
      </button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-card z-50 shadow-2xl overflow-y-auto"
              role="dialog"
              aria-label="הגדרות נגישות"
            >
              {/* Header */}
              <div className="sticky top-0 bg-navy-dark text-primary-foreground p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Accessibility className="w-6 h-6 text-gold" />
                  <h2 className="text-lg font-bold">נגישות</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="סגור תפריט נגישות"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-6">
                {/* Font Size */}
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Type className="w-5 h-5 text-gold" />
                    <h3 className="font-semibold text-foreground">גודל טקסט</h3>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decreaseFontSize}
                      disabled={fontSize <= 80}
                      aria-label="הקטן טקסט"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </Button>
                    <span className="text-lg font-bold text-foreground">{fontSize}%</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={increaseFontSize}
                      disabled={fontSize >= 150}
                      aria-label="הגדל טקסט"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* High Contrast */}
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-full bg-muted rounded-xl p-4 flex items-center gap-4 transition-all ${
                    highContrast ? 'ring-2 ring-gold' : ''
                  }`}
                  aria-pressed={highContrast}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    highContrast ? 'bg-gold text-navy-dark' : 'bg-card'
                  }`}>
                    <Contrast className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-foreground">ניגודיות גבוהה</h3>
                    <p className="text-sm text-muted-foreground">הגברת ניגודיות הצבעים</p>
                  </div>
                </button>

                {/* Grayscale */}
                <button
                  onClick={() => setGrayscale(!grayscale)}
                  className={`w-full bg-muted rounded-xl p-4 flex items-center gap-4 transition-all ${
                    grayscale ? 'ring-2 ring-gold' : ''
                  }`}
                  aria-pressed={grayscale}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    grayscale ? 'bg-gold text-navy-dark' : 'bg-card'
                  }`}>
                    <Moon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-foreground">גווני אפור</h3>
                    <p className="text-sm text-muted-foreground">הצגה בגווני אפור</p>
                  </div>
                </button>

                {/* Highlight Links */}
                <button
                  onClick={() => setLinkHighlight(!linkHighlight)}
                  className={`w-full bg-muted rounded-xl p-4 flex items-center gap-4 transition-all ${
                    linkHighlight ? 'ring-2 ring-gold' : ''
                  }`}
                  aria-pressed={linkHighlight}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    linkHighlight ? 'bg-gold text-navy-dark' : 'bg-card'
                  }`}>
                    <Sun className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-foreground">הדגשת קישורים</h3>
                    <p className="text-sm text-muted-foreground">סימון בולט של קישורים</p>
                  </div>
                </button>

                {/* Reset */}
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={resetAll}
                >
                  <RotateCcw className="w-4 h-4" />
                  איפוס הגדרות
                </Button>

                {/* Accessibility Statement */}
                <div className="text-center pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    אתר זה נבנה בהתאם לתקן נגישות WCAG 2.1
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

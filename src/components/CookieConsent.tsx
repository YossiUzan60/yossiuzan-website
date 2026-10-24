import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CONSENT_KEY = 'yossi-uzan-cookie-consent';
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
type Consent = { version: 1; analytics: boolean; marketing: boolean; savedAt: number };

function readConsent(): Consent | null {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    return value?.version === 1 && typeof value.analytics === 'boolean' &&
      typeof value.marketing === 'boolean' && typeof value.savedAt === 'number' &&
      value.savedAt <= Date.now() && Date.now() - value.savedAt < MAX_AGE ? value : null;
  } catch { return null; }
}

export const CookieConsent = () => {
  const [saved, setSaved] = useState(readConsent);
  const [open, setOpen] = useState(() => !saved);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(saved?.analytics ?? false);
  const [marketing, setMarketing] = useState(saved?.marketing ?? false);

  useEffect(() => {
    const reopen = () => { setOpen(true); setCustomize(true); };
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  const save = (analytics: boolean, marketing: boolean) => {
    const consent: Consent = { version: 1, analytics, marketing, savedAt: Date.now() };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(consent)); } catch { /* Keep the choice for this visit if storage is unavailable. */ }
    setSaved(consent);
    setAnalytics(analytics);
    setMarketing(marketing);
    setOpen(false);
    setCustomize(false);
  };

  if (!open) return null;

  return (
    <section aria-label="הגדרות עוגיות" dir="rtl" className="fixed bottom-24 inset-x-3 z-[60] mx-auto max-w-xl max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-xl border border-gold/30 bg-card p-4 shadow-2xl">
      <div className="flex items-center gap-2 mb-2">
        <Cookie className="h-5 w-5 text-gold-dark shrink-0" aria-hidden="true" />
        <h2 className="text-base font-bold text-navy-dark">הפרטיות שלכם חשובה לנו</h2>
      </div>
      <p className="text-sm leading-6 text-muted-foreground">אנו שומרים את העדפתכם בדפדפן. כיום אין באתר עוגיות מעקב או פרסום. ניתן לשנות בחירה בתחתית האתר.{' '}
        <Link to="/privacy-policy" className="font-medium text-navy-dark underline underline-offset-4">מדיניות פרטיות</Link>
      </p>
      {customize && (
        <fieldset className="mt-3 space-y-1 rounded-lg bg-muted px-3 pb-2 text-sm">
          <legend className="font-semibold px-2">התאמה אישית</legend>
          <p className="flex min-h-9 items-center gap-2"><ShieldCheck className="h-4 w-4" aria-hidden="true" />עוגיות נחוצות — תמיד פעילות</p>
          <label className="flex min-h-11 items-center gap-3 cursor-pointer"><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} className="h-5 w-5 accent-amber-600" />עוגיות אנליטיות</label>
          <label className="flex min-h-11 items-center gap-3 cursor-pointer"><input type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)} className="h-5 w-5 accent-amber-600" />עוגיות שיווקיות</label>
        </fieldset>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
        <Button className="h-auto min-h-11 px-2 py-2 whitespace-normal" variant="outline" onClick={() => save(true, true)}>אישור לכל העוגיות</Button>
        <Button className="h-auto min-h-11 px-2 py-2 whitespace-normal" variant="outline" onClick={() => save(false, false)}>עוגיות נחוצות בלבד</Button>
        {customize ? <Button className="col-span-2 sm:col-span-1 h-auto min-h-11 px-2 py-2 whitespace-normal" variant="outline" onClick={() => save(analytics, marketing)}>שמירת העדפות</Button> : <Button className="col-span-2 sm:col-span-1 h-auto min-h-11 px-2 py-2 whitespace-normal" variant="ghost" onClick={() => setCustomize(true)}>התאמה אישית</Button>}
      </div>
    </section>
  );
};

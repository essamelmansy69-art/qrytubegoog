import React, { useState } from 'react';
import { Check } from 'lucide-react';

type Language = 'ar' | 'en';

interface ContactPageProps {
  lang: Language;
}

const LOCAL_DICT = {
  ar: {
    contact: 'اتصل بنا',
    contactForm: {
      name: 'الاسـم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      send: 'إرسال الرسالة',
      success: 'تم استلام رسالتك بنجاح.'
    }
  },
  en: {
    contact: 'Contact Us',
    contactForm: {
      name: 'Full Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      success: 'Message received successfully.'
    }
  }
};

export default function ContactPage({ lang }: ContactPageProps) {
  const [sent, setSent] = useState(false);
  const t = LOCAL_DICT[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-black mb-10 text-center tracking-tight text-slate-800 font-sans">{t.contact}</h2>
      <div className="bg-white border border-slate-100 p-10 rounded-3xl shadow-custom-card relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 blur-[80px]" />
        {sent ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-xl font-bold text-slate-800">{t.contactForm.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">{t.contactForm.name}</label>
              <input id="contact-name" required type="text" className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl py-4 px-6 focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-900 font-sans" />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">{t.contactForm.email}</label>
              <input id="contact-email" required type="email" className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl py-4 px-6 focus:border-indigo-505 focus:bg-white transition-all outline-none text-slate-900 font-sans" />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">{t.contactForm.message}</label>
              <textarea id="contact-message" required rows={5} className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl py-4 px-6 focus:border-indigo-505 focus:bg-white transition-all outline-none resize-none text-slate-900 font-sans" />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold uppercase transition-all active:scale-[0.98] font-sans">
              {t.contactForm.send}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

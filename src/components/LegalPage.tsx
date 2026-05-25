import React from 'react';

type Language = 'ar' | 'en';

interface LegalPageProps {
  lang: Language;
  type: 'privacy' | 'terms';
}

const LOCAL_DICT = {
  ar: {
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الاستخدام',
  },
  en: {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
};

export default function LegalPage({ lang, type }: LegalPageProps) {
  const title = LOCAL_DICT[lang]?.[type] || '';
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-black mb-12 text-center tracking-tight text-slate-800 uppercase font-sans">{title}</h2>
      <div className="bg-white border border-slate-100 p-12 md:p-16 rounded-[40px] shadow-custom-card text-slate-700 space-y-10 leading-relaxed font-semibold transition-colors">
        <section className="space-y-4">
          <h3 className="text-indigo-600 text-xl font-bold font-sans">{lang === 'ar' ? 'السياسة البرمجية' : 'Protocol Standard'}</h3>
          <p className="text-sm md:text-base">{lang === 'ar' ? 'نظام Qrytube يعتمد على تحويل الروابط التقليدية إلى روابط عميقة متوافقة مع أنظمة iOS و Android.' : 'Qrytube protocol converts traditional links into deep links natively compatible with iOS and Android ecosystems.'}</p>
        </section>
        <section className="space-y-4">
          <h3 className="text-indigo-600 text-xl font-bold font-sans">{lang === 'ar' ? 'خصوصية البيانات' : 'Data Privacy'}</h3>
          <p className="text-sm md:text-base">{lang === 'ar' ? 'المعالجة تتم كلياً في متصفحك. لا يتم تخزين روابطك الشخصية في أي قاعدة بيانات مركزية.' : 'Processing occurs entirely within your browser environment. Your personal links are not stored in any central data repository.'}</p>
        </section>
      </div>
    </div>
  );
}

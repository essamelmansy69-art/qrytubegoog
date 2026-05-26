import React from 'react';
import { Smartphone, ShieldCheck, Zap, Sparkles, Award, QrCode } from 'lucide-react';

type Language = 'ar' | 'en';

interface AboutPageProps {
  lang: Language;
}

const LOCAL_DICT = {
  ar: {
    title: 'من نحن',
    subTitle: 'تعرّف على Qrytube - المنصة الذكية لتمكين صناع المحتوى عبر الروابط العميقة',
    introHeadline: 'لماذا قمنا ببناء Qrytube؟',
    introText: 'في عصر الشبكات الاجتماعية، يواجه صناع المحتوى والمسوقون الرقميون عقبة مستمرة تُهدر الملايين من المشاهدات والتفاعلات المحتملة؛ وهي "المتصفحات الداخلية المدمجة" داخل تطبيقات مثل Instagram وFacebook وTikTok. عندما ينقر المستخدم على رابط خارجي (مثل قناتك على YouTube)، يفتحه التطبيق في متصفح داخلي محدود وبدون تسجيل دخول، مما يمنع الزائر من الضغط على زر "اشتراك" أو "إعجاب" أو كتابة تعليق بسهولة.\n\nمن هنا ولدت فكرة Qrytube كحل تكنولوجي سحري وفوري لهذه العقبة الكبيرة، مما يسد الفجوة بين المنصات المختلفة ويزيد التفاعل والنمو الحقيقي بمقدار 3 إلى 4 أضعاف.',
    
    feature1Title: 'توجيه عميق ذكي (Deep Linking)',
    feature1Desc: 'نقوم بتحويل الروابط التقليدية إلى روابط عميقة متوافقة فورياً مع أنظمة تشغيل الهواتف الذكية (iOS & Android)، مما يجبر الجهاز على فتح التطبيق الرسمي وتجنب المتصفح الداخلي الميت.',
    
    feature2Title: 'حماية الخصوصية والأمان الفائق كأولوية',
    feature2Desc: 'نحن لا نقوم بحفظ أو تتبع أو نقل بياناتك الشخصية أو روابطك أو حساباتك في أي خوادم خارجية! جميع العمليات البرمجية وتوليد الأكواد تم تجميعها وهندستها لتتم محلياً ومباشرة داخل متصفحك (Client-Side) لتقديم السرعة القصوى ومستويات الخصوصية المطلقة.',
    
    feature3Title: 'أكواد QR تفاعلية ومخصصة',
    feature3Desc: 'بجانب الروابط العميقة، يتيح لك Qrytube توليد أكواد QR عالية الدقة مطبوعة أو رقمية، مع إمكانية إضافة شعار قناتك لتصميم جذاب ومحترف يلتزم بهوية علامتك الشخصية.',
    
    missionTitle: 'رسالتنا وهدفنا',
    missionText: 'هدفنا في Qrytube هو توفير بيئة نمو برمجية حرة، آمنة ومجانية بالكامل 100% لجميع اليوتيوبرز وصناع المحتوى والمسوقين لتسهيل وصول جمهورهم إلى نقطة التفاعل الحقيقية بدون أي مشتتات برمجية أو عقبات تقنية مدمجة.',
    
    stats1: '+50 ألف صانع محتوى',
    stats2: '0% تخزين للبيانات',
    stats3: '100% مجاني ومفتوح'
  },
  en: {
    title: 'About Us',
    subTitle: 'Meet Qrytube - The Smart Hub Empowering Creators via Deep Linking',
    introHeadline: 'Why We Built Qrytube',
    introText: 'In the era of social media platforms, creators and digital marketers lose millions of potential views, likes, and subscribers due to "in-app browsers" in apps like Instagram, Facebook, and TikTok. Clicking a regular link loads it into an isolated, anonymous in-app view where user sessions aren\'t shared, stopping them from easily subscribing or interacting.\n\nQrytube was built as an elegant, immediate software solution that transforms standard URLs to bridge this platform divide—instantly opening the official native apps to multiply subscriber engagement by 300% to 400%.',
    
    feature1Title: 'Smart Deep Linking',
    feature1Desc: 'We instantly convert regular URLs into optimized deep-routing schemas for iOS & Android, forcing the smartphone to load content directly in the official native applications.',
    
    feature2Title: 'Privacy-First Architecture',
    feature2Desc: 'We don\'t store, track, or share your links, data, or personal profile links. All processing runs purely on the client-side within your browser, ensuring absolute security, data integrity, and lightning-fast rendering.',
    
    feature3Title: 'Interactive Custom QR Codes',
    feature3Desc: 'Download production-ready vector QR codes featuring your own branded layout and logos, keeping your brand unique and inviting users to subscription points in a single scan.',
    
    missionTitle: 'Our Mission',
    missionText: 'At Qrytube, our mission is to build highly reliable, free, and completely secure marketing infrastructure for YouTubers and creators, removing system friction so you can focus on making amazing content.',
    
    stats1: '+50K Creators',
    stats2: '0% Data Stored',
    stats3: '100% Free Forever'
  }
};

export default function AboutPage({ lang }: AboutPageProps) {
  const t = LOCAL_DICT[lang];

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      {/* Decorative ambient elements */}
      <div className="text-center space-y-4 mb-16">
        <span className="px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-[11px] font-extrabold uppercase tracking-widest font-sans inline-block">
          {lang === 'ar' ? 'فريقنا ورسالتنا' : 'Our Team & Mission'}
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 font-sans leading-tight">
          {t.title}
        </h2>
        <p className="text-sm md:text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          {t.subTitle}
        </p>
      </div>

      {/* Main Intro Highlight Card */}
      <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[40px] shadow-custom-card relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/70 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-50/70 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <span className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Sparkles className="w-6 h-6" />
            </span>
            <h3 className="text-2xl font-black text-slate-900 font-sans">
              {t.introHeadline}
            </h3>
          </div>
          <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed whitespace-pre-line">
            {t.introText}
          </p>
        </div>
      </div>

      {/* Quick Visual Stats Bento Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: Award, label: t.stats1, bg: 'bg-indigo-50 text-indigo-600' },
          { icon: ShieldCheck, label: t.stats2, bg: 'bg-emerald-50 text-emerald-600' },
          { icon: Zap, label: t.stats3, bg: 'bg-amber-50 text-amber-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-custom-card flex flex-col items-center justify-center text-center gap-4">
            <div className={`p-4 rounded-2xl ${stat.bg}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <span className="text-lg font-black text-slate-800 font-sans">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Structured Core Features sections */}
      <div className="space-y-8 mb-16">
        <h3 className="text-2xl font-black text-slate-900 font-sans mb-8 border-b border-slate-100 pb-4">
          {lang === 'ar' ? 'ما الذي يجعل Qrytube مختلفاً؟' : 'What makes Qrytube unique?'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-white border border-slate-150 p-8 rounded-3xl shadow-custom-card space-y-4 hover:border-indigo-100 transition-colors">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <Smartphone className="w-5 h-5" />
              </span>
              <h4 className="font-extrabold text-lg text-slate-955 font-sans">{t.feature1Title}</h4>
            </div>
            <p className="text-xs md:text-sm text-slate-600 font-semibold leading-relaxed">
              {t.feature1Desc}
            </p>
          </div>

          {/* Feature 2 (Security) */}
          <div className="bg-white border border-slate-150 p-8 rounded-3xl shadow-custom-card space-y-4 hover:border-indigo-100 transition-colors">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h4 className="font-extrabold text-lg text-slate-955 font-sans">{t.feature2Title}</h4>
            </div>
            <p className="text-xs md:text-sm text-slate-600 font-semibold leading-relaxed">
              {t.feature2Desc}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="col-span-1 md:col-span-2 bg-white border border-slate-150 p-8 rounded-3xl shadow-custom-card space-y-4 hover:border-indigo-100 transition-colors">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <QrCode className="w-5 h-5" />
              </span>
              <h4 className="font-extrabold text-lg text-slate-955 font-sans">{t.feature3Title}</h4>
            </div>
            <p className="text-xs md:text-sm text-slate-600 font-semibold leading-relaxed">
              {t.feature3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Mission / Goal block */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-[40px] p-10 md:p-14 relative overflow-hidden shadow-header">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-indigo-500 rounded-full blur-[80px] opacity-20" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-violet-600 rounded-full blur-[80px] opacity-20" />
        <div className="relative z-10 space-y-4 text-center">
          <h3 className="text-2xl md:text-3xl font-black font-sans leading-tight">
            {t.missionTitle}
          </h3>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium">
            {t.missionText}
          </p>
        </div>
      </div>
    </div>
  );
}

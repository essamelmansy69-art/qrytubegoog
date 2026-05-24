import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import QRCode from 'qrcode';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  Globe, 
  Instagram, 
  Youtube, 
  Facebook, 
  Smartphone,
  Upload,
  Zap,
  ShieldCheck,
  Share2,
  Trash2,
  FileText,
  Mail
} from 'lucide-react';

type Language = 'ar' | 'en';
type Platform = 'general' | 'instagram' | 'youtube' | 'facebook' | 'tiktok';

const TRANSLATIONS = {
  ar: {
    title: 'SkyLink',
    headline: 'تقنية الروابط العميقة الذكية',
    trustBadge: 'فتح مباشر للتطبيقات • زيادة التفاعل • آمن 100%',
    
    labelPlatform: 'المنصة المستهدفة',
    labelUrl: 'رابط المصدر',
    labelLogo: 'تخصيص الهوية',
    
    placeholderUrl: 'مثال: https://instagram.com/p/...',
    
    general: 'رابط عام',
    instagram: 'Instagram',
    youtube: 'YouTube',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    
    uploadLogo: 'إضافة شعار',
    removeLogo: 'إزالة',
    
    download: 'تحميل كود QR',
    downloadSVG: 'تصدير بصيغة SVG',
    copy: 'نسخ الرابط',
    copied: 'تم النسخ!',
    
    seoTitle: 'أفضل أداة لإنشاء روابط ذكية (Deep Links) وكود QR',
    seoDescription: 'حوّل روابط انستجرام، يوتيوب، وتيك توك إلى روابط ذكية تفتح التطبيق مباشرة. تخطى المتصفح الداخلي وضاعف معدل التحويل والمتابعات بنقرة واحدة.',
    
    features: [
      {
        title: 'فتح التطبيق مباشرة',
        desc: 'تقنية الروابط العميقة (Deep Linking) تضمن فتح الرابط داخل التطبيق الرسمي فوراً.'
      },
      {
        title: 'زيادة التفاعل 3X',
        desc: 'تجنب مطالبة المستخدمين بتسجيل الدخول في المتصفح الداخلي، مما يرفع نسبة المتابعات.'
      },
      {
        title: 'كود QR احترافي',
        desc: 'أنشئ أكواد QR متوافقة مع الطباعة الرقمية مع إمكانية إضافة شعار علامتك التجارية.'
      }
    ],
    
    howItWorksTitle: 'كيف يعمل سكاي لينك؟',
    steps: [
      'اختر المنصة (انستجرام، يوتيوب، تيك توك، إلخ).',
      'ضع الرابط الأصلي في الصندوق المخصص.',
      'احصل فوراً على الرابط الذكي أو كود QR الجاهز للاستخدام.'
    ],

    footer: 'نظام سكاي لينك لإدارة الروابط العميقة 2026',
    
    privacy: 'الخصوصية',
    terms: 'الشروط',
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
    title: 'SkyLink',
    headline: 'Smart Deep Link Technology',
    trustBadge: 'Direct App Launch • Boost Engagement • 100% Secure',
    
    labelPlatform: 'Target Platform',
    labelUrl: 'Source Link',
    labelLogo: 'Brand Identity',
    
    placeholderUrl: 'E.g., https://instagram.com/p/...',
    
    general: 'General Link',
    instagram: 'Instagram',
    youtube: 'YouTube',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    
    uploadLogo: 'Add Logo',
    removeLogo: 'Remove',
    
    download: 'Download QR',
    downloadSVG: 'Export as SVG',
    copy: 'Copy Link',
    copied: 'Copied!',
    
    seoTitle: 'The Premier Deep Link & Smart QR Code Engine',
    seoDescription: 'Convert Instagram, YouTube, and TikTok links into smart deep links that launch apps directly. Skip internal browsers and triple your conversion rate with one click.',
    
    features: [
      {
        title: 'Instant App Launch',
        desc: 'Our Deep Linking technology ensures links open directly within official mobile apps.'
      },
      {
        title: '3X Growth Rate',
        desc: 'Don’t let login screens kill your engagement. Open profiles directly where users are logged in.'
      },
      {
        title: 'Pro QR Generation',
        desc: 'Customizable, print-ready QR codes with your identity and brand logo embedded.'
      }
    ],
    
    howItWorksTitle: 'How SkyLink Protocol Works',
    steps: [
      'Select your target platform from our optimized list.',
      'Paste your original URL or social media handle.',
      'Use the generated Smart Link or QR code instantly.'
    ],

    footer: 'SkyLink Deep Routing System 2026',
    
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',

    contactForm: {
      name: 'Full Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      success: 'Message received successfully.'
    }
  }
};

const PLATFORMS = [
  { id: 'general', icon: QrCode, activeClass: 'bg-slate-500/10 border-slate-500/50 text-slate-400', brandColor: 'text-slate-400' },
  { id: 'instagram', icon: Instagram, activeClass: 'bg-rose-500/10 border-rose-500/50 text-rose-500', brandColor: 'text-rose-500' },
  { id: 'youtube', icon: Youtube, activeClass: 'bg-red-600/10 border-red-600/50 text-red-600', brandColor: 'text-red-600' },
  { id: 'facebook', icon: Facebook, activeClass: 'bg-blue-600/10 border-blue-600/50 text-blue-600', brandColor: 'text-blue-600' },
  { id: 'tiktok', icon: Smartphone, activeClass: 'bg-white/10 border-white/40 text-white shadow-[2px_2px_0px_#ff0050,-2px_-2px_0px_#00f2ea]', brandColor: 'text-white' },
];

function HomeContent({ lang }: { lang: Language }) {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<Platform>('general');
  const [logo, setLogo] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t = TRANSLATIONS[lang];

  const getDeepLink = useCallback((input: string, plat: Platform) => {
    if (!input) return '';
    const clean = input.trim();
    
    switch (plat) {
      case 'instagram':
        if (clean.includes('instagram.com')) {
          return clean.replace('https://www.instagram.com', 'instagram://').replace('https://instagram.com', 'instagram://');
        }
        return `instagram://user?username=${clean}`;
      case 'youtube':
        if (clean.includes('youtube.com/watch')) {
          return clean.replace('https://www.youtube.com', 'vnd.youtube://').replace('https://youtube.com', 'vnd.youtube://');
        }
        return clean;
      case 'facebook':
        if (clean.includes('facebook.com')) {
          return clean.replace('https://www.facebook.com', 'fb://').replace('https://facebook.com', 'fb://');
        }
        return clean;
      default:
        return clean;
    }
  }, []);

  const generateQR = useCallback(async () => {
    if (!canvasRef.current) return;
    
    const finalUrl = getDeepLink(url || 'https://skylink.app', platform);
    
    try {
      const tempCanvas = document.createElement('canvas');
      await QRCode.toCanvas(tempCanvas, finalUrl, {
        width: 1000,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      });

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const size = 1000;
      canvasRef.current.width = size;
      canvasRef.current.height = size;

      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(tempCanvas, 0, 0, size, size);

      if (logo) {
        const logoImg = new Image();
        logoImg.src = logo;
        await new Promise((resolve) => {
          logoImg.onload = resolve;
          logoImg.onerror = resolve;
        });

        const logoSize = size * 0.2;
        const x = (size - logoSize) / 2;
        const y = (size - logoSize) / 2;

        ctx.fillStyle = '#ffffff';
        const padding = logoSize * 0.15;
        
        ctx.beginPath();
        const r = logoSize * 0.2;
        ctx.roundRect(x - padding, y - padding, logoSize + padding * 2, logoSize + padding * 2, r);
        ctx.fill();

        ctx.drawImage(logoImg, x, y, logoSize, logoSize);
      }
    } catch (err) {
      console.error(err);
    }
  }, [url, platform, logo, getDeepLink]);

  useEffect(() => {
    generateQR();
  }, [generateQR]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const downloadPNG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `skylink-qr-${platform}.png`;
    link.href = canvasRef.current.toDataURL('image/png', 1.0);
    link.click();
  };

  const downloadSVG = async () => {
    const finalUrl = getDeepLink(url || 'https://skylink.app', platform);
    try {
      const svgString = await QRCode.toString(finalUrl, {
        type: 'svg',
        width: 800,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      });

      let finalSvg = svgString;
      if (logo) {
        const logoSize = 160;
        const logoPos = (800 - logoSize) / 2;
        const logoImage = `<image href="${logo}" x="${logoPos}" y="${logoPos}" height="${logoSize}" width="${logoSize}" />`;
        finalSvg = finalSvg.replace('</svg>', `${logoImage}</svg>`);
      }

      const blob = new Blob([finalSvg], { type: 'image/svg+xml;charset=utf-8' });
      const dlUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = dlUrl;
      link.download = `skylink-vector.svg`;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-7xl font-black tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">{t.headline}</h2>
        <div className="flex items-center justify-center gap-3 text-white/60 text-sm font-medium">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span>{t.trustBadge}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-[#0b0c10] border border-white/[0.08] p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -mr-32 -mt-32 transition-colors duration-1000 group-hover:bg-indigo-500/10" />
          
          <div className="space-y-10 relative z-10">
            <div className="space-y-4">
              <label className="text-[11px] font-bold text-white/60 uppercase tracking-widest">{t.labelPlatform}</label>
              <div className="grid grid-cols-5 gap-3">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id as Platform)}
                    className={`flex items-center justify-center p-4 rounded-2xl border transition-all duration-300 relative group/btn ${
                      platform === p.id 
                        ? p.activeClass + ' scale-[1.05] shadow-lg' 
                        : 'bg-white/5 border-white/5 text-white/40 hover:text-white/60 hover:bg-white/10'
                    }`}
                  >
                    <p.icon className={`w-5 h-5 transition-transform duration-300 ${platform === p.id ? 'scale-110' : 'group-hover/btn:scale-110'}`} />
                    {platform === p.id && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute -bottom-1 w-1 h-1 rounded-full bg-current"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-bold text-white/60 uppercase tracking-widest">{t.labelUrl}</label>
              <div className="relative">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t.placeholderUrl}
                  className="w-full bg-black/40 border border-white/20 rounded-2xl p-5 outline-none focus:border-indigo-500 transition-all text-sm font-medium text-white placeholder:text-white/20"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-bold text-white/60 uppercase tracking-widest">{t.labelLogo}</label>
              <div className="flex gap-4">
                <input type="file" id="logo-upload" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                <label 
                  htmlFor="logo-upload" 
                  className="flex-grow flex items-center justify-center gap-3 border border-white/20 rounded-2xl p-5 text-sm font-bold hover:bg-white/10 cursor-pointer transition-all text-white/80"
                >
                  <Upload className="w-4 h-4 text-indigo-400" />
                  {t.uploadLogo}
                </label>
                {logo && (
                  <button 
                    onClick={() => setLogo(null)} 
                    className="p-5 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-600/10 blur-[120px] rounded-full group-hover:bg-indigo-600/20 transition-all opacity-100" />
            <div className="relative bg-white p-7 rounded-[48px] shadow-3xl transition-transform duration-700 group-hover:scale-[1.02]">
              <canvas ref={canvasRef} className="w-68 h-68 md:w-80 md:h-80" />
            </div>
          </div>
          
          <div className="w-full max-w-sm space-y-4">
            <button 
              onClick={downloadPNG}
              disabled={!url}
              className="w-full bg-white text-black py-5 rounded-2xl font-bold tracking-tight shadow-xl hover:bg-slate-200 transition-all disabled:opacity-30 active:scale-[0.98]"
            >
              {t.download}
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={downloadSVG}
                disabled={!url}
                className="bg-[#0f0f12] border border-white/10 text-white/70 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-20"
              >
                {t.downloadSVG}
              </button>
              <button 
                onClick={copyUrl}
                disabled={!url}
                className="bg-[#0f0f12] border border-white/10 text-white/70 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-20"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : t.copy}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Features Section */}
      <div className="grid md:grid-cols-3 gap-8 pt-12">
        {t.features.map((f, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 hover:border-indigo-500/30 transition-colors">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
              {i === 0 ? <Zap className="w-6 h-6 text-indigo-400" /> : i === 1 ? <Smartphone className="w-6 h-6 text-indigo-400" /> : <ShieldCheck className="w-6 h-6 text-indigo-400" />}
            </div>
            <h3 className="text-xl font-bold text-white">{f.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#0b0c10] border border-white/10 p-10 md:p-16 rounded-[48px] space-y-12 text-center">
        <div className="space-y-4">
          <h3 className="text-3xl md:text-5xl font-black text-white">{t.howItWorksTitle}</h3>
          <p className="text-white/40 max-w-2xl mx-auto">{t.seoDescription}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {t.steps.map((step, i) => (
            <div key={i} className="space-y-4">
              <div className="text-5xl font-black text-white/5">{i + 1}</div>
              <p className="font-bold text-white/80">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage({ lang }: { lang: Language }) {
  const [sent, setSent] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-black mb-10 text-center tracking-tight text-white">{t.contact}</h2>
      <div className="bg-[#0f0f12] border border-white/[0.08] p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-[80px]" />
        {sent ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-xl font-bold text-white">{t.contactForm.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">{t.contactForm.name}</label>
              <input required type="text" className="w-full bg-black/40 border border-white/20 rounded-2xl py-4 px-6 focus:border-indigo-500 transition-all outline-none text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">{t.contactForm.email}</label>
              <input required type="email" className="w-full bg-black/40 border border-white/20 rounded-2xl py-4 px-6 focus:border-indigo-500 transition-all outline-none text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">{t.contactForm.message}</label>
              <textarea required rows={5} className="w-full bg-black/40 border border-white/20 rounded-2xl py-4 px-6 focus:border-indigo-500 transition-all outline-none resize-none text-white" />
            </div>
            <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-slate-200 active:scale-[0.98]">
              {t.contactForm.send}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function LegalPage({ lang, type }: { lang: Language, type: 'privacy' | 'terms' }) {
  const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-black mb-12 text-center tracking-tight text-white uppercase">{t[type]}</h2>
      <div className="bg-[#0f0f12] border border-white/[0.08] p-12 md:p-16 rounded-[40px] shadow-2xl text-white/70 space-y-10 leading-relaxed font-medium transition-colors">
        <section className="space-y-4">
           <h3 className="text-white text-xl font-bold">{lang === 'ar' ? 'السياسة البرمجية' : 'Protocol Standard'}</h3>
           <p className="text-sm md:text-base">{lang === 'ar' ? 'نظام سكاي لينك يعتمد على تحويل الروابط التقليدية إلى روابط عميقة متوافقة مع أنظمة iOS و Android.' : 'SkyLink protocol converts traditional links into deep links natively compatible with iOS and Android ecosystems.'}</p>
        </section>
        <section className="space-y-4">
           <h3 className="text-white text-xl font-bold">{lang === 'ar' ? 'خصوصية البيانات' : 'Data Privacy'}</h3>
           <p className="text-sm md:text-base">{lang === 'ar' ? 'المعالجة تتم كلياً في متصفحك. لا يتم تخزين روابطك الشخصية في أي قاعدة بيانات مركزية.' : 'Processing occurs entirely within your browser environment. Your personal links are not stored in any central data repository.'}</p>
        </section>
      </div>
    </div>
  );
}

function MainLayout() {
  const [lang, setLang] = useState<Language>('ar');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const langParam = params.get('lang');
    if (langParam === 'en' || langParam === 'ar') {
      setLang(langParam as Language);
    }
  }, [location.search]);

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex flex-col pt-12 gradient-bg" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="px-6 mb-20 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="p-3 bg-white text-black rounded-[1.25rem] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-2xl shadow-white/10 ring-1 ring-white/20">
              <QrCode className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white uppercase leading-none mb-1 group-hover:text-indigo-400 transition-colors">
                Sky<span className="text-white/70 group-hover:text-white transition-colors">Link</span>
              </span>
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-[0.4em] leading-none">Deep Routing</span>
            </div>
          </Link>

          <nav className="flex items-center gap-10">
            <div className="hidden md:flex items-center gap-10 text-[11px] font-bold text-white/50 uppercase tracking-[0.25em]">
               <Link to="/privacy" className="hover:text-white transition-all hover:tracking-[0.3em]">{t.privacy}</Link>
               <Link to="/terms" className="hover:text-white transition-all hover:tracking-[0.3em]">{t.terms}</Link>
            </div>
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="group/lang text-[11px] font-bold text-white/70 hover:text-white flex items-center gap-2 border border-white/10 bg-white/5 px-5 py-3 rounded-2xl uppercase tracking-widest transition-all hover:bg-white/10"
            >
              <Globe className="w-4 h-4 text-indigo-400 group-hover/lang:rotate-180 transition-transform duration-700" />
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomeContent lang={lang} />} />
              <Route path="/privacy" element={<LegalPage lang={lang} type="privacy" />} />
              <Route path="/terms" element={<LegalPage lang={lang} type="terms" />} />
              <Route path="/contact" element={<ContactPage lang={lang} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-20 border-t border-white/5 mt-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
            <div className="flex flex-col gap-3">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-500 rounded-lg">
                   <QrCode className="w-4 h-4 text-white" />
                 </div>
                 <span className="text-xl font-black text-white uppercase tracking-tighter">{t.title}</span>
               </div>
               <p className="text-sm text-white/30 max-w-sm">{t.seoDescription}</p>
            </div>

            <div className="flex items-center gap-6">
              {[Instagram, Facebook, Youtube, Share2].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all active:scale-90"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-8">
            <div className="flex flex-col gap-2">
               <span className="text-[11px] font-black text-white/70 uppercase tracking-[0.4em]">{t.title} System</span>
               <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em]">{t.footer}</span>
            </div>

            <div className="flex items-center gap-10 text-[11px] font-bold text-white/50 uppercase tracking-widest">
               <Link to="/privacy" className="hover:text-white transition-colors">Protocol</Link>
               <Link to="/terms" className="hover:text-white transition-colors">Compliance</Link>
               <Link to="/contact" className="hover:text-white transition-colors">Signal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

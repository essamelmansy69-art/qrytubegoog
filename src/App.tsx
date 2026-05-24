import React, { useState, useEffect, useRef, useMemo } from 'react';
import QRCode from 'qrcode';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { 
  QrCode, 
  Download, 
  Globe, 
  Zap, 
  Smartphone, 
  Copy, 
  Check, 
  Share2,
  ShieldCheck,
  Mail,
  X,
  FileText,
  Shield,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  BookOpen,
  PlusCircle,
  Sun,
  Moon
} from 'lucide-react';

type PlatformType = 'auto' | 'instagram' | 'youtube' | 'tiktok' | 'facebook' | 'telegram';
type Language = 'ar' | 'en';

const PRESET_COLORS = [
  { name: 'Gold', hex: '#fbbf24' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Silver', hex: '#94a3b8' },
];

const TRANSLATIONS = {
  ar: {
    title: 'Smart QR Pro 2026',
    subtitle: 'الجيل القادم من الروابط',
    headline: 'اكتسح المنصات بروابط ذكية',
    description: 'تقنية التوجيه العميقة الأكثر تقدماً في 2026، مصممة لاختصار المسافات بينك وبين جمهورك بضغطة واحدة.',
    zap: 'نظام Deep-Link 2.0 نشط الآن',
    step1: '1. اختيار المنصة والوجهة',
    step2: '2. تخصيص الهوية البصرية',
    auto: 'ذكي',
    instagram: 'انستجرام',
    youtube: 'يوتيوب',
    tiktok: 'تيك توك',
    facebook: 'فيسبوك',
    urlPlaceholder: 'https://...',
    qrColor: 'لون الكود الحيوي',
    uploadLogo: 'إضافة الهوية (Logo)',
    preview: 'النظام البصري النهائي',
    download: 'تحميل PNG',
    downloadSVG: 'تحميل SVG',
    share: 'نشر الرابط',
    copy: 'نسخ الكود',
    copied: 'تم الحفظ',
    footer: 'نظام التوجيه المباشر بنبض 2026.',
    privacy: 'الخصوصية',
    terms: 'الشروط',
    contact: 'تواصل',
    faqTitle: 'الأسئلة الشائعة',
    faq1Q: 'كيف يعمل التوجيه الذكي؟',
    faq1A: 'نستخدم خوارزميات 2026 لتجاوز متصفحات التطبيقات التقليدية وفتح التطبيق الرسمي مباشرة.',
    faq2Q: 'هل الأكواد دائمة؟',
    faq2A: 'نعم، الأكواد تعمل للأبد دون انقطاع مع دعم كامل لأنظمة التشفير الحديثة.',
    faq3Q: 'هل يمكنني تغيير الرابط لاحقاً؟',
    faq3A: 'الأكواد الحالية ثابتة لضمان السرعة القصوى والخصوصية الكاملة.',
    featuresTitle: 'مميزات الجيل القادم',
    feature1: 'تجاوز حواجز الدخول',
    feature2: 'تحليل المسار الذكي',
    feature3: 'دقة بصرية فائقة',
    blog: 'المختبر الرقمي',
    readMore: 'استكشاف',
    articlesTitle: 'أفكار من المستقبل',
    backToHome: 'العودة للمنصة',
    analyticsTitle: 'توقعات النمو الاستراتيجي',
    convBoost: 'تحسين المسار',
    reachPotential: 'قوة الوصول',
    platformImpact: 'تأثير المنصة',
    high: 'أقصى طاقة',
    med: 'نمو متوازن',
  },
  en: {
    title: 'Smart QR Pro 2026',
    subtitle: 'Next-Gen Linking System',
    headline: 'Command the Digital Sphere',
    description: 'The most advanced deep-linking technology of 2026. Eliminate friction and connect with your audience instantly.',
    zap: 'Deep-Link 2.0 System Active',
    step1: '1. Select Vector & Destination',
    step2: '2. Identity Customization',
    auto: 'Smart',
    instagram: 'Instagram',
    youtube: 'YouTube',
    tiktok: 'TikTok',
    facebook: 'Facebook',
    urlPlaceholder: 'https://...',
    qrColor: 'Bio-QR Color',
    uploadLogo: 'Brand Identity (Logo)',
    preview: 'Visual Preview System',
    download: 'Download PNG',
    downloadSVG: 'Download SVG',
    share: 'Broadcast Link',
    copy: 'Copy Vector',
    copied: 'Synced',
    footer: '2026 Direct Routing Neural Link.',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    faqTitle: 'Core Intelligence',
    faq1Q: 'How does Smart Routing work?',
    faq1A: 'We utilize 2026 algorithms to bypass standard web-views and launch native applications directly.',
    faq2Q: 'Are the codes permanent?',
    faq2A: 'Yes, all vectors generated are eternal and encrypted for maximum reliability.',
    faq3Q: 'Can I change the link later?',
    faq3A: 'Current generation vectors are static for peak performance.',
    featuresTitle: 'Advanced Protocols',
    feature1: 'Frictionless Entry',
    feature2: 'Smart Path Analysis',
    feature3: 'Ultra-Res Optics',
    blog: 'Digital Lab',
    readMore: 'Explore',
    articlesTitle: 'Future Insights',
    backToHome: 'System Origin',
    analyticsTitle: 'Strategic Growth Projections',
    convBoost: 'Path Optimization',
    reachPotential: 'Reach Power',
    platformImpact: 'Vector Impact',
    high: 'Maximum',
    med: 'Balanced',
  }
};

const PLATFORM_DATA = {
  auto: { boost: '+15%', reach: 'med' },
  instagram: { boost: '+42%', reach: 'high' },
  tiktok: { boost: '+68%', reach: 'high' },
  youtube: { boost: '+24%', reach: 'med' },
  facebook: { boost: '+30%', reach: 'high' }
};

const ARTICLES = [
  {
    id: 'how-to-increase-followers-with-qr',
    title: { ar: 'كيفية زيادة المتابعين باستخدام كود QR الذكي', en: 'How to Increase Followers Using Smart QR Codes' },
    excerpt: { 
      ar: 'تعلم كيف يمكنك تجاوز عائق تسجيل الدخول في انستجرام وتيك توك لزيادة التحويلات 10 أضعاف.', 
      en: 'Learn how to bypass Instagram and TikTok login barriers to boost conversions by 10x.' 
    },
    content: {
      ar: `استخدام روابط QR العادية غالباً ما يوجه المستخدم لنسخة الويب من التطبيق، مما يتطلب تسجيل الدخول. هذا العائق يقتل نسبة التحويل. 
      الحل هو "Deep Linking" أو الروابط العميقة التي يولدها موقعنا، حيث تفتح التطبيق مباشرة.`,
      en: `Using standard QR links often directs users to the web version of the app, requiring a login. This friction kills conversion rates.
      The solution is "Deep Linking" generated by our tool, which opens the app directly.`
    },
    keywords: ['زيادة متابعين', 'كود QR انستجرام', 'Deep linking', 'تسويق رقمي']
  },
  {
    id: 'tiktok-viral-marketing-qr',
    title: { ar: 'التسويق الفيروسي على تيك توك باستخدام الروابط الذكية', en: 'Viral TikTok Marketing with Smart Links' },
    excerpt: { 
      ar: 'دليلك الشامل لاستخدام كود QR في حملات تيك توك لضمان وصول المستخدم لبروفايلك فوراً.', 
      en: 'Your comprehensive guide to using QR codes in TikTok campaigns to ensure users reach your profile instantly.' 
    },
    content: {
      ar: `عند طباعة كود QR على المنتجات، تأكد من استخدام رابط ذكي يدعم بروتوكول snssdk1233 لفتح تيك توك مباشرة. هذا يضمن أن المستخدم سيقوم بمتابعتك بضغطة واحدة بدلاً من البحث عن اسمك.`,
      en: `When printing QR codes on products, make sure to use a smart link that supports the snssdk1233 protocol to open TikTok directly. This ensures users follow you with one click instead of searching for your name.`
    },
    keywords: ['تيك توك', 'رابط ذكي', 'كود QR مجاني', 'تسويق فيروسي']
  }
];

function HomeContent({ lang, setLang, theme }: { lang: Language, setLang: (l: Language) => void, theme: 'dark' | 'light' }) {
  const [url, setUrl] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('auto');
  const [qrColor, setQrColor] = useState('#fbbf24');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t = TRANSLATIONS[lang];
  const analytics = PLATFORM_DATA[selectedPlatform as keyof typeof PLATFORM_DATA] || PLATFORM_DATA.auto;


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getSmartUrl = (input: string) => {
    if (!input) return { smartUrl: '', explanation: '' };
    let smartUrl = input;
    try {
      const urlObj = new URL(input.startsWith('http') ? input : `https://${input}`);
      const domain = urlObj.hostname.toLowerCase();
      if (domain.includes('instagram.com')) {
        const parts = urlObj.pathname.split('/').filter(p => p);
        const username = parts[0];
        if (username) smartUrl = `instagram://user?username=${username}`;
      } else if (domain.includes('tiktok.com')) {
        const parts = urlObj.pathname.split('/').filter(p => p);
        const username = parts[0]?.replace('@', '');
        if (username) smartUrl = `snssdk1233://user/profile/${username}`;
      } else if (domain.includes('facebook.com')) {
        smartUrl = `fb://facewebmodal/f?href=${encodeURIComponent(input)}`;
      }
    } catch (e) {}
    return { smartUrl, explanation: '' };
  };

  const smartResult = useMemo(() => getSmartUrl(url), [url]);

  useEffect(() => {
    const drawQR = async () => {
      if (!canvasRef.current) return;
      try {
        const canvas = canvasRef.current;
        const textToEncode = smartResult.smartUrl || 'https://smartqr.link';
        await QRCode.toCanvas(canvas, textToEncode, {
          width: 800,
          margin: 4,
          color: { dark: qrColor, light: bgColor },
          errorCorrectionLevel: 'Q'
        });

        const ctx = canvas.getContext('2d');
        if (ctx) {
          const size = canvas.width;
          const boxSize = size * 0.22;
          const x = (size - boxSize) / 2;
          const y = (size - boxSize) / 2;
          ctx.fillStyle = bgColor;
          ctx.beginPath();
          ctx.roundRect(x, y, boxSize, boxSize, boxSize * 0.2);
          ctx.fill();
          if (uploadedLogo) {
            const img = new Image();
            img.src = uploadedLogo;
            img.onload = () => {
              ctx.drawImage(img, x + 8, y + 8, boxSize - 16, boxSize - 16);
              syncPreview();
            };
          } else {
            ctx.fillStyle = qrColor;
            ctx.font = `bold ${boxSize * 0.25}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(lang === 'ar' ? 'مسح' : 'QR', size / 2, size / 2);
            syncPreview();
          }
        }
      } catch (err) { console.error(err); }
    };

    const syncPreview = () => {
      if (!canvasRef.current) return;
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const img = document.getElementById('qr-prev-none') as HTMLImageElement;
      if (img) img.src = dataUrl;
    };

    drawQR();
  }, [url, qrColor, bgColor, uploadedLogo, lang, smartResult.smartUrl]);

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'smart_qr.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleDownloadSVG = async () => {
    try {
      const textToEncode = smartResult.smartUrl || 'https://smartqr.link';
      
      const svgString = await new Promise<string>((resolve, reject) => {
        QRCode.toString(textToEncode, {
          type: 'svg',
          width: 800,
          margin: 2,
          color: { dark: qrColor, light: bgColor },
          errorCorrectionLevel: 'H'
        }, (err, string) => {
          if (err) reject(err);
          else resolve(string);
        });
      });
      
      if (!svgString) throw new Error('SVG generation failed');

      let finalSvg = svgString;

      if (uploadedLogo) {
        const logoSize = 160;
        const logoPos = (800 - logoSize) / 2;
        const logoImage = `<image href="${uploadedLogo}" x="${logoPos}" y="${logoPos}" height="${logoSize}" width="${logoSize}" />`;
        finalSvg = finalSvg.replace('</svg>', `${logoImage}</svg>`);
      }

      const fullSvg = finalSvg.startsWith('<?xml') ? finalSvg : `<?xml version="1.0" encoding="UTF-8"?>\n${finalSvg}`;
      const blob = new Blob([fullSvg], { type: 'image/svg+xml;charset=utf-8' });
      const dlUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = dlUrl;
      link.download = `smart_qr_${Date.now()}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(dlUrl), 100);
    } catch (err) {
      console.error('SVG Download Error:', err);
      alert(lang === 'ar' ? 'عذراً، فشل تحميل SVG. يرجى المحاولة لاحقاً.' : 'Sorry, SVG download failed. Please try again.');
    }
  };

  return (
    <>
      <div className="text-center mb-32 px-4">
        <h2 className={`text-5xl md:text-9xl font-black mb-12 tracking-tighter leading-[0.8] font-display uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.headline}</h2>
        <p className={`text-sm md:text-xl max-w-2xl mx-auto font-medium leading-relaxed tracking-tight ${theme === 'dark' ? 'text-white opacity-40' : 'text-slate-500'}`}>{t.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start text-right">
        <div className="lg:col-span-12 xl:col-span-7 space-y-20">
          <section className={`backdrop-blur-3xl rounded-[64px] border p-10 md:p-20 shadow-2xl relative overflow-hidden group transition-all duration-1000 ${theme === 'dark' ? 'bg-white/[0.01] border-white/[0.05] shadow-black' : 'bg-white border-slate-200/60 shadow-xl shadow-slate-200/20'}`}>
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[120px] -mr-32 -mt-32 transition-colors ${theme === 'dark' ? 'bg-white/[0.02]' : 'bg-slate-500/[0.05]'}`} />
            <h3 className={`text-base font-bold mb-16 flex items-center gap-5 uppercase tracking-[0.25em] opacity-80 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              <span className={`w-10 h-10 rounded-full text-black text-xs font-black flex items-center justify-center shadow-2xl transition-all ${theme === 'dark' ? 'bg-white' : 'bg-slate-900 text-white'}`}>01</span>
              {t.step1}
            </h3>
            <div className="space-y-16">
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
                {['auto', 'instagram', 'youtube', 'tiktok', 'facebook'].map((p) => (
                  <button key={p} onClick={() => setSelectedPlatform(p as PlatformType)} className={`py-7 px-4 rounded-[32px] text-[10px] font-bold border transition-all duration-700 ${selectedPlatform === p ? (theme === 'dark' ? 'bg-white border-white text-black shadow-2xl scale-105' : 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-105') : (theme === 'dark' ? 'bg-white/[0.02] border-white/5 text-slate-500 hover:bg-white/5 hover:text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-900')}`}>
                    {t[p as keyof typeof t] || p}
                  </button>
                ))}
              </div>

              <div className="relative group">
                <Globe className={`absolute ${lang === 'ar' ? 'right-8' : 'left-8'} top-1/2 -translate-y-1/2 w-6 h-6 group-focus-within:scale-110 transition-all duration-700 opacity-20 ${theme === 'dark' ? 'text-white' : 'text-slate-400'}`} />
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder={t.urlPlaceholder} className={`w-full border rounded-[48px] py-10 ${lang === 'ar' ? 'pr-24 pl-10' : 'pl-24 pr-10'} text-xl font-medium outline-none transition-all shadow-inner placeholder:opacity-20 ${theme === 'dark' ? 'bg-black/40 border-white/[0.05] text-white focus:bg-black focus:border-white/20' : 'bg-slate-50 border-slate-100 text-slate-900 focus:bg-white focus:border-slate-300'}`} />
              </div>
            </div>
          </section>

          <section className={`backdrop-blur-3xl rounded-[64px] border p-10 md:p-20 shadow-2xl relative overflow-hidden group transition-all duration-1000 ${theme === 'dark' ? 'bg-white/[0.01] border-white/[0.05] shadow-black' : 'bg-white border-slate-200/60 shadow-xl shadow-slate-200/20'}`}>
            <div className={`absolute bottom-0 left-0 w-64 h-64 blur-[120px] -ml-32 -mb-32 transition-colors ${theme === 'dark' ? 'bg-white/[0.01]' : 'bg-slate-500/[0.05]'}`} />
            <h3 className={`text-base font-bold mb-16 flex items-center gap-5 uppercase tracking-[0.25em] opacity-80 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              <span className={`w-10 h-10 rounded-full text-black text-xs font-black flex items-center justify-center shadow-2xl transition-all ${theme === 'dark' ? 'bg-white' : 'bg-slate-900 text-white'}`}>02</span>
              {t.step2}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="space-y-12 text-right">
                <span className={`text-[10px] font-bold uppercase tracking-[0.5em] opacity-40`}>{t.qrColor}</span>
                <div className="flex gap-4 justify-end flex-wrap">
                  {PRESET_COLORS.map(c => (
                    <button key={c.hex} onClick={() => setQrColor(c.hex)} className={`w-14 h-14 rounded-3xl border transition-all duration-1000 hover:scale-110 ${qrColor === c.hex ? (theme === 'dark' ? 'border-white ring-8 ring-white/5' : 'border-slate-900 ring-8 ring-slate-900/5') : (theme === 'dark' ? 'border-white/5 opacity-50 hover:opacity-100' : 'border-slate-200 opacity-60 hover:opacity-100')}`} style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
              </div>
              <div className="space-y-12 text-right">
                <span className={`text-[10px] font-bold uppercase tracking-[0.5em] opacity-40`}>{t.uploadLogo}</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="logo-upload" />
                <label htmlFor="logo-upload" className={`cursor-pointer border border-dashed rounded-[48px] py-16 flex flex-col items-center gap-6 transition-all group ${theme === 'dark' ? 'bg-black/20 border-white/[0.05] hover:border-white/20' : 'bg-slate-50 border-slate-200 hover:border-slate-400'}`}>
                  {uploadedLogo ? <img src={uploadedLogo} className="h-14 w-14 object-contain rounded-2xl shadow-2xl" alt="Logo" /> : <div className={`transition-all flex flex-col items-center gap-5 opacity-40 group-hover:opacity-100`}><PlusCircle className="w-12 h-12 stroke-[1.1]" /> <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{lang === 'ar' ? 'إدراج شعار' : 'Insert Logo'}</span></div>}
                </label>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-12 xl:col-span-5 sticky top-36">
          <div className={`backdrop-blur-3xl rounded-[72px] border p-10 md:p-16 shadow-2xl flex flex-col items-center relative overflow-hidden group transition-all duration-1000 ${theme === 'dark' ? 'bg-black border-white/[0.05] shadow-black' : 'bg-white border-slate-200/60 shadow-xl shadow-slate-200/10'}`}>
            <span className={`text-[10px] font-black px-12 py-3.5 rounded-full uppercase mb-16 z-10 tracking-[0.5em] border transition-all ${theme === 'dark' ? 'text-white border-white/20' : 'text-slate-900 bg-slate-50 border-slate-200'}`}>{t.preview}</span>
            <div className="relative mb-20 z-10">
              <canvas ref={canvasRef} className="hidden" />
              <div className={`p-14 bg-white rounded-[72px] relative z-10 transition-transform group-hover:scale-[1.02] duration-1000 shadow-2xl`}>
                <img id="qr-prev-none" alt="QR" className="w-[240px] md:w-[360px] h-auto rounded-[32px]" />
              </div>
              <div className={`absolute inset-0 blur-[140px] rounded-full scale-125 translate-y-10 transition-colors ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-500/10'}`} />
            </div>
            <div className="grid grid-cols-2 gap-6 w-full z-10">
              <button onClick={handleDownloadPNG} disabled={!url} className={`py-8 rounded-[36px] text-xs font-black flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all uppercase tracking-widest disabled:opacity-30 ${theme === 'dark' ? 'bg-white text-black hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-black'}`}>
                <Download className="w-5 h-5" /> {t.download}
              </button>
              <button onClick={handleDownloadSVG} disabled={!url} className={`border py-8 rounded-[36px] text-xs font-black flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all uppercase tracking-widest disabled:opacity-30 ${theme === 'dark' ? 'bg-white/[0.05] text-white border-white/10 hover:bg-white/[0.1]' : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'}`}>
                <FileText className={`w-5 h-5 opacity-60`} /> {t.downloadSVG}
              </button>
              <button onClick={() => { navigator.clipboard.writeText(smartResult.smartUrl); setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000); }} disabled={!url} className={`col-span-2 border py-8 rounded-[36px] text-xs font-black flex items-center justify-center gap-4 transition-all active:scale-[0.98] uppercase tracking-[0.2em] disabled:opacity-30 ${theme === 'dark' ? 'bg-white/[0.03] text-slate-400 border-white/5 hover:text-white' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}>
                {copiedLink ? <Check className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} /> : <Copy className="w-5 h-5" />}
                {copiedLink ? t.copied : t.copy}
              </button>
            </div>

            <div className={`w-full mt-16 pt-16 border-t z-10 transition-colors ${theme === 'dark' ? 'border-white/[0.05]' : 'border-slate-100'}`}>
              <button 
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`w-full flex items-center justify-between group font-bold tracking-[0.2em] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
              >
                <div className={`transition-transform duration-1000 ${showAnalytics ? 'rotate-90' : 'rotate-0'}`}>
                  <ChevronRight className="w-6 h-6 opacity-40" />
                </div>
                <span className={`text-[10px] uppercase tracking-[0.5em] opacity-40`}>{t.analyticsTitle}</span>
              </button>
              
              <AnimatePresence>
                {showAnalytics && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-8 mt-16 text-center rtl:text-right">
                      <div className={`p-10 rounded-[48px] border transition-colors ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                         <p className={`text-[9px] font-bold uppercase mb-6 tracking-[0.3em] opacity-40`}>{t.convBoost}</p>
                         <p className={`text-5xl font-black tabular-nums font-display ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{analytics.boost}</p>
                      </div>
                      <div className={`p-10 rounded-[48px] border transition-colors ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                         <p className={`text-[9px] font-bold uppercase mb-6 tracking-[0.3em] opacity-40`}>{t.reachPotential}</p>
                         <p className={`text-xl font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t[analytics.reach as keyof typeof t]}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-64 space-y-48">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`p-16 rounded-[64px] border transition-all duration-1000 group relative overflow-hidden ${theme === 'dark' ? 'bg-black border-white/[0.05] hover:border-white/20' : 'bg-white border-slate-200 shadow-sm hover:border-slate-400'}`}>
               <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center mb-12 shadow-2xl transition-all duration-1000 relative z-10 text-right ${theme === 'dark' ? 'bg-white text-black' : 'bg-slate-900 text-white'}`}>
                  {i === 1 ? <ShieldCheck className="w-8 h-8" /> : i === 2 ? <Zap className="w-8 h-8" /> : <Smartphone className="w-8 h-8" />}
               </div>
               <h4 className={`font-black text-2xl mb-6 leading-tight font-display relative z-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t[`feature${i}` as keyof typeof t]}</h4>
               <p className={`text-base font-medium leading-relaxed relative z-10 opacity-50`}>
                 {lang === 'ar' 
                   ? 'أنظمة توجيه مشفرة ومؤمنة بالكامل لضمان خصوصية بياناتك وسرعة وصول جمهورك للمحتوى المنشود عبر خوارزميات ذكية.'
                   : 'Fully encrypted and secured routing systems to ensure data privacy and instant audience access to target content via smart algorithms.'}
               </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-64 max-w-4xl mx-auto px-4">
        <h3 className={`text-4xl font-black text-center mb-32 tracking-[0.5em] leading-tight font-display uppercase opacity-20 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.faqTitle}</h3>
        <div className="space-y-10">
          {[1, 2, 3].map((id) => (
            <div key={id} className={`border rounded-[56px] overflow-hidden transition-all duration-1000 group/faq ${theme === 'dark' ? 'bg-white/[0.01] border-white/5 hover:border-white/20' : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm'}`}>
              <button 
                onClick={() => setOpenFAQ(openFAQ === id ? null : id)} 
                className="w-full px-14 py-14 flex items-center justify-between text-right font-bold transition-all group"
              >
                <span className={`text-xl transition-all duration-1000 uppercase tracking-widest ${openFAQ === id ? (theme === 'dark' ? 'text-white' : 'text-slate-900') : 'opacity-40 group-hover/faq:opacity-100'}`}>{t[`faq${id}Q` as keyof typeof t]}</span>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-1000 border ${openFAQ === id ? (theme === 'dark' ? 'bg-white text-black border-white' : 'bg-slate-900 text-white border-slate-900 shadow-xl') : 'text-slate-400 border-white/10 opacity-40'}`}>
                   {openFAQ === id ? <X className="w-6 h-6" /> : <PlusCircle className="w-6 h-6" />}
                </div>
              </button>
              <AnimatePresence>
                {openFAQ === id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <div className={`px-14 pb-14 text-base leading-loose font-medium border-t pt-12 ${theme === 'dark' ? 'text-slate-500 border-white/5' : 'text-slate-600 border-slate-100 bg-slate-50/50'}`}>
                       <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                        {t[`faq${id}A` as keyof typeof t]}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function BlogContent({ lang, theme }: { lang: Language, theme: 'dark' | 'light' }) {
  const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-5xl mx-auto py-24 px-6 md:py-32">
      <Link to="/" className={`inline-flex items-center gap-4 mb-20 font-bold text-[11px] group uppercase tracking-[0.5em] transition-colors ${theme === 'dark' ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
        <ArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-2 ${lang === 'ar' ? 'rotate-180 group-hover:translate-x-2' : ''}`} />
        {t.backToHome}
      </Link>
      
      <h2 className={`text-4xl md:text-8xl font-black mb-24 tracking-tighter leading-none font-display uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t.articlesTitle}</h2>
      
      <div className="grid grid-cols-1 gap-24">
        {ARTICLES.map((article) => (
          <article key={article.id} className={`rounded-[48px] border p-10 md:p-20 shadow-2xl transition-all duration-1000 group/article relative overflow-hidden ${theme === 'dark' ? 'bg-white/[0.02] border-white/5 hover:border-white/10' : 'bg-white border-slate-100 hover:border-slate-300'}`}>
            <div className={`absolute top-0 right-0 w-80 h-80 blur-[140px] -mr-40 -mt-40 opacity-0 group-hover/article:opacity-100 transition-opacity duration-1000 ${theme === 'dark' ? 'bg-white/[0.02]' : 'bg-slate-500/[0.03]'}`} />
            <div className="flex flex-wrap gap-4 mb-12">
              {article.keywords.map(kw => (
                <span key={kw} className={`px-6 py-2.5 rounded-2xl text-[9px] font-bold uppercase tracking-[0.2em] border transition-all ${theme === 'dark' ? 'bg-white/5 text-slate-400 border-white/5' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>{kw}</span>
              ))}
            </div>
            <h3 className={`text-3xl md:text-5xl font-black mb-8 leading-[1] tracking-tight font-display relative z-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{article.title[lang]}</h3>
            <p className={`font-medium leading-relaxed mb-12 text-lg tracking-tight relative z-10 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>{article.excerpt[lang]}</p>
            <div className={`prose prose-xl max-w-none font-medium mb-16 leading-loose text-base relative z-10 ${theme === 'dark' ? 'prose-invert text-slate-400 opacity-80' : 'prose-slate text-slate-600'}`}>
              {article.content[lang]}
            </div>
            <button className={`flex items-center gap-6 font-black text-[11px] uppercase tracking-[0.5em] group/btn transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.readMore}
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${theme === 'dark' ? 'border-white/20 group-hover/btn:bg-white group-hover/btn:text-black group-hover/btn:border-white' : 'border-slate-900 group-hover/btn:bg-slate-900 group-hover/btn:text-white'}`}>
                <ArrowRight className={`w-5 h-5 transition-transform group-hover/btn:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
              </div>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeModal, setActiveModal] = useState<'none' | 'privacy' | 'terms' | 'contact'>('none');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const t = TRANSLATIONS[lang];

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col antialiased font-sans transition-colors duration-1000 ${lang === 'ar' ? 'rtl' : 'ltr'} ${theme === 'dark' ? 'bg-[#0a0a0c] text-white' : 'bg-[#fafafa] text-slate-900'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className={`absolute top-0 right-0 w-[70%] h-[70%] rounded-full blur-[180px] -mr-[15%] -mt-[15%] transition-colors duration-1000 ${theme === 'dark' ? 'bg-white/[0.02]' : 'bg-slate-500/[0.05]'}`} />
          <div className={`absolute bottom-[10%] left-[5%] w-[50%] h-[50%] rounded-full blur-[160px] transition-colors duration-1000 ${theme === 'dark' ? 'bg-white/[0.01]' : 'bg-slate-500/[0.04]'}`} />
        </div>

        <header className={`sticky top-0 z-40 backdrop-blur-2xl transition-all duration-700 border-b ${theme === 'dark' ? 'bg-[#0a0a0c]/60 border-white/[0.03]' : 'bg-white/70 border-slate-200/60 shadow-sm'}`}>
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-5 group">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`w-12 h-12 rounded-[18px] flex items-center justify-center shadow-2xl transition-all duration-700 ${theme === 'dark' ? 'bg-white text-black' : 'bg-slate-900 text-white'}`}>
                <QrCode className="w-6 h-6 stroke-[2.2]" />
              </motion.div>
              <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                <h1 className="text-lg font-black leading-none mb-1 tracking-tight uppercase font-display">{t.title}</h1>
                <p className={`text-[9px] font-bold uppercase tracking-[0.4em] leading-none opacity-40`}>{t.subtitle}</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-12 mr-auto ml-16">
               <Link to="/blog" className={`text-[11px] font-bold transition-all flex items-center gap-2 uppercase tracking-[0.25em] ${theme === 'dark' ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                  <BookOpen className="w-4 h-4 opacity-40" />
                  {t.blog}
               </Link>
            </nav>

            <div className="flex items-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 border overflow-hidden relative group ${theme === 'dark' ? 'bg-white/5 border-white/5 text-amber-500 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200 shadow-sm'}`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5 flex-shrink-0" /> : <Moon className="w-5 h-5 flex-shrink-0" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              <Link to="/blog" className={`md:hidden w-11 h-11 flex items-center justify-center rounded-2xl transition-all ${theme === 'dark' ? 'bg-white/5 border border-white/5 text-slate-400' : 'bg-slate-100 border border-slate-200 text-slate-600'}`}>
                <BookOpen className="w-5 h-5" />
              </Link>
              
              <button 
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} 
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-[11px] transition-all active:scale-95 uppercase tracking-[0.15em] border ${theme === 'dark' ? 'bg-white/5 border-white/5 text-slate-400 hover:bg-amber-500/10 hover:text-amber-400' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow container max-w-7xl mx-auto px-6 py-20 md:py-32">
          <Routes>
            <Route path="/" element={<HomeContent lang={lang} setLang={setLang} theme={theme} />} />
            <Route path="/blog" element={<BlogContent lang={lang} theme={theme} />} />
          </Routes>
        </main>

        <footer className={`mt-48 transition-colors duration-700 py-32 ${theme === 'dark' ? 'bg-black border-t border-white/5' : 'bg-slate-50 border-t border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className={`flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16 font-black text-[12px] uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              <Link to="/blog" className="hover:text-white transition-colors uppercase">{t.blog}</Link>
              <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors uppercase">{t.privacy}</button>
              <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors uppercase">{t.terms}</button>
              <button onClick={() => setActiveModal('contact')} className="hover:text-white transition-colors uppercase">{t.contact}</button>
            </div>
            <p className={`text-[12px] font-black italic tracking-widest uppercase ${theme === 'dark' ? 'text-slate-600' : 'text-slate-500'}`}>© 2026 {t.footer}</p>
          </div>
        </footer>

        <AnimatePresence>
          {activeModal !== 'none' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-3xl bg-black/80" onClick={() => setActiveModal('none')}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`w-full max-w-2xl rounded-[64px] border p-12 md:p-20 relative shadow-2xl transition-colors duration-700 ${theme === 'dark' ? 'bg-slate-900 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'}`} onClick={e => e.stopPropagation()}>
                <button onClick={() => setActiveModal('none')} className={`absolute top-10 right-10 w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-all ${theme === 'dark' ? 'bg-white/5 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'}`}><X className="w-6 h-6" /></button>
                <h3 className="text-3xl font-black mb-12 uppercase tracking-widest leading-none font-display">{t[activeModal as keyof typeof t] || activeModal}</h3>
                <div className={`text-lg font-medium leading-loose ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {activeModal === 'contact' ? (
                    <div className="space-y-10">
                      <div className={`flex items-center gap-8 p-10 rounded-[40px] border transition-colors ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner transition-colors ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-slate-900 text-white'}`}>
                           <Mail className="w-9 h-9" />
                        </div>
                        <div className="text-left font-black tracking-widest uppercase">
                          <p className="text-[10px] opacity-40 mb-1">Direct Neural Channel</p>
                          <p className="text-xl">Support@SmartQR.ai</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-10">
                      <p className={`first-letter:text-5xl first-letter:font-black first-letter:mr-3 ${theme === 'dark' ? 'first-letter:text-white' : 'first-letter:text-slate-900'}`}>{activeModal === 'privacy' ? 
                        (lang === 'ar' ? 'خصوصيتك هي أولويتنا القصوى. صممنا هذا المحرك ليعمل بنسبة 100% في متصفحك. لا نقوم بجمع أو معالجة أو تخزين روابطك على أي خادم خارجي نهائياً.' : 'Your privacy is our ultimate priority. We designed this engine to run 100% in your browser. We do not collect, process, or store your links on any external server - ever.') :
                        (lang === 'ar' ? 'هذه الأداة مقدمة لدعم المبدعين والمسوقين. يرجى تجنب استخدام الروابط الضارة، نحن نسعى لبناء بيئة رقمية آمنة وموثوقة.' : 'This tool is provided to support creators and marketers. Please avoid using harmful links; we strive to build a safe and reliable digital environment.')
                      }</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

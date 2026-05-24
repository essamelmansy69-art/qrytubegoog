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
    title: 'Qrytube',
    headline: 'ضاعف متابعينك بـ',
    headlineColor: 'كود QR سحري! 🚀',
    trustBadge: '🌟 يثق بنا أكثر من 50,000 صانع محتوى حول العالم',
    subHeadline: 'تجاوز المتصفح الداخلي المزعج. افتح تطبيقات المنصات الرسمية (يوتيوب، إنستغرام، تيك توك) مباشرة في هواتف متابعينك بضغطة واحدة!',
    
    labelPlatform: 'اختر المنصة المستهدفة',
    labelUrl: 'رابط حسابك أو قناتك',
    labelLogo: 'تخصيص الهوية والشعار',
    labelQrColor: 'لون كود QR',
    
    placeholderUrl: '👉 ضع رابط حسابك أو قناتك هنا',
    
    general: 'رابط عام',
    instagram: 'Instagram',
    youtube: 'YouTube',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    
    uploadLogo: 'رفع شعار (اختياري)',
    removeLogo: 'إزالة',
    
    download: '✨ توليد الـ QR السحري الآن ✨',
    downloadSVG: 'تصدير بصيغة SVG',
    copy: 'نسخ الرابط الذكي',
    copied: 'تم النسخ!',
    
    seoTitle: 'أفضل أداة لإنشاء روابط ذكية (Deep Links) وكود QR - Qrytube',
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
    
    howItWorksTitle: 'كيف يعمل Qrytube؟',
    steps: [
      'اختر المنصة (انستجرام، يوتيوب، تيك توك، إلخ).',
      'ضع الرابط الأصلي في الصندوق المخصص.',
      'احصل فوراً على الرابط الذكي أو كود QR الجاهز للاستخدام.'
    ],

    footer: 'نظام Qrytube لكود الـ QR السحري وعمليات التوجيه للأجهزة الذكية 2026',
    
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
    title: 'Qrytube',
    headline: 'Double your followers with',
    headlineColor: 'Magic QR Code! 🚀',
    trustBadge: '🌟 Trusted by over 50,000 content creators worldwide',
    subHeadline: 'Skip the annoying internal browser. Open official platform apps (YouTube, Instagram, TikTok) directly on your followers\' phones with one click!',
    
    labelPlatform: 'Select Target Platform',
    labelUrl: 'Your Account or Channel Link',
    labelLogo: 'Brand Identity & Logo Customization',
    labelQrColor: 'QR Code Color',
    
    placeholderUrl: '👉 Paste your account or channel link here',
    
    general: 'General Link',
    instagram: 'Instagram',
    youtube: 'YouTube',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    
    uploadLogo: 'Upload Logo (Optional)',
    removeLogo: 'Remove',
    
    download: '✨ Generate Magic QR Code Now ✨',
    downloadSVG: 'Export as SVG',
    copy: 'Copy Smart Link',
    copied: 'Copied!',
    
    seoTitle: 'Qrytube - The Premier Deep Link & Smart QR Code Engine',
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
    
    howItWorksTitle: 'How Qrytube Works',
    steps: [
      'Select your target platform from our optimized list.',
      'Paste your original URL or social media handle.',
      'Use the generated Smart Link or QR code instantly.'
    ],

    footer: 'Qrytube Deep Routing & Smart QR-Code System 2026',
    
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
  { id: 'general', icon: QrCode, activeClass: 'bg-slate-100 border-slate-300 text-slate-700 shadow-sm scale-105', brandColor: 'text-slate-600', hoverClass: 'hover:bg-slate-50' },
  { id: 'instagram', icon: Instagram, activeClass: 'bg-rose-50 border-rose-300 text-rose-600 shadow-sm scale-105', brandColor: 'text-rose-500', hoverClass: 'hover:bg-rose-50/50' },
  { id: 'youtube', icon: Youtube, activeClass: 'bg-red-50 border-red-300 text-red-600 shadow-sm scale-105', brandColor: 'text-red-500', hoverClass: 'hover:bg-red-50/50' },
  { id: 'facebook', icon: Facebook, activeClass: 'bg-blue-50 border-blue-300 text-blue-600 shadow-sm scale-105', brandColor: 'text-blue-500', hoverClass: 'hover:bg-blue-50/50' },
  { id: 'tiktok', icon: Smartphone, activeClass: 'bg-slate-100 border-slate-305 text-black shadow-sm scale-105 ring-1 ring-black/10', brandColor: 'text-slate-900', hoverClass: 'hover:bg-slate-50' },
];

function HomeContent({ lang }: { lang: Language }) {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<Platform>('general');
  const [logo, setLogo] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrColor, setQrColor] = useState('#000000');
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
    
    const finalUrl = getDeepLink(url || 'https://qrytube.app', platform);
    
    try {
      const tempCanvas = document.createElement('canvas');
      await QRCode.toCanvas(tempCanvas, finalUrl, {
        width: 1000,
        margin: 1,
        color: {
          dark: qrColor,
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
  }, [url, platform, logo, qrColor, getDeepLink]);

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
    link.download = `qrytube-qr-${platform}.png`;
    link.href = canvasRef.current.toDataURL('image/png', 1.0);
    link.click();
  };

  const downloadSVG = async () => {
    const finalUrl = getDeepLink(url || 'https://qrytube.app', platform);
    try {
      const svgString = await QRCode.toString(finalUrl, {
        type: 'svg',
        width: 800,
        margin: 1,
        color: {
          dark: qrColor,
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
      link.download = `qrytube-vector.svg`;
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
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Trust Badge & Headline Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white shadow-sm rounded-full border border-slate-200/50 text-slate-600 text-[13px] font-bold tracking-tight">
          <span>{t.trustBadge}</span>
        </div>
        <div className="space-y-3">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            {t.headline} <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
              {t.headlineColor}
            </span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            {t.subHeadline}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Core Generator Card */}
        <div className="bg-white border border-slate-100 shadow-custom-card p-6 md:p-8 rounded-[2rem] space-y-8 relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 blur-3xl rounded-full" />
          
          <div className="space-y-8 relative z-10">
            {/* Target Platform */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                {t.labelPlatform}
              </span>
              <div className="grid grid-cols-5 gap-2.5">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id as Platform)}
                    aria-label={t[p.id as keyof typeof t] || p.id}
                    className={`flex items-center justify-center p-3.5 rounded-2xl border transition-all duration-300 relative group/btn ${
                      platform === p.id 
                        ? p.activeClass 
                        : `bg-slate-50/70 border-slate-100 ${p.brandColor} ${p.hoverClass}`
                    }`}
                  >
                    <p.icon className={`w-5 h-5 transition-transform duration-300 ${platform === p.id ? 'scale-110' : 'group-hover/btn:scale-110'}`} />
                    {platform === p.id && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-current"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Source Link */}
            <div className="space-y-3">
              <label htmlFor="url-input" className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                {t.labelUrl}
              </label>
              <div className="relative">
                <input
                  id="url-input"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t.placeholderUrl}
                  className="w-full bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 px-5 outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm font-medium text-slate-800 placeholder:text-slate-500"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Customization Row (Logo & Custom Color) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Color Customizer */}
              <div className="space-y-3">
                <label htmlFor="qr-color-input" className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                  {t.labelQrColor}
                </label>
                <div className="flex items-center gap-2 bg-slate-50/70 border border-slate-200/80 p-3 rounded-2xl">
                  <span className="text-xs font-mono text-slate-600 uppercase select-all flex-grow">
                    {qrColor}
                  </span>
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-300 shadow-sm cursor-pointer hover:scale-105 transition-transform">
                    <input
                      id="qr-color-input"
                      type="color"
                      aria-label={t.labelQrColor}
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="w-full h-full" style={{ backgroundColor: qrColor }} />
                  </div>
                </div>
              </div>

              {/* Upload Logo customizer */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                  {t.labelLogo}
                </span>
                <div className="flex gap-2">
                  <input type="file" id="logo-upload" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  <label 
                    htmlFor="logo-upload" 
                    className="flex-grow flex items-center justify-center gap-2 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-3 text-xs font-bold hover:bg-slate-100 cursor-pointer transition-all text-slate-800 hover:border-slate-300"
                  >
                    <Upload className="w-4 h-4 text-slate-600" />
                    <span className="truncate">{t.uploadLogo}</span>
                  </label>
                  {logo && (
                    <button 
                      onClick={() => setLogo(null)} 
                      aria-label={lang === 'ar' ? 'إزالة الشعار' : 'Remove Logo'}
                      className="p-3 border border-red-200/80 text-red-500 rounded-2xl hover:bg-red-50 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Magic Purple Gradient Action Button */}
            <div className="pt-2">
              <button
                onClick={downloadPNG}
                disabled={!url}
                className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:opacity-95 text-white py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-indigo-500/10 transition-all disabled:from-slate-100 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-3.5 group/magic"
              >
                <span>✨</span>
                <span>{t.download}</span>
                <span className="group-hover/magic:translate-x-1 transition-transform">⚡</span>
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Interactive Preview Panel */}
        <div className="bg-white border border-slate-100 shadow-custom-card p-6 md:p-8 rounded-[2rem] flex flex-col items-center justify-between min-h-[420px]">
          <div className="w-full flex justify-between items-center mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-bold bg-indigo-50 text-indigo-700 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              Live Preview
            </span>
            {platform !== 'general' && (
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                {platform} mode
              </span>
            )}
          </div>

          <div className="relative group/canvas flex items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 max-w-[280px] w-full aspect-square shadow-inner">
            <canvas ref={canvasRef} aria-label={lang === 'ar' ? 'معاينة كود الـ QR' : 'QR Code Preview'} className="w-full h-full max-w-[220px]" />
          </div>

          <div className="w-full space-y-3 mt-8">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={downloadSVG}
                disabled={!url}
                aria-label={t.downloadSVG}
                className="bg-slate-50 border border-slate-200/80 text-slate-700 hover:border-slate-300 hover:bg-slate-100 py-3 rounded-2xl font-bold text-xs uppercase tracking-wide transition-all disabled:opacity-30 active:scale-95 flex items-center justify-center gap-2 font-sans"
              >
                <Download className="w-4 h-4" />
                {t.downloadSVG}
              </button>
              <button 
                onClick={copyUrl}
                disabled={!url}
                aria-label={t.copy}
                className="bg-slate-50 border border-slate-200/80 text-slate-700 hover:border-slate-300 hover:bg-slate-100 py-3 rounded-2xl font-bold text-xs uppercase tracking-wide transition-all disabled:opacity-30 active:scale-95 flex items-center justify-center gap-2 font-sans"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {t.copy}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits & Infinite Info Row */}
      <div className="grid md:grid-cols-3 gap-6">
        {t.features.map((f, i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
              {i === 0 ? <Zap className="w-5 h-5 text-indigo-600" /> : i === 1 ? <Smartphone className="w-5 h-5 text-indigo-600" /> : <ShieldCheck className="w-5 h-5 text-indigo-600" />}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-950">{f.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Free & Infinite Card like Screenshot */}
      <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] space-y-10 text-center shadow-custom-card">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
            <span className="text-4xl font-light tracking-widest leading-none select-none">∞</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            {lang === 'ar' ? 'مجاني ولانهائي 🚀' : '100% Free & Unlimited 🚀'}
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium leading-relaxed">
            {lang === 'ar' 
              ? 'صمّم وحمّل وشارك أكواد الابتكار الخاصة بك دون أي قيود، أو حسابات معقدة. نوفر لك الأداة المثالية لزيادة نمو حسابات السوشيال ميديا الخاصة بك.'
              : 'Design, download, and share your custom codes completely unconstrained. We empower creators to expand their digital reach.'
            }
          </p>
        </div>
      </div>

      {/* How It Works Block */}
      <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] space-y-12 text-center shadow-custom-card">
        <div className="space-y-4">
          <h3 className="text-3xl font-black text-slate-900">{t.howItWorksTitle}</h3>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto font-medium">{t.seoDescription}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {t.steps.map((step, i) => (
            <div key={i} className="space-y-4">
              <div className="text-6xl font-black text-slate-200 leading-none">{i + 1}</div>
              <p className="font-bold text-slate-800">{step}</p>
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
      <h2 className="text-4xl font-black mb-10 text-center tracking-tight text-slate-800">{t.contact}</h2>
      <div className="bg-white border border-slate-100 p-10 rounded-3xl shadow-custom-card relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 blur-[80px]" />
        {sent ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-xl font-bold text-slate-800">{t.contactForm.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-[11px] font-bold text-slate-705 uppercase tracking-wider">{t.contactForm.name}</label>
              <input id="contact-name" required type="text" className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-4 px-6 focus:border-indigo-500 transition-all outline-none text-slate-900 font-sans" />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-[11px] font-bold text-slate-705 uppercase tracking-wider">{t.contactForm.email}</label>
              <input id="contact-email" required type="email" className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-4 px-6 focus:border-indigo-500 transition-all outline-none text-slate-900 font-sans" />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-[11px] font-bold text-slate-705 uppercase tracking-wider">{t.contactForm.message}</label>
              <textarea id="contact-message" required rows={5} className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-4 px-6 focus:border-indigo-500 transition-all outline-none resize-none text-slate-900 font-sans" />
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

function LegalPage({ lang, type }: { lang: Language, type: 'privacy' | 'terms' }) {
  const t = TRANSLATIONS[lang];
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-black mb-12 text-center tracking-tight text-slate-800 uppercase">{t[type]}</h2>
      <div className="bg-white border border-slate-100 p-12 md:p-16 rounded-[40px] shadow-custom-card text-slate-750 space-y-10 leading-relaxed font-medium transition-colors">
        <section className="space-y-4">
           <h3 className="text-indigo-600 text-xl font-bold">{lang === 'ar' ? 'السياسة البرمجية' : 'Protocol Standard'}</h3>
           <p className="text-sm md:text-base">{lang === 'ar' ? 'نظام Qrytube يعتمد على تحويل الروابط التقليدية إلى روابط عميقة متوافقة مع أنظمة iOS و Android.' : 'Qrytube protocol converts traditional links into deep links natively compatible with iOS and Android ecosystems.'}</p>
        </section>
        <section className="space-y-4">
           <h3 className="text-indigo-600 text-xl font-bold">{lang === 'ar' ? 'خصوصية البيانات' : 'Data Privacy'}</h3>
           <p className="text-sm md:text-base">{lang === 'ar' ? 'المعالجة تتم كلياً في متصفحك. لا يتم تخزين روابطك الشخصية في أي قاعدة بيانات مركزية.' : 'Processing occurs entirely within your browser environment. Your personal links are not stored in any central data repository.'}</p>
        </section>
      </div>
    </div>
  );
}

function MainLayout() {
  const [lang, setLang] = useState<Language>(() => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam === 'en' || langParam === 'ar') {
      return langParam as Language;
    }
    const browserLang = navigator.language || '';
    if (browserLang.toLowerCase().startsWith('en')) {
      return 'en';
    }
    return 'ar';
  });
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const langParam = params.get('lang');
    if (langParam === 'en' || langParam === 'ar') {
      setLang(langParam as Language);
    }
  }, [location.search]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex flex-col gradient-bg" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Trending Banner */}
      <div className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 py-3 px-4 text-center text-white text-xs md:text-sm font-bold tracking-tight select-none">
        {lang === 'ar' ? '🔥 تريند: الأداة رقم 1 لنمو المتابعين في 2026' : '🔥 Trending: The #1 follower growth tool in 2026'}
      </div>

      <header className="px-6 py-4 bg-white/85 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Language selector pill on left */}
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            aria-label={lang === 'ar' ? "Change language to English" : "تغيير اللغة إلى الإنجليزية"}
            className="group/lang text-xs font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-full shadow-sm hover:bg-slate-50 transition-all font-sans"
          >
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            <Globe className="w-3.5 h-3.5 text-indigo-500 group-hover/lang:rotate-180 transition-transform duration-700" />
          </button>

          {/* Core Brand center */}
          <Link to="/" className="flex items-center gap-1.5 group">
            <span className="text-2xl font-black tracking-tighter text-slate-900 capitalize">
              💥 Qrytube
            </span>
          </Link>

          {/* Icon box button on right */}
          <Link to="/" aria-label={lang === 'ar' ? 'الرئيسية' : 'Home'} className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.25rem] transition-all duration-300 shadow-md flex items-center justify-center group">
            <QrCode className="w-5 h-5 group-hover:rotate-6 group-hover:scale-105 transition-transform" />
          </Link>
        </div>
      </header>

      <main className="flex-grow container max-w-7xl mx-auto px-6 pt-12">
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

      <footer className="py-16 border-t border-slate-100 mt-20 bg-white shadow-header">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
            <div className="flex flex-col gap-3">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-100 rounded-lg">
                   <QrCode className="w-4 h-4 text-indigo-600" />
                 </div>
                 <span className="text-xl font-black text-slate-800 uppercase tracking-tighter">{t.title}</span>
               </div>
               <p className="text-sm text-slate-600 max-w-sm font-medium leading-relaxed">{t.seoDescription}</p>
            </div>

            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Youtube, Share2].map((Icon, i) => {
                const iconLabels = lang === 'ar' 
                  ? ['إنستغرام', 'فيسبوك', 'يوتيوب', 'مشاركة'] 
                  : ['Instagram', 'Facebook', 'YouTube', 'Share'];
                return (
                  <a 
                    key={i} 
                    href="#" 
                    aria-label={iconLabels[i]}
                    className="w-11 h-11 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all active:scale-90"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-150 gap-8">
            <div className="flex flex-col gap-1.5 text-center md:text-start">
               <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{t.title} System</span>
               <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">{t.footer}</span>
            </div>

            <div className="flex items-center gap-8 text-[11px] font-bold text-slate-600 tracking-wider">
               <Link to="/privacy" className="hover:text-indigo-600 transition-all uppercase">{t.privacy}</Link>
               <Link to="/terms" className="hover:text-indigo-600 transition-all uppercase">{t.terms}</Link>
               <Link to="/contact" className="hover:text-indigo-600 transition-all uppercase">{t.contact}</Link>
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

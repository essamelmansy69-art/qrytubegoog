import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const BlogPage = React.lazy(() => import('./components/BlogPage'));
const ContactPage = React.lazy(() => import('./components/ContactPage'));
const LegalPage = React.lazy(() => import('./components/LegalPage'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
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
  Mail,
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen
} from 'lucide-react';

type Language = 'ar' | 'en';
type Platform = 'general' | 'instagram' | 'youtube' | 'facebook' | 'tiktok';

const TRANSLATIONS = {
  ar: {
    title: 'Qrytube',
    headline: 'أداة اليوتيوبرز الأولى لتوليد أكواد QR ذكية',
    headlineColor: 'وتخطي المتصفح الداخلي مجاناً 🚀',
    trustBadge: '🌟 يثق بنا أكثر من 50,000 يوتيوبر وصانع محتوى حول العالم',
    subHeadline: 'تجنب عقبة المتصفح الداخلي المزعج لتطبيقات فيسبوك وإنستجرام وتيك توك الذي يمنع المشاهدين من تسجيل الإعجاب بالأزرار التفاعلية أو الاشتراك بقناتك على اليوتيوب. يقوم نظام Qrytube بتوجيه الجمهور فوراً إلى التطبيق الرسمي مباشرة مع دعم فرعي لكافة منصات السوشيال ميديا الأخرى.',
    
    labelPlatform: 'اختر المنصة المستهدفة',
    labelUrl: 'رابط فيديو أو قناة اليوتيوب',
    labelLogo: 'تخصيص الهوية والشعار',
    labelQrColor: 'لون كود QR',
    
    placeholderUrl: 'أدخل رابط قناة، فيديو، أو قائمة تشغيل يوتيوب...',
    
    general: 'رابط عام',
    instagram: 'Instagram',
    youtube: 'YouTube',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    
    uploadLogo: 'رفع شعار (اختياري)',
    removeLogo: 'إزالة',
    
    download: '✨ توليد الـ QR السحري الآن ✨',
    downloading: 'جاري توليد وتحميل كود الـ QR... ⚡',
    downloaded: 'تم التحميل بنجاح! 🎉',
    downloadSVG: 'تصدير بصيغة SVG',
    copy: 'نسخ الرابط الذكي',
    copied: 'تم النسخ!',
    
    errorInvalidUrl: '⚠️ الرجاء إدخال رابط يوتيوب صحيح (قناة، فيديو، أو قائمة تشغيل)!',
    
    seoTitle: 'Qrytube - كود QR لليوتيوب وتوليد روابط ذكية لزيادة المشاهدات',
    seoDescription: 'أنشئ كود QR ذكي لروابط وقنوات اليوتيوب يتخطى عقبة المتصفح الداخلي المزعج لفيسبوك وتيك توك ويفتح التطبيق الرسمي مباشرة لزيادة اشتراكاتك ومشاهداتك تلقائياً.',
    
    faqTitle: 'الأسئلة الشائعة لصناع المحتوى واليوتيوبرز 💬',
    faqItems: [
      {
        q: 'لماذا تفتح روابط اليوتيوب داخل متصفح فيسبوك وإنستجرام الداخلي؟',
        a: 'تحاول تطبيقات التواصل مثل فيسبوك وإنستجرام حظر المستخدمين داخل بيئتها عبر فتح الروابط في متصفح داخلي مدمج. هذا يمنع الزوار من التفاعل، الإعجاب، أو الاشتراك لأنهم غير مسجلين الدخول هناك. يقوم نظام Qrytube بحل هذه العقبة ونقلهم إلى تطبيق يوتيوب الرسمي فوراً.'
      },
      {
        q: 'كيف يمكن تغيير وإجبار رابط يوتيوب لفتح تطبيق يوتيوب الرسمي مباشرة؟',
        a: 'باستخدام مولد الروابط الذكية Qrytube، نقوم تلقائياً بتحويل صيغة الرابط التقليدية إلى صيغة Deep Link بروتوكولية مخصصة للأجهزة الذكية (iOS/Android). عند نقر الزائر أو مسح كود الـ QR، يتم إجبار الهاتف لفتح تطبيق يوتيوب الرسمي فوراً لضمان أفضل تجربة مع المشتركين.'
      },
      {
        q: 'هل كود الـ QR والروابط الذكية تساعد فعلاً في زيادة المشتركين؟',
        a: 'نعم، وبشكل ضخم جداً! تشير الإحصاءات إلى أن توجيه الجمهور للتطبيق الرسمي مباشرة بنقرة واحدة بدلاً من المتصفح الداخلي يرفع نسبة المشاهدات والتفاعل بمقدار 300% إلى 400%، حيث يسير الزائر في مسار طبيعي وسهل للضغط على زر الإعجاب والاشتراك بفضل حسابه المفتوح مسبقاً.'
      },
      {
        q: 'هل هذا المولد مجاني بالكامل وهل معلوماتي آمنة؟',
        a: 'نعم، الأداة مجانية 100% وبدون أي حدود للتوليد! كما أن العملية تتم بالكامل محلياً داخل متصفحك (Client-Side)، فلا يتم تخزين روابطك أو بياناتك في أي خادم خارجي لتوفير أقصى درجات الأمان والخصوصية المطلقة.'
      },
      {
        q: 'كيف يساعدني نظام Qrytube في زيادة مشاهدات واشتراكات اليوتيوب؟',
        a: 'تجنب عقبة المتصفح الداخلي المزعج لتطبيقات فيسبوك وإنستجرام وتيك توك الذي يمنع المشاهدين من تسجيل الإعجاب بالأزرار التفاعلية أو الاشتراك بقناتك على اليوتيوب. يقوم نظام Qrytube بتوجيه الجمهور فوراً إلى التطبيق الرسمي مباشرة مع دعم فرعي لكافة منصات السوشيال ميديا الأخرى.'
      }
    ],

    features: [
      {
        title: 'فتح التطبيق مباشرة',
        desc: 'تقنية الروابط العميقة (Deep Linking) تضمن فتح الرابط داخل تطبيق يوتيوب الرسمي فوراً.'
      },
      {
        title: 'زيادة التفاعل 3X',
        desc: 'تجنب مطالبة المستخدمين بتسجيل الدخول في المتصفح الداخلي، مما يرفع نسبة المشاهدات والاشتراكات بشكل ملحوظ.'
      },
      {
        title: 'كود QR لليوتيوبرز',
        desc: 'أنشئ أكواد QR متوافقة مع الطباعة الرقمية ومصممة خصيصاً لجذب جمهورك لزر الاشتراك بلمسة واحدة.'
      }
    ],
    
    howItWorksTitle: 'كيف يعمل Qrytube؟',
    steps: [
      'اختر منصة يوتيوب كخيار افتراضي أو أي منصة اجتماعية بديلة.',
      'ضع رابط الفيديو أو القناة في الصندوق المخصص.',
      'احصل فوراً على الرابط الذكي أو كود QR الجاهز للاستخدام وماركته للجمهور.'
    ],

    footer: 'نظام Qrytube لكود الـ QR السحري وعمليات التوجيه للأجهزة الذكية 2026',
    
    privacy: 'الخصوصية',
    terms: 'الشروط',
    contact: 'اتصل بنا',
    about: 'من نحن',
    
    contactForm: {
      name: 'الاسـم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      send: 'إرسال الرسالة',
      success: 'تم استلام رسالتك بنجاح.'
    },
    navArticles: 'المقالات',
    blogHeadTitle: 'منطقة نمو يوتيوب والمؤشرات 📈',
    blogSubTitle: 'دليلك الشامل لتعلم خوارزميات المنصة، أسرار التهيئة للسيو (SEO)، وحيل الروابط العميقة لزيادة تفاعل جمهورك.',
    backToBlog: 'العودة لجميع المقالات',
    readTimeLabel: 'وقت القراءة',
    pubDateLabel: 'تاريخ النشر'
  },
  en: {
    title: 'Qrytube',
    headline: 'The #1 YouTube Creator QR Code Tool',
    headlineColor: 'Bypass In-App Browsers for Free! 🚀',
    trustBadge: '🌟 Trusted by over 50,050 YouTube Creators worldwide',
    subHeadline: 'Overcome frustrating Instagram, Facebook, and TikTok back-to-app obstacles that prevent users from liking, commenting, or subscribing. Redirect viewers natively into the official YouTube app, with secondary support for all major social networks.',
    
    labelPlatform: 'Select Target Platform',
    labelUrl: 'YouTube Video or Channel Link',
    labelLogo: 'Brand Identity & Logo Customization',
    labelQrColor: 'QR Code Color',
    
    placeholderUrl: 'Enter a YouTube channel, video, or playlist link...',
    
    general: 'General Link',
    instagram: 'Instagram',
    youtube: 'YouTube',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    
    uploadLogo: 'Upload Logo (Optional)',
    removeLogo: 'Remove',
    
    download: '✨ Generate Magic QR Code Now ✨',
    downloading: 'Generating & Downloading QR Code... ⚡',
    downloaded: 'Downloaded successfully! 🎉',
    downloadSVG: 'Export as SVG',
    copy: 'Copy Smart Link',
    copied: 'Copied!',
    
    errorInvalidUrl: '⚠️ Please enter a valid YouTube link (channel, video, or playlist)!',
    
    seoTitle: 'TubeJump | Smart Deep Link & QR Code Generator for YouTube',
    seoDescription: 'Convert standard social media profiles and YouTube video links into deep routing entities that open native mobile apps instantly and boost conversions.',
    
    faqTitle: 'Frequently Asked Questions for Creators & YouTubers 💬',
    faqItems: [
      {
        q: 'Why do YouTube links open in Facebook\'s internal browser?',
        a: 'In-app browsers (like Facebook\'s or Instagram\'s) restrict users inside their ecosystem. This blocks guests from liking, commenting, or subscribing because they are not signed in on those custom browser views. Qrytube bypasses this by routing links directly to the official native YouTube app.'
      },
      {
        q: 'How can I force a YouTube link to open in the official app?',
        a: 'Through Qrytube\'s Deep Linking conversion protocol, standard URLs are transformed into device-level custom URL schemas. When clicked or scanned, the smartphone OS is forced to execute a deep route that directly launches the official mobile YouTube application.'
      },
      {
        q: 'Will this help increase my YouTube subscription rate?',
        a: 'Absolutely! Stats prove that converting cold traffic directly into signed-in native app views boosts conversions, subscriptions, and actions by 300% to 400%. Since users are already logged in to their primary accounts inside their native apps, subscribing is a seamless single click.'
      },
      {
        q: 'Can I embed my personal channel logo inside the generated QR code?',
        a: 'Yes! Our custom uploader shrinks, sanitizes, and places your dynamic logo directly at the center of the QR code. This increases scanning credibility and maintains consistent brand aesthetics without obstructing readability.'
      },
      {
        q: 'How does the Qrytube system help me increase YouTube views and subscribers?',
        a: 'Overcome frustrating Instagram, Facebook, and TikTok back-to-app obstacles that prevent users from liking, commenting, or subscribing. Redirect viewers natively into the official YouTube app, with secondary support for all major social networks.'
      }
    ],

    features: [
      {
        title: 'Instant App Launch',
        desc: 'Our Deep Linking technology ensures links open directly within the official native YouTube application.'
      },
      {
        title: '3X Growth Rate',
        desc: 'Don’t let login screens kill your subscription rates. Move users instantly to where they are already logged in.'
      },
      {
        title: 'Pro QR Generation',
        desc: 'Customizable, print-ready QR codes with your channel logo embedded to build unmatched credibility.'
      }
    ],
    
    howItWorksTitle: 'How Qrytube Works',
    steps: [
      'Choose YouTube as your default platform, or select any of our supported alternative platforms.',
      'Paste your video URL, channel link, or username into the targeted input field.',
      'Instantly download your custom deep link and a print-ready modern QR code.'
    ],

    footer: 'Qrytube Deep Routing & Smart QR-Code System 2026',
    
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    about: 'About Us',

    contactForm: {
      name: 'Full Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      success: 'Message received successfully.'
    },
    navArticles: 'Articles',
    blogHeadTitle: 'Creator Growth Lab 📈',
    blogSubTitle: 'Your ultimate tactical resource for mastering YouTube algorithms, click-through-rate optimizations, and deep linking mechanics.',
    backToBlog: 'Back to all articles',
    readTimeLabel: 'Read Time',
    pubDateLabel: 'Published'
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
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [logo, setLogo] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrColor, setQrColor] = useState('#FF0000');
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [downloadingSvg, setDownloadingSvg] = useState(false);
  const [downloadedSvg, setDownloadedSvg] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t = TRANSLATIONS[lang];

  const getPlaceholder = useCallback(() => {
    if (lang === 'ar') {
      switch (platform) {
        case 'youtube': return 'أدخل رابط قناة، فيديو، أو قائمة تشغيل يوتيوب...';
        case 'instagram': return 'مثال: https://instagram.com/profile أو اسم الحساب';
        case 'facebook': return 'مثال: https://facebook.com/page';
        case 'tiktok': return 'مثال: https://tiktok.com/@username';
        default: return '👉 ضع رابط حسابك أو قناتك هنا';
      }
    } else {
      switch (platform) {
        case 'youtube': return 'Enter a YouTube channel, video, or playlist link...';
        case 'instagram': return 'e.g., https://instagram.com/profile or username';
        case 'facebook': return 'e.g., https://facebook.com/page';
        case 'tiktok': return 'e.g., https://tiktok.com/@username';
        default: return '👉 Paste your account or channel link here';
      }
    }
  }, [lang, platform]);

  const validateInput = useCallback((val: string, plat: Platform): boolean => {
    const clean = val.trim();
    if (!clean) return false;
    
    if (plat === 'youtube') {
      if (clean.includes('.') || clean.includes('/')) {
        // Must contain youtube.com or youtu.be
        const hasYtDomain = /youtube\.com|youtu\.be/i.test(clean);
        if (!hasYtDomain) return false;
        
        // Support all YouTube URLs: watch?v=, shorts, playlists, user channels, etc.
        const ytPattern = /^(https?:\/\/)?(www\.|m\.)?(youtube\.com|youtu\.be)(\/([a-zA-Z0-9_\-\.\/\?=&@#%+]*))?$/i;
        return ytPattern.test(clean);
      }
      return /^[a-zA-Z0-9_\-\.\@]+$/.test(clean);
    }
    
    if (plat === 'general') {
      const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([a-zA-Z0-9_\-\.\/\?=&@#%+]*)*\/?$/i;
      return pattern.test(clean);
    }
    
    // For social platforms, usernames (no dot or slashes) or valid URLs are fine
    if (clean.includes('.') || clean.includes('/')) {
      const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([a-zA-Z0-9_\-\.\/\?=&@#%+]*)*\/?$/i;
      return pattern.test(clean);
    }
    
    return /^[a-zA-Z0-9_\-\.\@]+$/.test(clean);
  }, []);

  useEffect(() => {
    const clean = url.trim();
    if (clean === '') {
      setError(null);
    } else {
      const isValid = validateInput(clean, platform);
      if (!isValid) {
        setError(t.errorInvalidUrl);
      } else {
        setError(null);
      }
    }
  }, [url, platform, validateInput, t.errorInvalidUrl]);

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
        let ytUrl = clean;
        // Make sure it starts with a protocol if it's a domain so we can parse/normalize it safely
        if (!/^https?:\/\//i.test(ytUrl) && (ytUrl.includes('.') || ytUrl.includes('/'))) {
          ytUrl = 'https://' + ytUrl;
        }
        
        try {
          const urlObj = new URL(ytUrl);
          const hostname = urlObj.hostname.toLowerCase();
          
          if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
            // Check for youtu.be short URL
            if (hostname.includes('youtu.be')) {
              const videoId = urlObj.pathname.slice(1);
              const searchParams = urlObj.search;
              return `vnd.youtube://www.youtube.com/watch?v=${videoId}${searchParams ? '&' + searchParams.slice(1) : ''}`;
            }
            
            // Check for shorts URL style: /shorts/VIDEO_ID
            if (urlObj.pathname.startsWith('/shorts/')) {
              const videoId = urlObj.pathname.split('/')[2];
              return `vnd.youtube://www.youtube.com/watch?v=${videoId}`;
            }
            
            // Check for regular watch URL: /watch?v=VIDEO_ID
            if (urlObj.pathname === '/watch' && urlObj.searchParams.has('v')) {
              return `vnd.youtube://www.youtube.com${urlObj.pathname}${urlObj.search}`;
            }
            
            // For playlists, channels, etc., replace the domain with vnd.youtube://
            const pathAndQuery = urlObj.pathname + urlObj.search;
            return `vnd.youtube://www.youtube.com${pathAndQuery}`;
          }
        } catch (e) {
          // If URL parsing fails, fall back to basic string operations
          if (clean.includes('youtu.be/')) {
            const parts = clean.split('youtu.be/');
            const videoId = parts[1]?.split('?')[0] || '';
            return `vnd.youtube://www.youtube.com/watch?v=${videoId}`;
          }
          if (clean.includes('youtube.com/watch')) {
            return clean.replace(/https?:\/\/(www\.|m\.)?youtube\.com/i, 'vnd.youtube://www.youtube.com');
          }
          if (clean.includes('youtube.com/shorts/')) {
            const parts = clean.split('shorts/');
            const videoId = parts[1]?.split('?')[0] || '';
            return `vnd.youtube://www.youtube.com/watch?v=${videoId}`;
          }
          if (clean.includes('youtube.com/')) {
            return clean.replace(/https?:\/\/(www\.|m\.)?youtube\.com/i, 'vnd.youtube://www.youtube.com');
          }
        }
        
        // If it's a simple username/handle (no dots, no slashes)
        if (!clean.includes('.') && !clean.includes('/')) {
          const handle = clean.startsWith('@') ? clean : `@${clean}`;
          return `vnd.youtube://www.youtube.com/${handle}`;
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
    
    const clean = url.trim();
    if (clean !== '' && !validateInput(clean, platform)) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.fillStyle = '#fef2f2';
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.fillStyle = '#ef4444';
        
        ctx.beginPath();
        ctx.arc(500, 420, 80, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 90px Cairo, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('!', 500, 425);
        
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 44px Cairo, sans-serif';
        ctx.fillText(lang === 'ar' ? 'الرجاء إدخال اسم مستخدم أو رابط صالح' : 'Please enter a valid link or username', 500, 580);
        
        ctx.fillStyle = '#64748b';
        ctx.font = '500 32px Cairo, sans-serif';
        ctx.fillText(lang === 'ar' ? 'تأكد من اختيار المنصة الصحيحة وكتابة المدخل بدقة' : 'Double check your target platform and spelling', 500, 650);
      }
      return;
    }

    const finalUrl = getDeepLink(url || 'https://qrytube.app', platform);
    
    try {
      const tempCanvas = document.createElement('canvas');
      const qrcodeModule = await import('qrcode');
      const qrObj = qrcodeModule.default || qrcodeModule;
      await qrObj.toCanvas(tempCanvas, finalUrl, {
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

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

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

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(logoImg, x, y, logoSize, logoSize);
      }
    } catch (err) {
      console.error(err);
    }
  }, [url, platform, logo, qrColor, getDeepLink, validateInput, lang]);

  useEffect(() => {
    const timer = setTimeout(() => {
      generateQR();
    }, 200);
    return () => clearTimeout(timer);
  }, [generateQR]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const maxDim = 512; // High-resolution limits to ensure crisp icons inside 1000px canvasses and SVGs
          const canvas = document.createElement('canvas');
          let w = img.width;
          let h = img.height;
          
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          
          canvas.width = maxDim;
          canvas.height = maxDim;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.clearRect(0, 0, maxDim, maxDim);
            const x = (maxDim - w) / 2;
            const y = (maxDim - h) / 2;
            ctx.drawImage(img, x, y, w, h);
            setLogo(canvas.toDataURL('image/png', 1.0));
          } else {
            setLogo(event.target?.result as string);
          }
        };
      };
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

  const handleDownloadPNGClick = () => {
    if (!url || error) return;
    setDownloading(true);
    setDownloaded(false);
    
    downloadPNG();
    
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    }, 1200);
  };

  const downloadSVG = async () => {
    if (!url || error) return;
    setDownloadingSvg(true);
    setDownloadedSvg(false);

    const finalUrl = getDeepLink(url || 'https://qrytube.app', platform);
    try {
      const qrcodeModule = await import('qrcode');
      const qrObj = qrcodeModule.default || qrcodeModule;
      
      // Use qrcode.create to access the raw QR matrix data directly
      const qr = qrObj.create(finalUrl, { errorCorrectionLevel: 'H' });
      const { size } = qr.modules;

      // Draw all filled (dark) modules as 1x1 vector squares and concatenate them into a single path string
      let pathD = '';
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (qr.modules.get(r, c)) {
            pathD += `M${c},${r}h1v1h-1z `;
          }
        }
      }

      const margin = 1;
      const viewSize = size + margin * 2;

      // Construct native vector SVG template
      let svgContent = [
        `<?xml version="1.0" encoding="utf-8"?>`,
        `<!-- Generated by Qrytube QR Code Engine -->`,
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${viewSize} ${viewSize}" width="1000" height="1000">`,
        `  <rect width="${viewSize}" height="${viewSize}" fill="#ffffff" />`,
        `  <path d="${pathD.trim()}" fill="${qrColor}" transform="translate(${margin}, ${margin})" shape-rendering="crispEdges" />`
      ].join('\n');

      if (logo) {
        const logoRatio = 0.22; // Standard ratio (22% scale is perfect for readability)
        const logoSize = size * logoRatio;
        const logoPos = margin + (size - logoSize) / 2;
        const padding = logoSize * 0.12;
        const bgSize = logoSize + padding * 2;
        const bgPos = logoPos - padding;
        const rx = logoSize * 0.15;

        // Overlay a protective rounded backing white rect to block complex underlying structures, then embed the base64 sanitized logo
        const logoBg = `  <rect x="${bgPos.toFixed(4)}" y="${bgPos.toFixed(4)}" width="${bgSize.toFixed(4)}" height="${bgSize.toFixed(4)}" rx="${rx.toFixed(4)}" ry="${rx.toFixed(4)}" fill="#ffffff" />`;
        const logoImage = `  <image href="${logo}" xlink:href="${logo}" x="${logoPos.toFixed(4)}" y="${logoPos.toFixed(4)}" height="${logoSize.toFixed(4)}" width="${logoSize.toFixed(4)}" />`;
        
        svgContent += `\n${logoBg}\n${logoImage}`;
      }

      svgContent += `\n</svg>`;

      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const dlUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = dlUrl;
      link.download = `qrytube-vector-${platform}.svg`;
      link.click();
      URL.revokeObjectURL(dlUrl);

      setTimeout(() => {
        setDownloadingSvg(false);
        setDownloadedSvg(true);
        setTimeout(() => setDownloadedSvg(false), 2000);
      }, 1200);
    } catch (err) {
      console.error(err);
      setDownloadingSvg(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Headline Section */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {t.headline} <br />
          <span className="bg-gradient-to-r from-red-600 via-red-500 to-rose-600 bg-clip-text text-transparent text-lg md:text-2xl block mt-2 leading-tight">
            {t.headlineColor}
          </span>
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Core Generator Card */}
        <div className="bg-white border border-slate-100 shadow-custom-card p-6 md:p-8 rounded-[2rem] space-y-8 relative overflow-hidden transition-all duration-500">
          {/* Accent decoration */}
          <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full transition-all duration-700 ${
            platform === 'youtube' ? 'bg-red-500/10' :
            platform === 'instagram' ? 'bg-rose-500/10' :
            platform === 'facebook' ? 'bg-blue-500/10' :
            platform === 'tiktok' ? 'bg-slate-500/10' :
            'bg-indigo-500/10'
          }`} />
          
          <div className="space-y-8 relative z-10">
            {/* Target Platform with YouTube Emphasis */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                {t.labelPlatform}
              </span>
              
              <div className="space-y-4.5">
                {/* Primary YouTube platform spotlight card */}
                <div>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    {lang === 'ar' ? 'المنصة الأساسية والنشطة للمشاهدات' : 'Primary High-Conversion Platform'}
                  </span>
                  
                  {PLATFORMS.filter(p => p.id === 'youtube').map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setPlatform('youtube');
                        setQrColor('#FF0000');
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 relative group/btn ${
                        platform === 'youtube'
                          ? 'bg-red-50/70 border-red-300 text-red-700 shadow-sm ring-2 ring-red-500/10'
                          : 'bg-slate-50/70 border-slate-100 text-slate-700 hover:text-red-700 hover:bg-red-50/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <p.icon className={`w-5.5 h-5.5 text-red-700 transition-transform ${platform === 'youtube' ? 'scale-110 animate-pulse' : 'group-hover/btn:scale-110'}`} />
                        <span className="font-extrabold text-sm tracking-wide font-sans">YouTube Creator Focus</span>
                      </div>
                      <span className="text-[9px] font-black bg-red-700 text-white px-2.5 py-1 rounded-lg tracking-wider">
                        {lang === 'ar' ? 'الأفضل للمشاهدات والاشتراك' : 'BEST FOR VIEWS & SUBS'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Secondary/Alternative row */}
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-2 font-sans">
                    {lang === 'ar' ? 'أو اختر منصة تواصل بديلة' : 'Or Select Alternative Platform'}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {PLATFORMS.filter(p => p.id !== 'youtube').map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          const pId = p.id as Platform;
                          setPlatform(pId);
                          if (pId === 'instagram') setQrColor('#E1306C');
                          else if (pId === 'facebook') setQrColor('#1877F2');
                          else if (pId === 'tiktok') setQrColor('#000000');
                          else setQrColor('#4F46E5');
                        }}
                        aria-label={t[p.id as keyof typeof t] || p.id}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-300 relative group/btn ${
                          platform === p.id 
                            ? p.activeClass 
                            : `bg-slate-50/50 border-slate-100 ${p.brandColor} ${p.hoverClass} opacity-70 hover:opacity-100`
                        }`}
                      >
                        <p.icon className={`w-4.5 h-4.5 transition-transform duration-300 ${platform === p.id ? 'scale-110' : 'group-hover/btn:scale-110'}`} />
                        <span className="text-[9px] font-bold mt-1.5 capitalize">{t[p.id as keyof typeof t] || p.id}</span>
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
              </div>
            </div>

            {/* Source Link */}
            <div className="space-y-3">
              <label htmlFor="url-input" className="text-xs font-bold text-slate-700 uppercase tracking-widest block font-sans">
                {t.labelUrl}
              </label>
              <div className="relative">
                <input
                  id="url-input"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={getPlaceholder()}
                  className={`w-full bg-slate-5/70 border rounded-2xl p-4 px-5 outline-none focus:bg-white transition-all text-sm font-semibold focus:ring-4 duration-300 ${
                    error 
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100 placeholder:text-red-300 text-red-900 bg-red-50/10' 
                      : platform === 'youtube'
                        ? 'border-slate-200/80 focus:border-red-500 focus:ring-red-100 placeholder:text-slate-404 text-slate-800'
                        : platform === 'instagram'
                          ? 'border-slate-200/80 focus:border-rose-500 focus:ring-rose-100 placeholder:text-slate-404 text-slate-800'
                          : platform === 'facebook'
                            ? 'border-slate-200/80 focus:border-blue-500 focus:ring-blue-100 placeholder:text-slate-404 text-slate-800'
                            : platform === 'tiktok'
                              ? 'border-slate-200/80 focus:border-slate-800 focus:ring-slate-100 placeholder:text-slate-404 text-slate-800'
                              : 'border-slate-200/80 focus:border-indigo-500 focus:ring-indigo-100 placeholder:text-slate-404 text-slate-800'
                  }`}
                  dir="ltr"
                />
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-xs font-bold text-red-500 mt-1 flex items-center gap-1 leading-relaxed font-sans"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Customization Row (Logo & Custom Color) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Color Customizer */}
              <div className="space-y-3">
                <label htmlFor="qr-color-input" className="text-xs font-bold text-slate-700 uppercase tracking-widest block font-sans">
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
                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest block font-sans">
                  {t.labelLogo}
                </span>
                <div className="flex gap-2">
                  <input type="file" id="logo-upload" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  <label 
                    htmlFor="logo-upload" 
                    className="flex-grow flex items-center justify-center gap-2 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-3 text-xs font-bold hover:bg-slate-100 cursor-pointer transition-all text-slate-800 hover:border-slate-300 font-sans"
                  >
                    <Upload className="w-4 h-4 text-slate-600" />
                    <span className="truncate">{t.uploadLogo}</span>
                  </label>
                  {logo && (
                    <button 
                      type="button"
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

            {/* Magic Dynamic Action Button */}
            <div className="pt-2">
              <button
                onClick={handleDownloadPNGClick}
                disabled={!url || !!error}
                className={`w-full bg-gradient-to-r text-white py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg transition-all disabled:from-slate-150 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-3.5 group/magic relative overflow-hidden duration-300 ${
                  platform === 'youtube'
                    ? 'from-red-600 via-red-500 to-rose-600 shadow-red-500/15 hover:opacity-90'
                    : platform === 'instagram'
                      ? 'from-pink-500 via-rose-500 to-purple-600 shadow-rose-500/15 hover:opacity-90'
                      : platform === 'facebook'
                        ? 'from-blue-600 via-blue-500 to-indigo-600 shadow-blue-500/15 hover:opacity-90'
                        : platform === 'tiktok'
                          ? 'from-zinc-900 via-zinc-800 to-slate-900 shadow-slate-900/10 hover:opacity-90 border border-white/5'
                          : 'from-blue-500 via-indigo-500 to-purple-600 shadow-indigo-500/15 hover:opacity-95'
                }`}
              >
                {downloading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{t.downloading}</span>
                  </>
                ) : downloaded ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-300 animate-bounce" />
                    <span>{t.downloaded}</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>{t.download}</span>
                    <span className="group-hover/magic:translate-x-1 transition-transform">⚡</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Interactive Preview Panel */}
        <div className="bg-white border border-slate-100 shadow-custom-card p-6 md:p-8 rounded-[2rem] flex flex-col items-center justify-between min-h-[420px]">
          <div className="w-full flex justify-between items-center mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-bold bg-indigo-50 text-indigo-700 rounded-full font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              Live Preview
            </span>
            {platform !== 'general' && (
              <span className="text-xs font-bold text-slate-605 uppercase tracking-widest font-sans">
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
                disabled={!url || !!error || downloadingSvg}
                aria-label={t.downloadSVG}
                className="bg-slate-50 border border-slate-200/80 text-slate-700 hover:border-slate-300 hover:bg-slate-100 py-3 rounded-2xl font-bold text-xs uppercase tracking-wide transition-all disabled:opacity-30 active:scale-95 flex items-center justify-center gap-2 font-sans"
              >
                {downloadingSvg ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{lang === 'ar' ? 'جاري التحميل...' : 'Downloading...'}</span>
                  </>
                ) : downloadedSvg ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                    <span>{lang === 'ar' ? 'تم التحميل!' : 'Downloaded!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{t.downloadSVG}</span>
                  </>
                )}
              </button>
              <button 
                onClick={copyUrl}
                disabled={!url || !!error}
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
            <h2 className="text-base sm:text-lg font-bold text-slate-950">{f.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Free & Infinite Card like Screenshot */}
      <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] space-y-10 text-center shadow-custom-card">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
            <span className="text-4xl font-light tracking-widest leading-none select-none">∞</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            {lang === 'ar' ? 'مجاني ولانهائي 🚀' : '100% Free & Unlimited 🚀'}
          </h2>
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
          <h2 className="text-3xl font-black text-slate-900">{t.howItWorksTitle}</h2>
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

      {/* Accordion List FAQ block */}
      <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] space-y-8 shadow-custom-card">
        <h2 className="text-2xl md:text-3xl font-black text-slate-950 text-center tracking-tight">
          {t.faqTitle}
        </h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {t.faqItems.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="border border-slate-100 rounded-2xl overflow-hidden transition-all bg-slate-50/40 hover:bg-slate-50"
              >
                <button
                  type="button"
                  aria-expanded={isOpen ? "true" : "false"}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-start p-5 px-6 font-bold text-slate-800 flex items-center justify-between gap-4 select-none focus:outline-none"
                >
                  <span className="text-sm md:text-base">{item.q}</span>
                  <span className={`text-indigo-600 font-bold text-xs transition-transform duration-350 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white font-medium">
                    {item.a}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MainLayout() {
  const [lang, setLang] = useState<Language>(() => {
    // 1. URL parameter takes highest precedence
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam === 'en' || langParam === 'ar') {
      localStorage.setItem('qrytube_lang', langParam);
      return langParam as Language;
    }

    // 2. LocalStorage remembers user manual selection
    const savedLang = localStorage.getItem('qrytube_lang');
    if (savedLang === 'en' || savedLang === 'ar') {
      return savedLang as Language;
    }

    // 3. Document cookies (e.g. set by Cloudflare Workers based on geolocation/Accept-Language header)
    try {
      const getCookie = (name: string) => {
        const matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      };
      const cookieLang = getCookie('lang') || getCookie('cf_lang') || getCookie('locale');
      if (cookieLang === 'en' || cookieLang === 'ar') {
        return cookieLang as Language;
      }
    } catch (e) {
      console.warn("Unable to read cookies:", e);
    }

    // 4. Robust auto-detect from browser/system preferred languages list
    try {
      const systemLangs = navigator.languages || [];
      const primaryLang = navigator.language || '';
      
      // Combine all languages and check if any start with 'ar' (Arabic)
      const allDetectedLangs = [primaryLang, ...systemLangs].filter(Boolean);
      const isArabicPreferred = allDetectedLangs.some(l => l.toLowerCase().startsWith('ar'));
      
      if (isArabicPreferred) {
        return 'ar';
      }
    } catch (e) {
      console.warn("Language auto-detection error:", e);
    }

    return 'en';
  });
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const langParam = params.get('lang');
    if (langParam === 'en' || langParam === 'ar') {
      setLang(langParam as Language);
      localStorage.setItem('qrytube_lang', langParam);
    }
  }, [location.search]);

  useEffect(() => {
    localStorage.setItem('qrytube_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = lang === 'ar'
      ? 'Qrytube - كود QR لليوتيوب وتوليد روابط ذكية لزيادة المشاهدات'
      : 'Qrytube - YouTube QR Code & Smart Link Generator to Boost Views';
  }, [lang]);

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex flex-col gradient-bg" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Trending Banner */}
      <div className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 py-3 px-4 text-center text-white text-xs md:text-sm font-bold tracking-tight select-none">
        {lang === 'ar' ? '🔥 تريند: الأداة رقم 1 لنمو المتابعين في 2026' : '🔥 Trending: The #1 follower growth tool in 2026'}
      </div>

      <header className="px-6 py-4 bg-white/85 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Language selector pill on left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              aria-label={lang === 'ar' ? "Change language to English" : "تغيير اللغة إلى الإنجليزية"}
              className="group/lang text-xs font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-full shadow-sm hover:bg-slate-50 transition-all font-sans cursor-pointer whitespace-nowrap"
            >
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
              <Globe className="w-3.5 h-3.5 text-indigo-500 group-hover/lang:rotate-180 transition-transform duration-700" />
            </button>
          </div>

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
            <React.Suspense fallback={
              <div className="w-full min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <Routes location={location}>
                <Route path="/" element={<HomeContent lang={lang} />} />
                <Route path="/about" element={<AboutPage lang={lang} />} />
                <Route path="/blog" element={<BlogPage lang={lang} />} />
                <Route path="/privacy" element={<LegalPage lang={lang} type="privacy" />} />
                <Route path="/terms" element={<LegalPage lang={lang} type="terms" />} />
                <Route path="/contact" element={<ContactPage lang={lang} />} />
              </Routes>
            </React.Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-slate-100 mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6 text-[11px] font-bold text-slate-700 tracking-wider flex-wrap justify-center">
               <Link to="/about" className="hover:text-indigo-600 transition-all uppercase">{t.about}</Link>
               <Link to="/blog" className="hover:text-indigo-600 transition-all uppercase">{t.navArticles}</Link>
               <Link to="/privacy" className="hover:text-indigo-600 transition-all uppercase">{t.privacy}</Link>
               <Link to="/terms" className="hover:text-indigo-600 transition-all uppercase">{t.terms}</Link>
               <Link to="/contact" className="hover:text-indigo-600 transition-all uppercase">{t.contact}</Link>
            </div>

            <p className="text-xs font-semibold text-slate-600 font-sans tracking-wide">
              © 2026 Qrytube. All rights reserved.
            </p>
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

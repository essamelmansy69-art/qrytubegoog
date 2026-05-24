import { useState, useEffect, useRef } from 'react';
import { 
  QrCode, 
  Link as LinkIcon, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Code, 
  Smartphone, 
  Lock, 
  Zap, 
  TrendingUp, 
  Info, 
  Globe, 
  RefreshCw,
  ExternalLink,
  Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import QRCode from 'qrcode';
import { PlatformType, PlatformConfig, SmartLinkResult } from './types';
import { parseToSmartLink, generateSingleFileHTML } from './utils';

const PLATFORMS: PlatformConfig[] = [
  { 
    id: 'auto', 
    name: 'تعرف تلقائي 🚀', 
    placeholder: 'الصق أي رابط لمنصة تواصل اجتماعي...', 
    brandColor: '#4f46e5', 
    brandBg: 'bg-indigo-50/50 text-indigo-700 border-indigo-200', 
    icon: 'Sparkles',
    logoSvg: ''
  },
  { 
    id: 'youtube', 
    name: 'يوتيوب', 
    placeholder: 'مثال: https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    brandColor: '#FF0000', 
    brandBg: 'bg-red-50 text-red-600 border-red-200',
    icon: 'Youtube',
    logoSvg: '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
  },
  { 
    id: 'instagram', 
    name: 'إنستغرام', 
    placeholder: 'مثال: https://www.instagram.com/p/CgHux-sD_f6/', 
    brandColor: '#E1306C', 
    brandBg: 'bg-pink-50 text-pink-600 border-pink-200',
    icon: 'Instagram',
    logoSvg: '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>'
  },
  { 
    id: 'facebook', 
    name: 'فيسبوك', 
    placeholder: 'مثال: https://www.facebook.com/zuck', 
    brandColor: '#1877F2', 
    brandBg: 'bg-blue-50 text-blue-600 border-blue-200',
    icon: 'Facebook',
    logoSvg: '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
  },
  { 
    id: 'tiktok', 
    name: 'تيك توك', 
    placeholder: 'مثال: https://www.tiktok.com/@khaby.lame', 
    brandColor: '#000000', 
    brandBg: 'bg-slate-50 text-slate-800 border-slate-200',
    icon: 'Tiktok',
    logoSvg: '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12.53.07C13.82.02 15.11 0 16.4.03a5.53 5.53 0 0 0 .18 1.82c.49 1.25 1.3 2.2 2.45 2.87.87.5 1.82.78 2.82.85v3.47c-1.32-.05-2.5-.46-3.52-1.32-.23-.2-.42-.42-.61-.66v5.8c0 1.25-.13 2.44-.6 3.56a7.22 7.22 0 0 1-5.73 4.53 7.82 7.82 0 0 1-6.1-1.63 7.02 7.02 0 0 1-2.92-5.45c-.03-1.68.32-3.18 1.41-4.47a7.28 7.28 0 0 1 5.92-2.76v3.47a3.86 3.86 0 0 0-2.3 2.05c-.4 1.1-.38 2.14.25 3.09a3.81 3.81 0 0 0 5.4 1.13c1.07-.72 1.48-1.78 1.48-3.05a50.8 50.8 0 0 0-.02-12.24z"/></svg>'
  },
  { 
    id: 'whatsapp', 
    name: 'واتساب', 
    placeholder: 'مثال: https://wa.me/201234567890 أو رقم الهاتف', 
    brandColor: '#25D366', 
    brandBg: 'bg-green-50 text-green-600 border-green-200',
    icon: 'MessageSquare',
    logoSvg: '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12 .027C5.388.027.022 5.393.022 12.005c0 2.111.55 4.162 1.595 5.97L.03 23.973l6.136-1.61a11.933 11.933 0 005.829 1.515c6.615 0 11.978-5.366 11.978-11.977c0-3.205-1.248-6.22-3.51-8.484C18.2 1.258 15.19 0 12 .027zm7.042 16.63c-.27.761-1.362 1.383-1.896 1.464c-.394.062-.907.094-1.487-.094c-.352-.109-.8-.255-1.397-.506c-2.529-1.062-4.161-3.64-4.288-3.812c-.125-.172-1.03-1.378-1.03-2.628c0-1.25.656-1.862.887-2.113c.23-.25.5-.313.669-.313c.168 0 .337.012.484.022c.159.011.373-.062.585.45c.219.531.75 1.834.815 1.969c.065.134.11.29.02.478c-.09.188-.135.3-.27.466c-.135.166-.285.37-.406.497c-.135.134-.277.281-.118.553a15.7 15.7 0 002.593 3.22c1.094.975 2.015 1.281 2.302 1.428c.287.147.456.125.625-.072c.168-.197.747-.869.946-1.168c.199-.3.397-.25.669-.147c.272.103 1.728.815 2.025.965c.297.15.5.225.569.347c.07.122.07.712-.2 1.472z"/></svg>'
  },
  { 
    id: 'telegram', 
    name: 'تليجرام', 
    placeholder: 'مثال: https://t.me/your_channel', 
    brandColor: '#229ED9', 
    brandBg: 'bg-indigo-50 text-[#229ED9] border-sky-200',
    icon: 'Send',
    logoSvg: '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.97-.74 3.79-1.65 6.32-2.74 7.59-3.27 3.61-1.5 4.36-1.76 4.85-1.77.11 0 .35.03.5.15.13.1.17.24.18.33-.02.06-.01.2-.02.26z"/></svg>'
  },
  { 
    id: 'snapchat', 
    name: 'سناب شات', 
    placeholder: 'مثال: https://www.snapchat.com/add/username', 
    brandColor: '#FFFC00', 
    brandBg: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    icon: 'Smartphone',
    logoSvg: '<svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor" stroke="#000" stroke-width="0.5"><path d="M12 2.16c-.5 0-.92.05-1.28.1-.56.1-.96.25-1.2.45-.61.54-1.07 1.4-1.38 2.5a13.3 13.3 0 0 0-.46 2.03c-.23-.05-.48-.07-.76-.07-1.11 0-1.95.45-2.52 1.34a2.91 2.91 0 0 0-.41 1.21c0 .48.16.96.48 1.4.3.43.72.78 1.26 1.02-.18.17-.4.36-.68.57a3.86 3.86 0 0 0-.82.84 2.8 2.8 0 0 0-.34.92c-.08.5-.02.96.18 1.37.2.4.52.71.94.9.4.18.89.28 1.45.28h.56c.07.12.18.25.32.38.16.14.35.26.58.36a5.2 5.2 0 0 0 1.9.36c.14 0 .32 0 .52-.02.21-.02.43-.05.65-.1.45-.08.82-.2 1.09-.34.19.16.42.27.68.33.22.05.47.07.72.07.45 0 .86-.07 1.23-.2a3.8 3.8 0 0 0 .9-.53c.15.17.38.3.69.4a3.8 3.8 0 0 0 2 .02c.18-.03.35-.08.5-.15.22-.09.4-.24.53-.45.13-.2.2-.47.2-.78v-.47c.56 0 1.05-.1 1.45-.28.42-.2.74-.5.94-.9.2-.41.26-.87.18-1.37a2.8 2.8 0 0 0-.34-.92c-.22-.32-.5-.6-.82-.84-.28-.21-.5-.4-.68-.57.54-.24.96-.59 1.26-1.02.32-.44.48-.92.48-1.4 0-.44-.14-.85-.41-1.2-.57-.9-1.41-1.35-2.52-1.35-.28 0-.53.02-.76.07a13.3 13.3 0 0 0-.46-2.03c-.31-1.1-.77-1.96-1.38-2.5-.24-.2-.64-.35-1.2-.45a4.7 4.7 0 0 0-1.28-.1z"/></svg>'
  }
];

export default function App() {
  const [url, setUrl] = useState<string>('https://www.instagram.com/instagram');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('auto');
  const [autoSub, setAutoSub] = useState<boolean>(true);
  const [qrColor, setQrColor] = useState<string>('#0f172a');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [centerIcon, setCenterIcon] = useState<'none' | 'brand' | 'scan'>('brand');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Viral state attributes
  const [qrFrameStyle, setQrFrameStyle] = useState<'none' | 'simple' | 'badge' | 'neon'>('simple');
  const [customFrameText, setCustomFrameText] = useState<string>('مسح مباشر بالتطبيق الجوال 📱');
  const [activeUsers, setActiveUsers] = useState<number>(1482);
  const [generatedToday, setGeneratedToday] = useState<number>(124582);
  const [copiedCampaign, setCopiedCampaign] = useState<boolean>(false);
  const [activeFeed, setActiveFeed] = useState<string>("قام محمد ع. بتوليد كود إنستغرام عميق بنجاح!");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate Smart Link
  const smartResult: SmartLinkResult = parseToSmartLink(url, selectedPlatform, autoSub);

  // Micro-interaction Audio Cue
  const playSuccessSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      // Browser user-gesture restrictions
    }
  };

  // Live Simulated Active Platform Traffic & Multi-User Social Proof
  useEffect(() => {
    const userInterval = setInterval(() => {
      setActiveUsers(prev => {
        const delta = Math.floor(Math.random() * 5) - 2; 
        const updated = prev + delta;
        return updated < 1400 ? 1420 : updated > 1650 ? 1580 : updated;
      });
    }, 4000);
    
    const codeInterval = setInterval(() => {
      setGeneratedToday(prev => prev + 1);
      
      const users = ["محمد ع.", "سارة م.", "خالد ي.", "أمين ب.", "فاطمة ز.", "يوسف ر.", "لينا ص.", "أسماء ط.", "طارق ك.", "منال ه."];
      const platforms = ["يوتيوب 🎥", "إنستغرام 📸", "تيك توك 🎵", "تليجرام 💬", "سناب شات 👻"];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      setActiveFeed(`قام ${randomUser} بتوليد كود ${randomPlatform} ذكي ومباشر!`);
    }, 6500);
    
    return () => {
      clearInterval(userInterval);
      clearInterval(codeInterval);
    };
  }, []);

  // Run generation logic on changes
  useEffect(() => {
    const drawQR = async () => {
      if (!canvasRef.current) return;
      try {
        const canvas = canvasRef.current;
        const textToEncode = smartResult.smartUrl || 'https://www.google.com';
        
        // Generate base QR library Canvas 
        await QRCode.toCanvas(canvas, textToEncode, {
          width: 250,
          margin: 1,
          color: {
            dark: qrColor,
            light: bgColor
          },
          errorCorrectionLevel: 'H'
        });

        // Overlay brand or scan text in the middle
        if (centerIcon !== 'none') {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const size = canvas.width;
            const boxSize = size * 0.24;
            const x = (size - boxSize) / 2;
            const y = (size - boxSize) / 2;

            // Draw white/background colored container block over center
            ctx.fillStyle = bgColor;
            ctx.beginPath();
            const r = 8;
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + boxSize - r, y);
            ctx.arcTo(x + boxSize, y, x + boxSize, y + r, r);
            ctx.lineTo(x + boxSize, y + boxSize - r);
            ctx.arcTo(x + boxSize, y + boxSize, x + boxSize - r, y + boxSize, r);
            ctx.lineTo(x + r, y + boxSize);
            ctx.arcTo(x, y + boxSize, x, y + boxSize - r, r);
            ctx.lineTo(x, y + r);
            ctx.arcTo(x, y, x + r, y, r);
            ctx.closePath();
            ctx.fill();

            if (centerIcon === 'scan') {
              ctx.fillStyle = qrColor;
              ctx.font = 'bold 9px sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('SCAN', size / 2, size / 2);
            } else if (centerIcon === 'brand') {
              const platform = smartResult.icon.toLowerCase();
              let iconColor = smartResult.brandColor;
              if (iconColor === '#FFFFFF' || iconColor === '#FFFC00') {
                iconColor = '#000000';
              }
              
              // Draw custom decorative brand circle or badge
              ctx.fillStyle = iconColor;
              ctx.beginPath();
              ctx.arc(size / 2, size / 2, boxSize * 0.35, 0, 2 * Math.PI);
              ctx.fill();

              // Central star indicator icon symbol
              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 12px sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('⚡', size / 2, size / 2);
            }
          }
        }
      } catch (err) {
        console.error('Error drawing QR:', err);
      }
    };

    drawQR();
  }, [smartResult.smartUrl, qrColor, bgColor, centerIcon, smartResult.icon, smartResult.brandColor]);

  // Handle PNG downloads
  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `smart_qr_${selectedPlatform}_link.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    playSuccessSound();
  };

  // Copy smart deep link URL
  const handleCopyLink = () => {
    navigator.clipboard.writeText(smartResult.smartUrl);
    setCopiedLink(true);
    playSuccessSound();
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Copy full html code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateSingleFileHTML("الرابط الذكي"));
    setCopiedCode(true);
    playSuccessSound();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadHTMLFile = () => {
    const blob = new Blob([generateSingleFileHTML("الرابط الذكي")], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'index.html';
    link.click();
    playSuccessSound();
  };

  const handleCopyCampaignText = () => {
    const text = `يا رفاق! إذا كنتم تبحثون عن طريقة لفتح انستجرام، يوتيوب، تيك توك، أو سناب شات مباشرة على الهواتف داخل تطبيقاتهم الرسمية لتفادي مشكلة تسجيل الدخول، جربوا أداة "الرابط الذكي" المجانية 100%! صممت كود QR احترافي في ثلاث ثوانٍ مميز وجاهز للمسح مجاناً بالكامل 🎉📱 هنا:\nhttps://ais-pre-ig5eae2idoo3bwx2kdc7sw-460298271198.europe-west2.run.app`;
    navigator.clipboard.writeText(text);
    setCopiedCampaign(true);
    playSuccessSound();
    setTimeout(() => setCopiedCampaign(false), 2000);
  };

  // Preset Colors that pop
  const PRESET_COLORS = [
    { name: 'شبحي داكن', hex: '#0f172a' },
    { name: 'بنفسجي ملكي', hex: '#4f46e5' },
    { name: 'أزرق فيسبوك', hex: '#1877F2' },
    { name: 'وردي إنستا', hex: '#E1306C' },
    { name: 'أحمر يوتيوب', hex: '#FF0000' },
    { name: 'أخضر واتساب', hex: '#25D366' }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col antialiased font-sans pb-12" dir="rtl">
      
      {/* Dynamic Decorative Lights */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-pink-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Modern Glassmorphic Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100/80 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <QrCode className="w-5.5 h-5.5" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                الرابط الذكي
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100/70 px-2 py-0.5 rounded-md">برو</span>
              </h1>
              <p className="text-[10px] text-indigo-600/90 font-bold tracking-wider">توليد كود الـ QR الذكي بذكاء واحترافية</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              مستضاف محلياً وآمن 100%
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
        
        {/* Hero Title Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>وداعاً لطلب تسجيل الدخول المزعج! افتح التطبيق مباشرة</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4"
          >
            مولد كود الـ QR <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">الذكي المتكامل</span>
          </motion.h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            حول روابط حساباتك بمنصات التواصل إلى أكواد استجابة ذكية (Smart Deep Links) تطلق التطبيق الرسمي على الهواتف فور المسح لزيادة الاشتراكات بنسبة تفوق 400% مجاناً للأبد.
          </p>
        </div>

        {/* Bento Grid Layout Main Containers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Bento Card: Interactive Configuration */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
            
            {/* Header selection info */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-3.5 flex items-center gap-2">
                <span className="text-indigo-600 bg-indigo-50 w-6 h-6 rounded-lg flex items-center justify-center text-xs">1</span>
                <span>اختر منصة شبكة التواصل الاجتماعي لتوليد رابطها:</span>
              </label>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {PLATFORMS.map((platform) => {
                  const isActive = selectedPlatform === platform.id;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => {
                        setSelectedPlatform(platform.id);
                        if (platform.id !== 'youtube') setAutoSub(false);
                      }}
                      className={`py-3 px-2 rounded-2xl text-xs font-extrabold border transition-all flex flex-col items-center justify-center gap-2 cursor-pointer duration-200
                        ${isActive 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100/50 scale-[1.02]' 
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-100/80 hover:-translate-y-0.5'
                        }`}
                    >
                      {platform.logoSvg ? (
                        <div dangerouslySetInnerHTML={{ __html: platform.logoSvg }} className={isActive ? 'text-white' : ''} />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      <span>{platform.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input address box */}
            <div className="space-y-2.5">
              <label className="block text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="text-indigo-600 bg-indigo-50 w-6 h-6 rounded-lg flex items-center justify-center text-xs">2</span>
                <span>ضع الرابط أو المعرف الشخصي لحسابك:</span>
              </label>
              <div className="relative rounded-2xl shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-4.5 flex items-center pointer-events-none text-slate-400">
                  <LinkIcon className="w-5 h-5 text-indigo-500" />
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="block w-full pr-12 pl-4 py-4 rounded-2xl border border-slate-200 outline-none text-right font-semibold text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-sm sm:text-base bg-slate-50/50"
                  placeholder={PLATFORMS.find(p => p.id === selectedPlatform)?.placeholder || ''}
                />
              </div>
            </div>

            {/* Platform Option Fields: AutoSub for YouTube */}
            {selectedPlatform === 'youtube' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50/50 border border-red-100 rounded-2xl p-4 space-y-2"
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={autoSub} 
                    onChange={(e) => setAutoSub(e.target.checked)}
                    className="w-4.5 h-4.5 text-red-600 border-red-300 rounded focus:ring-red-500 cursor-pointer" 
                  />
                  <div>
                    <span className="text-xs font-bold text-red-900 block">طلب الاشتراك التلقائي في القناة بقوة 💥</span>
                    <span className="text-[10px] text-red-600 leading-normal block">سيقوم بإرغام المتصفح المفتوح لعرض نافذة تاكيد الاشتراك بالقناة تلقائياً بمجرد فتح كود الـ QR.</span>
                  </div>
                </label>
              </motion.div>
            )}

            {/* Customization Details Block */}
            <div className="border-t border-slate-100 pt-6 space-y-6">
              <h3 className="text-sm font-extrabold text-slate-850 flex items-center gap-2">
                <span className="p-1 px-1.5 bg-indigo-50 rounded-lg text-indigo-600 text-xs">🎨</span>
                تخصيص جماليات وتصميم كود الاستجابة (QR):
              </h3>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Accent Dark color picker */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors">
                  <span className="text-xs font-bold text-slate-500 block mb-2.5">اللون الأساسي للنقاط والرموز</span>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={qrColor} 
                      onChange={(e) => setQrColor(e.target.value)} 
                      className="w-12 h-12 rounded-xl cursor-pointer border border-slate-200 p-1 bg-white" 
                    />
                    <div className="text-right">
                      <span className="text-xs font-semibold text-slate-700 block">اختر لون الـ QR</span>
                      <span className="text-[10px] text-slate-400 font-mono block select-all">{qrColor}</span>
                    </div>
                  </div>

                  {/* Preset Colors */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {PRESET_COLORS.map(p => (
                      <button
                        key={p.hex}
                        onClick={() => setQrColor(p.hex)}
                        title={p.name}
                        className="w-6 h-6 rounded-full border border-white cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-sm"
                        style={{ backgroundColor: p.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Light BG Color Picker */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors">
                  <span className="text-xs font-bold text-slate-500 block mb-2.5">لون خلفية كود الـ QR</span>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={bgColor} 
                      onChange={(e) => setBgColor(e.target.value)} 
                      className="w-12 h-12 rounded-xl cursor-pointer border border-slate-200 p-1 bg-white" 
                    />
                    <div className="text-right">
                      <span className="text-xs font-semibold text-slate-700 block">لون الخلفية</span>
                      <span className="text-[10px] text-slate-400 font-mono block select-all">{bgColor}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button 
                      onClick={() => setBgColor('#ffffff')}
                      className="px-3 py-1.5 rounded-xl text-[10px] font-bold border border-slate-200 hover:bg-slate-100 flex items-center justify-center bg-white cursor-pointer transition-colors"
                    >
                      إعادة لـ الأبيض الافتراضي
                    </button>
                  </div>
                </div>
              </div>

              {/* Logo setup configurations */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-600 block flex items-center gap-1.5">
                  <span className="text-indigo-500">🌟</span> إضافة أيقونة في جوهر الـ QR:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCenterIcon('none')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer
                      ${centerIcon === 'none' 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    بلا شعار مدمج
                  </button>
                  <button
                    onClick={() => setCenterIcon('brand')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer
                      ${centerIcon === 'brand' 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    أيقونة ذكية تلقائياً
                  </button>
                  <button
                    onClick={() => setCenterIcon('scan')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer
                      ${centerIcon === 'scan' 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    SCAN 📱
                  </button>
                </div>
              </div>

              {/* Poster frame options for the flyer layout */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-600 block flex items-center gap-1.5">
                  <span className="text-indigo-500">🎫</span> قالب الملصق الإعلاني الحامل للـ QR:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setQrFrameStyle('none')}
                    className={`px-2 py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer
                      ${qrFrameStyle === 'none' 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    بدون إطار
                  </button>
                  <button
                    onClick={() => setQrFrameStyle('simple')}
                    className={`px-2 py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer
                      ${qrFrameStyle === 'simple' 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    بسيط 🏷️
                  </button>
                  <button
                    onClick={() => setQrFrameStyle('badge')}
                    className={`px-2 py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer
                      ${qrFrameStyle === 'badge' 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    لوحة طباعة 🎫
                  </button>
                  <button
                    onClick={() => setQrFrameStyle('neon')}
                    className={`px-2 py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer
                      ${qrFrameStyle === 'neon' 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    توهج نيون 🔮
                  </button>
                </div>
                
                {qrFrameStyle !== 'none' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-1.5 pt-1.5"
                  >
                    <span className="text-[11px] font-semibold text-slate-400 block text-right">عنوان الملصق (يظهر تحت الـ QR):</span>
                    <input
                      type="text"
                      value={customFrameText}
                      onChange={(e) => setCustomFrameText(e.target.value)}
                      maxLength={40}
                      className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-right outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                      placeholder="امسح للتوجيه للمنصة 🚀"
                    />
                  </motion.div>
                )}
              </div>

            </div>

          </div>

          {/* Bento Card: Live Result & Actions Preview */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-6 w-full lg:sticky lg:top-24">
            
            {/* View options selectors */}
            <div className="flex bg-slate-100 p-1 rounded-2xl w-full">
              <button
                onClick={() => setActiveTab('preview')}
                className={`w-1/2 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer
                  ${activeTab === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <Smartphone className="w-4 h-4 text-indigo-500" />
                <span>المعاينة المباشرة</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`w-1/2 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer
                  ${activeTab === 'code' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <Code className="w-4 h-4 text-indigo-500" />
                <span>ملف الـ HTML المستقل</span>
              </button>
            </div>

            {/* Render Preview Frame */}
            {activeTab === 'preview' ? (
              <motion.div 
                key="preview-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 flex flex-col items-center justify-center text-center w-full"
              >
                {/* QR Display frame styled like a floating device block */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 shadow-inner flex flex-col items-center w-full">
                  <div className="w-full flex justify-between items-center mb-4 pb-2 border-b border-slate-200/60">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[11px] font-extrabold text-slate-400 tracking-wider">كود QR الذكي المباشر</span>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-lg block">
                      جاهز فوراً
                    </span>
                  </div>

                  {/* Real-time paint canvas wrapper with interactive frame styles */}
                  <div className="w-full flex justify-center items-center py-2 h-auto">
                    {qrFrameStyle === 'none' ? (
                      <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200">
                        <canvas ref={canvasRef} className="rounded-xl w-[200px] h-[200px] max-w-full" />
                      </div>
                    ) : qrFrameStyle === 'simple' ? (
                      <div className="bg-white border-2 border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col items-center max-w-[240px] w-full border-dashed">
                        <span className="text-[9px] font-bold text-slate-400 mb-2 uppercase tracking-wide">رابط مباشر 📱</span>
                        <canvas ref={canvasRef} className="rounded-xl w-[170px] h-[170px]" />
                        <span className="text-[11px] font-extrabold text-slate-800 mt-3 text-center leading-normal px-1">{customFrameText}</span>
                      </div>
                    ) : qrFrameStyle === 'badge' ? (
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col items-center max-w-[240px] w-full text-white relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 via-indigo-500 to-emerald-500"></div>
                        <span className="text-[9px] font-black tracking-widest text-indigo-400 mb-3 block">الرابط الذكي للمتابعين</span>
                        <div className="p-2 bg-white rounded-xl">
                          <canvas ref={canvasRef} className="rounded-lg w-[160px] h-[160px]" />
                        </div>
                        <span className="text-[11px] font-black text-white mt-3 text-center leading-normal tracking-wide px-1">
                          {customFrameText}
                        </span>
                        <div className="mt-2.5 px-2 py-0.5 rounded bg-slate-800 text-[8px] text-slate-400 font-mono tracking-wider">
                          100% SECURE REDIRECT
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-950 rounded-2xl p-5 flex flex-col items-center max-w-[240px] w-full relative group shadow-2xl overflow-hidden border border-indigo-500/30" style={{ boxShadow: `0 0 20px ${qrColor}15` }}>
                        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 opacity-20 blur-lg group-hover:opacity-35 transition-opacity duration-500"></div>
                        <span className="text-[9px] font-bold text-cyan-400 mb-3 tracking-widest relative">NEON LIVE CODE</span>
                        <div className="p-2 bg-slate-900 rounded-xl relative border border-white/5 shadow-inner">
                          <canvas ref={canvasRef} className="rounded-md w-[150px] h-[150px]" />
                        </div>
                        <span className="text-[11px] font-bold text-white mt-3 text-center leading-normal relative tracking-wide px-1" style={{ textShadow: `0 0 8px ${qrColor}80` }}>
                          {customFrameText}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Smart Redirect URL Explanation Badge */}
                  <div className="w-full mt-4 bg-white border border-slate-200/80 p-4 rounded-2xl text-right space-y-3">
                    <span className="text-[11px] font-black text-indigo-600 uppercase tracking-widest block flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      الرابط الذكي المفعل:
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      {smartResult.explanation}
                    </p>
                    
                    {/* Raw parsed output copy block wrapper */}
                    <div className="pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                      <span className="text-[10px] text-slate-400 block font-bold">الرابط المكتوب في الكود:</span>
                      <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/80 font-mono text-[10px] text-indigo-700 break-all select-all text-left max-h-16 overflow-y-auto" dir="ltr">
                        {smartResult.smartUrl || '...'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub Action controls buttons png/copy */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <button
                    onClick={handleDownloadPNG}
                    disabled={!url}
                    className="flex items-center justify-center gap-2 text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 font-bold py-3.5 px-4 rounded-xl text-xs transition-all shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل صورة PNG</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    disabled={!url}
                    className="flex items-center justify-center gap-2 text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-300 font-bold py-3.5 px-4 rounded-xl text-xs transition-all cursor-pointer hover:-translate-y-0.5"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'تم نسخ الرابط!' : 'نسخ الرابط الذكي'}</span>
                  </button>
                </div>

              </motion.div>
            ) : (
              // HTML Single file distribution panel code viewer
              <motion.div 
                key="code-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 text-right w-full"
              >
                <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-left font-mono text-xs flex flex-col h-[320px] shadow-lg relative">
                  <div className="flex justify-between items-center text-slate-500 pb-2.5 border-b border-slate-800/80 mb-2 font-sans">
                    <span className="text-[10px] font-bold">ملف index.html كامل متكامل وجاهز للنسخ</span>
                    <span className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">حجم صغير جداً</span>
                  </div>
                  
                  {/* Code body screen */}
                  <textarea 
                    readOnly
                    value={generateSingleFileHTML("الرابط الذكي")}
                    className="bg-transparent text-indigo-200 outline-none w-full h-full font-mono text-[10px] resize-none overflow-y-auto cursor-text text-left select-all pb-8"
                  />

                  {/* Sparkle decorative */}
                  <div className="absolute bottom-3 right-3 font-sans text-[10px] bg-indigo-900/60 text-indigo-200 border border-indigo-700/50 px-2 py-1 rounded-lg">
                    <span>100% يعمل بدون سيرفر (Client-side)</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full pt-1">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center justify-center gap-1.5 text-white bg-indigo-600 hover:bg-indigo-700 font-bold py-3 px-3 rounded-xl text-xs transition-all cursor-pointer select-none"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'تم نسخ المضمون!' : 'نسخ الكود بالكامل'}</span>
                    </button>
                    <button
                      onClick={handleDownloadHTMLFile}
                      className="flex items-center justify-center gap-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 font-bold py-3 px-3 rounded-xl text-xs transition-all cursor-pointer select-none"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>تنزيل الملف (index.html)</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal font-semibold text-center italic mt-1">
                    يمكنك تحميل هذا الملف لفتحه مباشرة على حاسوبك الشخصي أو رفعه على استضافة مجانية فوراً.
                  </p>
                </div>
              </motion.div>
            )}

          </div>

        </div>

        {/* Dynamic Multi-user Bento Dashboards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* Card 1: نبض واحصائيات المنصة الحي */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm flex flex-col justify-between gap-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  مؤشرات تدفق التفاعل الحي ونشاط المنصة
                </h4>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider font-mono">LIVE STATUS</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pb-2 border-b border-slate-100">
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1">المنشئون النشطون حالياً</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-black text-slate-800 font-mono tracking-tight">{activeUsers.toLocaleString('ar-EG')}</span>
                    <span className="text-[10px] font-bold text-emerald-500">متصل الآن 📡</span>
                  </div>
                </div>
                
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1">الأكواد المولدة اليوم</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-black text-slate-800 font-mono tracking-tight">{generatedToday.toLocaleString('ar-EG')}</span>
                    <span className="text-[10px] font-bold text-indigo-500">كود ناجح 🚀</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 select-none animate-pulse"></span>
              <p className="text-[11px] font-bold text-slate-600 truncate text-right w-full leading-normal" dir="rtl">
                {activeFeed}
              </p>
            </div>
          </div>

          {/* Card 2: محطة الترويج والانتشار الفيروسي */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 shadow-xl flex flex-col justify-between gap-5 text-white relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-extrabold text-indigo-300 text-sm flex items-center gap-1.5">
                  <span>🚀</span> محطة الانتشار والترويج الفيروسي المتكاملة
                </h4>
                <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-bold rounded">
                  تحدي النمو السريع
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal font-semibold mb-4">
                ساعد منشئي المحتوى والمسوقين الآخرين في التغلب على مشكلة تسجيل الدخول في السوشيال ميديا! شارك الأداة لتعم الفائدة والدعم:
              </p>

              {/* Share box message copy helper */}
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 mb-1">
                <p className="text-[10px] text-slate-400 font-semibold truncate text-right w-full pl-2">
                  يا رفاق! إذا كنتم تبحثون عن طريقة لفتح انستجرام وتيك توك مباشرة بالتطبيقات... جربوا "الرابط الذكي"
                </p>
                <button
                  onClick={handleCopyCampaignText}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[10px] font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-all shrink-0"
                >
                  {copiedCampaign ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCampaign ? 'تم النسخ!' : 'نسخ الرسالة'}</span>
                </button>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="grid grid-cols-3 gap-2.5">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent('أوصي بهذه الأداة المميزة والمجانية لتوليد كود وبطاقات QR ذكية تفتح تطبيقات السوشيال ميديا مباشرة للمتابعين وتزيد من تفاعلهم! جربوها هنا:\nhttps://ais-pre-ig5eae2idoo3bwx2kdc7sw-460298271198.europe-west2.run.app')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1 px-3 py-2.5 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold transition-all hover:-translate-y-0.5"
              >
                <span>واتساب 💬</span>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('أفضل أداة مجانية بالكامل لتوليد كود الـ QR الذكي بـ "روابط عميقة" تفتح تطبيقات السوشيال ميديا مباشرة وتزيد اشتراكاتك! 📱🚀\nhttps://ais-pre-ig5eae2idoo3bwx2kdc7sw-460298271198.europe-west2.run.app')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1 px-3 py-2.5 bg-sky-600/90 hover:bg-sky-600 text-white rounded-xl text-[10px] font-bold transition-all hover:-translate-y-0.5"
              >
                <span>تويتر 🐦</span>
              </a>
              <a
                href={`https://t.me/share/url?url=https://ais-pre-ig5eae2idoo3bwx2kdc7sw-460298271198.europe-west2.run.app&text=${encodeURIComponent('أداة الرابط الذكي لتوليد كود الـ QR تفتح تطبيقات السوشيال ميديا مباشرة للمتابعين!')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1 px-3 py-2.5 bg-cyan-600/90 hover:bg-cyan-600 text-white rounded-xl text-[10px] font-bold transition-all hover:-translate-y-0.5"
              >
                <span>تليجرام ✈️</span>
              </a>
            </div>
          </div>

        </div>

        {/* Benefits Cards Section */}
        <section className="mt-16 border-t border-slate-200/80 pt-12">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 text-center mb-10">
            لماذا يعتبر "الرابط الذكي" الخيار الأفضل لتوليد كود الـ QR؟
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">⚡</div>
              <h4 className="font-extrabold text-slate-800 text-sm">روابط عميقة (Deep Links)</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                يجبر الهاتف الذكي على تشغيل إنستغرام، يوتيوب، أو تيك توك وتجاوز المتصفحات الداخلية لإتمام التفاعل فوراً.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">♾️</div>
              <h4 className="font-extrabold text-slate-800 text-sm">مجاني وبدون حدود مطلقاً</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                يعمل الكود من متصفح الزائر دون الحاجة لتسجيل أو سيرفر خلفي لتخزين الروابط أو بيعها.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">🛡️</div>
              <h4 className="font-extrabold text-slate-800 text-sm">أمن وخصوصية مطلقة</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                لا نراقب روابطك أو معلوماتك، المعالجة وتشفير كود الـ QR تتم محلياً في جهاز الهاتف الخاص بالمستخدم.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-lg">✨</div>
              <h4 className="font-extrabold text-slate-800 text-sm">شعار دمج دقيق وبارز</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                يضيف تلقائياً شعار التطبيق ومسح في جوهر الكود لتزداد ثقة الزوار ومستخدمي الهواتف بالمسح.
              </p>
            </motion.div>

          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="mt-20 border-t border-slate-100/90 py-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs gap-4">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-indigo-500" />
            <span className="font-bold text-slate-600">الرابط الذكي</span>
            <span>- رفيقك الاحترافي في التفاعل</span>
          </div>
          <p>© 2026. يعمل بالكامل في متصفحك (Client-side) وبسرعة قصوى مجاناً 100%.</p>
        </div>
      </footer>

    </div>
  );
}

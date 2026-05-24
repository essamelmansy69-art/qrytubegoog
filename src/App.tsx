import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  QrCode, 
  Link as LinkIcon, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Share2,
  Code, 
  Smartphone, 
  Lock, 
  Zap, 
  TrendingUp, 
  Info, 
  Globe, 
  RefreshCw,
  ExternalLink,
  Github,
  Shield,
  FileText,
  Mail,
  X
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

const PRESET_COLORS = [
  { name: 'Slate', hex: '#0f172a' },
  { name: 'Indigo', hex: '#4f46e5' },
  { name: 'Rose', hex: '#e11d48' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Sky', hex: '#0284c7' }
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

  // Legal & Contact state attributes
  const [activeModal, setActiveModal] = useState<'none' | 'privacy' | 'terms' | 'contact'>('none');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

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
          width: 600, // Higher resolution for export
          margin: 3, // Safe quiet zone
          color: {
            dark: qrColor,
            light: bgColor
          },
          errorCorrectionLevel: 'H' // High ECC for icons
        });

        // Overlay brand icon
        if (centerIcon !== 'none') {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const size = canvas.width;
            const boxSize = size * 0.22; // Slightly smaller to avoid data overlap
            const x = (size - boxSize) / 2;
            const y = (size - boxSize) / 2;

            // Container block with soft shadow effect
            ctx.shadowColor = 'rgba(0,0,0,0.1)';
            ctx.shadowBlur = 10;
            ctx.fillStyle = bgColor;
            
            // Rounded rectangle
            const r = boxSize * 0.2;
            ctx.beginPath();
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
            
            ctx.shadowBlur = 0; // Reset shadow

            if (centerIcon === 'scan') {
              ctx.fillStyle = qrColor;
              ctx.font = `bold ${boxSize * 0.3}px sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('SCAN', size / 2, size / 2);
            } else if (centerIcon === 'brand') {
              let iconColor = smartResult.brandColor;
              if (iconColor === '#FFFFFF' || iconColor === '#FFFC00') {
                iconColor = '#000000';
              }
              
              ctx.fillStyle = iconColor;
              ctx.beginPath();
              ctx.arc(size / 2, size / 2, boxSize * 0.38, 0, 2 * Math.PI);
              ctx.fill();

              ctx.fillStyle = '#ffffff';
              ctx.font = `bold ${boxSize * 0.45}px sans-serif`;
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

  // Sync canvas to image previews for frame display
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const updateImages = () => {
      try {
        const dataUrl = canvas.toDataURL('image/png');
        ['qr-export-img', 'qr-export-img-badge', 'qr-export-img-neon', 'qr-export-img-none'].forEach(id => {
          const img = document.getElementById(id) as HTMLImageElement;
          if (img) img.src = dataUrl;
        });
      } catch (e) {
        console.error("Failed to sync canvas to images:", e);
      }
    };
    
    // Small delay to ensure canvas is fully painted
    const timer = setTimeout(updateImages, 100);
    return () => clearTimeout(timer);
  }, [smartResult.smartUrl, qrColor, bgColor, centerIcon, qrFrameStyle, customFrameText]);

  // Handle Composition downloads (Composites frame + QR + text)
  const handleDownloadPNG = async () => {
    if (!canvasRef.current) return;
    
    // If no frame, just download the QR
    if (qrFrameStyle === 'none') {
      const link = document.createElement('a');
      link.download = `smart_qr_${selectedPlatform}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
      playSuccessSound();
      return;
    }

    // Advanced Composite Rendering
    const masterCanvas = document.createElement('canvas');
    const mctx = masterCanvas.getContext('2d');
    if (!mctx) return;

    // Set high-res dimensions (Poster style 1200x1600 or square 1200x1200)
    masterCanvas.width = 1200;
    masterCanvas.height = 1500;

    // Draw Background based on style
    if (qrFrameStyle === 'simple') {
      mctx.fillStyle = '#ffffff';
      mctx.fillRect(0, 0, 1200, 1500);
      mctx.strokeStyle = '#0f172a';
      mctx.lineWidth = 20;
      mctx.strokeRect(40, 40, 1120, 1420);
      
      mctx.fillStyle = '#0f172a';
      mctx.font = 'bold 60px Cairo, sans-serif';
      mctx.textAlign = 'center';
      mctx.fillText('DIRECT APP ACCESS 📱', 600, 150);
    } else if (qrFrameStyle === 'badge') {
      mctx.fillStyle = '#020617';
      mctx.fillRect(0, 0, 1200, 1500);
      const gradient = mctx.createLinearGradient(0, 0, 1200, 0);
      gradient.addColorStop(0, '#ec4899');
      gradient.addColorStop(0.5, '#6366f1');
      gradient.addColorStop(1, '#10b981');
      mctx.fillStyle = gradient;
      mctx.fillRect(0, 0, 1200, 30);
    } else {
      mctx.fillStyle = '#4f46e5';
      mctx.fillRect(0, 0, 1200, 1500);
    }

    // Draw QR from generated canvas
    const margin = 200;
    const qrSize = 800;
    mctx.drawImage(canvasRef.current, (1200 - qrSize) / 2, 300, qrSize, qrSize);

    // Draw Text Labels
    mctx.fillStyle = qrFrameStyle === 'badge' || qrFrameStyle === 'neon' ? '#ffffff' : '#000000';
    mctx.font = 'bold 80px Cairo, sans-serif';
    mctx.textAlign = 'center';
    mctx.fillText(customFrameText, 600, 1300);
    
    mctx.font = '500 40px Cairo, sans-serif';
    mctx.fillStyle = qrFrameStyle === 'badge' ? '#64748b' : 'rgba(0,0,0,0.4)';
    mctx.fillText('GENERATED BY SMART LINK PRO', 600, 1420);

    const link = document.createElement('a');
    link.download = `smart_viral_qr_${selectedPlatform}.png`;
    link.href = masterCanvas.toDataURL('image/png');
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'الرابط الذكي - Smart Link QR',
          text: `افتح هذا الرابط الذكي للانتقال مباشرة للتطبيق: ${smartResult.smartUrl}`,
          url: smartResult.smartUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
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

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSubmitted(true);
    playSuccessSound();
  };

  const handleCloseModal = () => {
    setActiveModal('none');
    setContactSubmitted(false);
    setContactName('');
    setContactEmail('');
    setContactSubject('');
    setContactMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col antialiased font-sans pb-12 overflow-x-hidden" dir="rtl">
      
      {/* Hyper-Viral Global Ambient FX */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-pink-600/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* Futuristic Viral Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 90 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            >
              <QrCode className="w-6 h-6" strokeWidth={2.5} />
            </motion.div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                الرابط الذكي
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full uppercase font-black tracking-widest">Viral Pro</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest opacity-80 uppercase">The Ultra Deep-Link Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                {activeUsers.toLocaleString()} LIVE NOW
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-10 relative">
        
        {/* Viral Headline Section */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-6 uppercase tracking-widest"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>انفجار في التفاعل: فتح التطبيقات مباشرة بنسبة 100%</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tighter"
          >
            حوّل متابعيك لـ <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">فيروس انتشار</span> حقيقي
          </motion.h2>
          <p className="text-slate-400 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            تخطى الحواجز التقنية واجبر تطبيقات إنستغرام، تيك توك، ويوتيوب على الفتح الفوري. كود QR ذكي، سريع، وآمن صُنع ليتصدر المشهد.
          </p>
        </div>

        {/* Hyper-Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card: Control Panel (Viral Input) */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 p-8 shadow-2xl space-y-10 lg:sticky lg:top-28">
            
            {/* Steps Visual Indicator */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-black text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-sm shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                محرك التجهيز الذكي
              </h3>
              <div className="text-[10px] font-black text-slate-500 tracking-widest uppercase">CONFIGURATION MODE / v2.4</div>
            </div>
            
            {/* Platform Grid */}
            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest px-2">1. اختيار محطة البث:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PLATFORMS.map((platform) => {
                  const isActive = selectedPlatform === platform.id;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => {
                        setSelectedPlatform(platform.id);
                        if (platform.id !== 'youtube') setAutoSub(false);
                      }}
                      className={`relative group overflow-hidden py-4 px-3 rounded-[24px] text-[11px] font-black border transition-all flex flex-col items-center justify-center gap-3 cursor-pointer duration-300
                        ${isActive 
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] scale-[1.05]' 
                          : 'bg-white/5 border-white/5 hover:border-white/20 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      {isActive && <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />}
                      <div className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                        {platform.logoSvg ? (
                          <div dangerouslySetInnerHTML={{ __html: platform.logoSvg }} className="w-6 h-6" />
                        ) : (
                          <Sparkles className="w-6 h-6" />
                        )}
                      </div>
                      <span className="tracking-wide">{platform.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* URL/Handle Input */}
            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest px-2">2. مصدر التدفق (الرابط أو المعرف):</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-400">
                  <LinkIcon className="w-6 h-6" />
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="block w-full pr-16 pl-6 py-6 rounded-[28px] bg-white/5 border border-white/10 outline-none text-right font-black text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-[12px] focus:ring-indigo-500/10 transition-all text-sm sm:text-lg"
                  placeholder={PLATFORMS.find(p => p.id === selectedPlatform)?.placeholder || ''}
                />
              </div>
            </div>

            {/* Special Viral Options (Toggles) */}
            <AnimatePresence>
              {selectedPlatform === 'youtube' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 rounded-[30px] bg-red-500/10 border border-red-500/20"
                >
                  <label className="flex items-center gap-4 cursor-pointer">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={autoSub} 
                        onChange={(e) => setAutoSub(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-slate-800 rounded-full peer peer-checked:bg-red-600 transition-colors"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                    </div>
                    <div>
                      <span className="text-xs font-black text-red-100 block mb-1">تجميد الانتباه: نافذة الاشتراك الإجباري 🚀</span>
                      <span className="text-[10px] text-red-300/80 font-bold leading-normal block">سيتم فرض ظهور نافذة الاشتراك المنبثقة فوراً عند فتح القناة لزيادة المتابعين بجنون.</span>
                    </div>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dynamic Customization Tabs (Viral Visuals) */}
            <div className="space-y-6 pt-6 border-t border-white/5">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] px-2 flex items-center justify-between">
                <span>3. البصمة البصرية المتقدمة</span>
                <Sparkles className="w-4 h-4 animate-spin-slow" />
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Foreground color */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">لون النقاط الذرية</span>
                  <div className="grid grid-cols-6 gap-2">
                    {PRESET_COLORS.map(p => (
                      <button
                        key={p.hex}
                        onClick={() => setQrColor(p.hex)}
                        className={`w-full aspect-square rounded-xl border-2 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg
                          ${qrColor === p.hex ? 'border-white scale-110' : 'border-transparent opacity-80'}
                        `}
                        style={{ backgroundColor: p.hex }}
                      />
                    ))}
                    <div className="relative col-span-2">
                       <input 
                        type="color" 
                        value={qrColor} 
                        onChange={(e) => setQrColor(e.target.value)} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-full h-full rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black pointer-events-none">
                        CUSTOM
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background color */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">لون المجال المحيط</span>
                  <div className="flex gap-2">
                    <button onClick={() => setBgColor('#ffffff')} className={`flex-1 py-3 rounded-xl text-[10px] font-black border transition-all ${bgColor === '#ffffff' ? 'bg-white text-black border-white' : 'bg-white/5 text-white border-white/10'}`}>WHITE SOLID</button>
                    <button onClick={() => setBgColor('#000000')} className={`flex-1 py-3 rounded-xl text-[10px] font-black border transition-all ${bgColor === '#000000' ? 'bg-white text-black border-white' : 'bg-white/5 text-white border-white/10'}`}>PURE BLACK</button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Card: Live Output (Viral Masterpiece) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* QR Preview Wrapper */}
            <div className="bg-white rounded-[45px] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col items-center gap-10 relative overflow-hidden group">
              
              {/* Internal Social Proof Banner */}
              <div className="w-full flex justify-between items-center bg-slate-50 px-5 py-3 rounded-[20px] border border-slate-100/60">
                 <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-800 tracking-widest uppercase">LIVE PREVIEW GENERATOR</span>
                 </div>
                 <div className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">PRO v2.0</div>
              </div>

              {/* Render Area with Framed QR */}
              <div className="relative z-10 w-full flex justify-center py-4 bg-grid-slate-100">
                {/* Hidden Master Canvas for generation */}
                <canvas ref={canvasRef} className="hidden" width={600} height={600} />
                
                <div className="transition-all duration-700 hover:scale-[1.03] cursor-help">
                  {qrFrameStyle === 'none' ? (
                    <div className="p-4 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                      <img id="qr-export-img-none" alt="QR" className="rounded-xl w-[250px] sm:w-[300px] h-auto" />
                    </div>
                  ) : qrFrameStyle === 'simple' ? (
                    <div className="bg-white border-[3px] border-slate-900 rounded-[35px] p-6 shadow-2xl flex flex-col items-center max-w-[320px] w-full border-dashed ring-[15px] ring-slate-100/50">
                      <div className="flex items-center gap-2 mb-4 bg-slate-900 text-white px-4 py-1.5 rounded-full">
                        <span className="text-[11px] font-black tracking-widest uppercase">SCAN TO OPEN APP</span>
                        <Smartphone className="w-3.5 h-3.5" />
                      </div>
                      <div className="p-2 bg-slate-50 rounded-2xl border border-slate-100 ring-4 ring-white shadow-inner">
                        <img id="qr-export-img" alt="QR" className="w-[200px] h-[200px]" />
                      </div>
                      <span className="text-sm font-black text-slate-900 mt-6 text-center leading-tight tracking-tight px-2">{customFrameText}</span>
                    </div>
                  ) : qrFrameStyle === 'badge' ? (
                    <div className="bg-slate-950 border border-white/10 rounded-[40px] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col items-center max-w-[340px] w-full text-white relative overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500"></div>
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-xl">
                        <Zap className="w-6 h-6 text-indigo-400 fill-current" />
                      </div>
                      <div className="p-3 bg-white rounded-[32px] ring-8 ring-white/5 shadow-2xl mb-6">
                        <img src="" id="qr-export-img-badge" alt="QR" className="w-[180px] h-[180px] rounded-[18px]" />
                      </div>
                      <span className="text-[15px] font-black text-white text-center leading-snug tracking-tight px-2">
                        {customFrameText}
                      </span>
                      <div className="mt-6 flex flex-col items-center gap-2">
                        <div className="h-[1px] w-12 bg-white/20"></div>
                        <span className="text-[9px] font-black text-slate-500 tracking-[0.3em] uppercase">Deep-Link Secure</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-indigo-600 rounded-[40px] p-8 flex flex-col items-center max-w-[340px] w-full relative group shadow-[0_0_50px_rgba(79,70,229,0.4)] overflow-hidden border border-white/20">
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] opacity-50 group-hover:opacity-80 transition-opacity"></div>
                       <Sparkles className="w-10 h-10 text-white mb-6 animate-pulse" />
                       <div className="p-4 bg-white rounded-[35px] shadow-2xl transform transition-transform group-hover:rotate-3 duration-500">
                          <img src="" id="qr-export-img-neon" alt="QR" className="w-[180px] h-[180px]" />
                       </div>
                       <span className="text-[16px] font-black text-white mt-8 text-center leading-tight tracking-tight relative drop-shadow-lg">
                         {customFrameText}
                       </span>
                       <div className="mt-8 px-5 py-2 bg-black/20 rounded-2xl border border-white/10 backdrop-blur-md">
                          <span className="text-[9px] font-black text-white/90 tracking-widest uppercase">Premium Redirect v2.4</span>
                       </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Redirection Strategy Panel */}
              <div className="w-full bg-slate-50/80 border border-slate-200/50 p-6 rounded-[32px] space-y-4">
                <div className="flex items-center justify-between">
                   <span className="text-[11px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                      استراتيجية التوجيه الذكي:
                   </span>
                   <div className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-black rounded uppercase">OPTIMIZED</div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-bold text-center sm:text-right">
                  {smartResult.explanation}
                </p>
                <div className="pt-4 border-t border-slate-200/50 space-y-2">
                  <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block">ENCODED PAYLOAD:</span>
                  <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200/80 font-mono text-[10px] text-slate-800 break-all select-all text-left shadow-inner max-h-20 overflow-y-auto" dir="ltr">
                    {smartResult.smartUrl || '...'}
                  </div>
                </div>
              </div>

              {/* Action Buttons Hub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <button
                  onClick={handleDownloadPNG}
                  disabled={!url}
                  className="group relative overflow-hidden bg-slate-950 text-white font-black py-5 px-6 rounded-[28px] text-sm transition-all shadow-xl hover:shadow-indigo-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-500" />
                  <div className="relative flex items-center justify-center gap-3">
                    <Download className="w-5 h-5" />
                    <span>تحميل بجودة 4K (PNG)</span>
                  </div>
                </button>
                
                <button
                  onClick={handleShare}
                  disabled={!url}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 px-6 rounded-[28px] text-sm transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-indigo-200"
                >
                  <Share2 className="w-5 h-5" />
                  <span>مشاركة الرابط الذكي</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  disabled={!url}
                  className="sm:col-span-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-5 px-6 rounded-[28px] text-sm transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {copiedLink ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                  <span>{copiedLink ? 'تم نسخ الرابط!' : 'نسخ الرابط الذكي للمرسل'}</span>
                </button>
              </div>

            </div>

            {/* Viral Bento Mini-Stats (Live Energy) */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                     <h4 className="text-base font-black flex items-center gap-2">
                        <span className="p-1 px-1.5 bg-white/20 rounded-lg text-xs leading-none">+99</span>
                        نشاط المستخدمين الحالي
                     </h4>
                     <TrendingUp className="w-5 h-5 opacity-50" />
                  </div>
                  <div className="gap-6 flex flex-col">
                     <div className="space-y-1">
                        <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">الانتشار اليومي</span>
                        <div className="text-3xl font-black tabular-nums">{generatedToday.toLocaleString()} <span className="text-sm font-bold text-white/50">LINK GENERATED</span></div>
                     </div>
                     <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-2/3 shadow-[0_0_10px_white]"></div>
                     </div>
                     <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        <p className="text-[11px] font-black truncate leading-none pt-0.5">{activeFeed}</p>
                     </div>
                  </div>
               </div>
            </div>

          </div>

        </div>

      </main>

      {/* Futuristic Legal Dock/Footer */}
      <footer className="mt-20 border-t border-white/5 pt-12 pb-8 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg">
                  <QrCode className="w-5 h-5" />
                </div>
                <span className="text-xl font-black">الرابط الذكي</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                الأداة الأكثر تطوراً عالمياً لربط منصات التواصل الاجتماعي بالتطبيقات الرسمية فوراً. تجربة مسح خالية من التعقيد، شفافة، وآمنة تماماً.
              </p>
            </div>
            
            <div className="space-y-6">
              <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest">القوانين والضوابط</h5>
              <div className="flex flex-col gap-3">
                <button onClick={() => setActiveModal('privacy')} className="text-sm font-bold text-slate-400 hover:text-indigo-400 transition-colors text-right">سياسة الخصوصية والأمان الفائق</button>
                <button onClick={() => setActiveModal('terms')} className="text-sm font-bold text-slate-400 hover:text-indigo-400 transition-colors text-right">شروط الاستخدام المشروعة</button>
                <button onClick={() => setActiveModal('contact')} className="text-sm font-bold text-slate-400 hover:text-indigo-400 transition-colors text-right">فريق الدعم الفني والمقترحات</button>
              </div>
            </div>

            <div className="space-y-6">
              <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest">الوضع التشغيلي</h5>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-black">
                  <span className="text-slate-500 uppercase">SERVER STATE</span>
                  <span className="text-emerald-400">● RUNNING LOCAL</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-black">
                  <span className="text-slate-500 uppercase">DATA PRIVACY</span>
                  <span className="text-indigo-400">ENCRYPTED AT EDGE</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-black text-slate-600 tracking-widest uppercase">
            <p>© 2026 SMART LINK PRO ENGINE. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-6">
              <button className="hover:text-white transition-colors">GITHUB SOURCE</button>
              <button className="hover:text-white transition-colors">DOCUMENTATION</button>
              <button className="hover:text-white transition-colors">SYSTEM STATUS</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Overlay Modals for Legal Pages & Contact Us */}
      <AnimatePresence>
        {activeModal !== 'none' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-3xl border border-slate-200/95 max-w-lg w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    {activeModal === 'privacy' && <Shield className="w-4.5 h-4.5" />}
                    {activeModal === 'terms' && <FileText className="w-4.5 h-4.5" />}
                    {activeModal === 'contact' && <Mail className="w-4.5 h-4.5" />}
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-sm">
                    {activeModal === 'privacy' && 'سياسة الخصوصية وحماية البيانات المحلية'}
                    {activeModal === 'terms' && 'شروط الاستخدام والأمان الرقمي'}
                    {activeModal === 'contact' && 'اتصل بنا - تواصل مع فريق الدعم والحلول'}
                  </h3>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content Modal */}
              <div className="p-6 max-h-[70vh] overflow-y-auto text-right text-slate-600 space-y-4">
                
                {activeModal === 'privacy' && (
                  <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                    <p className="font-bold text-slate-800 text-sm">أهلاً بك في منصة "الرابط الذكي". خصوصيتك تقع في صلب اهتمامنا:</p>
                    
                    <div className="bg-emerald-50/50 border border-emerald-100/60 p-4 rounded-2xl flex gap-3">
                      <span className="text-xl">🛡️</span>
                      <p className="text-emerald-800 text-xs font-semibold leading-normal">
                        <strong>خصوصية كاملة بقوة متصفحك:</strong> جميع العمليات لتوليد الروابط العميقة وتكوين كود الـ QR تتم محلياً ومباشرة داخل جهازك (Client-side). نحن لا نحتفظ بأي روابط في أي قواعد بيانات خارجية أو سيرفرات وسيطة.
                      </p>
                    </div>

                    <div className="space-y-3.5">
                      <h4 className="font-extrabold text-slate-800">1. البيانات التي نجمعها</h4>
                      <p className="text-slate-500 font-medium font-semibold">
                        منفعتنا الوحيدة هي أن نقدم لك أداة مجانية 100%. لا نقوم بجمع معلومات شخصية، ولا ملفات تخريبية، ولا بريد إلكتروني، ولا تتبع لموقعك بشكل مستمر.
                      </p>

                      <h4 className="font-extrabold text-slate-800">2. ملفات تعريف الارتباط (Cookies)</h4>
                      <p className="text-slate-500 font-medium font-semibold">
                        قد نستخدم ملفات تخزين محلية بسيطة (localStorage) داخل متصفحك فحسب لحفظ تفضيلات الألوان الخاصة بك، وحجم وتصميم كود الـ QR الذي صممته لتفادي إضاعة الوقت في زيارتك القادمة.
                      </p>

                      <h4 className="font-extrabold text-slate-800">3. جودة إعادة التوجيه والروابط الخارجية</h4>
                      <p className="text-slate-500 font-medium font-semibold">
                        الأداة تولد لك روابط عميقة (Deep links) مجانية بالكامل. هذه الروابط يتم فتحها مباشرة عبر البروتوكول الرسمي المُقدم من المنصات نفسها مثل (instagram://, snapchat://).
                      </p>

                      <h4 className="font-extrabold text-slate-800">4. أمان التنزيل والكود المصدري</h4>
                      <p className="text-slate-500 font-medium font-semibold">
                        جميع الأكواد البرمجية وصور الـ QR التي تُحملها من هنا خالية تماماً من الإضافات الضارة وبجودة فائقة، كما نتيح لك نسخ الكود البرمجي بالكامل (index.html) لاستضافته بنفسك لضمان تطلعك الكامل على الكود لشفافية لا تُقدّر بثمن.
                      </p>
                    </div>
                  </div>
                )}

                {activeModal === 'terms' && (
                  <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                    <p className="font-bold text-slate-800 text-sm">بمجرّد استخدامك لأداة "الرابط الذكي" فإنك توافق على البنود والقواعد المذكورة أدناه:</p>

                    <div className="space-y-3.5">
                      <h4 className="font-extrabold text-slate-800">1. الاستخدام المشروع الخالي من الضرر</h4>
                      <p className="text-slate-500 font-medium font-semibold">
                        يُحظر تماماً استخدام مُولد "الرابط الذكي" في إنشاء أكواد QR أو روابط عميقة تقود إلى محتوى احتيالي، أو صفحات تصيّد (Phishing)، أو روابط تحتوي على برمجيات خبيثة أو مواد تنتهك الملكية الفكرية.
                      </p>

                      <h4 className="font-extrabold text-slate-800">2. إخلاء المسؤولية القانونية</h4>
                      <p className="text-slate-500 font-medium font-semibold">
                        الخدمة مُقدمة مجاناً "كما هي" دون أي وعود بضمان الاستقرار الكلي الخالي من الانقطاع. نحن لا نتحمل أي مسؤولية مباشرة أو غير مباشرة جراء استخدام الأكواد المولدة لأغراض تجارية، تسويقية أو شخصية.
                      </p>

                      <h4 className="font-extrabold text-slate-800">3. الاستهلاك والأشكال المشروعة</h4>
                      <p className="text-slate-500 font-medium font-semibold">
                        نوفر الخدمة والتحميلات وحلول الشيفرة المصدرية بشكل مفتوح غير محدود، ويحق لك استخدام الرسوم والرموز الإعلانية في الترويج لمتاجرك وقنواتك دون أي قيود ملكية أو تراخيص مدفوعة.
                      </p>

                      <h4 className="font-extrabold text-slate-800">4. تعديل شروط الخدمة</h4>
                      <p className="text-slate-500 font-medium font-semibold">
                        نحتفظ بالحق في إجراء أي تعديل أو إصلاح أو إضافة بنود تنظيمية لضمان سلامة الروابط وصحة التوجيه الرقمي في أي وقت نراه مناسباً.
                      </p>
                    </div>
                  </div>
                )}

                {activeModal === 'contact' && (
                  <div className="space-y-4">
                    {contactSubmitted ? (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-8 px-4 space-y-3.5 flex flex-col items-center"
                      >
                        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-3xl shadow-inner animate-bounce">
                          ✓
                        </div>
                        <h4 className="font-black text-slate-800 text-base">تم إرسال رسالتك بنجاح وسرور! 🎉</h4>
                        <p className="text-xs text-slate-500 font-semibold max-w-xs leading-normal mx-auto">
                          نشكرك على تواصلك وثقتك بنا، سنقوم بمراجعة اقتراحاتك بخصوص كود الـ QR وأكواد التوجيه الذكية والرد عليك عبر بريدك الإلكتروني قريباً جداً.
                        </p>
                        <button
                          onClick={handleCloseModal}
                          className="mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100 cursor-pointer"
                        >
                          العودة للمنصة الرئيسية
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4 text-xs sm:text-sm text-right">
                        <p className="text-xs text-slate-400 font-semibold mb-2 leading-relaxed">
                          نحن نسعد بتلقي استفسارات منشئي المحتوى، المسوقين، والمطورين دوماً. املأ البيانات وسنتواصل معك بأسرع وقت:
                        </p>
                        
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 block">الاسم الكريم:</label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-right text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            placeholder="مثال: يوسف محمد"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 block">البريد الإلكتروني المفضل:</label>
                          <input
                            type="email"
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-right text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            placeholder="example@domain.com"
                            dir="ltr"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 block">موضوع الرسالة (اختياري):</label>
                          <input
                            type="text"
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-right text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            placeholder="مثال: اقتراح تطوير، مشكلة فنية، إلخ"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500 block">مضمون رسالتك:</label>
                          <textarea
                            required
                            rows={4}
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-right text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                            placeholder="اكتب اقتراحك بحرية تامة هنا..."
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-100 mt-2"
                        >
                          <Mail className="w-4 h-4" />
                          <span>إرسال الرسالة الرقمية الآن</span>
                        </button>
                      </form>
                    )}
                  </div>
                )}

              </div>

              {/* Close footer line info */}
              <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/20 text-[10px] text-slate-400 font-semibold text-center select-none">
                معالجة مشفرة وآمنة بنسبة 100% 🔒
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

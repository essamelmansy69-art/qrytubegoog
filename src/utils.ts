import { SmartLinkResult, PlatformType } from './types';

export function parseToSmartLink(inputUrl: string, platform: PlatformType, autoSub: boolean): SmartLinkResult {
  const url = inputUrl.trim();
  if (!url) {
    return {
      smartUrl: '',
      explanation: 'يرجى إدخال الرابط أولاً ليتم تحليله وتوليد الرابط الذكي تلقائياً.',
      icon: 'Link',
      brandColor: '#4f46e5'
    };
  }

  // Detect platform if 'auto'
  let detectedPlatform: PlatformType = platform;
  if (detectedPlatform === 'auto') {
    const urlLower = url.toLowerCase();
    if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
      detectedPlatform = 'youtube';
    } else if (urlLower.includes('instagram.com')) {
      detectedPlatform = 'instagram';
    } else if (urlLower.includes('facebook.com') || urlLower.includes('fb.watch') || urlLower.includes('fb.com')) {
      detectedPlatform = 'facebook';
    } else if (urlLower.includes('tiktok.com')) {
      detectedPlatform = 'tiktok';
    } else if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
      detectedPlatform = 'x';
    } else if (urlLower.includes('snapchat.com')) {
      detectedPlatform = 'snapchat';
    } else if (urlLower.includes('wa.me') || urlLower.includes('whatsapp.com')) {
      detectedPlatform = 'whatsapp';
    } else if (urlLower.includes('t.me') || urlLower.includes('telegram.dog')) {
      detectedPlatform = 'telegram';
    } else {
      detectedPlatform = 'other';
    }
  }

  switch (detectedPlatform) {
    case 'youtube': {
      // YouTube Video Matching
      const videoMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
      const videoId = videoMatch ? videoMatch[1] : null;

      if (videoId) {
        return {
          smartUrl: `vnd.youtube:${videoId}`,
          explanation: 'تم اكتشاف رابط فيديو يوتيوب! سيتم التوليد ببروتوكول "vnd.youtube:" لفتح الفيديو مباشرة داخل تطبيق يوتيوب الرسمي على هواتف أندرويد وآيفون، مما يمنع فتحه كويب مجهول ويزيد فرصة التفاعل.',
          icon: 'Youtube',
          brandColor: '#FF0000'
        };
      }

      // YouTube Channel Matching
      const handleMatch = url.match(/youtube\.com\/(@[a-zA-Z0-9_\-\.]+)/i);
      const isChannel = url.includes('/channel/') || url.includes('/c/') || url.includes('/user/') || handleMatch;

      if (isChannel) {
        let smartChannelUrl = url;
        if (autoSub) {
          // If already has query, append with &
          smartChannelUrl = url.includes('?') ? `${url}&sub_confirmation=1` : `${url}?sub_confirmation=1`;
        }
        
        // Deep link structure
        let deepUrl = smartChannelUrl;
        if (handleMatch) {
          deepUrl = `youtube://www.youtube.com/${handleMatch[1]}`;
          if (autoSub) {
            deepUrl += '?sub_confirmation=1';
          }
        } else {
          // General youtube app channel deep url
          const parts = url.split('youtube.com/');
          if (parts.length > 1) {
            deepUrl = `youtube://www.youtube.com/${parts[1]}`;
            if (autoSub) {
              deepUrl += (deepUrl.includes('?') ? '&' : '?') + 'sub_confirmation=1';
            }
          }
        }

        return {
          smartUrl: deepUrl,
          explanation: autoSub
            ? 'تم تفعيل كود طلب الاشتراك التلقائي (?sub_confirmation=1). سيقوم كود الـ QR بفتح قناة يوتيوب مباشرة داخل تطبيق الهاتف مع إظهار نافذة اشتراك منبثقة فورية للمستخدمين!'
            : 'تم تحويل رابط القناة لفتح تطبيق يوتيوب الرسمي للموبايل مباشرة، مما يتيح للزوار الضغط على زر "اشتراك" فوراً دون الحاجة لتسجيل دخول جديد.',
          icon: 'Youtube',
          brandColor: '#FF0000'
        };
      }

      return {
        smartUrl: url,
        explanation: 'تم اكتشاف رابط يوتيوب، وسيتم ترميزه بشكل متوافق لضمان فتحه في التطبيق المتاح للهاتف المحمول.',
        icon: 'Youtube',
        brandColor: '#FF0000'
      };
    }

    case 'instagram': {
      // Instagram accounts or posts
      const profileMatch = url.match(/instagram\.com\/([a-zA-Z0-9_\-\.]+)/i);
      if (profileMatch) {
        const username = profileMatch[1];
        // Skip default page paths
        if (!['p', 'reel', 'stories', 'explore', 'direct', 'accounts', 'developer', 'about'].includes(username)) {
          return {
            smartUrl: `https://www.instagram.com/_u/${username}`,
            explanation: `تم استخدام رابط "Universal Link" الذكي (_u/). هذا الرابط هو الأدق عالمياً لإجبار تطبيق إنستغرام على الفتح مباشرة بدلاً من المتصفح، مما يضمن تجربة سلسة للمسح والمتابعة الفورية.`,
            icon: 'Instagram',
            brandColor: '#E1306C'
          };
        }
        
        // Post/Reels Match
        const postMatch = url.match(/instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_\-]+)/i);
        if (postMatch) {
          const postId = postMatch[1];
          return {
            smartUrl: `instagram://media?id=${postId}`,
            explanation: `تم استخدام بروتوكول الوسائط المباشر (Media Intent). سيقوم بفتح المنشور/الريل داخل التطبيق فوراً لزيادة التفاعل والإعجابات دون عوائق تسجيل الدخول.`,
            icon: 'Instagram',
            brandColor: '#E1306C'
          };
        }
      }
      return {
        smartUrl: url,
        explanation: 'رابط إنستغرام تم تحليله. سيحاول الكود فتح التطبيق الرسمي عبر روابط الويب الذكية المُحسنة.',
        icon: 'Instagram',
        brandColor: '#E1306C'
      };
    }

    case 'facebook': {
      // Facebook Link Parse
      const fbMatch = url.match(/facebook\.com\/([a-zA-Z0-9_\-\.]+)/i);
      if (fbMatch) {
        const username = fbMatch[1];
        if (!['sharer', 'groups', 'events', 'messages', 'profile.php', 'watch', 'pages'].includes(username)) {
          return {
            smartUrl: `fb://profile/${username}`,
            explanation: `تم اكتشاف صفحة أو حساب فيسبوك! سيتم التوليد باستخدام "fb://profile/${username}" لفتح الحساب مباشرة في تطبيق فيسبوك الرسمي، وهو مثالي لزيادة المتابعات دون مواجهة مشكلات تسجيل الدخول.`,
            icon: 'Facebook',
            brandColor: '#1877F2'
          };
        }
      }
      
      return {
        smartUrl: url,
        explanation: 'رابط فيسبوك تم تحليله بنجاح وسيتم ترميزه بشكل متوافق مع خوارزميات التوجيه لتطبيق فيسبوك للهواتف.',
        icon: 'Facebook',
        brandColor: '#1877F2'
      };
    }

    case 'tiktok': {
      // tiktok.com/@username
      const ttMatch = url.match(/tiktok\.com\/@([a-zA-Z0-9_\-\.]+)/i);
      if (ttMatch) {
        const username = ttMatch[1];
        return {
          smartUrl: `snssdk1128://user/profile/@${username}`,
          explanation: `تم اكتشاف حساب تيك توك! تم صياغة رابط عميق فائق التوافق لفتح حسابك مباشرة داخل تطبيق تيك توك وتسهيل الضغط على متابعة (Follow) والاطلاع على الفيديوهات.`,
          icon: 'Tiktok',
          brandColor: '#000000'
        };
      }
      return {
        smartUrl: url,
        explanation: 'تم كشف رابط تيك توك وسيتم توليد كود QR ذكي ومميز لفتحه بالتطبيق فوراً.',
        icon: 'Tiktok',
        brandColor: '#000000'
      };
    }

    case 'whatsapp': {
      const waMatch = url.match(/(?:wa\.me|api\.whatsapp\.com\/send\?phone=)(\+?[0-9\-\s]+)/i);
      if (waMatch) {
        const cleanPhone = waMatch[1].replace(/[-+\s]/g, '');
        return {
          smartUrl: `whatsapp://send?phone=${cleanPhone}`,
          explanation: `تم كشف رابط واتساب! سيتم استخدام البروتوكول الحصري والآمن "whatsapp://send?phone=${cleanPhone}" لبدء محادثة مشفرة فورية معك في تطبيق واتساب دون وسائط.`,
          icon: 'Whatsapp',
          brandColor: '#25D366'
        };
      }
      
      // Check if user just typed a phone number instead
      if (/^[0-9+-\s]{8,15}$/.test(url.replace(/\s/g, ''))) {
        const cleanNumber = url.replace(/[-+\s]/g, '');
        return {
          smartUrl: `whatsapp://send?phone=${cleanNumber}`,
          explanation: `تم التعرف على رقم الهاتف! سيقوم الكود بفتح محادثة واتساب دردشة مباشرة للمستخدم مع الرقم ${cleanNumber} فوراً دون حفظ رقمك بجهات الاتصال.`,
          icon: 'Whatsapp',
          brandColor: '#25D366'
        };
      }

      return {
        smartUrl: url,
        explanation: 'رابط واتساب نشط وسيقوم بفتح دردشة فورية مع الزوار بمجرد مسحه.',
        icon: 'Whatsapp',
        brandColor: '#25D366'
      };
    }

    case 'telegram': {
      const tgMatch = url.match(/(?:t\.me|telegram\.(?:me|dog))\/([a-zA-Z0-9_\-]+)/i);
      if (tgMatch) {
        const username = tgMatch[1];
        return {
          smartUrl: `tg://resolve?domain=${username}`,
          explanation: `تم اكتشاف رابط تيليجرام. تم تحويل الرابط للبروتوكول "tg://resolve?domain=${username}" لفتح القناة أو حساب التواصل مباشرة في تطبيق تيليجرام الرسمي على الجوال.`,
          icon: 'Telegram',
          brandColor: '#229ED9'
        };
      }
      return {
        smartUrl: url,
        explanation: 'رابط تيليجرام نشط وسيتم فتحه في تطبيق تيليجرام بمجرد المسح.',
        icon: 'Telegram',
        brandColor: '#229ED9'
      };
    }

    case 'x': {
      const xMatch = url.match(/(?:x|twitter)\.com\/([a-zA-Z0-9_\-]+)/i);
      if (xMatch) {
        const username = xMatch[1];
        if (!['home', 'explore', 'notifications', 'messages', 'search', 'settings'].includes(username)) {
          return {
            smartUrl: `twitter://user?screen_name=${username}`,
            explanation: `تم كشف حساب في منصة إكس (تويتر سابقاً)! تم التحويل للبروتوكول "twitter://user?screen_name=${username}" لفتح حسابك مباشرة داخل التطبيق الرسمي وتسهيل عملية المتابعة.`,
            icon: 'X',
            brandColor: '#000000'
          };
        }
      }
      return {
        smartUrl: url,
        explanation: 'رابط منصة إكس (تويتر) نشط وسيتم ترميزه بشكل متوافق لضمان فتحه في التطبيق المتاح للهاتف.',
        icon: 'X',
        brandColor: '#000000'
      };
    }

    case 'snapchat': {
      const snapMatch = url.match(/snapchat\.com\/add\/([a-zA-Z0-9_\-\.]+)/i);
      if (snapMatch) {
        const username = snapMatch[1];
        return {
          smartUrl: `snapchat://add/${username}`,
          explanation: `تم اكتشاف حساب سناب شات! سيقوم الكود بفتح واجهة الكاميرا لإضافة الحساب "${username}" مباشرة فور مسحه بتطبيق الجوال لتسهيل المشاهدات والتفاعل المباشر.`,
          icon: 'Snapchat',
          brandColor: '#FFFC00'
        };
      }
      return {
        smartUrl: url,
        explanation: 'رابط سناب شات نشط وسيتم توليد كود التوجيه الذكي للتطبيق فوراً.',
        icon: 'Snapchat',
        brandColor: '#FFFC00'
      };
    }

    default:
      return {
        smartUrl: url,
        explanation: 'رابط ويب تقليدي. سيقوم الـ QR كود بتوجيه المستخدمين إلى هذا الرابط بدقة عالية باستخدام متصفح الويب الافتراضي للجوال.',
        icon: 'Link',
        brandColor: '#4f46e5'
      };
  }
}

export function generateSingleFileHTML(name: string = "الرابط الذكي"): string {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - مولد كود QR الذكي لمنصات التواصل</title>
    <!-- Preconnect to Font & CDN domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    <link rel="preconnect" href="https://cdn.tailwindcss.com" crossorigin>
    
    <!-- Google Fonts: Cairo -->
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com" crossorigin="anonymous" defer></script>
    <!-- QRCode.js Library CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js" crossorigin="anonymous" defer></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Cairo', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            purple: '#4f46e5',
                            dark: '#0f172a',
                            light: '#f8fafc'
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: 'Cairo', sans-serif;
            background-color: #f8fafc;
        }
        /* Style for smooth pulse or custom glow */
        .glow-button {
            transition: all 0.3s ease;
            box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.4);
        }
        .glow-button:hover {
            box-shadow: 0 6px 20px 0 rgba(79, 70, 229, 0.6);
            transform: translateY(-2px);
        }
        .icon-badge {
            transition: all 0.3s ease;
        }
        .icon-badge:hover {
            transform: scale(1.1);
        }
    </style>
</head>
<body class="text-slate-800 min-h-screen flex flex-col antialiased">

    <!-- Header Section -->
    <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 transition-all duration-300">
        <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h1 class="text-xl font-extrabold text-slate-900 tracking-tight">${name}</h1>
                    <p class="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider">مولد كود الـ QR الذكي</p>
                </div>
            </div>
            
            <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm animate-pulse">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    تعمل بدون سيرفر (آمن ومجاني)
                </span>
            </div>
        </div>
    </header>

    <!-- Main Content Grid -->
    <main class="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
        
        <!-- Hero intro section -->
        <div class="text-center max-w-2xl mx-auto mb-10">
            <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
                زيّن كود الـ QR واجعله يفتح تطبيقك <span class="text-indigo-600 font-black relative px-2 inline-block">مباشرة!<span class="absolute right-0 bottom-1 w-full h-2 bg-indigo-100 -z-10 rounded-full"></span></span>
            </h2>
            <p class="text-slate-500 text-sm md:text-base leading-relaxed">
                أنشئ أكواد استجابة سريعة ذكية (Deep Links) تجبر هواتف زوارك على فتح حساباتك مباشرة داخل التطبيقات الرسمية (مثل يوتيوب وإنستغرام وتيك توك) لمضاعفة المتابعات والتفاعل بـ 4 أضعاف!
            </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left Side controls -->
            <div class="lg:col-span-7 bg-white rounded-3xl p-6 shadow-xl shadow-slate-100/70 border border-slate-100 space-y-6">
                
                <!-- Platform selection chips -->
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-3">اختر المنصة للسرعة (اختياري)</label>
                    <div class="grid grid-cols-3 sm:grid-cols-5 gap-2" id="platform-chips">
                        <button onclick="setPlatform('auto')" id="chip-auto" class="platform-chip py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center flex flex-col items-center justify-center gap-1 bg-indigo-50 border-indigo-200 text-indigo-700">
                            <span class="text-base">🚀</span>
                            <span>تعرف تلقائي</span>
                        </button>
                        <button onclick="setPlatform('youtube')" id="chip-youtube" class="platform-chip py-2.5 px-2 rounded-xl text-xs font-bold border border-slate-100 transition-all text-center flex flex-col items-center justify-center gap-1 hover:border-red-200 hover:bg-red-50 text-slate-600">
                            <svg class="w-5 h-5 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            <span>يوتيوب</span>
                        </button>
                        <button onclick="setPlatform('instagram')" id="chip-instagram" class="platform-chip py-2.5 px-2 rounded-xl text-xs font-bold border border-slate-100 transition-all text-center flex flex-col items-center justify-center gap-1 hover:border-pink-200 hover:bg-pink-50 text-slate-600">
                            <svg class="w-5 h-5 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                            <span>إنستغرام</span>
                        </button>
                        <button onclick="setPlatform('facebook')" id="chip-facebook" class="platform-chip py-2.5 px-2 rounded-xl text-xs font-bold border border-slate-100 transition-all text-center flex flex-col items-center justify-center gap-1 hover:border-blue-200 hover:bg-blue-50 text-slate-600">
                            <svg class="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            <span>فيسبوك</span>
                        </button>
                        <button onclick="setPlatform('tiktok')" id="chip-tiktok" class="platform-chip py-2.5 px-2 rounded-xl text-xs font-bold border border-slate-100 transition-all text-center flex flex-col items-center justify-center gap-1 hover:border-slate-300 hover:bg-slate-50 text-slate-600">
                            <svg class="w-5 h-5 text-[#000000]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.53.07C13.82.02 15.11 0 16.4.03a5.53 5.53 0 0 0 .18 1.82c.49 1.25 1.3 2.2 2.45 2.87.87.5 1.82.78 2.82.85v3.47c-1.32-.05-2.5-.46-3.52-1.32-.23-.2-.42-.42-.61-.66v5.8c0 1.25-.13 2.44-.6 3.56a7.22 7.22 0 0 1-5.73 4.53 7.82 7.82 0 0 1-6.1-1.63 7.02 7.02 0 0 1-2.92-5.45c-.03-1.68.32-3.18 1.41-4.47a7.28 7.28 0 0 1 5.92-2.76v3.47a3.86 3.86 0 0 0-2.3 2.05c-.4 1.1-.38 2.14.25 3.09a3.81 3.81 0 0 0 5.4 1.13c1.07-.72 1.48-1.78 1.48-3.05a50.8 50.8 0 0 0-.02-12.24z"/></svg>
                            <span>تيك توك</span>
                        </button>
                    </div>
                </div>

                <!-- Link/Username prompt -->
                <div class="space-y-2">
                    <label id="input-label" class="block text-sm font-bold text-slate-700">أدخل الرابط أو اسم المستخدم الشخصي</label>
                    <div class="relative rounded-2xl shadow-sm">
                        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <input type="text" id="url-input" oninput="handleInputChange()" 
                            class="block w-full pr-11 pl-4 py-4 rounded-2xl border border-slate-200 outline-none text-right font-medium text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-sm md:text-base"
                            placeholder="مثال: https://www.instagram.com/your_username">
                    </div>
                </div>

                <!-- Customizations section -->
                <div class="border-t border-slate-100 pt-5 space-y-5">
                    <h4 class="text-sm font-bold text-indigo-900 flex items-center gap-2">
                        <span>🎨</span> خصائص التخصيص والألوان
                    </h4>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- QR Code Color -->
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-2">لون كود الـ QR الرئيسي</label>
                            <div class="flex items-center gap-2">
                                <input type="color" id="qr-color" value="#0f172a" onchange="generateQR()" class="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5">
                                <span class="text-xs text-slate-500 font-mono" id="qr-color-hex">#0f172a</span>
                            </div>
                        </div>

                        <!-- BG Color -->
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-2">لون خلفية الكود</label>
                            <div class="flex items-center gap-2">
                                <input type="color" id="bg-color" value="#ffffff" onchange="generateQR()" class="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5">
                                <span class="text-xs text-slate-500 font-mono" id="bg-color-hex">#ffffff</span>
                            </div>
                        </div>
                    </div>

                    <!-- YouTube Sub Toggle (Shown if Youtube is clicked/detected) -->
                    <div id="youtube-options" class="hidden bg-red-50/50 border border-red-100 rounded-2xl p-4">
                        <label class="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" id="auto-sub-toggle" onchange="handleInputChange()" class="w-5 h-5 text-red-600 border-red-300 rounded focus:ring-red-500">
                            <div>
                                <span class="text-xs font-bold text-red-900 block">تفعيل طلب الاشتراك التلقائي في القناة</span>
                                <span class="text-[10px] text-red-600">سيُضاف الخيار للقناة وسيقوم تبريد المتصفح بطلب الاشتراك فور الدخول.</span>
                            </div>
                        </label>
                    </div>

                    <!-- Add icon in the center configuration -->
                    <div class="space-y-2">
                        <label class="block text-xs font-bold text-slate-500">إضافة شعار المنصة في منتصف كود الـ QR</label>
                        <div class="flex flex-wrap gap-2">
                            <button onclick="setCenterIcon('none')" id="icon-none" class="icon-setting-btn px-3 py-1.5 rounded-lg text-xs font-semibold border bg-indigo-50 border-indigo-200 text-indigo-700">بلا شعار</button>
                            <button onclick="setCenterIcon('brand')" id="icon-brand" class="icon-setting-btn px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 hover:bg-slate-50">شعار ذكي تلقائي</button>
                            <button onclick="setCenterIcon('scan')" id="icon-scan" class="icon-setting-btn px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 hover:bg-slate-50">أيقونة مسح 📱</button>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <button onclick="handleGenerateClick()" class="glow-button w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all text-sm md:text-base">
                    <span>⚡</span>
                    توليد الـ QR كود الذكي
                </button>
            </div>

            <!-- Right Side Preview & Options -->
            <div class="lg:col-span-5 flex flex-col gap-6">
                <!-- QR Card -->
                <div class="bg-white rounded-3xl p-6 shadow-xl shadow-slate-100/70 border border-slate-100 text-center flex flex-col items-center justify-center space-y-6">
                    <div class="w-full flex justify-between items-center pb-3 border-b border-slate-50">
                        <span class="text-xs font-extrabold text-slate-400">معاينة الكود المباشر</span>
                        <span id="platform-badge" class="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">منصة عامة</span>
                    </div>

                    <!-- QR code canvas container -->
                    <div class="p-4 bg-slate-50 rounded-2xl relative" style="min-width: 240px; min-height: 240px;">
                        <div id="qrcode" class="mx-auto flex items-center justify-center bg-white p-2.5 rounded-xl shadow-sm border border-slate-100"></div>
                        <canvas id="canvas-overlay" class="hidden absolute top-0 left-0"></canvas>
                    </div>

                    <!-- Explanatory smart path details -->
                    <div class="w-full bg-slate-50/70 border border-slate-100/80 rounded-2xl p-4 text-right space-y-2">
                        <span class="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider block">آلية عمل الرابط الذكي الحالي:</span>
                        <p id="explanation-text" class="text-xs text-slate-500 leading-relaxed font-medium">ويرجى إدخال الرابط أولاً ليتم تحليله وتوليد الرابط الذكي تلقائياً.</p>
                        <div class="pt-2 border-t border-slate-200/50 flex flex-col gap-1">
                            <span class="text-[10px] text-slate-400 block font-bold">الرابط الموجه النهائي:</span>
                            <div class="bg-white px-3 py-2 rounded-lg border border-slate-100 font-mono text-[10px] text-indigo-700 break-all select-all text-left" dir="ltr" id="smart-url-display">https://...</div>
                        </div>
                    </div>

                    <!-- Action buttons -->
                    <div class="w-full grid grid-cols-2 gap-3 pt-2">
                        <button onclick="downloadPNG()" class="flex items-center justify-center gap-2 text-white bg-slate-900 hover:bg-slate-800 font-bold py-3.5 px-3 rounded-xl text-xs transition-all shadow-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>تحميل كصورة PNG</span>
                        </button>
                        <button onclick="copySmartLink()" class="flex items-center justify-center gap-2 text-slate-700 bg-slate-100 hover:bg-slate-200 font-bold py-3.5 px-3 rounded-xl text-xs transition-all">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a3 3 0 016 0m-3 0V7m0 5h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            <span id="copy-btn-text">نسخ الرابط الذكي</span>
                        </button>
                    </div>

                </div>
            </div>

        </div>

        <!-- Premium benefits grid -->
        <section class="mt-16 border-t border-slate-200 pt-12">
            <h3 class="text-xl font-bold text-slate-900 text-center mb-8">لماذا يعتبر "الرابط الذكي" الخيار الأفضل لتوليد كود الـ QR؟</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div class="bg-white p-5 rounded-2xl border border-slate-100 space-y-3">
                    <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">♾️</div>
                    <h5 class="font-bold text-slate-800 text-sm">طلبات غير محدودة ومجانية</h5>
                    <p class="text-[11px] text-slate-500 leading-relaxed">يعالج الكود البيانات في متصفحك محلياً بشكل كامل، ويضمن توليد عدد لانهائي من الأكواد مجاناً وبسرعة قصوى مدى الحياة.</p>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-100 space-y-3">
                    <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold">🎯</div>
                    <h5 class="font-bold text-slate-800 text-sm">فتح التطبيقات مباشرة (Deep Link)</h5>
                    <p class="text-[11px] text-slate-500 leading-relaxed">يتجاوز المتصفحات الداخلية المزعجة ويجبر هاتف المستخدم على الانتقال للتطبيق الرسمي منستغرام، يوتيوب، تيك توك لتفادي تسجيل الدخول.</p>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-100 space-y-3">
                    <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-lg font-bold">🔒</div>
                    <h5 class="font-bold text-slate-800 text-sm">أمان وخصوصية كاملة</h5>
                    <p class="text-[11px] text-slate-500 leading-relaxed">لا يحتاج حسابات، ولا يحفظ الروابط في أي خوادم خارجية، خصوصية لا مفر منها لروابطك وتفاصيل محتواك بنسبة 100%.</p>
                </div>

                <div class="bg-white p-5 rounded-2xl border border-slate-100 space-y-3">
                    <div class="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center text-lg font-bold">🎨</div>
                    <h5 class="font-bold text-slate-800 text-sm">شعار احترافي في خمس ثوانٍ</h5>
                    <p class="text-[11px] text-slate-500 leading-relaxed">يدعم دمج شعار المنصة في قلب الكود تلقائياً ليرشدهم ما الذي سيفتحونه ويزيد الثقة ونسبة المسح.</p>
                </div>

            </div>
        </section>

    </main>

    <!-- Footer Section -->
    <footer class="bg-white border-t border-slate-100 py-6 mt-16 text-center text-slate-400 text-xs">
        <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 ${name} - جميع الحقوق محفوظة لمحلياً وبخصوصية مطلقة.</p>
            <p>تطبيق ويب يعمل مجاناً 100% على جهازك دون انقطاع.</p>
        </div>
    </footer>

    <!-- Logic Script -->
    <script>
        let currentPlatform = 'auto';
        let currentCenterIcon = 'none';
        
        let qrcodeInstance = null;

        // Configuration details for platforms
        const platformConfigs = {
            auto: { name: 'تعرف تلقائي', brandColor: '#4f46e5', placeholder: 'أدخل أي رابط منصة تواصل اجتماعي هنا...' },
            youtube: { name: 'يوتيوب', brandColor: '#FF0000', placeholder: 'https://www.youtube.com/watch?v=... أو رابط القناة' },
            instagram: { name: 'إنستغرام', brandColor: '#E1306C', placeholder: 'https://www.instagram.com/p/... أو اسم الحساب' },
            facebook: { name: 'فيسبوك', brandColor: '#1877F2', placeholder: 'https://www.facebook.com/... أو رابط صفحة' },
            tiktok: { name: 'تيك توك', brandColor: '#000000', placeholder: 'https://www.tiktok.com/@your_name' }
        };

        const svgs = {
            youtube: \`<svg viewBox="0 0 24 24" width="24" height="24" fill="#FF0000"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>\`,
            instagram: \`<svg viewBox="0 0 24 24" width="24" height="24" fill="#E1306C"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>\`,
            facebook: \`<svg viewBox="0 0 24 24" width="24" height="24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>\`,
            tiktok: \`<svg viewBox="0 0 24 24" width="24" height="24" fill="#000000"><path d="M12.53.07C13.82.02 15.11 0 16.4.03a5.53 5.53 0 0 0 .18 1.82c.49 1.25 1.3 2.2 2.45 2.87.87.5 1.82.78 2.82.85v3.47c-1.32-.05-2.5-.46-3.52-1.32-.23-.2-.42-.42-.61-.66v5.8c0 1.25-.13 2.44-.6 3.56a7.22 7.22 0 0 1-5.73 4.53 7.82 7.82 0 0 1-6.1-1.63 7.02 7.02 0 0 1-2.92-5.45c-.03-1.68.32-3.18 1.41-4.47a7.28 7.28 0 0 1 5.92-2.76v3.47a3.86 3.86 0 0 0-2.3 2.05c-.4 1.1-.38 2.14.25 3.09a3.81 3.81 0 0 0 5.4 1.13c1.07-.72 1.48-1.78 1.48-3.05a50.8 50.8 0 0 0-.02-12.24z"/></svg>\`,
            whatsapp: \`<svg viewBox="0 0 24 24" width="24" height="24" fill="#25D366"><path d="M12 .027C5.388.027.022 5.393.022 12.005c0 2.111.55 4.162 1.595 5.97L.03 23.973l6.136-1.61a11.933 11.933 0 005.829 1.515c6.615 0 11.978-5.366 11.978-11.977c0-3.205-1.248-6.22-3.51-8.484C18.2 1.258 15.19 0 12 .027zm7.042 16.63c-.27.761-1.362 1.383-1.896 1.464c-.394.062-.907.094-1.487-.094c-.352-.109-.8-.255-1.397-.506c-2.529-1.062-4.161-3.64-4.288-3.812c-.125-.172-1.03-1.378-1.03-2.628c0-1.25.656-1.862.887-2.113c.23-.25.5-.313.669-.313c.168 0 .337.012.484.022c.159.011.373-.062.585.45c.219.531.75 1.834.815 1.969c.065.134.11.29.02.478c-.09.188-.135.3-.27.466c-.135.166-.285.37-.406.497c-.135.134-.277.281-.118.553a15.7 15.7 0 002.593 3.22c1.094.975 2.015 1.281 2.302 1.428c.287.147.456.125.625-.072c.168-.197.747-.869.946-1.168c.199-.3.397-.25.669-.147c.272.103 1.728.815 2.025.965c.297.15.5.225.569.347c.07.122.07.712-.2 1.472z"/></svg>\`
        };

        // Initialize empty QR
        window.onload = function() {
            setPlatform('auto');
            document.getElementById('url-input').value = 'https://www.instagram.com/instagram';
            handleInputChange();
        }

        function setPlatform(platform) {
            currentPlatform = platform;
            
            // Adjust active CSS states for platform chips
            document.querySelectorAll('.platform-chip').forEach(btn => {
                btn.classList.remove('bg-indigo-50', 'border-indigo-200', 'text-indigo-700');
                btn.classList.add('border-slate-100', 'text-slate-600');
            });
            
            const activeChip = document.getElementById('chip-' + platform);
            if (activeChip) {
                activeChip.classList.remove('border-slate-100', 'text-slate-600');
                activeChip.classList.add('bg-indigo-50', 'border-indigo-200', 'text-indigo-700');
            }

            // Show options specific to youtube
            const ytOptions = document.getElementById('youtube-options');
            if (platform === 'youtube') {
                ytOptions.classList.remove('hidden');
            } else {
                ytOptions.classList.add('hidden');
            }

            // Adjust placeholders based on active config
            const config = platformConfigs[platform];
            document.getElementById('url-input').placeholder = config.placeholder;
            
            handleInputChange();
        }

        function setCenterIcon(iconType) {
            currentCenterIcon = iconType;
            document.querySelectorAll('.icon-setting-btn').forEach(btn => {
                btn.classList.remove('bg-indigo-50', 'border-indigo-200', 'text-indigo-700For');
                btn.classList.add('border-slate-200');
            });

            const activeBtn = document.getElementById('icon-' + iconType);
            if (activeBtn) {
                activeBtn.classList.remove('border-slate-200');
                activeBtn.classList.add('bg-indigo-50', 'border-indigo-200', 'text-indigo-700');
            }

            generateQR();
        }

        // Logic to extract deep link representation
        function parseToSmartLink(url, platform, autoSub) {
            let processedUrl = url.trim();
            if (!processedUrl) {
                return {
                    smartUrl: '',
                    explanation: 'يرجى إدخال الرابط أولاً ليتم تحليله وتوليد الرابط الذكي تلقائياً.',
                    platform: 'auto',
                    brandColor: '#4f46e5'
                };
            }

            let detected = platform;
            if (detected === 'auto') {
                const urlLower = processedUrl.toLowerCase();
                if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
                    detected = 'youtube';
                } else if (urlLower.includes('instagram.com')) {
                    detected = 'instagram';
                } else if (urlLower.includes('facebook.com') || urlLower.includes('fb.watch') || urlLower.includes('fb.com')) {
                    detected = 'facebook';
                } else if (urlLower.includes('tiktok.com')) {
                    detected = 'tiktok';
                } else {
                    detected = 'other';
                }
            }

            switch(detected) {
                case 'youtube':
                    const videoMatch = processedUrl.match(/(?:youtube\\.com\\/(?:[^\\/]+\\/.+\\/|(?:v|e(?:mbed)?)\\/|.*[?&]v=)|youtu\\.be\\/)([^"&?\\/\\s]{11})/i);
                    const videoId = videoMatch ? videoMatch[1] : null;
                    if (videoId) {
                        return {
                            smartUrl: 'vnd.youtube:' + videoId,
                            explanation: 'تم تحويل الفيديو لترميز يفتح تطبيق يوتيوب الرسمي للجوال فور المسح بدلاً من المتصفح المؤقت مجاناً وسرعة تامة!',
                            platform: 'youtube',
                            brandColor: '#FF0000'
                        };
                    }

                    const handleMatch = processedUrl.match(/youtube\\.com\\/(@[a-zA-Z0-9_\\-\\.]+)/i);
                    const isChannel = processedUrl.includes('/channel/') || processedUrl.includes('/c/') || processedUrl.includes('/user/') || handleMatch;
                    if (isChannel) {
                        let resultUrl = processedUrl;
                        if (autoSub) {
                            resultUrl = processedUrl.includes('?') ? (processedUrl + '&sub_confirmation=1') : (processedUrl + '?sub_confirmation=1');
                        }
                        return {
                            smartUrl: resultUrl,
                            explanation: 'تم التعرف على القناة! كود الـ QR مجهز لتوجيه المشاهدين مباشرة للمتابعة مع تفعيل خيارات فتح التطبيق واقتراح الاشتراك.',
                            platform: 'youtube',
                            brandColor: '#FF0000'
                        };
                    }
                    return { smartUrl: processedUrl, explanation: 'تم تحليل رابط يوتيوب بنجاح.', platform: 'youtube', brandColor: '#FF0000' };

                case 'instagram':
                    const profileMatch = processedUrl.match(/instagram\\.com\\/([a-zA-Z0-9_\\-\\.]+)/i);
                    if (profileMatch) {
                        const username = profileMatch[1];
                        if (!['p', 'reel', 'stories', 'explore', 'direct'].includes(username)) {
                            return {
                                smartUrl: 'instagram://user?username=' + username,
                                explanation: 'تم صياغة كود التوجيه المباشر لتطبيق إنستغرام لفتح حسابك الشخصي ' + username + ' فور مسح اللوحة وتفادي إعاير الويب المزعجة.',
                                platform: 'instagram',
                                brandColor: '#E1306C'
                            };
                        }
                        const postMatch = processedUrl.match(/instagram\\.com\\/(?:p|reel)\\/([a-zA-Z0-9_\\-]+)/i);
                        if (postMatch) {
                            return {
                                smartUrl: 'instagram://media?id=' + postMatch[1],
                                explanation: 'تم تحويل رابط المنشور ليفتح تطبيق إنستغرام فوراً على الصورة أو الفيديو المعني.',
                                platform: 'instagram',
                                brandColor: '#E1306C'
                            };
                        }
                    }
                    return { smartUrl: processedUrl, explanation: 'تحليل رابط إنستغرام جاهز.', platform: 'instagram', brandColor: '#E1306C' };

                case 'facebook':
                    const fbMatch = processedUrl.match(/facebook\\.com\\/([a-zA-Z0-9_\\-\\.]+)/i);
                    if (fbMatch && !['groups', 'events', 'messages', 'watch'].includes(fbMatch[1])) {
                        return {
                            smartUrl: 'fb://profile/' + fbMatch[1],
                            explanation: 'سيقوم كود الـ QR بفتح صفحة فيسبوك بنقرة واحدة داخل التطبيق الرسمي للجوال لضمان المتابعة الفورية والتفاعل السريع.',
                            platform: 'facebook',
                            brandColor: '#1877F2'
                        };
                    }
                    return { smartUrl: processedUrl, explanation: 'رابط فيسبوك جاهز للتوجيه.', platform: 'facebook', brandColor: '#1877F2' };

                case 'tiktok':
                    const ttMatch = processedUrl.match(/tiktok\\.com\\/@([a-zA-Z0-9_\\-\\.]+)/i);
                    if (ttMatch) {
                        return {
                            smartUrl: 'snssdk1128://user/profile/@' + ttMatch[1],
                            explanation: 'رابط تيك توك عميق تم بناؤه لتجنيب المستخدمين تصفح حسابك من نافذة ويب مجهولة وفتحه فوراً بالتطبيق لزيادة المتابعة.',
                            platform: 'tiktok',
                            brandColor: '#000000'
                        };
                    }
                    return { smartUrl: processedUrl, explanation: 'رابط تيك توك نشط ومتاح.', platform: 'tiktok', brandColor: '#000000' };

                default:
                    return {
                        smartUrl: processedUrl,
                        explanation: 'رابط ويب عام. سيفتح بأمان عبر المتصفح الافتراضي لهواتف زوارك للمشاهدة والتفاعل.',
                        platform: 'other',
                        brandColor: '#4f46e5'
                    };
            }
        }

        let linkData = { smartUrl: '', explanation: '', platform: 'auto', brandColor: '' };

        function handleInputChange() {
            const val = document.getElementById('url-input').value;
            const autoSub = document.getElementById('auto-sub-toggle') ? document.getElementById('auto-sub-toggle').checked : false;
            
            linkData = parseToSmartLink(val, currentPlatform, autoSub);
            
            // Adjust visual explanation
            document.getElementById('explanation-text').innerText = linkData.explanation;
            document.getElementById('smart-url-display').innerText = linkData.smartUrl || 'https://...';
            
            // Setup platform badge
            const badge = document.getElementById('platform-badge');
            const conf = platformConfigs[linkData.platform] || { name: 'منصة عامة', brandColor: '#4f46e5' };
            badge.innerText = conf.name;
            badge.style.backgroundColor = conf.brandColor + '15';
            badge.style.color = conf.brandColor;

            generateQR();
        }

        function generateQR() {
            const url = linkData.smartUrl || 'https://www.google.com';
            const size = 300;
            const darkColor = document.getElementById('qr-color').value;
            const lightColor = document.getElementById('bg-color').value;

            // Hex updates label text
            document.getElementById('qr-color-hex').innerText = darkColor;
            document.getElementById('bg-color-hex').innerText = lightColor;

            // Reset container
            const qrContainer = document.getElementById('qrcode');
            qrContainer.innerHTML = '';

            qrcodeInstance = new QRCode(qrContainer, {
                text: url,
                width: 230,
                height: 230,
                colorDark: darkColor,
                colorLight: lightColor,
                correctLevel: QRCode.CorrectLevel.H
            });

            // Delay to draw logo over core canvas once generated
            setTimeout(() => {
                const qrImg = qrContainer.querySelector('canvas');
                if (qrImg) {
                    drawLogoOnQR(qrImg, darkColor, lightColor);
                }
            }, 120);
        }

        function drawLogoOnQR(mainCanvas, darkColor, lightColor) {
            if (currentCenterIcon === 'none') return;

            const ctx = mainCanvas.getContext('2d');
            const size = mainCanvas.width;
            
            // Draw a rounded white (or bg) box in the center
            const logoBoxSize = size * 0.24;
            const x = (size - logoBoxSize) / 2;
            const y = (size - logoBoxSize) / 2;
            
            ctx.fillStyle = lightColor;
            // Draw round rect for box
            ctx.beginPath();
            const radius = 8;
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + logoBoxSize - radius, y);
            ctx.quadraticCurveTo(x + logoBoxSize, y, x + logoBoxSize, y + radius);
            ctx.lineTo(x + logoBoxSize, y + logoBoxSize - radius);
            ctx.quadraticCurveTo(x + logoBoxSize, y + logoBoxSize, x + logoBoxSize - radius, y + logoBoxSize);
            ctx.lineTo(x + radius, y + logoBoxSize);
            ctx.quadraticCurveTo(x, y + logoBoxSize, x, y + logoBoxSize - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.fill();

            // Render details inside the box
            if (currentCenterIcon === 'scan') {
                ctx.fillStyle = darkColor;
                ctx.font = 'bold 9px Cairo';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('SCAN', size / 2, size / 2);
            } else if (currentCenterIcon === 'brand') {
                const platform = linkData.platform === 'auto' ? 'other' : linkData.platform;
                if (platform !== 'other' && svgs[platform]) {
                    // Draw inline vector representations of the brand in the center
                    const img = new Image();
                    img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgs[platform]);
                    img.onload = function() {
                        const iconDrawSize = logoBoxSize * 0.7;
                        ctx.drawImage(img, (size - iconDrawSize) / 2, (size - iconDrawSize) / 2, iconDrawSize, iconDrawSize);
                    }
                } else {
                    ctx.fillStyle = darkColor;
                    ctx.font = 'bold 15px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('⚡', size / 2, size / 2);
                }
            }
        }

        function handleGenerateClick() {
            handleInputChange();
            // Scroll to preview on mobile
            if (window.innerWidth < 1024) {
                document.getElementById('qrcode').scrollIntoView({ behavior: 'smooth' });
            }
        }

        function downloadPNG() {
            const canvas = document.querySelector('#qrcode canvas');
            if (!canvas) return;

            const link = document.createElement('a');
            link.download = 'smart_qr_code.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }

        function copySmartLink() {
            const smartUrl = linkData.smartUrl;
            if (!smartUrl) return;

            navigator.clipboard.writeText(smartUrl).then(() => {
                const btnText = document.getElementById('copy-btn-text');
                btnText.innerText = 'تم نسخ الرابط!';
                setTimeout(() => {
                    btnText.innerText = 'نسخ الرابط الذكي';
                }, 2000);
            }).catch(e => {
                alert('عذراً، لم نتمكن من نسخ الرابط تلقائياً. يرجى نسخه يدوياً من المربع.');
            });
        }
    </script>
</body>
</html>`;
}

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ScanStatsDashboard from './components/ScanStatsDashboard';
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
    headline: 'كود QR لليوتيوب وتوليد روابط ذكية',
    headlineColor: 'فتح روابط اليوتيوب داخل التطبيق مباشرة لزيادة المشاهدات والاشتراكات 🚀',
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
    headline: 'YouTube QR Code & Smart Link Generator',
    headlineColor: 'Open YouTube Links Directly In-App (Boost Views & Subs) 🚀',
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

interface BlogPost {
  id: string;
  title: string;
  shortDesc: string;
  thumbnail: string;
  readTime: string;
  date: string;
  content: React.ReactNode;
}

const BLOG_POSTS: Record<Language, BlogPost[]> = {
  ar: [
    {
      id: 'ctr-optimization',
      title: 'خفايا خوارزمية يوتيوب: كيف ترفع نسبة النقر للظهور (CTR) لمضاعفة المشاهدات 🚀',
      shortDesc: 'اكتشف كيف يحلل اليوتيوب الصور المصغرة والعناوين وسلوك نقر المشاهدين، والخطوات العملية التي تحقق لك نسبة نقر مرتفعة لنجاح مضمون لنمو قناتك وزيادة الأرقام.',
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
      readTime: 'دقائق 6',
      date: '24 مايو 2026',
      content: (
        <div className="space-y-6 leading-relaxed text-sm md:text-base text-slate-300 font-medium">
          <p className="text-slate-205 text-lg leading-relaxed font-bold">
            تخيل أنك تبذل قصارى جهدك في تصوير وتعديل فيديو مذهل، ولكن لا يضغط عليه أحد بمجرد ظهوره على شاشات المشاهدة الرائعة للمستخدم. هذا هو الكابوس الأكبر لكل صانع محتوى. يُطلق على هذا المؤشر اسم <strong className="text-white">نسبة النقر للظهور (CTR)</strong>، وهو المحرك الأساسي لخوارزمية يوتيوب ونجاح القناة.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-violet-400 mt-8 mb-4 border-b border-slate-800 pb-2">فهم خوارزمية يوتيوب ونسبة النقر (CTR)</h2>
          <p>
            يستخدم يوتيوب نظام توصية دقيقاً للغاية يعتمد على تجربة المستخدمين وتفاعلهم. بمجرد رفع مقطع فيديو جديد، يعرضه النظام لشريحة صغيرة من الجمهور لاستكشاف تفاعلهم. إذا كانت نسبة النقر مرتفعة، يقوم النظام بتوسيع دائرة الاقتراحات وإظهار الفيديو لشريحة أوسع وتتوالى هذه الدورة.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">التصميم الهندسي للصورة المصغرة الفعالة</h3>
          <p>
            الصورة المصغرة هي البوابة البصرية للفيديو. لكي تبرز وسط آلاف الفيديوهات الأخرى، اتبع الآتي لقوة بصرية فائقة:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pr-2">
            <li><strong className="text-white">تباين الألوان العالي:</strong> استخدم ألواناً مثل الأحمر، الأصفر، الأخضر الليموني، أو النيون على خلفيات داكنة لخلق تباين بصري يبهر العين.</li>
            <li><strong className="text-white">قاعدة الثلثين للتكوين البصري:</strong> اترك مساحة كافية للوجوه ذات التعابير الواضحة في ثلث من الصورة، واجعل العناصر الأساسية واضحة للغاية.</li>
            <li><strong className="text-white">اختصار النصوص:</strong> لا تكرر العنوان الكامل، بل استخدم كلمة أو كلمتين مكملتين وبارزتين بخط عريض سهل القراءة.</li>
          </ul>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">حيل صياغة عناوين تثير الفضول دون حظر (Clickbait)</h3>
          <p>
            العنوان والصورة المصغرة يعملان كفريق متكامل. أفضل العناوين هي التي تخلق ما يسمى "فجوة الفضول" (Curiosity Gap)، وهي عبارة عن توفير معلومة مشوقة مع حجب جزء يجعل المستخدم مجبراً على النقر لمعرفة التفاصيل كاملة.
          </p>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl my-4 space-y-2 font-mono text-xs md:text-sm">
            <p className="text-rose-400">❌ مثال سيء: "كيف تربح المال من اليوتيوب في خطوات بسيطة" (ممل ومكرر)</p>
            <p className="text-emerald-400">✅ مثال احترافي: "الخطوة السرية التي ضاعفت أرباحي من يوتيوب 10 مرات في أسبوع واحد!" (مثير ومحفز)</p>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">كيف تحلل منحنيات النقر داخل لوحة تحكم YouTube Studio</h3>
          <p>
            لا تكتفِ بتوليد الفيديوهات ومراقبة الأرقام بعيداً. راجع الإحصاءات بعد 24 و48 ساعة من النشر. إذا رأيت هبوطاً حاداً في نسبة النقر عن المعتاد (مثلاً أقل من 4%)، فهذه إشارة واضحة لضرورة استبدال الصورة المصغرة أو تجديد صياغة العنوان فوراً لإنقاذ الفيديو وضمان اقتراحه مجدداً.
          </p>
        </div>
      )
    },
    {
      id: 'deep-linking-views',
      title: 'كيف ترفع نسبة اشتراكاتك 300% عبر تجنب متصفحات السوشيال ميديا القاتلة ⚡',
      shortDesc: 'لماذا يفشل زوار إنستغرام وفيسبوك في الاشتراك بقناتك؟ وكيف تحل المشكلة فوراً عن طريق بروتوكولات الروابط الذكية العميقة.',
      thumbnail: 'https://images.unsplash.com/photo-1546146830-2fe9f852d4b1?q=80&w=800&auto=format&fit=crop',
      readTime: 'دقائق 7',
      date: '24 مايو 2026',
      content: (
        <div className="space-y-6 leading-relaxed text-sm md:text-base text-slate-300 font-medium">
          <p className="text-slate-205 text-lg leading-relaxed font-bold">
            تخيل هذا السيناريو: يرى أحد المتابعين منشورك المشوق على إنستغرام أو فيسبوك، ويسحب الشاشة للانتقال لقناتك على يوتيوب. يفتح الرابط، لكن داخل <strong className="text-white">المتصفح المدمج المزعج للتطبيق (In-App Browser)</strong>. عندما يحاول الضغط على زر "اشتراك" أو "إعجاب"، يطالبه المتصفح بتسجيل الدخول! في هذه اللحظة، يغلق المتابع الصفحة ويرحل بلا عودة.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-violet-400 mt-8 mb-4 border-b border-slate-800 pb-2">سارق الحركة والتحويل: المتصفح الداخلي المدمج</h2>
          <p>
            تقوم تطبيقات مثل فيسبوك، إنستغرام، تيك توك، ولينكد إن بفتح الروابط الخارجية داخل متصفح مبني محلياً لعدم خروج الجمهور من تطبيقهم والحفاظ على وقت الزيارة لديهم لمشاهدة الإعلانات. لكن هذا يسبب دماراً لصناع المحتوى وتفاعلهم بنسبة تزيد على 80% بسبب نقص جلسة تسجيل دخول المستخدم.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">لماذا يفشل 90% من جمهور إنستغرام في تقديم الدعم لقناتك؟</h3>
          <p>
            المتصفحات الداخلية لا تشارك ملفات تعريف الارتباط أو حساب Google المسجل مسبقاً في الهاتف. بالتالي، يظهر المستخدم هناك كزائر مجهول بالكامل. إعادة كتابة البريد وكلمة السر لاستكمال تسجيل الدخول هي عملية شاقة ومعقدة جداً للهواتف، مما يتسبب في إلغاء الفكرة وإغلاق الصفحة فوراً.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">فهم بروتوكول الروابط العميقة (Deep Links)</h3>
          <p>
            الروابط العميقة (Deep Linking) هي بروتوكولات هاتفية تتيح توجيه الهاتف لفتح تطبيق خارجي بدلاً من المتصفح العادي. مثلاً، بدلاً من التوجه إلى الرابط التقليدي <code>https://youtube.com/...</code>، نستخدم بروتوكول الروابط العميقة الذي يفهمه نظام تشغيل الأندرويد والـ iOS كطلب فوري لتشغيل تطبيق يوتيوب الرسمي مع تمرير وجهة الفيديو أو القناة بدقة.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">بناء استراتيجية توجيه متكاملة للجمهور</h3>
          <p>
            عن طريق استخدام مولد الروابط الذكية Qrytube، يمكنك إنشاء روابط مخصصة ذكية وأكواد QR فريدة ترمز لهذه البروتوكولات السحرية. بمجرد إضافة هذا الرابط المحسّن في البيو الخاص بإنستغرام، أو مسح الكود في كارت تعريفي، ستلاحظ فوراً ارتفاع نسب التفاعل وزيادة الاشتراكات ومعدلات البقاء بمقدار 3 إلى 4 أضعاف، لأن المستخدم يتابعك بحسابه الرسمي ومستعد بكامل صلاحيته بضغطة واحدة.
          </p>
        </div>
      )
    },
    {
      id: 'seo-blueprint',
      title: 'خارطة طريق الـ Video SEO: تصدر نتائج البحث الأولى في يوتيوب وجوجل في 2026 🎯',
      shortDesc: 'يوتيوب ليس مجرد شاشة لمشاهدة الفيديوهات بل هو ثاني أكبر محرك بحث في العالم. تعلّم كيف تجعل فيديوهاتك تظهر للباحثين مجاناً والسيطرة الكاملة.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      readTime: 'دقائق 8',
      date: '24 مايو 2026',
      content: (
        <div className="space-y-6 leading-relaxed text-sm md:text-base text-slate-300 font-medium">
          <p className="text-slate-205 text-lg leading-relaxed font-bold">
            هل سألت نفسك يوماً كيف تجلب فيديوهاتك مشاهدات آلية مستمرة لسنوات كاملة دون الحاجة لمشاركة الرابط يومياً؟ السر يكمن في سيو اليوتيوب (Video SEO). عندما يبحث شخص ما عن معلومة معينة في يوتيوب أو جوجل، يجب أن يظهر الفيديو الخاص بك كخيار وحل ذهبي أول أمامه.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-violet-400 mt-8 mb-4 border-b border-slate-800 pb-2">يوتيوب هو ثاني أضخم محرك بحث في العالم</h2>
          <p>
            يقوم مليارات الأشخاص بالبحث يومياً عبر يوتيوب عن حلول للمشاكل، برامج تعليمية، مراجعات للمنتجات، وترفيه. تعامُل الخوارزمية مع هذه الكلمات البحثية يشبه تماماً تعامل محرك بحث جوجل، وبالتالي يمكنك تهيئة وتجهيز مقاطعك لتصيد هذه الكلمات المربحة والضخمة جداً.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">البحث واصطياد الكلمات المفتاحية ذات القيمة العالية</h3>
          <p>
            قبل تصوير الفيديو، ابدأ بالبحث عما يريده الجمهور فعلاً. اكتب الكلمات المقترحة في صندوق بحث يوتيوب ولاحظ المقترحات التلقائية (Autocomplete)، فهي تمثل رغبات حقيقية للمستخدمين. استخدم أدوات تحليلية مثل Google Trends لمعرفة حجم الطلب والمقارنة بين المواضيع لاختيار الفكرة صاحبة التريند الأقوى.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">تضمين الكلمات في العنوان، الوصف، والوسوم ونطقها الصوتي</h3>
          <p>
            خوارزميات الذكاء الاصطناعي ليوتيوب أصبحت ذكية بما يكفي لتحليل الصوت ونقله إلى نصوص. لذا، من المهم جداً نطق الكلمة المفتاحية في أول 30 ثانية من الفيديو بوضوح، بالإضافة إلى كتابتها في:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pr-2">
            <li><strong className="text-white">العنوان الأساسي:</strong> ضع الكلمة المفتاحية في بداية العنوان لتوضيح أهميتها وجذب العين فوراً.</li>
            <li><strong className="text-white">صندوق الوصف:</strong> اكتب وصفاً مفصلاً ومفيداً لا يقل عن 250 كلمة يشرح محتوى الفيديو بدقة مع تضمين الكلمة المفتاحية والمرادفات الطبيعية 3-4 مرات بشكل انسيابي.</li>
            <li><strong className="text-white">الفصول وعلامات الوقت (Timestamps):</strong> تقسيم الفيديو يسهل قراءته وفهمه بواسطة محركات جوجل وظهوره كنتيجة مباشرة في محركها العام.</li>
          </ul>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">الاحتفاظ بالجمهور (Audience Retention): الملك الحقيقي للترتيب</h3>
          <p>
            مهما كان سيو الفيديو ممتازاً، فلن يتصدر الترتيب إذا كان المشاهد يغلق الفيديو بعد 5 ثوانٍ فقط. نسبة الاحتفاظ بالمشاهد (Retention Rate) ومعدل البقاء والتشغيل هي المقياس الأساسي لجودة المحتوى بالنسبة ليوتيوب. صمّم مقدمة فيديو حماسية (Hook)، وتجنب الحشو غير المفيد لضمان استمتاع المشاهد حتى النهاية والحفاظ على ريادة نتائج البحث لسنوات قادمة.
          </p>
        </div>
      )
    }
  ],
  en: [
    {
      id: 'ctr-optimization',
      title: 'Cracking the YouTube Algorithm: How to Optimize Click-Through Rate (CTR) for 10X Views 🚀',
      shortDesc: 'Discover how the algorithm analyzes custom thumbnails, curiosity gap titling, and click behavior, with actionable blueprints to maximize CTR and fuel rapid channel growth.',
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
      readTime: '6 min read',
      date: 'May 24, 2026',
      content: (
        <div className="space-y-6 leading-relaxed text-sm md:text-base text-slate-305 font-medium">
          <p className="text-slate-205 text-lg leading-relaxed font-bold">
            Imagine spending days editing a masterpiece, only for it to sit in absolute obscurity because nobody clicks when it appears on their screen. This is a common nightmare for creators. The single metric that separates viral videos from forgotten ones is <strong className="text-white">Click-Through Rate (CTR)</strong> — the primary gas that drives the YouTube recommendation engine.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-violet-400 mt-8 mb-4 border-b border-slate-800 pb-2">Demystifying YouTube Recommendation Engines</h2>
          <p>
            YouTube operates on a feedback-loop recommendation model. When you upload a video, it is initially shown to a small test pool of users who match your topic profile. If they click and watch, the recommendation engine widens the circle to a broader audience. If they ignore it, the video is shelved. High CTR is the critical green flag that triggers exponential algorithmic reach.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">The Visual Engineering of High-Performance Thumbnails</h3>
          <p>
            Your thumbnail is the visual gateway. To instantly steal attention from competing thumbnails, execute these styling patterns:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
            <li><strong className="text-white">Extreme Color Contrast:</strong> Leverage vibrant tones like electric yellow, cyan, lime green, or neon pink set against deep twilight backdrops to force cognitive attention.</li>
            <li><strong className="text-white">The Power of Clean Faces:</strong> Humans organically scan for faces. Use high-contrast cutouts of expressive emotions filling at least 30-40% of the graphic.</li>
            <li><strong className="text-white">Minimalist Copy:</strong> Never copy-paste your title. Use 3-4 powerful punchy keywords that complement the title and add curiosity.</li>
          </ul>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">titling Secrets that Hack the "Curiosity Gap" (Safely)</h3>
          <p>
            A brilliant thumbnail fails without a title that seals the click. To convert eyeballs into viewers, utilize the "Curiosity Gap" — giving the user just enough context to hook them, but hiding the key resolution so they must click to discover the truth.
          </p>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl my-4 space-y-2 font-mono text-xs md:text-sm">
            <p className="text-rose-400">❌ Ineffective title: "How to Grow Your YouTube Channel with Easy Marketing Steps" (Predictable and dry)</p>
            <p className="text-emerald-400">✅ Optimized title: "This One Tiny Setting Doubled My YouTube Views in Exactly 48 Hours!" (High stakes, high curiosity)</p>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">Monitoring your CTR Curve in Real-Time in YouTube Studio</h3>
          <p>
            Do not just publish and hope for the best. Keep close track of your CTR in YouTube Studio during the first 12-24 hours. A standard CTR is around 4-6%. If your video falls below 3% in its initial release, it is an urgent cue to swap the thumbnail and update the title immediately. This simple pivot can resurrect a dormant masterpiece and revive its organic reach.
          </p>
        </div>
      )
    },
    {
      id: 'deep-linking-views',
      title: 'Bypassing In-App Browsers: Boost Your Channel Subscription Rate by 300% ⚡',
      shortDesc: 'Why Instagram swipe-ups and Facebook posts kill guest-to-subscriber conversion rates, and the simple deep link solution to redirect users directly into native apps.',
      thumbnail: 'https://images.unsplash.com/photo-1546146830-2fe9f852d4b1?q=80&w=800&auto=format&fit=crop',
      readTime: '7 min read',
      date: 'May 24, 2026',
      content: (
        <div className="space-y-6 leading-relaxed text-sm md:text-base text-slate-305 font-medium">
          <p className="text-slate-205 text-lg leading-relaxed font-bold">
            We have all witnessed this catastrophic friction: a prospective subscriber clicks your latest teaser link inside Instagram or Facebook. Instead of loading the official pre-signed app, the platform locks them inside a sterile <strong className="text-white">in-app browser (WebView)</strong>. If they try to click "Subscribe" or "Like", they are greeted with an annoying "Sign In to Google" prompt! 95% of users close the tab immediately.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-violet-400 mt-8 mb-4 border-b border-slate-800 pb-2">The Hidden Growth Killer: WebView Sandboxes</h2>
          <p>
            Social networking sites deploy custom WebViews to keep users isolated inside their walled garden, guaranteeing longer sessions for ad impressions. For digital creators, this acts as an absolute conversion graveyard. WebViews isolate cookies, meaning your audience is treated as guest accounts with no session state, preventing intuitive single-tap actions.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">Why 90% of Instagram Traffic Fails to Convert</h3>
          <p>
            Entering intricate passwords or performing dynamic two-factor verification on mobile web views is exhausting. Modern users prioritize instant gratification. The split-second requirement to enter Google login credentials completely kills the impulse to subscribe, causing massive losses in cross-platform engagement.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">The Architectural Magic of Device Deep Linking</h3>
          <p>
            A Deep Link uses programmatic system-level URI protocols that prompt the mobile operating system to bypass the browser entirely. For example, rather than loading a cold web standard like <code>https://youtube.com/watch...</code>, deep routing triggers custom protocols which immediately prompts iOS or Android to launch the official YouTube application natively.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">Developing a Seamless Cross-Channel Funnel</h3>
          <p>
            Using Qrytube's smart URL translation engine, you can generate customized deep links and print-ready vector QR codes that encapsulate these programmatic protocols perfectly. Update your bio links, launch cards, and promo graphics to channel visitors into optimized paths. By launching the native YouTube app immediately, your subscribers are fully authenticated and can engage, follow, and subscribe with a single stress-free click.
          </p>
        </div>
      )
    },
    {
      id: 'seo-blueprint',
      title: 'The Ultimate Video SEO Blueprint: Rank #1 on YouTube and Google Search in 2026 🎯',
      shortDesc: 'YouTube is the 2nd largest search engine in the world. Master search term extraction, advanced description metadata optimization, and audience retention modeling.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      readTime: '8 min read',
      date: 'May 24, 2026',
      content: (
        <div className="space-y-6 leading-relaxed text-sm md:text-base text-slate-305 font-medium">
          <p className="text-slate-205 text-lg leading-relaxed font-bold">
            While homepage recommendations can explode quickly, they can also fade overnight. If you want sustainable, high-passive views that run continuously for years, you must master <strong className="text-white">Video SEO</strong>. By optimizing your content for search engines, your tutorials, product reviews, and guides will act as organic magnets for millions of high-intent searchers.
          </p>

          <h2 className="text-xl md:text-2xl font-black text-violet-400 mt-8 mb-4 border-b border-slate-800 pb-2">Harvesting passive traffic from the 2nd Largest Search Engine</h2>
          <p>
            Billions of users turn to YouTube to search for practical solutions, programming tutorials, design tips, and consumer reviews. The backend indexing crawler indexes and processes these search phrases much like Google Search does. This represents an incredible goldmine of evergreen traffic that you can easily command.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">Dynamic Keyword Extraction for Target Search Terms</h3>
          <p>
            Never guess your video topics. Begin by typing your core topic ideas into the YouTube Search Box and observe the real-time Autocomplete suggestions. These represent the exact phrases and queries users are typing. Supplement this research with modern tools like Google Trends to confirm keyword growth, stability, and competition before recording your videos.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">Keyword Optimization: Titles, Descriptions, Chapters, and Voice Cues</h3>
          <p>
            YouTube’s AI engine transcribes video audio automatically. Therefore, it is essential to vocally state your target keyword clearly during the first 30 seconds of your video. Beyond vocal cues, integrate your search keywords into these critical structural details:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
            <li><strong className="text-white">Primary Heading / Title:</strong> Place your primary seed keyword phrase at the very beginning of your title.</li>
            <li><strong className="text-white">Optimized Description Box:</strong> Write a comprehensive, rich description of at least 250-300 words that explains your video's structure, embedding your keywords naturally 3-4 times.</li>
            <li><strong className="text-white">Interactive Timestamps/Chapters:</strong> Grouping your video segments with clear descriptive headers makes it highly indexable, allowing Google Search to highlight specific segments directly.</li>
          </ul>

          <h3 className="text-lg md:text-xl font-bold text-indigo-400 mt-6 mb-3">Audience Retention Modeling: The True Search Engine Ranking Factor</h3>
          <p>
            A perfectly optimized description is useless if viewers leave within 5 seconds. YouTube's primary ranking factor is <strong className="text-white">Audience Retention Rate</strong> and Session Duration. Create dynamic visual hooks in your introductions, deliver on your title's promise without unnecessary filler, and design interactive end screens to keep viewers hooked, securing your search rankings for years to come.
          </p>
        </div>
      )
    }
  ]
};

function BlogPage({ lang }: { lang: Language }) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Scroll to top when changing posts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPostId]);

  const posts = BLOG_POSTS[lang];
  const activePost = posts.find(p => p.id === selectedPostId);

  return (
    <div id="blog-root-section" className="w-full min-h-[75vh] bg-[#090d16] text-slate-100 rounded-[2.5rem] border border-slate-840 p-6 md:p-12 shadow-3xl relative overflow-hidden transition-all duration-300">
      {/* Cyberpunk backdrop grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-12">
        <AnimatePresence mode="wait">
          {!selectedPostId ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-12"
            >
              {/* Blog Header */}
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-505 shadow-md rounded-full text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'سيو ونمو القنوات بالذكاء الاصطناعي' : 'Creator Growth Strategy Base'}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight select-none">
                  {lang === 'ar' ? 'أدلة التوجيه ونمو القنوات' : 'YouTube Advanced Strategy Guides'}
                </h1>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  {lang === 'ar' 
                    ? 'تعلم كيف تفكر خوارزمية يوتيوب لزيادة المشاهدات وضمان كسر عقبة التفاعل وتخطي متصفحات السوشيال ميديا بسلاسة.'
                    : 'Tactical playbooks built for high-performance channels looking to unlock exponential views, conquer search engine rankings, and convert cold visitors seamlessly.'
                  }
                </p>
              </div>

              {/* Grid Section */}
              <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => setSelectedPostId(post.id)}
                    className="group bg-[#111827]/80 hover:bg-[#111827] border border-slate-800/80 hover:border-violet-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)] transition-all cursor-pointer flex flex-col h-full"
                  >
                    {/* Thumbnail box */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-800/80">
                      <img 
                        src={post.thumbnail} 
                        alt={post.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60" />
                      
                      {/* Floating tag */}
                      <div className="absolute top-3 right-3 bg-indigo-600/90 text-white text-[10px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase shadow-md">
                        {post.readTime}
                      </div>
                    </div>

                    {/* Metadata body */}
                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      <div className="flex items-center gap-3 text-slate-500 text-[11px] font-bold">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-violet-500" />
                          {post.date}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-slate-400 text-xs font-semibold leading-relaxed line-clamp-3">
                        {post.shortDesc}
                      </p>

                      <div className="pt-2 flex items-center gap-1 text-xs font-bold text-violet-400 group-hover:text-violet-300 transition-colors mt-auto">
                        <span>{lang === 'ar' ? 'اقرأ المقال بالكامل' : 'Read Full Blueprint'}</span>
                        <span className="inline-block transform group-hover:translate-x-1 transition-transform">
                          {lang === 'ar' ? '←' : '→'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="max-w-4xl mx-auto space-y-10"
            >
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setSelectedPostId(null)}
                className="inline-flex items-center gap-2 text-xs font-bold py-2.5 px-5 bg-slate-900 border border-slate-800 rounded-full text-slate-300 hover:text-white hover:border-violet-500/50 hover:bg-[#111827]/80 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all cursor-pointer font-sans"
              >
                {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{lang === 'ar' ? 'العودة للمقالات والأدلة' : 'Back to Strategy Base'}</span>
              </button>

              {/* Cover Image */}
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-800/80 shadow-2xl aspect-[21/9] w-full bg-slate-900">
                <img 
                  src={activePost?.thumbnail} 
                  alt={activePost?.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/30 to-black/20" />
                
                {/* Embedded tags */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs font-bold text-white/90">
                    <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <Calendar className="w-3.5 h-3.5 text-violet-400" />
                      {activePost?.date}
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <Clock className="w-3.5 h-3.5 text-violet-400" />
                      {activePost?.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content body with headings explicitly for SEO */}
              <div className="bg-[#111827]/40 border border-slate-800/60 rounded-[2.25rem] p-6 md:p-10 space-y-6">
                <h1 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight border-b border-slate-850 pb-6">
                  {activePost?.title}
                </h1>
                
                <div className="prose prose-invert max-w-none text-slate-300">
                  {activePost?.content}
                </div>
              </div>

              {/* Action Promo Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-violet-950/40 to-indigo-950/40 border border-slate-800/80 rounded-3xl p-6 gap-6 shadow-lg">
                <div className="space-y-1 text-center sm:text-start">
                  <p className="text-white text-sm font-bold">{lang === 'ar' ? 'هل رغبت في زيادة نمو قناتك بالكامل؟' : 'Ready to multiply your viewers today?'}</p>
                  <p className="text-slate-400 text-xs font-semibold">{lang === 'ar' ? 'أنشئ الروابط العميقة الآن واجتز متصفحات فيسبوك المزعجة.' : 'Launch optimized deep links instantly and dominate the rankings.'}</p>
                </div>
                <Link
                  to="/"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3.5 px-6 rounded-2xl shadow-md uppercase transition-all whitespace-nowrap active:scale-95"
                >
                  {lang === 'ar' ? 'بدء إنشاء الروابط السحرية ⚡' : 'Start Link Conversion ⚡'}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

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
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          {t.headline} <br />
          <span className="bg-gradient-to-r from-red-600 via-red-500 to-rose-600 bg-clip-text text-transparent text-xl md:text-3xl block mt-2 leading-tight">
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
                          ? 'bg-red-50/70 border-red-300 text-red-600 shadow-sm ring-2 ring-red-500/10'
                          : 'bg-slate-50/70 border-slate-100 text-slate-500 hover:text-red-500 hover:bg-red-50/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <p.icon className={`w-5.5 h-5.5 text-red-600 transition-transform ${platform === 'youtube' ? 'scale-110 animate-pulse' : 'group-hover/btn:scale-110'}`} />
                        <span className="font-extrabold text-sm tracking-wide font-sans">YouTube Creator Focus</span>
                      </div>
                      <span className="text-[9px] font-black bg-red-600 text-white px-2.5 py-1 rounded-lg tracking-wider">
                        {lang === 'ar' ? 'الأفضل للمشاهدات والاشتراك' : 'BEST FOR VIEWS & SUBS'}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Secondary/Alternative row */}
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
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
              <label htmlFor="url-input" className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                {t.labelUrl}
              </label>
              <div className="relative">
                <input
                  id="url-input"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={getPlaceholder()}
                  className={`w-full bg-slate-50/70 border rounded-2xl p-4 px-5 outline-none focus:bg-white transition-all text-sm font-medium focus:ring-4 duration-300 ${
                    error 
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100 placeholder:text-red-300 text-red-900 bg-red-50/10' 
                      : platform === 'youtube'
                        ? 'border-slate-200/80 focus:border-red-500 focus:ring-red-100 placeholder:text-slate-400 text-slate-800'
                        : platform === 'instagram'
                          ? 'border-slate-200/80 focus:border-rose-500 focus:ring-rose-100 placeholder:text-slate-400 text-slate-800'
                          : platform === 'facebook'
                            ? 'border-slate-200/80 focus:border-blue-500 focus:ring-blue-100 placeholder:text-slate-400 text-slate-800'
                            : platform === 'tiktok'
                              ? 'border-slate-200/80 focus:border-slate-800 focus:ring-slate-100 placeholder:text-slate-400 text-slate-800'
                              : 'border-slate-200/80 focus:border-indigo-500 focus:ring-indigo-100 placeholder:text-slate-405 text-slate-800'
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
                    className="text-xs font-bold text-red-500 mt-1 flex items-center gap-1 leading-relaxed"
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
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Dynamic D3.js scanned codes dashboard block */}
      <ScanStatsDashboard lang={lang} />

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
              <input id="contact-email" required type="email" className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-4 px-6 focus:border-indigo-505 transition-all outline-none text-slate-900 font-sans" />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-[11px] font-bold text-slate-705 uppercase tracking-wider">{t.contactForm.message}</label>
              <textarea id="contact-message" required rows={5} className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-4 px-6 focus:border-indigo-505 transition-all outline-none resize-none text-slate-900 font-sans" />
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
            <Routes location={location}>
              <Route path="/" element={<HomeContent lang={lang} />} />
              <Route path="/blog" element={<BlogPage lang={lang} />} />
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

            <div className="flex items-center gap-8 text-[11px] font-bold text-slate-600 tracking-wider flex-wrap justify-center">
               <Link to="/blog" className="hover:text-indigo-600 transition-all uppercase">{t.navArticles}</Link>
               <Link to="/privacy" className="hover:text-indigo-600 transition-all uppercase">{t.privacy}</Link>
               <Link to="/terms" className="hover:text-indigo-600 transition-all uppercase">{t.terms}</Link>
               <Link to="/contact" className="hover:text-indigo-600 transition-all uppercase">{t.contact}</Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-xs font-semibold text-slate-500 font-sans tracking-wide">
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

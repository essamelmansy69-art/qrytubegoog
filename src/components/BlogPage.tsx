import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, ArrowLeft, ArrowRight, Clock } from 'lucide-react';

type Language = 'ar' | 'en';

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
            مهما كان سيو الفيديو ممتازاً، فلن يتصدر الترتيب إذا كان المشاهد يغلق الفيديو بعد 5 ثوانٍ فقط. نسبة الاحتفاظ بالمشاهد (Retention Rate) ومعدل البقاء والتشغيل هي المقياس الأساسي لجودة المحتوى بالنسبة ليوتيوب. صمّم مقدمة فيديو حماسية (Hook), وتجنب الحشو غير المفيد لضمان استمتاع المشاهد حتى النهاية والحفاظ على ريادة نتائج البحث لسنوات قادمة.
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
            Entering intricate passwords or performing dynamic two-factor verification on mobile web views is exhausting. Modern users prioritize instant gratification. The split-second requirement to enter Google login credentials completely kills the impulse to subscribe, causing massive gains in cross-platform engagement.
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
        <div className="space-y-6 leading-relaxed text-sm md:text-base text-slate-350 font-medium">
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

export default function BlogPage({ lang }: { lang: Language }) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Scroll to top when changing posts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPostId]);

  const posts = BLOG_POSTS[lang];
  const activePost = posts.find((p) => p.id === selectedPostId);

  return (
    <div id="blog-root-section" className="w-full min-h-[75vh] bg-[#090d16] text-slate-100 rounded-[2.5rem] border border-slate-800 p-6 md:p-12 shadow-3xl relative overflow-hidden transition-all duration-300">
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
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 shadow-md rounded-full text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'سيو ونمو القنوات بالذكاء الاصطناعي' : 'Creator Growth Strategy Base'}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight select-none font-sans">
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
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60" />
                      
                      {/* Floating tag */}
                      <div className="absolute top-3 right-3 bg-indigo-600/90 text-white text-[10px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase shadow-md font-sans">
                        {post.readTime}
                      </div>
                    </div>

                    {/* Metadata body */}
                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      <div className="flex items-center gap-3 text-slate-500 text-[11px] font-bold">
                        <span className="flex items-center gap-1.5 font-sans">
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

                      <div className="pt-2 flex items-center gap-1 text-xs font-bold text-violet-400 group-hover:text-violet-300 transition-colors mt-auto font-sans">
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
                  loading="eager"
                  fetchpriority="high"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/30 to-black/20" />
                
                {/* Embedded tags */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs font-bold text-white/90">
                    <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm font-sans">
                      <Calendar className="w-3.5 h-3.5 text-violet-400" />
                      {activePost?.date}
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm font-sans">
                      <Clock className="w-3.5 h-3.5 text-violet-400" />
                      {activePost?.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content body with headings explicitly for SEO */}
              <div className="bg-[#111827]/40 border border-slate-800/60 rounded-[2.25rem] p-6 md:p-10 space-y-6">
                <h1 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight border-b border-slate-800 pb-6 font-sans">
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3.5 px-6 rounded-2xl shadow-md uppercase transition-all whitespace-nowrap active:scale-95 font-sans"
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

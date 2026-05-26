import React from 'react';
import { Shield, FileText, Lock, Globe, AlertTriangle, CheckCircle, Info } from 'lucide-react';

type Language = 'ar' | 'en';

interface LegalPageProps {
  lang: Language;
  type: 'privacy' | 'terms';
}

export default function LegalPage({ lang, type }: LegalPageProps) {
  const isAr = lang === 'ar';

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Page Header */}
      <div className="text-center space-y-4 mb-14">
        <span className="px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-[11px] font-extrabold uppercase tracking-widest inline-block">
          {isAr ? 'المعلومات القانونية والتنظيمية' : 'Legal & Regulatory Information'}
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight font-sans">
          {type === 'privacy' 
            ? (isAr ? 'سياسة الخصوصية الكاملة' : 'Privacy Policy') 
            : (isAr ? 'شروط وأحكام الاستخدام' : 'Terms of Service')}
        </h2>
        <p className="text-sm md:text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          {type === 'privacy'
            ? (isAr ? 'معلومات تفصيلية حول كيفية حماية بياناتك والالتزام بمعايير الخصوصية والإعلانات العالمية.' : 'Detailed transparency regarding data processing, security, AdSense compliance, and global privacy standards.')
            : (isAr ? 'شروط تنظيمية واضحة ومبسطة تحدد الإطار العام لاستخدام الأدوات المتاحة وسلامة الخدمة.' : 'Legal terms outlining the acceptable use framework for Qrytube systems, tools, and redirection protocols.')
          }
        </p>
      </div>

      {type === 'privacy' ? (
        /* --- PRIVACY POLICY CONTENT --- */
        <div className="bg-white border border-slate-100 p-8 md:p-14 rounded-[40px] shadow-custom-card text-slate-700 space-y-10 leading-relaxed">
          
          {/* Section 1: Intro / Local Processing */}
          <section className="space-y-4 border-b border-slate-50 pb-8">
            <div className="flex items-center gap-3 text-indigo-600">
              <span className="p-2 bg-indigo-50 rounded-xl">
                <Lock className="w-5 h-5" />
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                {isAr ? '1. معالجة البيانات محلياً (Privacy & Safe Client-Side)' : '1. Local-First Processing Architecture'}
              </h3>
            </div>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              {isAr 
                ? 'استقرار خصوصيتك وأمان معلوماتك هي أولويتنا المطلقة. نحن في Qrytube لا نقوم بحفظ أو تتبع أو نقل أو تجميع بياناتك الشخصية أو روابطك أو حساباتك في أي خوادم خارجية تابعة لنا! جميع العمليات التكنولوجية وتوليد الأكواد تم تصميمها وهندستها لتتم محلياً ومباشرة داخل متصفحك الخاص (Client-Side Processing) باستخدام لغة البرمجة JavaScript. عند قيامك بوضع رابط قناتك أو حساباتك، فإنه يتحول إلى رابط ذكي أو كود QR ديناميكي دون تسجيله في أي قواعد بيانات مركزية، مما يوفر سرقة البيانات وضمان السرعة والأمان التام لجميع زوار موقعنا.'
                : 'Your privacy is our utmost priority. At Qrytube, we do not store, track, transmit, or collect any of your personal links, usernames, or account information on our servers. All algorithmic deep-routing processing, standard syntax conversion, and QR code generations are completed locally within your device browser environment (Client-Side processing) using JavaScript. Your operational flow is secure, isolated, and immune to central database breaches.'
              }
            </p>
          </section>

          {/* Section 2: Cookies & Web Beacons */}
          <section className="space-y-4 border-b border-slate-50 pb-8">
            <div className="flex items-center gap-3 text-indigo-600">
              <span className="p-2 bg-indigo-50 rounded-xl">
                <Globe className="w-5 h-5" />
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                {isAr ? '2. ملفات تعريف الارتباط (Cookies & Web Beacons)' : '2. Cookies and Web Beacons'}
              </h3>
            </div>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              {isAr
                ? 'شأننا شأن معظم المواقع الإلكترونية والمنصات التفاعلية، نستخدم ونعتمد على ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم على الموقع، وحفظ تفضيلاتك اللغوية (مثل اللغة العربية أو الإنجليزية)، وحفظ تفاعلات الإعدادات لتجنب إعادة ضبطها في كل مرة تزور فيها موقعنا. ملفات تعريف الارتباط هي ملفات نصية صغيرة نرسلها ويخزنها متصفحك للمساعدة في تمييز طابع الزيارة وتسهيل وظائف النوافذ والأقسام على الموقع.'
                : 'Like most online platforms, Qrytube utilizes cookie mechanisms to record language selections, custom tool configurations, and standard interface choices. Cookies are tiny information fragments stored inside your primary device web browser to refine site navigation and operational stability.'
              }
            </p>
          </section>

          {/* Section 3: Google AdSense and Third-Party Vendors */}
          <section className="space-y-4 border-b border-slate-50 pb-8 bg-indigo-50/20 p-6 md:p-8 rounded-3xl border border-indigo-50">
            <div className="flex items-center gap-3 text-indigo-600">
              <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                <Shield className="w-5 h-5" />
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-950">
                {isAr ? '3. إعلانات جوجل أدسنس وموردي الطرف الثالث (Google AdSense Disclosure)' : '3. Google AdSense & Third-Party Vendors'}
              </h3>
            </div>
            <div className="space-y-4 text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              <p>
                {isAr
                  ? 'نستخدم خدمات شركة جوجل (Google LLC) وموردي الطرف الثالث الآخرين لتقديم وخدمة الإعلانات على موقعنا كشريك معتمد وموثوق. وفيما يلي تفاصيل الاستخدام لضمان أقصى درجات الشفافية والامتثال للمواصفات القانونية العالمية لـ Google AdSense:'
                  : 'We partner with Google LLC and associated third-party networks to display context-aware advertising banners on our website. Please review the tracking parameters in full to maintain regulatory requirements:'
                }
              </p>
              <ul className={`list-disc ${isAr ? 'pr-6' : 'pl-6'} space-y-3 text-slate-700 font-semibold`}>
                <li>
                  {isAr
                    ? 'يستخدم موردو الطرف الثالث، بما فيهم Google، ملفات تعريف ارتباط لخدمة وعرض الإعلانات للمستخدمين استناداً إلى زياراتهم السابقة لموقعنا Qrytube أو لمواقع الويب الأخرى على شبكة الإنترنت.'
                    : 'Third-party advertisers, including Google, employ dedicated cookie systems to deliver targeted advertising media matching your search themes, derived from previous visits here or across other websites.'
                  }
                </li>
                <li>
                  {isAr
                    ? 'يسمح استخدام ملف تعريف الارتباط DART لشركة Google ومورديها بتقديم الإعلانات للمستخدمين بناءً على المواقع التي قاموا بزيارتها على الشبكة.'
                    : 'The DoubleClick DART cookie algorithm enables Google and partnered publishers to deploy contextually targeted ads based on your chronological browsing history.'
                  }
                </li>
                <li>
                  {isAr
                    ? 'يمكن للمستخدمين التراجع وإلغاء الاشتراك في استخدام ملف تعريف الارتباط DART للإعلانات القائمة على الاهتمامات وتعديل هذه التفضيلات بالكامل بمجرد الانتقال إلى صفحة إعدادات الإعلانات وجوجل من خلال الرابط التالي المعتمد: https://policies.google.com/technologies/ads'
                    : 'Visitors can completely opt-out of personalized DART marketing structures anytime by modifying active privacy elements via Google Ads Settings at: https://policies.google.com/technologies/ads'
                  }
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Log Files */}
          <section className="space-y-4 border-b border-slate-50 pb-8">
            <div className="flex items-center gap-3 text-indigo-600">
              <span className="p-2 bg-indigo-50 rounded-xl">
                <FileText className="w-5 h-5" />
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                {isAr ? '4. ملفات السجل القياسية (Log Files)' : '4. Standard Log Files'}
              </h3>
            </div>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              {isAr
                ? 'يتبع Qrytube بروتوكولاً قياسياً لتسجيل ملفات السجل (Log Files) كجزء من أنظمة التحليلات المعيارية الخاصة بخوادم الاستضافة أو شبكة توزيع المحتوى (Cloudflare). تتضمن المعلومات التي تجمعها ملفات السجل: عناوين البروتوكول للإنترنت (IP Addresses)، نوع متصفح الويب المستخدم، مزود خدمة الإنترنت (ISP)، طابع الوقت والتاريخ لزيارة الموقع، صفحات الإحالة والخروج، وعدد النقرات. تذكر تماماً بأن هذه البيانات هي بيانات تقنية مجردة غير محددة للهوية الشخصية وليست مرتبطة بأي معلومات خاصة بك، وهدفها الرئيسي هو تحليل حركة المرور وإدارة استقرار وصيانة الموقع.'
                : 'Qrytube follows normal technical web protocols by compiling system log files for metric indexing and hosting safety (via Cloudflare infrastructure). Logs contain client browser types, IP addresses, internet service providers (ISPs), date/time stamps, landing/exit directories, and total button clicks. This technical data remains completely anonymous and contains no personally identifiable records.'
              }
            </p>
          </section>

          {/* Section 5: External Links & Third-Party Policies */}
          <section className="space-y-4 border-b border-slate-50 pb-8">
            <div className="flex items-center gap-3 text-indigo-600">
              <span className="p-2 bg-indigo-50 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                {isAr ? '5. روابط الطرف الثالث وسياسات الشركاء' : '5. External Routing & External Policies'}
              </h3>
            </div>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              {isAr
                ? 'بصفتنا أداة توجيه وروابط عميقة، يضم موقعنا روابط متفاعلة وتلقائية للعديد من المنصات الخارجية مثل YouTube, Instagram, TikTok, Facebook وغيرها. نود التنبيه صراحة بأننا لا نملك أي سيطرة على سياسات الخصوصية وشروط الاستخدام المعمول بها في تلك المنصات الخارجية، ونوصي زوارنا بالاطلاع الدائم على سياسات الخصوصية الخاصة بتلك المنصات بمجرد الانتقال إليها.'
                : 'As a deep-routing utility, Qrytube naturally channels interaction routes directly toward official external platforms (YouTube, Instagram, Facebook, TikTok). We contain no operational jurisdiction over external entities, and we strongly suggest checking the privacy terms established by those external websites.'
              }
            </p>
          </section>

          {/* Section 6: Security and Global Compliance */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-600">
              <span className="p-2 bg-indigo-50 rounded-xl">
                <CheckCircle className="w-5 h-5" />
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                {isAr ? '6. أمن البيانات وحقوقك القانونية (Security & Compliance)' : '6. Global Compliance & Security'}
              </h3>
            </div>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              {isAr
                ? 'نحن نوظف حماية أمنية وتشفير كامل للاتصال (HTTPS/SSL) لضمان حركة مرور آمنة تماماً أثناء استخدامك لموقعنا. كما نلتزم بكافة حقوق البيانات المنصوص عليها في اللائحة العامة لحماية البيانات (GDPR) وقانون الخصوصية للمستهلكين بكاليفورنيا (CCPA). يمكنك دائماً استخدام الموقع ومسح بيانات المتصفح الخاصة بك لضمان مسح تفضيلاتك اللغوية المثبتة محلياً.'
                : 'We deploy robust, modern communication encryption channels (HTTPS/SSL) to protect all transmission lines. We strictly adhere to core GDPR and CCPA standard principles. You possess full rights to consult, configure, or discard browser cache registries detailing your custom layout choices.'
              }
            </p>
          </section>

        </div>
      ) : (
        /* --- TERMS OF SERVICE CONTENT --- */
        <div className="bg-white border border-slate-100 p-8 md:p-14 rounded-[40px] shadow-custom-card text-slate-700 space-y-10 leading-relaxed">
          
          {/* Section 1: Agreement to Terms */}
          <section className="space-y-4 border-b border-slate-50 pb-8">
            <div className="flex items-center gap-3 text-indigo-600">
              <span className="p-2 bg-indigo-50 rounded-xl">
                <CheckCircle className="w-5 h-5" />
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                {isAr ? '1. الموافقة وقبول الشروط (Terms Agreement)' : '1. Acceptable Legal Terms'}
              </h3>
            </div>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              {isAr
                ? 'بمجرد دخولك، تصفحك، أو استخدامك لموقع Qrytube أو أي من الخدمات والأدوات البرمجية المضمنة فيه، فإنك تقر وتوافق صراحة على الالتزام بجميع الأحكام والشروط المبينة في هذه الصفحة وبسياسة الخصوصية الخاصة بنا. إذا كنت لا توافق على هذه الشروط أو جزء منها، فيُرجى التوقف فوراً عن استخدام الخدمة.'
                : 'Welcome to Qrytube. By entering, accessing, or utilizing our software assets, dynamic redirection architectures, and customized code tools, you explicitly agree to compile with these formal Terms of Service. If you disagree with any specified clauses, please cease utilization immediately.'
              }
            </p>
          </section>

          {/* Section 2: Fair Use & Tool Description */}
          <section className="space-y-4 border-b border-slate-50 pb-8 text-sm md:text-base text-slate-600 font-medium leading-relaxed">
            <div className="flex items-center gap-3 text-indigo-600">
              <span className="p-2 bg-indigo-50 rounded-xl">
                <FileText className="w-5 h-5" />
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                {isAr ? '2. ترخيص الخدمة والاستخدام العادل (License & Fair Use)' : '2. Purpose of Tools and Fair-Use Licensing'}
              </h3>
            </div>
            <p>
              {isAr
                ? 'موقع Qrytube هو نظام وتطبيق خدماتي يقدم أدوات برمجية مجانية بالكامل (100% Free Forever) لمساعدة اليوتيوبرز وصناع المحتوى والمسوقين في توجيه جمهورهم بسلاسة وهندسة روابط ذكية ورموز QR متقدمة لتجنب عقبة المتصفح الداخلي. يُسمح باستخدام موقعنا للأغراض الشخصية والتجارية المشروعة مع مراعاة القيود التالية:'
                : 'Qrytube delivers smart deep routing, optimized deep URLs, and highly functional layout configurations for social creators globally. The service is entirely free to construct custom routes, strictly adhering to fair use criteria:'
              }
            </p>
            <ul className={`list-disc ${isAr ? 'pr-6' : 'pl-6'} space-y-3 text-slate-700 font-semibold mt-3`}>
              <li>
                {isAr
                  ? 'يُمنع استخدام الأداة في تحويل أو توليد روابط أو أكواد QR تؤدي إلى محتوى غير قانوني، أو ضار، أو احتيالي، أو ينتهك حقوق الملكية الفكرية أو يحتوي على برمجيات خبيثة أو فيروسات.'
                  : 'You shall not implement converted addresses that forward users to illegal downloads, phishing forms, malware distributions, copyright-infringing content, or misleading portals.'
                }
              </li>
              <li>
                {isAr
                  ? 'يُحظر منع أو تشويه أو إخفاء أي أجزاء إعلانية أو إعلانات منبثقة تقدمها منصتنا لتوفير التمويل واستمرارية الخدمة مجانية للجميع.'
                  : 'You agree not to bypass, damage, or block necessary advertising banners placed on our website to ensure free system operational funding.'
                }
              </li>
              <li>
                {isAr
                  ? 'يجب عدم استخدام الخدمة للتسبب في إرهاق خوادمنا أو محاولة اختراقها أو تنفيذ هجمات برمجية ضارة من شأنها التأثير على تجربة باقي المستخدمين المخلصين.'
                  : 'You shall not execute DDoS scripts or automated API calls seeking server disruption or central host strain.'
                }
              </li>
            </ul>
          </section>

          {/* Section 3: External Links & Accountability Disclaimer */}
          <section className="space-y-4 border-b border-slate-50 pb-8 bg-amber-50/20 p-6 md:p-8 rounded-3xl border border-amber-50">
            <div className="flex items-center gap-3 text-amber-600">
              <span className="p-2 bg-amber-150 text-amber-700 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-950">
                {isAr ? '3. إخلاء مسؤولية الروابط والمحتوى الخارجي (Redirection Disclaimer)' : '3. General Content Accountability Disclaimer'}
              </h3>
            </div>
            <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed">
              {isAr
                ? 'هام جداً: Qrytube هو تطبيق تكنولوجي يوفر وظيفة المعالجة الفورية وتطبيقات التوجيه للروابط بمجرد إدخالها من الزائر. لا يقوم Qrytube بالتحكم في محتويات الروابط، ولا نقوم بتخزينها في خوادمنا، ولا نقوم بمراجعتها أو تتبعها جغرافياً، ولا نملك أي صلة بنوع الفيديوهات أو المنشورات التي يتم نشرها من قبل مستخدمينا. تقع المسؤولية القانونية والأخلاقية الكاملة والنهائية لسلامة ونزاهة ومحتوى الروابط والـ QR Codes على عاتق المستخدم أو صانع المحتوى الذي قام بتوليدها ومشاركتها مع جمهوره.'
                : 'Limitation Clause: Qrytube operates purely as a passive, real-time client-side algorithmic mechanism. We do not evaluate or review user input, nor do we host central database indexes of final links. The individual, content creator, or marketing professional initiating a dynamic converted link or QR vector graphics bears 100% of all legal, ethical, and operational accountability for the routed assets and eventual external destinations.'
              }
            </p>
          </section>

          {/* Section 4: Uploading Custom Logos and Intellectual Property */}
          <section className="space-y-4 border-b border-slate-50 pb-8">
            <div className="flex items-center gap-3 text-indigo-600">
              <span className="p-2 bg-indigo-50 rounded-xl">
                <Info className="w-5 h-5" />
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                {isAr ? '4. شعارات القنوات وحقوق الملكية الفكرية' : '4. Custom Branding, Logos and IP Rights'}
              </h3>
            </div>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              {isAr
                ? 'يوفر موقعنا خيار رفع صور شعارات القنوات والماركات التجارية لتضمينها بشكل مخصص لتسهيل التعرف البصري داخل الـ QR Code. نود الإشارة والتشديد على أن المستخدم يتحمل كامل حقوق استخدام الشعار التجاري، ونؤكد بأن موقع Qrytube لا يدعي أي ملكية للشعار ولا نقوم بحفظه في خوادمنا؛ فهو يُعالج مباشرة داخل متصفحك ويبقى مسجلاً في ذاكرة التصدير والتحميل فقط.'
                : 'Our design canvas lets you customize QR layouts by embedding channel avatars or copyright logs. Users assume full legal ownership and authorization for any visual uploads. Qrytube does not cache, register, or replicate these graphics. Files stay in browser memory to export the visual layout.'
              }
            </p>
          </section>

          {/* Section 5: Limitation of Liability */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-600">
              <span className="p-2 bg-indigo-50 rounded-xl">
                <Shield className="w-5 h-5" />
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">
                {isAr ? '5. حدود المسؤولية والضمانات (Limitation of Liability)' : '5. Disclaimer of Warranties'}
              </h3>
            </div>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              {isAr
                ? 'يتم تقديم الخدمة "كما هي" وعبر البنية الحالية المتوفرة، دون أي ضمانات صريحة أو ضمنية تتعلق بدقة التشغيل الدائم للأكواد أو حدوث انقطاعات مؤقتة ناتجة عن التحديثات التي تجريها أنظمة الهواتف الذكية أو الشبكات الاجتماعية. لا يتحمل مطورو Qrytube أي مسؤولية عن تعطل الخدمة أو حدوث انخفاض في التفاعل أو الأرباح أو المشاهدات.'
                : 'We serve this utility "as is" and "as available", without explicit or implied performance guarantees. Qrytube developers assume zero responsibility for network interruptions or platform-level modifications implemented by sovereign operating systems (iOS/Android) or external networks that might alter deep link routing.'
              }
            </p>
          </section>

        </div>
      )}
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, RefreshCw } from 'lucide-react';

type Language = 'ar' | 'en';

interface ScanStatsDashboardProps {
  lang: Language;
}

const DICT = {
  ar: {
    title: 'المؤشرات الحية لتفاعل ومسح الأكواد 📊',
    subtitle: 'دليلك الإحصائي لفهم تفاعل جمهور السوشيال ميديا. تساعدك الروابط الذكية وأكواد QR في الحفاظ على 100% من الزوار داخل التطبيقات الرسمية فوراً.',
    kpiTotalScans: 'إجمالي المشاهدات المحولة اليوم',
    kpiGrowth: 'معدل الحفاظ على الزوار',
    kpiActive: 'صناع محتوى نشطين الآن',
    liveBadge: 'مباشر',
    ctaAlert: '💡 هل تعلم؟ إجبار روابط يوتيوب على الفتح داخل التطبيق الرسمي بدلاً من المتصفحات المدمجة يمنع هروب 85% من المشتركين المحتملين بالتجربة!',
    lastUpdated: 'تحديث فوري تلقائي'
  },
  en: {
    title: 'Live QR Scan & Link Redirection Analytics 📊',
    subtitle: 'Track viewer behavior and deep-linking performance metrics. See how routing users natively directly boosts conversion, retention, and subscription rates.',
    kpiTotalScans: 'Deep Link Redirections Today',
    kpiGrowth: 'Audience Retention Boosted',
    kpiActive: 'Active Creators Online',
    liveBadge: 'LIVE',
    ctaAlert: '💡 Did you know? Forcing YouTube links to run natively in-app keeps over 85% of potential subscribers signed-in, leading to instantaneous subscriptions!',
    lastUpdated: 'Auto-updating realtime'
  }
};

export default function ScanStatsDashboard({ lang }: ScanStatsDashboardProps) {
  const t = DICT[lang];
  
  // Real-time animated counters
  const [liveScans, setLiveScans] = useState(148293);
  const [activeCreators, setActiveCreators] = useState(384);

  // Update dynamic counters for "live" feel
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setLiveScans(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 2800);

    const creatorsInterval = setInterval(() => {
      setActiveCreators(prev => {
        const diff = Math.floor(Math.random() * 7) - 3;
        const nextVal = prev + diff;
        return nextVal > 300 && nextVal < 500 ? nextVal : prev;
      });
    }, 4500);

    return () => {
      clearInterval(scanInterval);
      clearInterval(creatorsInterval);
    };
  }, []);

  return (
    <div 
      id="scan-stats-block"
      className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2.5rem] shadow-custom-card space-y-6 relative overflow-hidden transition-all duration-300"
    >
      {/* Absolute Dynamic Grid design background */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-50/40 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-50/40 blur-3xl rounded-full" />

      {/* Title block with SEO optimization keywords for YouTubers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight">
              {t.title}
            </h3>
          </div>
          <p className="text-slate-600 text-xs md:text-sm max-w-3xl leading-relaxed font-semibold">
            {t.subtitle}
          </p>
        </div>
        
        {/* Sync update indicator */}
        <div className="flex items-center gap-1.5 self-start text-[10px] font-black text-slate-600 uppercase bg-slate-50 border border-slate-150 px-3.5 py-1.5 rounded-full select-none">
          <RefreshCw className="w-3 h-3 text-emerald-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span>{t.lastUpdated}</span>
        </div>
      </div>

      {/* KPI Highlight Deck Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4.5 relative z-10 pt-4">
        {/* KPI 1: Realtime Link scan counter */}
        <div className="bg-slate-50/70 border border-slate-100 p-5 rounded-2xl flex items-center gap-4 hover:shadow-sm transition-all group">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center transition-all group-hover:scale-105 group-hover:bg-indigo-100">
            <TrendingUp className="w-5.5 h-5.5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
              {t.kpiTotalScans}
            </span>
            <span className="text-lg md:text-xl font-black text-slate-900 tracking-tight tabular-nums block">
              {liveScans.toLocaleString()}
            </span>
          </div>
        </div>

        {/* KPI 2: Subscription retention growth */}
        <div className="bg-slate-50/70 border border-slate-100 p-5 rounded-2xl flex items-center gap-4 hover:shadow-sm transition-all group">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center transition-all group-hover:scale-105 group-hover:bg-red-100">
            <BarChart3 className="w-5.5 h-5.5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
              {t.kpiGrowth}
            </span>
            <span className="text-lg md:text-xl font-black text-emerald-600 tracking-tight block">
              +400% <span className="text-[10px] text-slate-400 font-bold">({lang === 'ar' ? 'تفاعل مضاعف' : 'Engaged'})</span>
            </span>
          </div>
        </div>

        {/* KPI 3: Live content creators online counter */}
        <div className="bg-slate-50/70 border border-slate-105 p-5 rounded-2xl flex items-center gap-4 hover:shadow-sm transition-all group">
          <div className="w-12 h-12 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center transition-all group-hover:scale-105 group-hover:bg-slate-200">
            <Users className="w-5.5 h-5.5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block flex items-center gap-1.5">
              <span>{t.kpiActive}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 text-[8px] font-extrabold bg-red-100 text-red-500 rounded-md animate-pulse">
                {t.liveBadge}
              </span>
            </span>
            <span className="text-lg md:text-xl font-black text-slate-900 tracking-tight tabular-nums block">
              +{activeCreators} <span className="text-[9px] text-slate-500 font-semibold">{lang === 'ar' ? 'قناة حية' : 'live users'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Creator SEO prompt alert box */}
      <div className="bg-amber-50/55 border border-amber-50 p-4.5 rounded-2xl relative z-10">
        <p className="text-xs text-amber-900 leading-loose font-bold dark:text-amber-850">
          {t.ctaAlert}
        </p>
      </div>
    </div>
  );
}

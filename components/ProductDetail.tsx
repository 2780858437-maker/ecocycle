
import React, { useEffect, useState } from 'react';
import { ShieldCheck, FileText, Share2, Heart, Award, Info, ChevronRight, PlayCircle, Sparkles, Palette, History, MapPin } from 'lucide-react';
import { MaterialInfo, UserRole, TraceabilityStep } from '../types';
import CreditGauge from './CreditGauge';
import TransactionProcess, { ProcessStage } from './TransactionProcess';
import { generateMaterialStory, getDesignInspiration } from '../lib/gemini';

interface ProductDetailProps {
  material: MaterialInfo;
  userRole: UserRole;
  onBack: () => void;
}

const mockTraceability: TraceabilityStep[] = [
  { date: '2024-08-28 10:00', action: '物料归集', location: '台州市路桥区回收站', operator: '站长 陈某', description: '从社区回收点归集 2 吨 PET 瓶。' },
  { date: '2024-08-29 14:30', action: '智能分拣', location: '台州环联处理中心', operator: '系统自动', description: '通过光学分拣剔除 3% 的杂质及非标瓶。' },
  { date: '2024-08-31 09:00', action: '粉碎与热洗', location: '台州环联处理中心', operator: '操作员 李某', description: '完成粉碎、去标、热碱洗，达到 A+ 级标准。' },
  { date: '2024-09-02 11:00', action: '质检入库', location: '台州环联处理中心', operator: '质检组', description: 'SGS 抽检合格，生成数字化溯源码。' },
];

const ProductDetail: React.FC<ProductDetailProps> = ({ material, userRole, onBack }) => {
  const [story, setStory] = useState<string>('');
  const [loadingStory, setLoadingStory] = useState(false);
  const [inspirations, setInspirations] = useState<any[]>([]);

  // Map product status to process stage
  const currentStage: ProcessStage = material.status === 'SOLD' ? 'COMPLETED' : 
                                   material.status === 'PROCESSING' ? 'VERIFY' : 'LISTED';

  useEffect(() => {
    setLoadingStory(true);
    Promise.all([
      generateMaterialStory(material.name, material.origin),
      getDesignInspiration(material.name)
    ]).then(([s, ins]) => {
      setStory(s || '');
      setInspirations(ins);
      setLoadingStory(false);
    });
  }, [material]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 pb-24">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-slate-500 font-bold flex items-center gap-1 hover:text-slate-900 group transition-all">
          <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" /> 返回列表
        </button>
        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">当前流通阶段</span>
           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
             material.status === 'AVAILABLE' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
           }`}>
             {material.status === 'AVAILABLE' ? '现货挂牌' : '加工核验中'}
           </span>
        </div>
      </div>

      {/* New Lifecycle Stepper */}
      <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">再生循环及交易全链路</h3>
        <TransactionProcess currentStage={currentStage} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Specs & Trust */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{material.category}</span>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">溯源已认证</span>
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900">{material.name}</h1>
                <p className="text-slate-400 text-sm mt-1">溯源码：ECO-{material.id}-2024</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-slate-50 rounded-xl hover:text-rose-500 transition-all"><Heart className="w-5 h-5" /></button>
                <button className="p-2 bg-slate-50 rounded-xl hover:text-blue-500 transition-all"><Share2 className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Traceability Loop */}
            <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
               <h3 className="font-bold flex items-center gap-2 text-slate-700">
                 <History className="w-4 h-4 text-emerald-600" />
                 闭环溯源轨迹
               </h3>
               <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-100">
                  {mockTraceability.map((step, i) => (
                    <div key={i} className="relative pl-8 group">
                      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 group-last:border-emerald-200"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-slate-800">{step.action}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" /> {step.location}
                          </p>
                        </div>
                        <span className="text-[10px] text-slate-400">{step.date}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 italic leading-relaxed">{step.description}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Technical Specs */}
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                物料核心参数
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(material.specs).map(([k, v]) => (
                  <div key={k} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{k}</p>
                    <p className="text-sm font-black text-slate-800">{v as string}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
             <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-800 mb-2">{material.supplier.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {material.supplier.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  信用评分在同类供应商中排名前 5%，具备完整的数字化溯源体系及政府合规认证。
                </p>
             </div>
             <CreditGauge score={material.supplier.creditScore} size={90} />
          </div>
        </div>

        {/* Right: Media & AI Insights */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
            <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden relative group">
               <img src={material.images[0]} alt="main" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white/80" />
               </div>
            </div>
          </div>

          <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-indigo-400" />
                AI 循环故事
              </h3>
              {loadingStory ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 bg-indigo-800 rounded w-full"></div>
                  <div className="h-4 bg-indigo-800 rounded w-5/6"></div>
                </div>
              ) : (
                <p className="text-indigo-100 text-sm leading-relaxed italic line-clamp-6">“{story}”</p>
              )}
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>

          {userRole === UserRole.DESIGNER && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Palette className="w-5 h-5 text-indigo-500" />
                再生设计灵感
              </h3>
              <div className="space-y-4">
                {inspirations.map((ins, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all">
                    <p className="font-bold text-slate-800 text-sm">{ins.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{ins.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-50">
         <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
            <div>
               <p className="text-[10px] text-slate-400 font-bold uppercase">实时现货单价</p>
               <p className="text-xl font-black">¥ {material.price.toLocaleString()} <span className="text-xs font-normal opacity-60">/ 吨</span></p>
            </div>
            <div className="flex gap-2">
               <button className="px-6 py-3 border border-white/20 rounded-xl font-bold hover:bg-white/10 transition-all">索取样品</button>
               <button className="px-8 py-3 bg-emerald-500 text-slate-900 rounded-xl font-bold hover:bg-emerald-400 transition-all">立即洽谈采购</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProductDetail;


import React, { useState } from 'react';
import { Mic, Check, ArrowRight, ArrowLeft, Upload, CheckCircle2 } from 'lucide-react';

const steps = [
  { id: 1, label: '品类', question: '请选择您要卖的废料种类', type: 'category', options: ['废塑料 (PET)', '废金属 (铝)', '废纸', '电子废弃物'] },
  { id: 2, label: '照片', question: '请上传一张能看清实物状态的照片', type: 'image', help: '好的照片能让价格提高 15%' },
  { id: 3, label: '规格', question: '该货品的纯净度和处理程度如何？', type: 'specs', options: ['已清洗/去标', '带标带盖', '未分拣毛料'] },
  { id: 4, label: '预估', question: '大概有多少重量？（吨）', type: 'weight' },
];

const UploadStepper: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [completed, setCompleted] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    else setCompleted(true);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (completed) {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-xl flex flex-col items-center text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">发布成功！</h2>
        <p className="text-slate-500 mb-8 max-w-sm">您的货品信息已同步至全网采购商，系统正在为您智能匹配最优报价。</p>
        <button 
          onClick={onComplete}
          className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:scale-105 transition-all"
        >
          返回工作台
        </button>
      </div>
    );
  }

  const stepInfo = steps[currentStep - 1];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Progress */}
      <div className="flex justify-between items-center px-4">
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              currentStep === s.id ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' : 
              currentStep > s.id ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
            }`}>
              {currentStep > s.id ? <Check className="w-4 h-4" /> : s.id}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${currentStep === s.id ? 'text-emerald-600' : 'text-slate-400'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[400px] flex flex-col">
        <h2 className="text-xl font-bold text-slate-800 mb-8 text-center">{stepInfo.question}</h2>
        
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          {stepInfo.type === 'category' && (
            <div className="grid grid-cols-2 gap-4 w-full">
              {stepInfo.options?.map(opt => (
                <button key={opt} onClick={nextStep} className="p-6 rounded-2xl border-2 border-slate-50 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 font-bold transition-all text-sm">
                  {opt}
                </button>
              ))}
            </div>
          )}

          {stepInfo.type === 'image' && (
            <div className="w-full flex flex-col items-center gap-6">
               <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="space-y-2">
                    <div className="aspect-video bg-emerald-50 rounded-xl border-2 border-emerald-200 flex items-center justify-center overflow-hidden">
                       <img src="https://picsum.photos/300/200?random=11" alt="correct" className="opacity-50 grayscale-0" />
                       <div className="absolute bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">正确示例 ✓</div>
                    </div>
                    <p className="text-[10px] text-center text-slate-400">光线明亮，货物清晰</p>
                  </div>
                  <div className="space-y-2">
                    <div className="aspect-video bg-red-50 rounded-xl border-2 border-red-200 flex items-center justify-center overflow-hidden">
                       <img src="https://picsum.photos/300/200?random=12" alt="wrong" className="opacity-30 grayscale" />
                       <div className="absolute bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">错误示例 ✗</div>
                    </div>
                    <p className="text-[10px] text-center text-slate-400">背景杂乱，看不清细节</p>
                  </div>
               </div>
               <button className="w-full py-12 border-2 border-dashed border-slate-200 rounded-3xl hover:border-emerald-400 hover:bg-emerald-50 group transition-all flex flex-col items-center justify-center gap-4">
                  <Upload className="w-10 h-10 text-slate-300 group-hover:text-emerald-500 group-hover:scale-110 transition-all" />
                  <span className="text-slate-500 font-medium">点击此处上传或拍照</span>
               </button>
            </div>
          )}

          {stepInfo.type === 'weight' && (
            <div className="w-full space-y-8">
              <div className="flex flex-col items-center gap-4">
                <input 
                  type="number" 
                  placeholder="请输入重量" 
                  className="w-full max-w-xs text-4xl font-bold text-center border-b-2 border-emerald-500 py-4 focus:outline-none bg-transparent"
                />
                <span className="text-slate-400 font-bold">吨 (Tons)</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="text-xs text-slate-400">不习惯打字？按住下方话筒说话</p>
                <button 
                  onMouseDown={() => setIsRecording(true)}
                  onMouseUp={() => { setIsRecording(false); nextStep(); }}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${isRecording ? 'bg-red-500 scale-125 ring-8 ring-red-100' : 'bg-slate-100 text-slate-500 hover:bg-emerald-100 hover:text-emerald-600'}`}
                >
                  <Mic className={`w-8 h-8 ${isRecording ? 'text-white' : ''}`} />
                </button>
              </div>
            </div>
          )}

          {stepInfo.type === 'specs' && (
            <div className="grid grid-cols-1 gap-4 w-full">
              {stepInfo.options?.map(opt => (
                <button key={opt} onClick={nextStep} className="p-4 rounded-xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 font-bold transition-all flex items-center justify-between">
                  {opt}
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-between">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${currentStep === 1 ? 'opacity-0' : 'text-slate-400 hover:bg-slate-100'}`}
          >
            <ArrowLeft className="w-4 h-4" /> 返回
          </button>
          {stepInfo.type !== 'category' && stepInfo.type !== 'specs' && (
             <button 
             onClick={nextStep}
             className="px-8 py-2 bg-slate-800 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg"
           >
             下一步 <ArrowRight className="w-4 h-4" />
           </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadStepper;

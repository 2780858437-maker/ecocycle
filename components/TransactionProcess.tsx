
import React from 'react';
import { UploadCloud, ClipboardCheck, Store, Handshake, Truck, CheckCircle2 } from 'lucide-react';

export type ProcessStage = 'UPLOAD' | 'VERIFY' | 'LISTED' | 'ORDERED' | 'SHIPPING' | 'COMPLETED';

interface TransactionProcessProps {
  currentStage: ProcessStage;
  className?: string;
}

const steps = [
  { id: 'UPLOAD', label: '物料上传', icon: UploadCloud, desc: '数字化登记' },
  { id: 'VERIFY', label: '品质核验', icon: ClipboardCheck, desc: '官方/SGS认证' },
  { id: 'LISTED', label: '市场挂牌', icon: Store, desc: '全网公开发布' },
  { id: 'ORDERED', label: '意向锁单', icon: Handshake, desc: '洽谈并支付' },
  { id: 'SHIPPING', label: '绿色物流', icon: Truck, desc: '全程可追溯' },
  { id: 'COMPLETED', label: '交易达成', icon: CheckCircle2, desc: '完成结算' },
];

const TransactionProcess: React.FC<TransactionProcessProps> = ({ currentStage, className = "" }) => {
  const currentIdx = steps.findIndex(s => s.id === currentStage);

  return (
    <div className={`w-full py-8 ${className}`}>
      <div className="relative flex justify-between items-start">
        {/* Connection Line Background */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-slate-100 -z-10 hidden md:block" />
        
        {/* Active Line Progress */}
        <div 
          className="absolute top-6 left-0 h-0.5 bg-emerald-500 transition-all duration-1000 ease-in-out -z-10 hidden md:block" 
          style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentIdx;
          const isActive = index === currentIdx;
          const isPending = index > currentIdx;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1 group">
              <div className={`
                relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500
                ${isCompleted ? 'bg-emerald-100 text-emerald-600' : ''}
                ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-110 ring-4 ring-emerald-50' : ''}
                ${isPending ? 'bg-white border-2 border-slate-100 text-slate-300' : ''}
              `}>
                <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                
                {/* Mobile Connection Line */}
                {index < steps.length - 1 && (
                  <div className={`absolute top-1/2 -right-1/2 w-full h-0.5 md:hidden -z-10 ${isCompleted ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                )}
              </div>
              
              <div className="mt-4 text-center px-1">
                <p className={`text-xs font-bold transition-colors ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                  {step.label}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionProcess;

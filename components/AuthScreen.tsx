
import React from 'react';
import { UserRole } from '../types';
import { Recycle, ShieldCheck, Zap, Palette } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (role: UserRole) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-200">
            <Recycle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">EcoCycle 循环云平台</h1>
          <p className="text-slate-500 max-w-md mx-auto">连接废弃物供给侧与设计需求侧，构建透明、可追溯的绿色供应链闭环。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => onLogin(UserRole.SUPPLIER)}
            className="group p-8 bg-slate-50 rounded-3xl border-2 border-transparent hover:border-emerald-500 hover:bg-white transition-all text-left space-y-4"
          >
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">我是供应商</h3>
              <p className="text-sm text-slate-500 mt-1">回收站长/拆解企业，负责废弃物归集与数字化上传。</p>
            </div>
          </button>

          <button 
            onClick={() => onLogin(UserRole.BUYER)}
            className="group p-8 bg-slate-50 rounded-3xl border-2 border-transparent hover:border-blue-500 hover:bg-white transition-all text-left space-y-4"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">我是采购商</h3>
              <p className="text-sm text-slate-500 mt-1">生产制造企业，寻找标准化的再生原材料。</p>
            </div>
          </button>

          <button 
            onClick={() => onLogin(UserRole.DESIGNER)}
            className="group p-8 bg-slate-50 rounded-3xl border-2 border-transparent hover:border-indigo-500 hover:bg-white transition-all text-left space-y-4"
          >
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">我是设计师</h3>
              <p className="text-sm text-slate-500 mt-1">寻找设计灵感，将再生材料转化为高价值产品。</p>
            </div>
          </button>
        </div>

        <div className="text-xs text-slate-400">
          登录即代表您同意 <span className="underline cursor-pointer">服务协议</span> 与 <span className="underline cursor-pointer">隐私政策</span>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;

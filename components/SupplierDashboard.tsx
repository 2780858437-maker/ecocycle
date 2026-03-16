
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, MessageSquare, Package, ChevronRight, Activity } from 'lucide-react';
import TransactionProcess from './TransactionProcess';

const priceData = [
  { name: 'Mon', price: 1200 },
  { name: 'Tue', price: 1250 },
  { name: 'Wed', price: 1180 },
  { name: 'Thu', price: 1210 },
  { name: 'Fri', price: 1280 },
  { name: 'Sat', price: 1300 },
  { name: 'Sun', price: 1350 },
];

const SupplierDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">早上好，陈站长</h1>
          <p className="text-slate-500 mt-1">您今天有 3 个待处理询盘和 5 笔待发货订单。</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          立即发货
        </button>
      </div>

      {/* NEW: Active Transaction Progress */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-lg font-bold flex items-center gap-2">
             <Activity className="w-5 h-5 text-emerald-600" />
             重点交易进度追踪
           </h2>
           <span className="text-xs text-slate-400 font-bold uppercase">订单号：#ORD-202409001</span>
        </div>
        <TransactionProcess currentStage="ORDERED" />
        <div className="mt-8 flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl">🤝</div>
              <div>
                <p className="text-sm font-bold text-slate-800">格力电器已支付定金</p>
                <p className="text-[10px] text-slate-500">等待您预约绿色物流车辆进行拉货</p>
              </div>
           </div>
           <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">预约拉货</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Market Prices */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              实时行情看板
            </h2>
            <span className="text-sm text-slate-400">更新时间: 今日 09:30</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <p className="text-xs text-emerald-600 font-semibold uppercase">再生PET瓶片</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-emerald-700">6,540</span>
                <span className="text-sm text-emerald-600 font-medium">元/吨</span>
                <span className="ml-auto text-xs font-bold text-emerald-600">↑ 2.4%</span>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-600 font-semibold uppercase">废铜 (亮铜)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-blue-700">68,200</span>
                <span className="text-sm text-blue-600 font-medium">元/吨</span>
                <span className="ml-auto text-xs font-bold text-red-600">↓ 0.8%</span>
              </div>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Board */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-500" />
            待我处理
          </h2>
          <div className="space-y-4">
            {[
              { id: 1, title: '新询盘', desc: '美团外卖拟采购 5 吨 PET', time: '10分钟前', icon: '📩' },
              { id: 2, title: '待发货', desc: '订单 #202409012 逾期提醒', time: '2小时前', icon: '📦' },
              { id: 3, title: '审核反馈', desc: '您的“废铝”认证申请已通过', time: '昨日', icon: '✅' },
            ].map((task) => (
              <div key={task.id} className="group flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl">{task.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{task.title}</p>
                  <p className="text-xs text-slate-500 truncate">{task.desc}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{task.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-semibold text-slate-500 flex items-center justify-center gap-1 hover:text-slate-800 transition-colors">
            查看全部 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;

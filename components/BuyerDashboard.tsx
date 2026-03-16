
import React from 'react';
import { ShieldCheck, AlertTriangle, Users, Search, Activity } from 'lucide-react';
import CreditGauge from './CreditGauge';
import TransactionProcess from './TransactionProcess';

const BuyerDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 p-8 rounded-2xl text-white flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden relative">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">欢迎回来，格力电器采购部</h1>
          <p className="text-slate-400 mt-2 text-lg">当前供应链稳定性：<span className="text-emerald-400 font-bold">优秀 (S)</span></p>
        </div>
        <div className="flex gap-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
            <p className="text-xs text-slate-300 font-semibold mb-1">本月节约成本</p>
            <p className="text-2xl font-bold text-white">¥ 125,400</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
            <p className="text-xs text-slate-300 font-semibold mb-1">再生比例</p>
            <p className="text-2xl font-bold text-emerald-400">42.5%</p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* NEW: Buyer Procurement Tracker */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-lg font-bold flex items-center gap-2">
             <Activity className="w-5 h-5 text-blue-600" />
             资源采买进度追踪
           </h2>
           <span className="text-xs text-slate-400 font-bold uppercase">供应商：台州环联再生</span>
        </div>
        <TransactionProcess currentStage="SHIPPING" />
        <div className="mt-8 flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">🚚</div>
              <div>
                <p className="text-sm font-bold text-blue-800">物流车辆已装载完毕</p>
                <p className="text-[10px] text-blue-500">预计明早 08:30 送达珠海总装中心，请安排库房接收</p>
              </div>
           </div>
           <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">查看实时轨迹</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Suppliers List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              核心供应商状态
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="搜索供应商..." className="pl-9 pr-4 py-1.5 bg-slate-50 border-none rounded-full text-xs focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-3 text-left">供应商名称</th>
                  <th className="px-6 py-3 text-left">信用等级</th>
                  <th className="px-6 py-3 text-left">履约状态</th>
                  <th className="px-6 py-3 text-left">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: '上海环创回收有限公司', score: 98, status: '良好', tag: 'A+', trend: 'steady' },
                  { name: '苏州隆盛再生资源', score: 92, status: '异常 (物流延时)', tag: 'A', trend: 'warning' },
                  { name: '义乌市聚美塑料颗粒', score: 85, status: '审核中', tag: 'B', trend: 'processing' },
                ].map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">{s.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${s.score > 90 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{s.tag}</span>
                        <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${s.score > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${s.score}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${s.trend === 'warning' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 font-semibold hover:underline">详情</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            市场风险预警
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm font-bold text-red-800 mb-1">LDPE 价格大幅波动</p>
              <p className="text-xs text-red-600 leading-relaxed">过去 24 小时内，华东地区 LDPE 参考价上涨了 12.5%，建议推迟非紧急采购或寻找备选供应商。</p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="text-sm font-bold text-amber-800 mb-1">重点供应商资质过期</p>
              <p className="text-xs text-amber-600 leading-relaxed">您的核心供应商“苏州隆盛”的环保排污许可证将于 15 天后到期，请及时核查其更新进度。</p>
            </div>
          </div>
          <button className="w-full mt-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-700 transition-colors">
            查看风险报告
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;

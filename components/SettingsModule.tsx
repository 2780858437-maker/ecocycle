
import React, { useState } from 'react';
import { User, ShieldCheck, Zap, Bell, Lock, Globe, Camera, ChevronRight, CheckCircle2, AlertCircle, FileText, Briefcase, Smartphone, Award, Fingerprint, History } from 'lucide-react';
import { UserRole } from '../types';

interface SettingsModuleProps {
  role: UserRole;
}

const SettingsModule: React.FC<SettingsModuleProps> = ({ role }) => {
  const [activeSection, setActiveSection] = useState<'profile' | 'verify' | 'efficiency' | 'security'>('profile');

  // Role-specific mock data for high-fidelity identity demonstration
  const userData = {
    [UserRole.SUPPLIER]: {
      name: '陈华强',
      phone: '138 6768 8888',
      email: 'chen.hq@hl-recycle.com',
      company: '台州环联再生资源发展有限公司',
      position: '回收站站长 / 联合创始人',
      bio: '专注PET/PP再生料深加工15年，深耕长三角回收网络，致力于通过数字化手段提升废弃物资源化效率。',
      verifyLevel: 'L3',
      verifyStatus: '深度核验已通过',
      trustScore: 98,
      docs: [
        { name: '营业执照 (副本)', icon: FileText, expiry: '2035-12-31', status: 'verified', serial: '9133100...X3R' },
        { name: '再生资源回收经营备案', icon: ShieldCheck, expiry: '2028-06-15', status: 'verified', serial: '浙台回备[2021]002' },
        { name: 'ISO14001 环境管理认证', icon: Globe, expiry: '2025-10-20', status: 'verified', serial: 'CNAS-C001-E' }
      ]
    },
    [UserRole.BUYER]: {
      name: '张明',
      phone: '139 1024 6666',
      email: 'zhang.m@gree.com.cn',
      company: '格力电器（珠海）采购管理中心',
      position: '大宗物资采购总监',
      bio: '负责家电板块再生塑料全球战略采购。致力于构建零碳供应链体系，对再生料的物理性能及碳减排数据有严格要求。',
      verifyLevel: 'L2',
      verifyStatus: '大中型企业认证',
      trustScore: 95,
      docs: [
        { name: '企业统一社会信用代码证', icon: FileText, expiry: '2040-05-01', status: 'verified', serial: '9144040...M2J' },
        { name: '格力集团采购授权书', icon: Briefcase, expiry: '2025-01-01', status: 'verified', serial: 'GREE-PUR-2024-08' },
        { name: '绿色制造倡议合作伙伴', icon: Award, expiry: '永久', status: 'verified', serial: 'GMI-2023-PARTNER' }
      ]
    },
    [UserRole.DESIGNER]: {
      name: '林溪',
      phone: '137 5588 9999',
      email: 'linxi@xi-design.studio',
      company: '溪水可持续设计工作室 (Xi Design Studio)',
      position: '首席设计师 / 创始人',
      bio: '探索材料的“第二生命”。擅长将工业废料转化为具有艺术美感的生活物件。曾获红点奖与IF设计奖。',
      verifyLevel: 'L2',
      verifyStatus: '资深设计师认证',
      trustScore: 92,
      docs: [
        { name: '高级工业设计师职业证', icon: ShieldCheck, expiry: '永久', status: 'verified', serial: 'ID-CERT-LX-2018' },
        { name: '工作室商业注册文件', icon: FileText, expiry: '2030-11-22', status: 'verified', serial: 'SH-REG-77821' },
        { name: '可持续材料实验室会员', icon: Zap, expiry: '2025-12-31', status: 'verified', serial: 'SML-MEMBER-0092' }
      ]
    },
    [UserRole.NONE]: { name: '', phone: '', email: '', company: '', position: '', bio: '', verifyLevel: '', verifyStatus: '', trustScore: 0, docs: [] }
  };

  const currentData = userData[role];

  const getRoleColorClass = () => {
    if (role === UserRole.SUPPLIER) return 'text-emerald-600';
    if (role === UserRole.BUYER) return 'text-blue-600';
    return 'text-indigo-600';
  };

  const getRoleBgClass = () => {
    if (role === UserRole.SUPPLIER) return 'bg-emerald-50';
    if (role === UserRole.BUYER) return 'bg-blue-50';
    return 'bg-indigo-50';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
          <div className="mb-6 px-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">设置菜单</h2>
          </div>
          <nav className="space-y-1">
            {[
              { id: 'profile', label: '个人资料', icon: User },
              { id: 'verify', label: '身份与认证', icon: ShieldCheck },
              { id: 'efficiency', label: '效率工具', icon: Zap },
              { id: 'security', label: '安全中心', icon: Lock },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                  activeSection === item.id 
                    ? `bg-slate-900 text-white shadow-xl` 
                    : `text-slate-500 hover:bg-slate-50 hover:text-slate-800`
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {/* Section: Profile */}
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative">
                <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none ${getRoleBgClass()}`} style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                
                <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                  <div className="relative group">
                    <div className="w-28 h-28 rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden border-4 border-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                      <div className={`w-full h-full flex items-center justify-center text-white text-4xl font-black ${getRoleBgClass().replace('bg-', 'bg-').replace('50', '500')}`}>
                        {currentData.name.charAt(0)}
                      </div>
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 hover:scale-110 transition-all">
                      <Camera className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                      <h3 className="text-2xl font-black text-slate-800">{currentData.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getRoleBgClass()} ${getRoleColorClass()}`}>
                        {currentData.position}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">{currentData.company}</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-slate-400 pt-2 font-bold">
                       <span className="flex items-center gap-1"><Smartphone className="w-3 h-3" /> {currentData.phone}</span>
                       <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {currentData.email}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">真实姓名</label>
                      <input type="text" defaultValue={currentData.name} className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-slate-100 focus:bg-white rounded-2xl outline-none text-sm font-bold text-slate-700 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">联系邮箱</label>
                      <input type="email" defaultValue={currentData.email} className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-slate-100 focus:bg-white rounded-2xl outline-none text-sm font-bold text-slate-700 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">业务简介与使命</label>
                    <textarea rows={5} defaultValue={currentData.bio} className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-slate-100 focus:bg-white rounded-2xl outline-none text-sm font-bold text-slate-700 transition-all resize-none leading-relaxed" />
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200">
                    保存个人资料
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section: Identity Verification */}
          {activeSection === 'verify' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-10">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">信任与核验中心</h3>
                    <p className="text-sm text-slate-500 mt-1">完善认证可大幅提升交易对手方的信任度及平台推荐权重。</p>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 ${getRoleBgClass()} ${getRoleColorClass()}`}>
                    <ShieldCheck className="w-4 h-4" /> {currentData.verifyStatus}
                  </div>
                </div>

                {/* Progress Visual */}
                <div className="relative flex justify-between mb-12">
                   <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 -z-10"></div>
                   {[
                     { l: 'L1', n: '实名核验', s: 'done' },
                     { l: 'L2', n: '企业认证', s: 'done' },
                     { l: 'L3', n: '深度工厂核验', s: currentData.verifyLevel === 'L3' ? 'done' : 'doing' }
                   ].map((step, i) => (
                     <div key={i} className="flex flex-col items-center gap-3">
                        <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center font-black text-sm transition-all ${
                          step.s === 'done' ? 'bg-emerald-500 border-emerald-100 text-white' : 'bg-white border-slate-100 text-slate-300'
                        }`}>
                          {step.s === 'done' ? <CheckCircle2 className="w-5 h-5" /> : step.l}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-tighter ${step.s === 'done' ? 'text-slate-800' : 'text-slate-400'}`}>{step.n}</span>
                     </div>
                   ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="p-6 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-slate-100 transition-all">
                      <Fingerprint className="w-6 h-6 text-slate-400 mb-4" />
                      <h4 className="font-bold text-sm text-slate-800">生物识别认证</h4>
                      <p className="text-[10px] text-slate-500 mt-2">已开启面部识别及数字指纹，确保操作者为本人。</p>
                   </div>
                   <div className="p-6 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-slate-100 transition-all">
                      <History className="w-6 h-6 text-slate-400 mb-4" />
                      <h4 className="font-bold text-sm text-slate-800">链上存证轨迹</h4>
                      <p className="text-[10px] text-slate-500 mt-2">您的所有核心资质变更均已在 EcoChain 存证，不可篡改。</p>
                   </div>
                   <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-100">
                      <div className="text-xl font-black text-emerald-600 mb-1">{currentData.trustScore}</div>
                      <h4 className="font-bold text-sm text-emerald-800">动态信用分</h4>
                      <p className="text-[10px] text-emerald-600 mt-2">优于全平台 96.5% 的用户。极高交易权重。</p>
                   </div>
                </div>
              </div>

              {/* Document Repository */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2"><FileText className="w-5 h-5 text-slate-400" /> 核心资质库</h3>
                    <button className="text-[10px] font-black text-slate-900 uppercase tracking-widest hover:underline">上传新资质 +</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentData.docs.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl group hover:bg-white hover:shadow-md hover:border-slate-100 border border-transparent transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${getRoleBgClass()}`}>
                             <doc.icon className={`w-6 h-6 ${getRoleColorClass()}`} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-black text-slate-800 truncate">{doc.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-1">编号：{doc.serial}</p>
                          </div>
                        </div>
                        <div className="text-right">
                           <span className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-black uppercase">已核验</span>
                           <p className="text-[9px] text-slate-400 mt-1 font-bold">有效期至：{doc.expiry}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          {/* Section: Efficiency Tools */}
          {activeSection === 'efficiency' && (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800">专属角色效率工具箱</h3>
                <p className="text-sm text-slate-500 mt-1">根据您作为 <span className={`font-bold ${getRoleColorClass()}`}>{role}</span> 的身份，系统为您预设了以下辅助能力。</p>
              </div>

              <div className="space-y-4">
                {role === UserRole.SUPPLIER && (
                  <>
                    <div className="flex items-center justify-between p-5 border border-slate-100 rounded-3xl hover:bg-emerald-50/30 transition-colors">
                      <div className="flex gap-5">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0"><Zap className="w-6 h-6" /></div>
                        <div>
                          <p className="text-base font-bold text-slate-800">AI 智能辅助报价</p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">实时监测全网 B2B 再生料成交价，自动为您的询盘提供浮动建议。</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-slate-50">
                       <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">常用回复快捷语</h5>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <button className="text-left p-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all">“该批物料含杂率极低，可提供SGS质检报告。”</button>
                          <button className="text-left p-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all">“欢迎实地验厂，华东地区支持绿色物流送达。”</button>
                       </div>
                    </div>
                  </>
                )}

                {role === UserRole.BUYER && (
                  <>
                    <div className="flex items-center justify-between p-5 border border-slate-100 rounded-3xl hover:bg-blue-50/30 transition-colors">
                      <div className="flex gap-5">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0"><Bell className="w-6 h-6" /></div>
                        <div>
                          <p className="text-base font-bold text-slate-800">多维度行情监控</p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">针对 ABS/PP/PET 的大幅波动进行 5% 阈值预警推送。</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4">
                       <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
                       <div className="space-y-1">
                          <p className="text-xs font-bold text-blue-800">自动合同生成</p>
                          <p className="text-[10px] text-blue-600 leading-relaxed">检测到买卖双方意向达成后，自动套用格力电器标准采购模板。</p>
                       </div>
                    </div>
                  </>
                )}

                {role === UserRole.DESIGNER && (
                  <>
                    <div className="flex items-center justify-between p-5 border border-slate-100 rounded-3xl hover:bg-indigo-50/30 transition-colors">
                      <div className="flex gap-5">
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0"><Globe className="w-6 h-6" /></div>
                        <div>
                          <p className="text-base font-bold text-slate-800">灵感库自动同步</p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">将您在 EcoCycle 收藏的材料故事和技术参数同步至 Xi Design 插件。</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Section: Security */}
          {activeSection === 'security' && (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-800">安全与风险控制</h3>
              <div className="divide-y divide-slate-100">
                 <div className="py-6 flex items-center justify-between group">
                    <div>
                       <p className="text-sm font-bold text-slate-800">两步验证 (2FA)</p>
                       <p className="text-xs text-slate-500 mt-1">在处理大额提现或签约时，需要生物特征或短信二次验证。</p>
                    </div>
                    <button className="text-xs font-black text-emerald-600 hover:underline">启用保护</button>
                 </div>
                 <div className="py-6 flex items-center justify-between">
                    <div>
                       <p className="text-sm font-bold text-slate-800">数字证书管理</p>
                       <p className="text-xs text-slate-500 mt-1">查看和撤销当前用于电子签章的 CA 数字证书。</p>
                    </div>
                    <button className="text-xs font-black text-slate-900 hover:underline">查看证书</button>
                 </div>
                 <div className="py-6 flex items-center justify-between opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <div>
                       <p className="text-sm font-bold text-rose-500">注销账户</p>
                       <p className="text-xs text-slate-400 mt-1">彻底删除所有认证记录和历史交易。此操作不可逆。</p>
                    </div>
                    <button className="text-xs font-black text-slate-400 hover:text-rose-600">申请注销</button>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModule;

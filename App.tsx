
import React, { useState } from 'react';
import { UserRole, MaterialInfo } from './types';
import SupplierDashboard from './components/SupplierDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import DesignerDashboard from './components/DesignerDashboard';
import UploadStepper from './components/UploadStepper';
import ProductDetail from './components/ProductDetail';
import MarketHall from './components/MarketHall';
import AuthScreen from './components/AuthScreen';
import SettingsModule from './components/SettingsModule';
import { Bell, User, LayoutDashboard, PlusCircle, Search, Settings, Recycle, LogOut, ShoppingBag, Menu, X } from 'lucide-react';

const mockMaterial: MaterialInfo = {
  id: '10293',
  name: '高纯度再生 PET 透明瓶片',
  category: '废塑料',
  price: 6540,
  unit: '吨',
  stock: 45.5,
  origin: '台州椒江',
  qualityGrade: 'A+',
  images: ['https://picsum.photos/800/800?random=101'],
  specs: { '透明度': '> 98%', '含杂率': '< 0.05%' },
  supplier: { name: '台州环联', creditScore: 96, tags: ['深度认证'], performance: '优' },
  status: 'AVAILABLE',
  traceability: []
};

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.NONE);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upload' | 'detail' | 'market' | 'settings'>('dashboard');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialInfo>(mockMaterial);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (role === UserRole.NONE) {
    return <AuthScreen onLogin={setRole} />;
  }

  const renderContent = () => {
    if (activeTab === 'upload') return <UploadStepper onComplete={() => setActiveTab('dashboard')} />;
    if (activeTab === 'detail') return <ProductDetail material={selectedMaterial} userRole={role} onBack={() => setActiveTab('market')} />;
    if (activeTab === 'market') return <MarketHall onSelectMaterial={(m) => { setSelectedMaterial(m); setActiveTab('detail'); }} />;
    if (activeTab === 'settings') return <SettingsModule role={role} />;

    switch (role) {
      case UserRole.SUPPLIER: return <SupplierDashboard />;
      case UserRole.BUYER: return <BuyerDashboard />;
      case UserRole.DESIGNER: return <DesignerDashboard />;
      default: return null;
    }
  };

  const getUserName = () => {
    switch (role) {
      case UserRole.SUPPLIER: return '陈华强';
      case UserRole.BUYER: return '张明';
      case UserRole.DESIGNER: return '林溪';
      default: return '用户';
    }
  };

  const getRoleLabel = () => {
    switch (role) {
      case UserRole.SUPPLIER: return '回收站长';
      case UserRole.BUYER: return '采购总监';
      case UserRole.DESIGNER: return '首席设计师';
      default: return '';
    }
  };

  const getActiveTitle = () => {
    switch(activeTab) {
      case 'dashboard': return '我的工作台';
      case 'market': return '市场行情大厅';
      case 'upload': return '数字化物料上传';
      case 'detail': return '物料溯源详情';
      case 'settings': return '身份认证与系统设置';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`w-64 border-r border-slate-100 bg-white flex flex-col fixed lg:sticky top-0 h-screen z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8">
           <div 
             className="flex items-center justify-between lg:justify-start gap-3 text-emerald-600 mb-8 cursor-pointer"
           >
              <div className="flex items-center gap-3" onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}>
                <Recycle className="w-8 h-8" />
                <span className="text-xl font-black text-slate-800">EcoCycle</span>
              </div>
              <button className="lg:hidden p-2 text-slate-400" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
           </div>
           
           <nav className="space-y-2">
             <button 
               onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}`}
             >
               <LayoutDashboard className="w-5 h-5" /> 工作台
             </button>
             <button 
               onClick={() => { setActiveTab('market'); setIsMobileMenuOpen(false); }}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'market' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}`}
             >
               <ShoppingBag className="w-5 h-5" /> 市场大厅
             </button>
             {role === UserRole.SUPPLIER && (
               <button 
                 onClick={() => { setActiveTab('upload'); setIsMobileMenuOpen(false); }}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'upload' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}`}
               >
                 <PlusCircle className="w-5 h-5" /> 发布货品
               </button>
             )}
             <button 
               onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}`}
             >
               <Settings className="w-5 h-5" /> 系统设置
             </button>
           </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-50">
           <button 
             onClick={() => setRole(UserRole.NONE)}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-rose-500 hover:bg-rose-50 transition-all"
           >
             <LogOut className="w-5 h-5" /> 退出登录
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
        )}
        <header className="h-16 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 -ml-2 text-slate-600" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-300 uppercase tracking-widest">ECO</span>
              <span className="text-sm font-bold text-slate-800">
                {getActiveTitle()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
             </button>
             <div 
               className="flex items-center gap-3 pl-4 border-l border-slate-100 cursor-pointer hover:opacity-80 transition-opacity"
               onClick={() => setActiveTab('settings')}
             >
                <div className="text-right">
                   <p className="text-xs font-black text-slate-800 tracking-tight">{getUserName()}</p>
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{getRoleLabel()}</p>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                   <User className="w-4 h-4" />
                </div>
             </div>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1 overflow-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;

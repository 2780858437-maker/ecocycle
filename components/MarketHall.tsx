
import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, ChevronRight, Activity } from 'lucide-react';
import { MaterialInfo } from '../types';

interface MarketHallProps {
  onSelectMaterial: (m: MaterialInfo) => void;
}

const mockMarketData: MaterialInfo[] = [
  {
    id: '10293',
    name: '高纯度再生 PET 透明瓶片',
    category: '废塑料',
    price: 6540,
    unit: '吨',
    stock: 45.5,
    origin: '台州椒江',
    qualityGrade: 'A+',
    status: 'AVAILABLE',
    images: ['https://picsum.photos/400/400?random=10'],
    specs: {'含杂率': '<0.05%'},
    supplier: { name: '台州环联', creditScore: 96, tags: ['深度认证'], performance: '优' },
    traceability: []
  },
  {
    id: '10294',
    name: '再生铝合金 6063 铝锭',
    category: '废金属',
    price: 18200,
    unit: '吨',
    stock: 12.0,
    origin: '苏州昆山',
    qualityGrade: '工业级',
    status: 'AVAILABLE',
    images: ['https://picsum.photos/400/400?random=11'],
    specs: {'纯度': '99.7%'},
    supplier: { name: '隆盛资源', creditScore: 92, tags: ['环保达标'], performance: '良' },
    traceability: []
  },
  {
    id: '10295',
    name: '海洋回收 PP 颗粒',
    category: '废塑料',
    price: 8900,
    unit: '吨',
    stock: 5.2,
    origin: '舟山群岛',
    qualityGrade: '高价值再生',
    status: 'PROCESSING',
    images: ['https://picsum.photos/400/400?random=12'],
    specs: {'来源': '海洋废弃物'},
    supplier: { name: '蓝海科技', creditScore: 89, tags: ['公益溯源'], performance: '优' },
    traceability: []
  }
];

const MarketHall: React.FC<MarketHallProps> = ({ onSelectMaterial }) => {
  const [filter, setFilter] = useState('全部');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">市场行情大厅</h2>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索物料/品类/供应商..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50">
            <Filter className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['全部', '废塑料', '废金属', '废纸', '电子废弃物', '纺织品'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filter === cat ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Market Ticker */}
      <div className="bg-emerald-900 text-emerald-400 p-3 rounded-xl flex items-center gap-4 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0 border-r border-emerald-800 pr-4">
          <Activity className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">实时成交流</span>
        </div>
        <div className="flex gap-8 animate-marquee whitespace-nowrap text-xs font-medium">
          <span>[成交] 浙江某塑业采购 15吨 PET瓶片 @ ¥6540/吨</span>
          <span>[询价] 苏州某电子求购 500kg 废电路板</span>
          <span>[成交] 广东某包装采购 50吨 A级废纸 @ ¥1850/吨</span>
          <span>[更新] 回收站陈某上传了 5吨 废旧铝门窗</span>
        </div>
      </div>

      {/* Material Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMarketData.filter(m => filter === '全部' || m.category === filter).map(material => (
          <div 
            key={material.id}
            onClick={() => onSelectMaterial(material)}
            className="bg-white rounded-3xl border border-slate-100 p-4 hover:shadow-xl hover:border-emerald-200 transition-all group cursor-pointer"
          >
            <div className="aspect-square rounded-2xl bg-slate-100 mb-4 relative overflow-hidden">
              <img src={material.images[0]} alt={material.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                material.status === 'AVAILABLE' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
              }`}>
                {material.status === 'AVAILABLE' ? '现货' : '处理中'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-800 line-clamp-1">{material.name}</h3>
                <span className="text-xs font-bold text-emerald-600">¥{material.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">{material.category}</span>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">{material.qualityGrade}</span>
              </div>
              <div className="pt-2 border-t border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">🏢</div>
                  <span className="text-[10px] text-slate-500 font-medium">{material.supplier.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarketHall;

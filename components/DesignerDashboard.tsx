
import React from 'react';
import { Palette, Sparkles, Bookmark, Heart, Grid } from 'lucide-react';

const DesignerDashboard: React.FC = () => {
  const feedItems = [
    { title: '海洋塑料艺术座椅', author: 'Studio Eco', img: 'https://picsum.photos/400/500?random=1', hearts: 1240 },
    { title: '废弃纺织品隔音板', author: 'Material Lab', img: 'https://picsum.photos/400/300?random=2', hearts: 890 },
    { title: '再生纸浆模塑灯具', author: 'Nature Design', img: 'https://picsum.photos/400/600?random=3', hearts: 2100 },
    { title: '电子废料首饰系列', author: 'TechReborn', img: 'https://picsum.photos/400/400?random=4', hearts: 560 },
    { title: '大理石粉末 3D 打印件', author: 'Future Craft', img: 'https://picsum.photos/400/350?random=5', hearts: 3200 },
    { title: '咖啡渣再生板材', author: 'BrewCycle', img: 'https://picsum.photos/400/450?random=6', hearts: 750 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <Palette className="w-8 h-8 text-indigo-600" />
            寻找可持续灵感
          </h1>
          <p className="text-slate-500 mt-2 text-lg">探索来自全球的再生材料创意与应用案例</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
            <Grid className="w-6 h-6" />
          </button>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-indigo-200 flex items-center gap-2 hover:bg-indigo-700 transition-all">
            <Sparkles className="w-4 h-4" />
            AI 材料实验室
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedItems.map((item, i) => (
          <div key={i} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white translate-y-2 group-hover:translate-y-0 transition-transform">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-slate-300 font-medium">{item.author}</span>
                <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                      <span className="text-[10px] font-bold">{item.hearts}</span>
                   </div>
                   <Bookmark className="w-4 h-4 text-slate-300 hover:text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Challenges */}
      <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-4xl font-black shrink-0">
          #1
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-indigo-900 mb-2">本周挑战：海洋塑料的 100 种可能</h2>
          <p className="text-indigo-700 text-sm leading-relaxed">提交您利用废弃渔网或海洋瓶盖设计的创新产品，获胜者将获得平台重点推广机会及 10,000 元设计基金。</p>
        </div>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all shrink-0">
          立即参与
        </button>
      </div>
    </div>
  );
};

export default DesignerDashboard;

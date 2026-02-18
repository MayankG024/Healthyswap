import { Home, Library, PieChart, User, Sparkles, Target } from 'lucide-react';

type Page = 'home' | 'library' | 'nutrition' | 'personalized';

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export default function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'library' as Page, label: 'Library', icon: Library },
    { id: 'nutrition' as Page, label: 'Nutrition', icon: PieChart },
    { id: 'personalized' as Page, label: 'For You', icon: Target },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b-2 border-[#FFD93D] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-[#FFD93D] rounded-2xl flex items-center justify-center shadow-md transform hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-[#FF9800]" />
            </div>
            <div>
              <span className="text-3xl text-gray-900 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
                HealthySwap
              </span>
              <div className="text-xs text-[#FF9B73] font-bold uppercase tracking-wide">Smart Nutrition</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              const colors = [
                { active: 'bg-[#FFEAA7]', text: 'text-[#FF9800]' },
                { active: 'bg-[#FFB8D1]', text: 'text-[#D81B60]' },
                { active: 'bg-[#96E6FF]', text: 'text-[#0277BD]' },
                { active: 'bg-[#C490E4]', text: 'text-[#7B1FA2]' },
              ];
              
              const colorScheme = colors[navItems.indexOf(item)];
              
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-bold uppercase tracking-wide ${
                    isActive
                      ? `${colorScheme.active} ${colorScheme.text} shadow-md scale-105`
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{ fontFamily: 'Righteous' }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Profile */}
          <button className="w-12 h-12 bg-[#C490E4] rounded-full flex items-center justify-center hover:shadow-lg transition-all transform hover:scale-110">
            <User className="w-6 h-6 text-[#7B1FA2]" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-around pb-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${
                  isActive 
                    ? 'text-[#FFB347] bg-[#FFF8E1] scale-110' 
                    : 'text-gray-500'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-bold uppercase">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

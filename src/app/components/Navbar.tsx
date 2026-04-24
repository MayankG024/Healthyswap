import { Home, Library, PieChart, User, Sparkles, Target, LogIn } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export default function Navbar() {
  const { session } = useAppStore();

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/meal-library', label: 'Library', icon: Library },
    { to: '/dashboard', label: 'Dashboard', icon: PieChart },
    { to: '/meal-planner', label: 'Planner', icon: Target },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b-2 border-[#FFD93D] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-14 h-14 bg-[#FFD93D] rounded-2xl flex items-center justify-center shadow-md transform hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-[#FF9800]" />
            </div>
            <div>
              <span className="text-3xl text-gray-900 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
                HealthySwap
              </span>
              <div className="text-xs text-[#FF9B73] font-bold uppercase tracking-wide">Smart Nutrition</div>
            </div>
          </NavLink>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              
              const colors = [
                { active: 'bg-[#FFEAA7] text-[#FF9800] shadow-md scale-105', inactive: 'text-gray-600 hover:bg-gray-100' },
                { active: 'bg-[#FFB8D1] text-[#D81B60] shadow-md scale-105', inactive: 'text-gray-600 hover:bg-gray-100' },
                { active: 'bg-[#96E6FF] text-[#0277BD] shadow-md scale-105', inactive: 'text-gray-600 hover:bg-gray-100' },
                { active: 'bg-[#C490E4] text-[#7B1FA2] shadow-md scale-105', inactive: 'text-gray-600 hover:bg-gray-100' },
              ];
              
              const colorScheme = colors[index % colors.length];
              
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-bold uppercase tracking-wide ${
                    isActive ? colorScheme.active : colorScheme.inactive
                  }`}
                  style={{ fontFamily: 'Righteous' }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Profile / Login */}
          {session ? (
            <NavLink to="/profile" className="w-12 h-12 bg-[#C490E4] rounded-full flex items-center justify-center hover:shadow-lg transition-all transform hover:scale-110">
              <User className="w-6 h-6 text-[#7B1FA2]" />
            </NavLink>
          ) : (
            <NavLink to="/login" className="flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-bold uppercase tracking-wide bg-[#A8E6B5] text-[#2E7D32] hover:shadow-lg hover:scale-105">
              <LogIn className="w-5 h-5" />
              <span className="text-sm">Login</span>
            </NavLink>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-around pb-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${
                  isActive 
                    ? 'text-[#FFB347] bg-[#FFF8E1] scale-110' 
                    : 'text-gray-500'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-bold uppercase">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

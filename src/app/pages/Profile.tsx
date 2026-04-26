import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useAppStore } from '../store/useAppStore';
import { motion } from 'motion/react';
import { User, Settings, Save, LogOut, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Checkbox } from '../components/ui/checkbox';

const healthGoalOptions = [
  'Lose weight',
  'Build muscle',
  'Improve stamina',
  'Maintain weight',
  'Manage blood sugar',
  'Improve heart health',
  'General wellness',
];

const dietaryPreferenceOptions = [
  'None',
  'Vegetarian',
  'Vegan',
  'Keto',
  'Low-carb',
  'High-protein',
  'Gluten-free',
  'Dairy-free',
  'Pescatarian',
  'Jain',
];

type MultiSelectDropdownProps = {
  label: string;
  options: string[];
  selected: string[];
  placeholder: string;
  helperText: string;
  onChange: (nextValues: string[]) => void;
  exclusiveOption?: string;
};

function MultiSelectDropdown({
  label,
  options,
  selected,
  placeholder,
  helperText,
  onChange,
  exclusiveOption,
}: MultiSelectDropdownProps) {
  const displayValue =
    selected.length === 0
      ? placeholder
      : selected.length <= 2
        ? selected.join(', ')
        : `${selected.length} selected`;

  const toggleOption = (option: string, checked: boolean) => {
    if (checked) {
      if (exclusiveOption && option === exclusiveOption) {
        onChange([exclusiveOption]);
        return;
      }

      const withoutExclusive = exclusiveOption
        ? selected.filter((value) => value !== exclusiveOption)
        : selected;

      if (withoutExclusive.includes(option)) {
        onChange(withoutExclusive);
        return;
      }

      onChange([...withoutExclusive, option]);
      return;
    }

    onChange(selected.filter((value) => value !== option));
  };

  return (
    <div>
      <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-full px-6 py-4 bg-[#FFF8E1] border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#FFD93D] font-bold transition-all flex items-center justify-between gap-3"
            aria-label={`Select ${label}`}
          >
            <span className={`truncate text-left ${selected.length === 0 ? 'text-gray-500' : 'text-gray-900'}`}>
              {displayValue}
            </span>
            <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] bg-white border-2 border-gray-100 rounded-2xl p-2"
        >
          <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
            {options.map((option) => {
              const isChecked = selected.includes(option);

              return (
                <label
                  key={option}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer hover:bg-[#FFF8E1]"
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(checked) => toggleOption(option, checked === true)}
                  />
                  <span className="text-sm font-bold text-gray-800">{option}</span>
                </label>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
      <p className="mt-2 text-xs font-bold text-gray-500">{helperText}</p>
    </div>
  );
}

function normalizeTextArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function parseOptionalNumber(value: string, parser: (trimmedValue: string) => number): number | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const parsed = parser(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function Profile() {
  const { user, setUser, setSession } = useAppStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    age: '',
    height: '',
    weight: '',
    activity_level: 'moderate',
    goals: [] as string[],
    diet_preferences: [] as string[],
    allergies: [] as string[]
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
      
      if (data) {
        setProfile({
          age: data.age != null ? String(data.age) : '',
          height: data.height != null ? String(data.height) : '',
          weight: data.weight != null ? String(data.weight) : '',
          activity_level: data.activity_level || 'moderate',
          goals: normalizeTextArray(data.goals),
          diet_preferences: normalizeTextArray(data.diet_preferences),
          allergies: normalizeTextArray(data.allergies)
        });
      }
    } catch (error) {
      console.error('Error fetching profile', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    const parsedAge = parseOptionalNumber(profile.age, (value) => Number.parseInt(value, 10));
    const parsedHeight = parseOptionalNumber(profile.height, Number.parseFloat);
    const parsedWeight = parseOptionalNumber(profile.weight, Number.parseFloat);

    if (profile.age.trim() && (parsedAge === null || !Number.isInteger(parsedAge))) {
      toast.error('Age must be a whole number.');
      setLoading(false);
      return;
    }

    if (profile.height.trim() && parsedHeight === null) {
      toast.error('Height must be a valid number.');
      setLoading(false);
      return;
    }

    if (profile.weight.trim() && parsedWeight === null) {
      toast.error('Weight must be a valid number.');
      setLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          age: parsedAge,
          height: parsedHeight,
          weight: parsedWeight,
          activity_level: profile.activity_level,
          goals: profile.goals,
          diet_preferences: profile.diet_preferences,
          allergies: profile.allergies,
        });
        
      if (error) throw error;
      toast.success('Profile saved successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    navigate('/');
    toast.success('Logged out successfully');
  };

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FFF8E1] text-center">
        <h2 className="text-4xl text-gray-900 mb-4 font-bold" style={{ fontFamily: 'Bebas Neue' }}>Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-[#C490E4] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full rounded-full" />
              ) : (
                <User className="w-10 h-10 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-5xl text-gray-900 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
                {user.user_metadata?.full_name || 'Your Profile'}
              </h1>
              <p className="text-lg text-gray-600 font-bold" style={{ fontFamily: 'Fredoka' }}>
                {user.email}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-white text-red-500 rounded-full font-bold hover:bg-red-50 border-2 border-red-100 transition-all shadow-sm uppercase tracking-wide"
            style={{ fontFamily: 'Bebas Neue', fontSize: '1.25rem' }}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border-2 border-gray-100"
        >
          <div className="flex items-center gap-3 mb-8 border-b-2 border-gray-100 pb-4">
            <Settings className="w-8 h-8 text-[#FF9800]" />
            <h2 className="text-3xl text-gray-900 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>Personal Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">Age</label>
                <input 
                  type="number" 
                  value={profile.age}
                  onChange={e => setProfile({...profile, age: e.target.value})}
                  className="w-full px-6 py-4 bg-[#FFF8E1] border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#FFD93D] font-bold transition-all"
                  placeholder="e.g. 28"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">Height (cm)</label>
                <input 
                  type="number" 
                  value={profile.height}
                  onChange={e => setProfile({...profile, height: e.target.value})}
                  className="w-full px-6 py-4 bg-[#FFF8E1] border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#FFD93D] font-bold transition-all"
                  placeholder="e.g. 175"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">Weight (kg)</label>
                <input 
                  type="number" 
                  value={profile.weight}
                  onChange={e => setProfile({...profile, weight: e.target.value})}
                  className="w-full px-6 py-4 bg-[#FFF8E1] border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#FFD93D] font-bold transition-all"
                  placeholder="e.g. 70"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">Activity Level</label>
                <select 
                  value={profile.activity_level}
                  onChange={e => setProfile({...profile, activity_level: e.target.value})}
                  className="w-full px-6 py-4 bg-[#FFF8E1] border-2 border-transparent rounded-2xl focus:outline-none focus:border-[#FFD93D] font-bold transition-all appearance-none"
                >
                  <option value="sedentary">Sedentary (Little to no exercise)</option>
                  <option value="light">Light (Exercise 1-3 days/week)</option>
                  <option value="moderate">Moderate (Exercise 3-5 days/week)</option>
                  <option value="active">Active (Exercise 6-7 days/week)</option>
                  <option value="very_active">Very Active (Intense daily exercise)</option>
                </select>
              </div>
              <MultiSelectDropdown
                label="Health Goals"
                options={healthGoalOptions}
                selected={profile.goals}
                placeholder="Choose health goals"
                helperText="Click to select one or more goals."
                onChange={(goals) => setProfile({ ...profile, goals })}
              />
              <MultiSelectDropdown
                label="Dietary Preferences"
                options={dietaryPreferenceOptions}
                selected={profile.diet_preferences}
                placeholder="Choose dietary preferences"
                helperText="Click to select one or more preferences."
                exclusiveOption="None"
                onChange={(diet_preferences) => setProfile({ ...profile, diet_preferences })}
              />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-gray-100 flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-10 py-4 bg-[#6BCF7F] text-white rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3 uppercase tracking-wide disabled:opacity-50"
              style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem' }}
            >
              <Save className="w-6 h-6" />
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

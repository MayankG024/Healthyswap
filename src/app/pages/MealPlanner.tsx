import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { addDays, format, parseISO } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppStore } from '../store/useAppStore';
import { supabase } from '../utils/supabase';
import {
  buildGroceryItems,
  createClientUuid,
  getWeekStartISO,
  MealSlot,
  normalizeMealLibraryRow,
  PlannedMealItem,
  PlannerMeal,
  toSlotKey,
} from '../utils/mealPlanning';

const mealSlots: Array<{ id: MealSlot; label: string }> = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
];

export default function MealPlanner() {
  const { user } = useAppStore();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [planId, setPlanId] = useState<string | null>(null);
  const [mealOptions, setMealOptions] = useState<PlannerMeal[]>([]);
  const [plannedItems, setPlannedItems] = useState<PlannedMealItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingSlot, setSavingSlot] = useState<string | null>(null);
  const [pickerSlot, setPickerSlot] = useState<{ dayOfWeek: number; mealSlot: MealSlot } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const weekStart = useMemo(() => getWeekStartISO(currentDate), [currentDate]);
  const startDate = parseISO(`${weekStart}T00:00:00`);
  const days = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
  const plannedBySlot = useMemo(() => {
    return new Map(plannedItems.map((item) => [toSlotKey(item.dayOfWeek, item.mealSlot), item]));
  }, [plannedItems]);
  const filteredMealOptions = mealOptions.filter((meal) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      meal.name.toLowerCase().includes(query) ||
      meal.cuisine.toLowerCase().includes(query) ||
      meal.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let active = true;

    async function loadPlanner() {
      setLoading(true);

      try {
        const [{ data: mealRows, error: mealError }, plan] = await Promise.all([
          supabase.from('meal_library').select('*').order('name'),
          getOrCreatePlan(user.id, weekStart),
        ]);

        if (!active) return;
        if (mealError) throw mealError;

        setMealOptions((mealRows || []).map(normalizeMealLibraryRow));
        setPlanId(plan.id);

        const { data: itemRows, error: itemError } = await supabase
          .from('meal_plan_items')
          .select('id, day_of_week, meal_slot, meal:meal_library(*)')
          .eq('plan_id', plan.id)
          .order('day_of_week')
          .order('meal_slot');

        if (!active) return;
        if (itemError) throw itemError;

        setPlannedItems(
          (itemRows || [])
            .filter((item: any) => item.meal)
            .map((item: any) => ({
              id: item.id,
              dayOfWeek: item.day_of_week,
              mealSlot: item.meal_slot,
              meal: normalizeMealLibraryRow(item.meal),
            })),
        );
      } catch (error: any) {
        console.error(error);
        toast.error(error.message || 'Failed to load meal planner');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPlanner();

    return () => {
      active = false;
    };
  }, [user, weekStart]);

  async function getOrCreatePlan(userId: string, weekStartDate: string): Promise<{ id: string }> {
    const { data: existingPlan, error: fetchError } = await supabase
      .from('meal_plans')
      .select('id')
      .eq('user_id', userId)
      .eq('week_start', weekStartDate)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (existingPlan) return existingPlan;

    const { data: createdPlan, error: createError } = await supabase
      .from('meal_plans')
      .insert({ id: createClientUuid(), user_id: userId, week_start: weekStartDate })
      .select('id')
      .single();

    if (createError) throw createError;
    return createdPlan;
  }

  async function saveMealToSlot(meal: PlannerMeal) {
    if (!planId || !pickerSlot) return;

    const slotKey = toSlotKey(pickerSlot.dayOfWeek, pickerSlot.mealSlot);
    setSavingSlot(slotKey);

    try {
      const { data: existingSlot, error: existingSlotError } = await supabase
        .from('meal_plan_items')
        .select('id')
        .eq('plan_id', planId)
        .eq('day_of_week', pickerSlot.dayOfWeek)
        .eq('meal_slot', pickerSlot.mealSlot)
        .maybeSingle();

      if (existingSlotError) throw existingSlotError;

      const writeQuery = existingSlot
        ? supabase
            .from('meal_plan_items')
            .update({ meal_id: meal.id })
            .eq('id', existingSlot.id)
        : supabase.from('meal_plan_items').insert({
            id: createClientUuid(),
            plan_id: planId,
            meal_id: meal.id,
            day_of_week: pickerSlot.dayOfWeek,
            meal_slot: pickerSlot.mealSlot,
          });

      const { data, error } = await writeQuery
        .select('id')
        .single();

      if (error) throw error;

      setPlannedItems((items) => {
        const withoutSlot = items.filter(
          (item) => item.dayOfWeek !== pickerSlot.dayOfWeek || item.mealSlot !== pickerSlot.mealSlot,
        );
        return [
          ...withoutSlot,
          {
            id: data.id,
            dayOfWeek: pickerSlot.dayOfWeek,
            mealSlot: pickerSlot.mealSlot,
            meal,
          },
        ].sort((a, b) => a.dayOfWeek - b.dayOfWeek || a.mealSlot.localeCompare(b.mealSlot));
      });
      setPickerSlot(null);
      setSearchQuery('');
      toast.success('Meal added to planner');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to save meal');
    } finally {
      setSavingSlot(null);
    }
  }

  async function removeMealFromSlot(item: PlannedMealItem) {
    if (!planId) return;
    const slotKey = toSlotKey(item.dayOfWeek, item.mealSlot);
    setSavingSlot(slotKey);

    try {
      const { error } = await supabase.from('meal_plan_items').delete().eq('id', item.id).eq('plan_id', planId);
      if (error) throw error;
      setPlannedItems((items) => items.filter((plannedItem) => plannedItem.id !== item.id));
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to remove meal');
    } finally {
      setSavingSlot(null);
    }
  }

  async function generateGroceryList() {
    if (!user || !planId) return;

    if (plannedItems.length === 0) {
      toast.error('Add at least one meal before generating a grocery list');
      return;
    }

    const items = buildGroceryItems(plannedItems);
    const { data: existingGroceryList, error: existingGroceryListError } = await supabase
      .from('grocery_lists')
      .select('id')
      .eq('plan_id', planId)
      .maybeSingle();

    if (existingGroceryListError) {
      toast.error(existingGroceryListError.message || 'Failed to generate grocery list');
      return;
    }

    const writeQuery = existingGroceryList
      ? supabase
          .from('grocery_lists')
          .update({
            items,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingGroceryList.id)
      : supabase.from('grocery_lists').insert({
          id: createClientUuid(),
          user_id: user.id,
          plan_id: planId,
          items,
          updated_at: new Date().toISOString(),
        });

    const { error } = await writeQuery;

    if (error) {
      toast.error(error.message || 'Failed to generate grocery list');
      return;
    }

    navigate(`/grocery-list?week=${weekStart}`);
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FFF8E1] px-4 text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
          <Calendar className="w-12 h-12 text-[#FFB347]" />
        </div>
        <h2 className="text-5xl text-gray-900 mb-6 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
          Your Meal Planner
        </h2>
        <p className="text-2xl text-gray-700 mb-8 max-w-md font-bold" style={{ fontFamily: 'Fredoka' }}>
          Please log in to plan your healthy meals for the week.
        </p>
        <Link to="/login" className="px-8 py-4 bg-[#6BCF7F] text-white rounded-2xl text-xl font-bold hover:scale-105 transition-all uppercase shadow-lg" style={{ fontFamily: 'Bebas Neue' }}>
          Log In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#FFD93D] rounded-2xl flex items-center justify-center shadow-md">
              <Calendar className="w-8 h-8 text-[#FF9800]" />
            </div>
            <div>
              <h1 className="text-5xl text-gray-900 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
                Meal Planner
              </h1>
              <p className="text-lg text-gray-600 font-bold" style={{ fontFamily: 'Fredoka' }}>
                Fill breakfast, lunch, and dinner from your meal library.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border-2 border-gray-100">
            <button type="button" onClick={() => setCurrentDate(addDays(currentDate, -7))} className="p-2 hover:bg-gray-100 rounded-xl transition-colors" aria-label="Previous week">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-lg font-bold text-gray-800 uppercase tracking-wide" style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem' }}>
              {format(startDate, 'MMM d')} - {format(addDays(startDate, 6), 'MMM d, yyyy')}
            </span>
            <button type="button" onClick={() => setCurrentDate(addDays(currentDate, 7))} className="p-2 hover:bg-gray-100 rounded-xl transition-colors" aria-label="Next week">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-[#FF9800]">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {days.map((day, dayOfWeek) => {
                const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                return (
                  <motion.div
                    key={day.toISOString()}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: dayOfWeek * 0.03 }}
                    className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${isToday ? 'border-[#6BCF7F] bg-[#E8F5E9]' : 'border-gray-100'}`}
                  >
                    <div className="text-center mb-4 border-b-2 border-gray-100 pb-2">
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{format(day, 'EEE')}</p>
                      <p className={`text-2xl font-bold ${isToday ? 'text-[#2E7D32]' : 'text-gray-900'}`} style={{ fontFamily: 'Bebas Neue' }}>
                        {format(day, 'd')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {mealSlots.map(({ id, label }) => {
                        const slotKey = toSlotKey(dayOfWeek, id);
                        const plannedItem = plannedBySlot.get(slotKey);
                        const isSaving = savingSlot === slotKey;

                        return (
                          <div key={id} className="bg-gray-50 rounded-2xl p-3 border border-gray-100 min-h-[118px]">
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-xs font-bold text-gray-400 uppercase">{label}</span>
                              {plannedItem && (
                                <button type="button" onClick={() => removeMealFromSlot(plannedItem)} className="text-gray-400 hover:text-red-500" aria-label={`Remove ${label}`}>
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>

                            {plannedItem ? (
                              <button type="button" onClick={() => setPickerSlot({ dayOfWeek, mealSlot: id })} className="block w-full text-left">
                                <p className="text-sm font-bold text-gray-900 leading-snug">{plannedItem.meal.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{plannedItem.meal.calories} cal · {plannedItem.meal.protein}g protein</p>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setPickerSlot({ dayOfWeek, mealSlot: id })}
                                disabled={isSaving || mealOptions.length === 0}
                                className="w-full h-16 flex items-center justify-center rounded-xl border border-dashed border-gray-300 hover:border-[#FFB347] hover:bg-[#FFF8E1] transition-colors disabled:opacity-50"
                              >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin text-[#FFB347]" /> : <Plus className="w-6 h-6 text-gray-300" />}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {mealOptions.length === 0 && (
              <div className="mt-8 rounded-2xl bg-white border border-amber-200 p-5 text-amber-800">
                No database meals were found. Run the meal library seed before planning meals.
              </div>
            )}

            <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-3xl text-gray-900 uppercase tracking-tight mb-2" style={{ fontFamily: 'Bebas Neue' }}>Grocery List</h3>
                <p className="text-gray-600 font-bold" style={{ fontFamily: 'Fredoka' }}>
                  Generates from the meals selected for this week.
                </p>
              </div>
              <button
                type="button"
                onClick={generateGroceryList}
                className="px-8 py-4 bg-[#FFB347] text-white rounded-2xl font-bold uppercase tracking-wide hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                style={{ fontFamily: 'Bebas Neue', fontSize: '1.25rem' }}
                disabled={plannedItems.length === 0}
              >
                <ChefHat className="w-6 h-6" />
                Generate List
              </button>
            </div>
          </>
        )}
      </div>

      {pickerSlot && (
        <div className="fixed inset-0 z-50 bg-black/40 px-4 py-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl text-gray-900 uppercase" style={{ fontFamily: 'Bebas Neue' }}>Choose a Meal</h2>
                <p className="text-sm text-gray-500">Select a library meal for this slot.</p>
              </div>
              <button type="button" onClick={() => setPickerSlot(null)} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200">
                Close
              </button>
            </div>

            <div className="p-5">
              <div className="relative mb-5">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search meals, cuisines, or goals..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
                {filteredMealOptions.map((meal) => (
                  <button
                    key={meal.id}
                    type="button"
                    onClick={() => saveMealToSlot(meal)}
                    className="text-left rounded-2xl border border-gray-100 p-4 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                  >
                    <p className="font-bold text-gray-900">{meal.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{meal.cuisine} · {meal.calories} cal · {meal.protein}g protein</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {meal.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-lg bg-white text-emerald-700 text-xs font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { addDays, format, parseISO } from 'date-fns';
import { ArrowLeft, Check, Loader2, ShoppingBasket } from 'lucide-react';
import { toast } from 'sonner';
import { useAppStore } from '../store/useAppStore';
import { supabase } from '../utils/supabase';
import {
  buildGroceryItems,
  createClientUuid,
  getWeekStartISO,
  GroceryCategory,
  GroceryItem,
  normalizeMealLibraryRow,
  PlannedMealItem,
} from '../utils/mealPlanning';

const categories: GroceryCategory[] = ['Produce', 'Protein', 'Grains', 'Dairy', 'Spices', 'Other'];

export default function GroceryList() {
  const { user } = useAppStore();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [planId, setPlanId] = useState<string | null>(null);
  const [items, setItems] = useState<GroceryItem[]>([]);
  const weekStart = searchParams.get('week') || getWeekStartISO(new Date());
  const weekStartDate = parseISO(`${weekStart}T00:00:00`);

  const groupedItems = useMemo(() => {
    return categories.map((category) => ({
      category,
      items: items.filter((item) => item.category === category),
    })).filter((group) => group.items.length > 0);
  }, [items]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let active = true;

    async function loadGroceryList() {
      setLoading(true);

      try {
        const { data: plan, error: planError } = await supabase
          .from('meal_plans')
          .select('id')
          .eq('user_id', user.id)
          .eq('week_start', weekStart)
          .maybeSingle();

        if (!active) return;
        if (planError) throw planError;
        if (!plan) {
          setPlanId(null);
          setItems([]);
          return;
        }

        setPlanId(plan.id);

        const { data: groceryList, error: groceryError } = await supabase
          .from('grocery_lists')
          .select('items')
          .eq('plan_id', plan.id)
          .maybeSingle();

        if (!active) return;
        if (groceryError) throw groceryError;

        if (groceryList?.items?.length) {
          setItems(groceryList.items);
          return;
        }

        const { data: itemRows, error: itemError } = await supabase
          .from('meal_plan_items')
          .select('id, day_of_week, meal_slot, meal:meal_library(*)')
          .eq('plan_id', plan.id);

        if (!active) return;
        if (itemError) throw itemError;

        const plannedItems: PlannedMealItem[] = (itemRows || [])
          .filter((item: any) => item.meal)
          .map((item: any) => ({
            id: item.id,
            dayOfWeek: item.day_of_week,
            mealSlot: item.meal_slot,
            meal: normalizeMealLibraryRow(item.meal),
          }));

        setItems(buildGroceryItems(plannedItems));
      } catch (error: any) {
        console.error(error);
        toast.error(error.message || 'Failed to load grocery list');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadGroceryList();

    return () => {
      active = false;
    };
  }, [user, weekStart]);

  async function persistItems(nextItems: GroceryItem[]) {
    if (!user || !planId) return;
    setSaving(true);

    try {
      const { data: existingGroceryList, error: existingGroceryListError } = await supabase
        .from('grocery_lists')
        .select('id')
        .eq('plan_id', planId)
        .maybeSingle();

      if (existingGroceryListError) throw existingGroceryListError;

      const writeQuery = existingGroceryList
        ? supabase
            .from('grocery_lists')
            .update({
              items: nextItems,
            })
            .eq('id', existingGroceryList.id)
        : supabase.from('grocery_lists').insert({
            id: createClientUuid(),
            user_id: user.id,
            plan_id: planId,
            items: nextItems,
          });

      const { error } = await writeQuery;

      if (error) throw error;
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to update grocery list');
    } finally {
      setSaving(false);
    }
  }

  function toggleItem(index: number) {
    const nextItems = items.map((item, itemIndex) => (
      itemIndex === index ? { ...item, checked: !item.checked } : item
    ));
    setItems(nextItems);
    persistItems(nextItems);
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FFF8E1] px-4 text-center">
        <ShoppingBasket className="w-16 h-16 text-[#FFB347] mb-5" />
        <h1 className="text-5xl text-gray-900 uppercase" style={{ fontFamily: 'Bebas Neue' }}>Grocery List</h1>
        <p className="text-xl text-gray-600 mt-3 mb-8">Log in to generate grocery lists from your weekly plan.</p>
        <Link to="/login" className="px-8 py-4 bg-[#6BCF7F] text-white rounded-2xl text-xl font-bold uppercase" style={{ fontFamily: 'Bebas Neue' }}>
          Log In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to={`/meal-planner`} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to planner
        </Link>

        <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-5xl text-gray-900 uppercase" style={{ fontFamily: 'Bebas Neue' }}>Grocery List</h1>
              <p className="text-gray-600 font-bold" style={{ fontFamily: 'Fredoka' }}>
                {format(weekStartDate, 'MMM d')} - {format(addDays(weekStartDate, 6), 'MMM d, yyyy')}
              </p>
            </div>
            {saving && (
              <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24 text-[#FF9800]">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : groupedItems.length > 0 ? (
          <div className="space-y-5">
            {groupedItems.map((group) => (
              <section key={group.category} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900 uppercase tracking-wide">{group.category}</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {group.items.map((item) => {
                    const globalIndex = items.findIndex((candidate) => candidate.category === item.category && candidate.name === item.name);
                    return (
                      <button
                        key={`${item.category}:${item.name}`}
                        type="button"
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50"
                      >
                        <div>
                          <p className={`font-bold ${item.checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>{item.name}</p>
                          <p className="text-sm text-gray-500">{item.quantity} {item.unit}</p>
                        </div>
                        <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${item.checked ? 'bg-[#6BCF7F] border-[#6BCF7F] text-white' : 'border-gray-300 text-transparent'}`}>
                          <Check className="w-4 h-4" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center">
            <ShoppingBasket className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h2 className="text-3xl text-gray-900 uppercase" style={{ fontFamily: 'Bebas Neue' }}>No grocery list yet</h2>
            <p className="text-gray-600 mt-2 mb-6">Add meals to this week and generate a grocery list from the planner.</p>
            <Link to="/meal-planner" className="inline-flex px-6 py-3 rounded-2xl bg-[#FFB347] text-white font-bold uppercase">
              Open Planner
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

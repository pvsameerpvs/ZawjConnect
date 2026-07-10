import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import type {
  FamilyState, FamilyAction, FamilyMember, GroceryList,
  GroceryItem, ChatMessage, Expense, MonthlySummary, MemberShare,
} from '../types';

const initialMembers: FamilyMember[] = [
  { id: '1', name: 'Ahmed', role: 'Husband', joinedAt: Date.now() - 86400000 * 90, isAdmin: true },
  { id: '2', name: 'Fatima', role: 'Wife', joinedAt: Date.now() - 86400000 * 90 },
  { id: '3', name: 'Khalid', role: 'Brother', joinedAt: Date.now() - 86400000 * 60 },
  { id: '4', name: 'Aisha', role: 'Sister', joinedAt: Date.now() - 86400000 * 60 },
  { id: '5', name: 'Amina', role: 'Mother', joinedAt: Date.now() - 86400000 * 30 },
  { id: '6', name: 'Omar', role: 'Father', joinedAt: Date.now() - 86400000 * 30 },
];

const now = Date.now();
const day = 86400000;

const initialGroceryLists: GroceryList[] = [
  {
    id: 'g1', title: 'Weekly Groceries', createdAt: now - 3 * day,
    createdBy: '2', status: 'active',
    items: [
      { id: 'gi1', name: 'Chicken', quantity: 2, unit: 'kg', addedBy: '2', addedAt: now - 3 * day, purchased: false },
      { id: 'gi2', name: 'Rice', quantity: 5, unit: 'kg', addedBy: '1', addedAt: now - 3 * day, purchased: true, purchasedBy: '1' },
      { id: 'gi3', name: 'Tomatoes', quantity: 1, unit: 'kg', addedBy: '2', addedAt: now - 2 * day, purchased: false },
      { id: 'gi4', name: 'Milk', quantity: 2, unit: 'liters', addedBy: '3', addedAt: now - 2 * day, purchased: false },
    ],
  },
  {
    id: 'g2', title: 'Monthly Supplies', createdAt: now - 10 * day,
    createdBy: '5', status: 'completed',
    items: [
      { id: 'gi5', name: 'Cooking Oil', quantity: 3, unit: 'liters', addedBy: '5', addedAt: now - 10 * day, purchased: true, purchasedBy: '6' },
      { id: 'gi6', name: 'Sugar', quantity: 2, unit: 'kg', addedBy: '5', addedAt: now - 10 * day, purchased: true, purchasedBy: '6' },
    ],
  },
];

const initialChatMessages: ChatMessage[] = [
  { id: 'c1', senderId: '2', text: "I'm going to the market, anyone need anything?", timestamp: now - 4 * day, type: 'text' },
  { id: 'c2', senderId: '5', text: "Please get some vegetables for dinner", timestamp: now - 4 * day, type: 'text' },
  { id: 'c3', senderId: '1', text: "I made a grocery list for this week", timestamp: now - 3 * day, type: 'grocery_share', groceryListId: 'g1' },
  { id: 'c4', senderId: '3', text: "Let me know the total bill, I'll send my share", timestamp: now - 1 * day, type: 'text' },
];

const initialExpenses: Expense[] = [
  { id: 'e1', title: 'Weekly Groceries', amount: 450, category: 'groceries', paidBy: '1', date: now - 3 * day, splitAmong: ['1', '2', '3', '4', '5', '6'], notes: 'Carrefour' },
  { id: 'e2', title: 'Electricity Bill', amount: 320, category: 'utilities', paidBy: '1', date: now - 7 * day, splitAmong: ['1', '2', '5', '6'] },
  { id: 'e3', title: 'Vegetables', amount: 85, category: 'groceries', paidBy: '2', date: now - 2 * day, splitAmong: ['1', '2', '3', '4', '5', '6'] },
  { id: 'e4', title: 'Medicine', amount: 120, category: 'medical', paidBy: '6', date: now - 5 * day, splitAmong: ['6'] },
  { id: 'e5', title: 'Gas Refill', amount: 280, category: 'utilities', paidBy: '1', date: now - 14 * day, splitAmong: ['1', '2', '3', '4', '5', '6'] },
];

const initialState: FamilyState = {
  familyName: 'Al-Fath Family',
  members: initialMembers,
  groceryLists: initialGroceryLists,
  chatMessages: initialChatMessages,
  expenses: initialExpenses,
  currentUserId: '1',
};

function familyReducer(state: FamilyState, action: FamilyAction): FamilyState {
  switch (action.type) {
    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.payload] };
    case 'REMOVE_MEMBER':
      return { ...state, members: state.members.filter(m => m.id !== action.payload) };
    case 'ADD_GROCERY_LIST':
      return { ...state, groceryLists: [...state.groceryLists, action.payload] };
    case 'UPDATE_GROCERY_ITEM':
      return {
        ...state,
        groceryLists: state.groceryLists.map(list =>
          list.id === action.payload.listId
            ? {
                ...list,
                items: list.items.map(item =>
                  item.id === action.payload.itemId
                    ? { ...item, purchased: action.payload.purchased, purchasedBy: action.payload.purchased ? state.currentUserId : undefined }
                    : item
                ),
              }
            : list
        ),
      };
    case 'ADD_GROCERY_ITEM':
      return {
        ...state,
        groceryLists: state.groceryLists.map(list =>
          list.id === action.payload.listId
            ? { ...list, items: [...list.items, action.payload.item] }
            : list
        ),
      };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'SET_CURRENT_USER':
      return { ...state, currentUserId: action.payload };
    default:
      return state;
  }
}

interface FamilyContextValue {
  state: FamilyState;
  dispatch: React.Dispatch<FamilyAction>;
  getMember: (id: string) => FamilyMember | undefined;
  getActiveGroceryLists: () => GroceryList[];
  getMonthlySummary: (month: number, year: number) => MonthlySummary;
  getMemberBalance: (memberId: string) => number;
  formatCurrency: (amount: number) => string;
}

const FamilyContext = createContext<FamilyContextValue | null>(null);

export function FamilyProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(familyReducer, initialState);

  const getMember = useCallback((id: string) => {
    return state.members.find(m => m.id === id);
  }, [state.members]);

  const getActiveGroceryLists = useCallback(() => {
    return state.groceryLists.filter(l => l.status === 'active');
  }, [state.groceryLists]);

  const getMonthlySummary = useCallback((month: number, year: number): MonthlySummary => {
    const monthExpenses = state.expenses.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });

    const sharesMap = new Map<string, number>();
    const paidMap = new Map<string, number>();

    state.members.forEach(m => {
      sharesMap.set(m.id, 0);
      paidMap.set(m.id, 0);
    });

    monthExpenses.forEach(exp => {
      const perPerson = exp.amount / exp.splitAmong.length;
      paidMap.set(exp.paidBy, (paidMap.get(exp.paidBy) || 0) + exp.amount);
      exp.splitAmong.forEach(id => {
        sharesMap.set(id, (sharesMap.get(id) || 0) + perPerson);
      });
    });

    const memberShares: MemberShare[] = state.members.map(m => ({
      memberId: m.id,
      totalPaid: paidMap.get(m.id) || 0,
      totalShare: sharesMap.get(m.id) || 0,
      balance: (paidMap.get(m.id) || 0) - (sharesMap.get(m.id) || 0),
    }));

    const totalExpenses = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

    return { month, year, totalExpenses, memberShares, expenses: monthExpenses };
  }, [state.expenses, state.members]);

  const getMemberBalance = useCallback((memberId: string): number => {
    const now = new Date();
    const summary = getMonthlySummary(now.getMonth(), now.getFullYear());
    const share = summary.memberShares.find(s => s.memberId === memberId);
    return share?.balance || 0;
  }, [getMonthlySummary]);

  const formatCurrency = useCallback((amount: number): string => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
  }, []);

  const value = useMemo(() => ({
    state, dispatch, getMember, getActiveGroceryLists,
    getMonthlySummary, getMemberBalance, formatCurrency,
  }), [state, dispatch, getMember, getActiveGroceryLists, getMonthlySummary, getMemberBalance, formatCurrency]);

  return (
    <FamilyContext.Provider value={value}>
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const ctx = useContext(FamilyContext);
  if (!ctx) throw new Error('useFamily must be used within FamilyProvider');
  return ctx;
}

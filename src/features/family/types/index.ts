export type FamilyRole = 'Husband' | 'Wife' | 'Brother' | 'Sister' | 'Mother' | 'Father';

export type ExpenseCategory = 'groceries' | 'utilities' | 'rent' | 'medical' | 'education' | 'transport' | 'entertainment' | 'other';

export type GroceryListStatus = 'active' | 'completed';
export type ChatMessageType = 'text' | 'grocery_share' | 'expense_share';

export interface FamilyMember {
  id: string;
  name: string;
  role: FamilyRole;
  avatar?: string;
  joinedAt: number;
  isAdmin?: boolean;
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  addedBy: string;
  addedAt: number;
  purchased: boolean;
  purchasedBy?: string;
}

export interface GroceryList {
  id: string;
  title: string;
  createdAt: number;
  createdBy: string;
  items: GroceryItem[];
  status: GroceryListStatus;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  type: ChatMessageType;
  groceryListId?: string;
  expenseId?: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  paidBy: string;
  date: number;
  billImage?: string;
  splitAmong: string[];
  notes?: string;
}

export interface MemberShare {
  memberId: string;
  totalPaid: number;
  totalShare: number;
  balance: number;
}

export interface MonthlySummary {
  month: number;
  year: number;
  totalExpenses: number;
  memberShares: MemberShare[];
  expenses: Expense[];
}

export interface FamilyState {
  familyName: string;
  members: FamilyMember[];
  groceryLists: GroceryList[];
  chatMessages: ChatMessage[];
  expenses: Expense[];
  currentUserId: string;
}

export type FamilyAction =
  | { type: 'ADD_MEMBER'; payload: FamilyMember }
  | { type: 'REMOVE_MEMBER'; payload: string }
  | { type: 'ADD_GROCERY_LIST'; payload: GroceryList }
  | { type: 'UPDATE_GROCERY_ITEM'; payload: { listId: string; itemId: string; purchased: boolean } }
  | { type: 'ADD_GROCERY_ITEM'; payload: { listId: string; item: GroceryItem } }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'SET_CURRENT_USER'; payload: string };

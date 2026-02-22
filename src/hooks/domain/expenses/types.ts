export const ExpenseClassValues = [
  'groceries',
  'delivery',
  'eating_out',
  'public_transport',
  'fuel',
  'parking',
  'entertainment',
  'fitness',
  'hobbies',
  'clothing',
  'toiletries',
  'household_items',
  'furniture',
  'rent',
  'electricity',
  'water',
  'gas',
  'internet',
  'mobile',
  'medicine',
  'medical_visit',
  'insurance',
  'health_insurance',
  'taxes',
  'fees',
  'travel',
  'gifts',
  'donations',
  'misc',
];
export type TExpenseClass =
  | 'groceries'
  | 'delivery'
  | 'eating_out'
  | 'public_transport'
  | 'fuel'
  | 'parking'
  | 'entertainment'
  | 'fitness'
  | 'hobbies'
  | 'clothing'
  | 'toiletries'
  | 'household_items'
  | 'furniture'
  | 'rent'
  | 'electricity'
  | 'water'
  | 'gas'
  | 'internet'
  | 'mobile'
  | 'medicine'
  | 'medical_visit'
  | 'insurance'
  | 'health_insurance'
  | 'taxes'
  | 'fees'
  | 'travel'
  | 'gifts'
  | 'donations'
  | 'misc';

export const ExpenseCategoryValues = [
  'foodAtHome',
  'outdoor',
  'homeAndPersonal',
  'others',
];
export type TExpenseCategory =
  | 'foodAtHome'
  | 'outdoor'
  | 'homeAndPersonal'
  | 'others';

export type TSortBy = 'date' | 'amount';
export type TSortOrder = 'asc' | 'desc';
export type TExpenseQuery = {
  year: number;
  month: number;
  category?: TExpenseCategory;
  expense_class?: TExpenseClass;
  sort_by?: TSortBy;
  sort_order?: TSortOrder;
};

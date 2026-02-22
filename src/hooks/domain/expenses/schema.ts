import * as z from 'zod';
import { ExpenseCategoryValues, ExpenseClassValues } from './types';

export const expenseSchema = z.object({
  id: z.number(),
  timestamp: z.iso.datetime({
    offset: true,
  }),
  amount: z.coerce.number(),
  name: z.string(),
  expense_class: z.enum(ExpenseClassValues),
  category: z.enum(ExpenseCategoryValues),
  description: z.string(),
  location: z.string(),
  user_id: z.coerce.number(),
  currency: z.string(),
});

export const expensesSchema = z.array(expenseSchema);

export type Expense = z.infer<typeof expenseSchema>;

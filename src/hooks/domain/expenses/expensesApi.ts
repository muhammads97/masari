import { api } from '@/services/instance';
import { TExpenseQuery } from './types';
import { Expense, expensesSchema } from './schema';

export const ExpenseApi = {
  list: async (query: TExpenseQuery, accessToken: string) => {
    const response = await api.get('/webhook/expenses', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: query,
    });

    return expensesSchema.parse(response.data);
  },
  edit: async (expense: Expense, accessToken: string) => {
    await api.post('/webhook/expenses', expense, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  delete: async (expenseId: number, accessToken: string) => {
    await api.delete('/webhook/expenses', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        expenseId,
      },
    });
  },
};

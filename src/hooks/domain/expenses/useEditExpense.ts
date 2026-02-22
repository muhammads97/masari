import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExpenseApi } from './expensesApi';
import { useAuthProvider } from '../auth/useAuthProvider';
import { Expense } from './schema';

type UseEditExpenseReturn = {
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: number) => void;
  isLoading: boolean;
};

type Props = {
  callback: () => void;
};

export const useEditExpense = ({ callback }: Props): UseEditExpenseReturn => {
  const queryClient = useQueryClient();
  const { getToken } = useAuthProvider();

  const { mutate: mutateUpdate, isPending: isEditing } = useMutation({
    mutationFn: async (expense: Expense) => {
      const token = await getToken();
      return await ExpenseApi.edit(expense, token);
    },
    onSuccess: () => {
      callback();
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  const { mutate: mutateDelete, isPending: isDeleting } = useMutation({
    mutationFn: async (id: number) => {
      const token = await getToken();
      return await ExpenseApi.delete(id, token);
    },
    onSuccess: () => {
      callback();
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  return {
    updateExpense: mutateUpdate,
    deleteExpense: mutateDelete,
    isLoading: isDeleting || isEditing,
  };
};

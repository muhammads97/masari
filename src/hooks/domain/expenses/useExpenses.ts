import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  TExpenseQuery,
  TExpenseCategory,
  TExpenseClass,
  TSortBy,
  TSortOrder,
} from './types';
import { useAuthProvider } from '../auth/useAuthProvider';
import { ExpenseApi } from './expensesApi';
import { Expense } from './schema';

type UseExpensesReturn = {
  expenses: Expense[];

  query: TExpenseQuery;

  year: number;
  month: number;
  category?: TExpenseCategory;
  expense_class?: TExpenseClass;
  sort_by?: TSortBy;
  sort_order?: TSortOrder;

  updateQuery: (partial: Partial<TExpenseQuery>) => void;
  setQuery: React.Dispatch<React.SetStateAction<TExpenseQuery>>;

  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setCategory: (category?: TExpenseCategory) => void;
  setExpenseClass: (expenseClass?: TExpenseClass) => void;
  setSortBy: (sortBy?: TSortBy) => void;
  setSortOrder: (sortOrder?: TSortOrder) => void;
  clearFilters: () => void;

  isLoading: boolean;
  isError: boolean;
  error: UseQueryResult<Expense[]>['error'];
  refetch: UseQueryResult<Expense[]>['refetch'];
};

export const useExpenses = (): UseExpensesReturn => {
  const queryClient = useQueryClient();
  const now = new Date();

  const [query, setQuery] = useState<TExpenseQuery>({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const { getToken } = useAuthProvider();

  const queryKey = useMemo(() => ['expenses', query], [query]);

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const token = await getToken();
      return ExpenseApi.list(query, token);
    },
  });

  const updateQuery = useCallback((partial: Partial<TExpenseQuery>) => {
    setQuery((prev) => ({ ...prev, ...partial }));
  }, []);

  const setYear = useCallback((year: number) => {
    setQuery((prev) => ({ ...prev, year }));
  }, []);

  const setMonth = useCallback((month: number) => {
    setQuery((prev) => ({ ...prev, month }));
  }, []);

  const setCategory = useCallback((category?: TExpenseCategory) => {
    setQuery((prev) => ({ ...prev, category }));
  }, []);

  const setExpenseClass = useCallback((expense_class?: TExpenseClass) => {
    setQuery((prev) => ({ ...prev, expense_class }));
  }, []);

  const setSortBy = useCallback((sort_by?: TSortBy) => {
    setQuery((prev) => ({ ...prev, sort_by }));
  }, []);

  const setSortOrder = useCallback((sort_order?: TSortOrder) => {
    setQuery((prev) => ({ ...prev, sort_order }));
  }, []);

  const clearFilters = useCallback(() => {
    setQuery((prev) => ({
      year: prev.year,
      month: prev.month,
    }));
  }, []);

  return {
    expenses: data ?? [],

    query,

    year: query.year,
    month: query.month,
    category: query.category,
    expense_class: query.expense_class,
    sort_by: query.sort_by,
    sort_order: query.sort_order,

    updateQuery,
    setQuery,

    setYear,
    setMonth,
    setCategory,
    setExpenseClass,
    setSortBy,
    setSortOrder,
    clearFilters,

    isLoading: isFetching || isLoading,
    isError,
    error,
    refetch,
  };
};

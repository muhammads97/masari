import { SafeScreen } from '@/components/templates';
import HistoryHeader from './components/Header';
import { AppScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';
import DatePagination from './components/DatePagination';
import ExpenseItem from './components/ExpenseItem';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { useExpenses } from '@/hooks/domain/expenses/useExpenses';
import { useTheme } from '@/theme';
import { Text } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import ExpenseEditModal from './components/ExpenseEditModal';
import { Expense } from '@/hooks/domain/expenses/schema';
import { useState } from 'react';
import { useEditExpense } from '@/hooks/domain/expenses/useEditExpense';

type Props = AppScreenProps<typeof Paths.History>;

function History({ navigation }: Props) {
  const { expenses, isLoading, setYear, year, setMonth, month } = useExpenses();

  const [editExpense, setEditExpense] = useState<Expense | undefined>(
    undefined,
  );
  const {
    updateExpense,
    deleteExpense,
    isLoading: isEditLoading,
  } = useEditExpense({ callback: () => setEditExpense(undefined) });
  const { layout, fonts } = useTheme();
  const { t } = useTranslation();
  return (
    <SafeScreen>
      {editExpense !== undefined && (
        <ExpenseEditModal
          visible={editExpense != undefined}
          expense={editExpense}
          onSave={updateExpense}
          onDelete={deleteExpense}
          onClose={() => setEditExpense(undefined)}
          isLoading={isEditLoading}
        />
      )}
      <HistoryHeader onMenuPress={() => navigation.navigate(Paths.Chat)} />
      <DatePagination
        year={year}
        month={month}
        setMonth={setMonth}
        setYear={setYear}
      />
      {isLoading ? (
        <View
          style={[
            layout.flex_1,
            layout.fullWidth,
            layout.itemsCenter,
            layout.justifyCenter,
          ]}
        >
          <ActivityIndicator size={'large'} />
        </View>
      ) : expenses.length > 0 ? (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ExpenseItem
              expense={item}
              onClick={(expense) => setEditExpense(expense)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View
          style={[
            layout.flex_1,
            layout.fullWidth,
            layout.itemsCenter,
            layout.justifyCenter,
          ]}
        >
          <Text style={[fonts.secondaryText, fonts.size_16]}>
            {t('screen_history.empty')}
          </Text>
        </View>
      )}
    </SafeScreen>
  );
}

export default History;

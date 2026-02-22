import { View, Text, TouchableOpacity } from 'react-native';
import { IconByVariant } from '@/components/atoms';
import { useTheme } from '@/theme';
import { Expense } from '@/hooks/domain/expenses/schema';
import { useTranslation } from 'react-i18next';

type Props = {
  expense: Expense;
  onClick: (expense: Expense) => void;
};

function ExpenseItem({ expense, onClick }: Props) {
  const { layout, gutters, borders, backgrounds, fonts, colors } = useTheme();
  const { t } = useTranslation();

  const date = new Date(expense.timestamp);

  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(
    date.getHours(),
  ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  const formattedAmount = `${expense.amount.toLocaleString()} ￥`;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onClick(expense)}
      style={[
        gutters.paddingHorizontal_16,
        gutters.paddingVertical_16,
        borders.borderLight,
        borders.wBottom_1,
        layout.justifyCenter,
        { height: 90 },
      ]}
    >
      {/* Timestamp */}
      <Text
        style={[
          fonts.size_12,
          fonts.mutedText,
          fonts.light,
          gutters.marginBottom_4,
          { lineHeight: 12 },
        ]}
      >
        {formattedDate}
      </Text>

      {/* Name + Amount */}
      <View style={[layout.row, layout.justifyBetween, layout.itemsCenter]}>
        <Text
          numberOfLines={1}
          style={[
            fonts.primaryText,
            fonts.size_14,
            fonts.semibold,
            gutters.marginRight_8,
            { flex: 1, lineHeight: 14 },
          ]}
        >
          {expense.name}
        </Text>

        <Text
          style={[
            fonts.secondaryText,
            fonts.size_18,
            fonts.semibold,
            { lineHeight: 18 },
          ]}
        >
          {formattedAmount}
        </Text>
      </View>

      {/* Tags + Cart + Location */}
      <View style={[layout.row, layout.itemsCenter, gutters.marginTop_8]}>
        <View
          style={[
            gutters.paddingHorizontal_12,
            backgrounds.primaryLight,
            borders.borderGreen,
            gutters.paddingVertical_4,
            gutters.marginRight_8,
            {
              height: 20,
              borderRadius: 8,
              borderWidth: 0.5,
            },
          ]}
        >
          <Text
            style={[fonts.secondaryText, fonts.size_12, { lineHeight: 12 }]}
          >
            {t(`screen_history.expense_class.${expense.expense_class}`)}
          </Text>
        </View>

        <View
          style={[
            gutters.paddingHorizontal_12,
            backgrounds.primaryLight,
            borders.borderGreen,
            gutters.paddingVertical_4,
            {
              height: 20,
              borderRadius: 8,
              borderWidth: 0.5,
            },
          ]}
        >
          <Text
            style={[fonts.secondaryText, fonts.size_12, { lineHeight: 12 }]}
          >
            {t(`screen_history.expense_category.${expense.category}`)}
          </Text>
        </View>

        <View style={[layout.row, layout.itemsCenter, gutters.marginLeft_8]}>
          <IconByVariant
            path="cart"
            color={colors.secondaryText}
            width={14}
            height={14}
            style={{
              marginRight: 8,
            }}
          />

          <Text
            numberOfLines={1}
            style={[
              fonts.size_14,
              { color: colors.secondaryText, maxWidth: 118 },
            ]}
          >
            {expense.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ExpenseItem;

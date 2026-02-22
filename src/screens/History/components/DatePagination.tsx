import { View, TouchableOpacity, Text } from 'react-native';
import { IconByVariant } from '@/components/atoms';
import { useTheme } from '@/theme';
import { useMemo } from 'react';

type Props = {
  year: number;
  month: number; // 1-12
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
};

function DatePagination({ year, month, setYear, setMonth }: Props) {
  const { layout, gutters, borders, fonts, colors } = useTheme();

  const isCurrentMonth = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    return year === currentYear && month === currentMonth;
  }, [year, month]);

  const goToPreviousMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (isCurrentMonth) return;

    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const formattedDate = new Date(year, month - 1).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View
      style={[
        layout.row,
        layout.justifyBetween,
        layout.itemsCenter,
        gutters.marginLeft_42,
        gutters.marginRight_42,
        gutters.marginTop_12,
        gutters.marginBottom_16,
        { height: 30 },
      ]}
    >
      <TouchableOpacity onPress={goToPreviousMonth} hitSlop={10}>
        <IconByVariant
          path="left"
          style={{
            width: 24,
            height: 24,
            opacity: 1,
          }}
        />
      </TouchableOpacity>

      <View
        style={[
          layout.itemsCenter,
          gutters.paddingBottom_4,
          gutters.paddingTop_4,
          gutters.paddingLeft_8,
          gutters.paddingRight_8,
          borders.wBottom_1,
          borders.borderLight,
        ]}
      >
        <Text
          style={[
            fonts.primaryText,
            fonts.size_18,
            fonts.alignCenter,
            { lineHeight: 18 },
          ]}
        >
          {formattedDate}
        </Text>
      </View>

      <TouchableOpacity
        onPress={goToNextMonth}
        disabled={isCurrentMonth}
        hitSlop={10}
      >
        <IconByVariant
          path="right"
          style={{
            width: 24,
            height: 24,
            opacity: isCurrentMonth ? 0.3 : 1,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default DatePagination;

import { useTheme } from '@/theme';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type Props = {
  rightComponent?: React.ReactNode;
} & TextInputProps;
export const InputField = ({
  rightComponent,
  keyboardType,
  value,
  onChangeText,
}: Props) => {
  const { layout, borders, backgrounds, gutters, fonts } = useTheme();
  return (
    <View
      style={[
        layout.row,
        layout.itemsCenter,
        layout.justifyBetween,
        borders.borderLight,
        borders.w_1,
        backgrounds.white,
        gutters.paddingRight_16,
        gutters.marginBottom_8,
        { height: 28, width: 208, borderRadius: 8 },
      ]}
    >
      <TextInput
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        style={[
          layout.flex_1,
          layout.fullHeight,
          gutters.paddingVertical_8,
          gutters.paddingHorizontal_16,
          fonts.alignCenter,
          fonts.size_12,
        ]}
      />
      {rightComponent}
    </View>
  );
};

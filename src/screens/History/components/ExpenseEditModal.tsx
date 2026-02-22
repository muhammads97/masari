import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  ActionSheetIOS,
  KeyboardAvoidingView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { IconByVariant } from '@/components/atoms';
import { useTheme } from '@/theme';
import { Expense } from '@/hooks/domain/expenses/schema';
import { ExpenseClassValues } from '@/hooks/domain/expenses/types';
import { useTranslation } from 'react-i18next';
import { InputField } from './InputField';
import { DateTimePickerButton } from './DateTimePicketButton';
import { Picker } from '@react-native-picker/picker';
import { ActivityIndicator } from 'react-native';
type Props = {
  visible: boolean;
  expense: Expense;
  onSave: (expense: Expense) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
  isLoading: boolean;
};

function ExpenseEditModal({
  visible,
  expense,
  onSave,
  onDelete,
  onClose,
  isLoading,
}: Props) {
  const { layout, gutters, fonts, components, colors, backgrounds, borders } =
    useTheme();
  const { t } = useTranslation();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showClassPicker, setShowClassPicker] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...expense,
      timestamp: new Date(expense.timestamp),
    },
    onSubmit: (values) => {
      onSave({
        ...values,
        timestamp: values.timestamp.toISOString(),
      });
    },
  });

  const isDirty = formik.dirty;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={isLoading ? undefined : onClose}
          style={[
            layout.absolute,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              width: '100%',
              height: '100%',
            },
          ]}
        />
        {isLoading && (
          <View
            style={[
              layout.absolute,
              layout.justifyCenter,
              layout.itemsCenter,
              layout.fullHeight,
              layout.fullWidth,
              { zIndex: 100 },
            ]}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
        <View
          style={[
            layout.flex_1,
            layout.justifyCenter,
            layout.itemsCenter,
            isLoading && { opacity: 0.8 },
          ]}
        >
          <View
            style={[
              backgrounds.background,
              gutters.padding_16,
              {
                width: 240,
                height: 370,
                borderRadius: 12,
              },
            ]}
          >
            <View style={[layout.row, layout.justifyEnd]}>
              <TouchableOpacity onPress={onClose} disabled={isLoading}>
                <IconByVariant path="close" style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            </View>

            <TextInput
              value={formik.values.name}
              onChangeText={(v) => formik.setFieldValue('name', v)}
              style={[
                components.editInput,
                gutters.marginBottom_8,
                gutters.marginTop_8,
              ]}
            />
            <View
              style={[
                layout.row,
                layout.justifyBetween,
                layout.itemsCenter,
                gutters.marginBottom_8,
              ]}
            >
              <DateTimePickerButton
                onPress={() => setShowDatePicker(true)}
                value={formik.values.timestamp.toISOString().slice(0, 10)}
              />
              <DateTimePickerButton
                onPress={() => setShowTimePicker(true)}
                value={formik.values.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              />
            </View>

            <InputField
              keyboardType="numeric"
              value={String(formik.values.amount)}
              onChangeText={(v) => formik.setFieldValue('amount', Number(v))}
              rightComponent={
                <Text
                  style={[
                    fonts.size_16,
                    fonts.secondaryText,
                    fonts.secondaryText,
                    fonts.semibold,
                  ]}
                >
                  ￥
                </Text>
              }
            />

            <InputField
              value={String(formik.values.location)}
              onChangeText={(v) => formik.setFieldValue('location', v)}
              rightComponent={
                <IconByVariant path="cart" width={14} height={12} />
              }
            />

            <TouchableOpacity
              onPress={() => {
                if (Platform.OS === 'ios') {
                  const options = [
                    ...ExpenseClassValues.map((value) =>
                      value === formik.values.expense_class
                        ? `✓ ${t(`screen_history.expense_class.${value}`)}`
                        : t(`screen_history.expense_class.${value}`),
                    ),
                    t('common.cancel'),
                  ];

                  ActionSheetIOS.showActionSheetWithOptions(
                    {
                      options,
                      cancelButtonIndex: options.length - 1,
                    },
                    (buttonIndex) => {
                      if (buttonIndex < ExpenseClassValues.length) {
                        formik.setFieldValue(
                          'expense_class',
                          ExpenseClassValues[buttonIndex],
                        );
                      }
                    },
                  );
                } else {
                  setShowClassPicker(true);
                }
              }}
              style={[
                layout.justifyCenter,
                layout.itemsCenter,
                borders.borderLight,
                backgrounds.white,
                borders.w_1,
                gutters.paddingHorizontal_16,
                { borderRadius: 8, height: 28 },
              ]}
            >
              <Text
                style={[
                  fonts.size_12,
                  fonts.primaryText,
                  fonts.alignCenter,
                  { lineHeight: 12 },
                ]}
              >
                {t(
                  `screen_history.expense_class.${formik.values.expense_class}`,
                )}
              </Text>
            </TouchableOpacity>
            {/* Description */}
            <TextInput
              multiline
              value={formik.values.description}
              onChangeText={(v) => formik.setFieldValue('description', v)}
              style={[
                fonts.size_12,
                fonts.primaryText,
                borders.borderLight,
                borders.w_1,
                backgrounds.white,
                gutters.padding_8,
                { height: 80, borderRadius: 8 },
                gutters.marginBottom_16,
                gutters.marginTop_8,
              ]}
            />

            {/* Buttons */}
            <View
              style={[layout.row, layout.justifyBetween, layout.itemsCenter]}
            >
              <TouchableOpacity
                onPress={() => onDelete(expense.id)}
                disabled={isLoading}
              >
                <IconByVariant
                  path="trash"
                  height={18}
                  width={18}
                  color={colors.error}
                />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!isDirty || isLoading}
                onPress={formik.handleSubmit as any}
                style={[
                  gutters.paddingHorizontal_16,
                  gutters.paddingVertical_8,
                  isDirty && !isLoading
                    ? backgrounds.primary
                    : backgrounds.primaryLight,
                  {
                    borderRadius: 8,
                  },
                ]}
              >
                <Text style={[fonts.size_14, fonts.white]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          <DatePicker
            modal
            open={showDatePicker}
            date={formik.values.timestamp}
            maximumDate={new Date()}
            mode={'date'}
            onConfirm={(pickedDate) => {
              setShowDatePicker(false);

              const current = formik.values.timestamp;

              const merged = new Date(
                pickedDate.getFullYear(),
                pickedDate.getMonth(),
                pickedDate.getDate(),
                current.getHours(),
                current.getMinutes(),
                0,
              );

              formik.setFieldValue('timestamp', merged);
            }}
            onCancel={() => {
              setShowDatePicker(false);
            }}
          />
          <DatePicker
            modal
            open={showTimePicker}
            date={formik.values.timestamp}
            maximumDate={new Date()}
            mode={'time'}
            onConfirm={(pickedTime) => {
              setShowTimePicker(false);

              const current = formik.values.timestamp;

              const merged = new Date(
                current.getFullYear(),
                current.getMonth(),
                current.getDate(),
                pickedTime.getHours(),
                pickedTime.getMinutes(),
                0,
              );

              formik.setFieldValue('timestamp', merged);
            }}
            onCancel={() => {
              setShowTimePicker(false);
            }}
          />
          {Platform.OS === 'android' && (
            <Modal transparent visible={showClassPicker} animationType="fade">
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  justifyContent: 'center',
                }}
                onPress={() => setShowClassPicker(false)}
              >
                <View
                  style={{
                    marginHorizontal: 40,
                    backgroundColor: 'white',
                    borderRadius: 12,
                  }}
                >
                  <Picker
                    selectedValue={formik.values.expense_class}
                    onValueChange={(value) => {
                      formik.setFieldValue('expense_class', value);
                      setShowClassPicker(false);
                    }}
                    mode="dropdown"
                  >
                    {ExpenseClassValues.map((value) => (
                      <Picker.Item
                        key={value}
                        label={t(`screen_history.expense_class.${value}`)}
                        value={value}
                      />
                    ))}
                  </Picker>
                </View>
              </TouchableOpacity>
            </Modal>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default ExpenseEditModal;

import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Icon, type IconName } from '@/components/icons';
import { useTheme } from '@/hooks/use-theme';

type FormPickerProps<T extends string> = {
  label: string;
  value: T | '';
  options: readonly T[];
  onSelect: (value: T) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  icon?: IconName;
};

/**
 * Lightweight modal-based picker with the same look & feel as FormInput
 * (label, focus/error styling). Built on a plain Modal so it works on both
 * iOS and Android without native module quirks.
 */
export function FormPicker<T extends string>({
  label,
  value,
  options,
  onSelect,
  onBlur,
  error,
  placeholder = 'Select…',
  icon,
}: FormPickerProps<T>) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const borderColor = error ? theme.error : open ? theme.borderFocused : theme.border;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.inputWrapper,
          {
            borderColor,
            backgroundColor: error ? theme.errorBackground : theme.inputBackground,
          },
        ]}>
        {icon ? (
          <View style={styles.iconWrap}>
            <Icon name={icon} size={18} color={error ? theme.error : theme.textSecondary} />
          </View>
        ) : null}
        <Text
          style={[
            styles.value,
            { color: value ? theme.text : theme.textSecondary },
          ]}>
          {value || placeholder}
        </Text>
        <View style={styles.chevronWrap}>
          <Icon name="chevron-down" size={16} color={theme.textSecondary} />
        </View>
      </Pressable>
      {error ? (
        <Text style={[styles.error, { color: theme.error }]} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View
            style={[
              styles.sheet,
              { backgroundColor: theme.background, borderColor: theme.border },
            ]}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>{label}</Text>
            <ScrollView style={{ maxHeight: 320 }}>
              {options.map((opt) => (
                <Pressable
                  key={opt}
                  onPress={() => {
                    onSelect(opt);
                    onBlur?.();
                    setOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    {
                      backgroundColor: pressed
                        ? theme.backgroundSelected
                        : opt === value
                          ? theme.backgroundElement
                          : 'transparent',
                    },
                  ]}>
                  <Text style={{ color: theme.text, fontSize: 16 }}>{opt}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 14, fontWeight: '600', marginLeft: 2 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
  },
  icon: { fontSize: 16, marginRight: 8 },
  iconWrap: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  chevronWrap: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: { flex: 1, fontSize: 16 },
  error: { fontSize: 13, marginLeft: 2, fontWeight: '500' },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 24,
  },
  sheet: { borderRadius: 14, padding: 12, borderWidth: 1 },
  sheetTitle: { fontSize: 18, fontWeight: '700', padding: 8 },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

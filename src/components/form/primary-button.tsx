import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

/**
 * Primary call-to-action button.
 * Shows distinct styling for the disabled state so users get clear feedback
 * about when a form can be submitted.
 */
export function PrimaryButton({ label, onPress, disabled, loading }: PrimaryButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled }}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: isDisabled ? theme.backgroundSelected : theme.primary,
          opacity: pressed && !isDisabled ? 0.9 : 1,
        },
      ]}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
} from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type FormInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Optional leading emoji glyph shown inside the input. */
  icon?: string;
  /** Optional right adornment glyph (e.g. an eye for password visibility). */
  autoCorrect?: boolean;
};

/**
 * Controlled text input with:
 *  - label + leading icon
 *  - focus border highlight
 *  - error border + helper text + tinted background
 *  - secure-text toggle (eye) for password fields
 */
export function FormInput({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  icon,
  autoCorrect = false,
}: FormInputProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [reveal, setReveal] = useState(false);
  const isSecure = secureTextEntry && !reveal;

  const borderColor = error
    ? theme.error
    : focused
      ? theme.borderFocused
      : theme.border;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor,
            backgroundColor: error ? theme.errorBackground : theme.inputBackground,
          },
        ]}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          keyboardType={keyboardType}
          secureTextEntry={isSecure}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          style={[styles.input, { color: theme.text }]}
          accessibilityLabel={label}
        />
        {secureTextEntry ? (
          <Pressable
            onPress={() => setReveal((r) => !r)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={reveal ? 'Hide password' : 'Show password'}>
            <Text style={styles.icon}>{reveal ? '🙈' : '👁️'}</Text>
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <Text style={[styles.error, { color: theme.error }]} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  error: {
    fontSize: 13,
    marginLeft: 2,
    fontWeight: '500',
  },
});

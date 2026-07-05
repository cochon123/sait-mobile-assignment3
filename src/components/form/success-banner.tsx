import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/icons';
import { useTheme } from '@/hooks/use-theme';

type SuccessBannerProps = {
  message: string;
  onDismiss: () => void;
};

/** Inline success state shown after a form submits valid data. */
export function SuccessBanner({ message, onDismiss }: SuccessBannerProps) {
  const theme = useTheme();
  return (
    <Pressable onPress={onDismiss}>
      <View
        style={[
          styles.banner,
          { backgroundColor: theme.success + '22', borderColor: theme.success },
        ]}>
        <Icon name="check" size={20} color={theme.success} />
        <Text style={[styles.message, { color: theme.success }]}>{message}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 10,
  },
  message: { flex: 1, fontSize: 14, fontWeight: '600' },
});

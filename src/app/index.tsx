import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Icon, type IconName } from '@/components/icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FormCard = {
  title: string;
  description: string;
  icon: IconName;
  route: '/employee' | '/sign-in' | '/sign-up';
};

const FORMS: FormCard[] = [
  {
    title: 'Employee Information',
    description:
      'A five-field onboarding form with email, phone and postal-code format validation plus min/max length checks.',
    icon: 'clipboard',
    route: '/employee',
  },
  {
    title: 'Sign In',
    description: 'Authentication form with email format and password rules, including a visibility toggle.',
    icon: 'key',
    route: '/sign-in',
  },
  {
    title: 'Sign Up',
    description: 'Account creation with password strength rules and a confirm-password match check.',
    icon: 'sparkles',
    route: '/sign-up',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Icon name="edit" size={56} color={theme.primary} />
            <ThemedText type="title" style={styles.title}>
              Form Validation Lab
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              React Hook Form + Zod on Expo
            </ThemedText>
          </View>

          <View style={styles.cards}>
            {FORMS.map((form) => (
              <Pressable
                key={form.title}
                onPress={() => router.push(form.route)}
                style={({ pressed }) => [
                  styles.card,
                  {
                    backgroundColor: theme.backgroundElement,
                    borderColor: theme.border,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}>
                <View style={styles.cardIconWrap}>
                  <Icon name={form.icon} size={24} color={theme.primary} />
                </View>
                <View style={styles.cardBody}>
                  <ThemedText type="smallBold" style={styles.cardTitle}>
                    {form.title}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {form.description}
                  </ThemedText>
                </View>
                <Icon name="chevron-right" size={22} color={theme.textSecondary} />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
    gap: Spacing.five,
    maxWidth: 640,
    width: '100%',
    alignSelf: 'center',
  },
  header: { alignItems: 'center', gap: Spacing.two, marginTop: Spacing.four },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center' },
  cards: { gap: Spacing.three },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: 16,
    borderWidth: 1,
    gap: Spacing.three,
  },
  cardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#208AEF1A',
  },
  cardBody: { flex: 1, gap: 4 },
  cardTitle: { fontSize: 17 },
});

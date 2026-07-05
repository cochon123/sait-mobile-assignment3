import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FormCard = {
  title: string;
  description: string;
  icon: string;
  route: '/employee' | '/sign-in' | '/sign-up';
};

const FORMS: FormCard[] = [
  {
    title: 'Employee Information',
    description:
      'A five-field onboarding form with email, phone and postal-code format validation plus min/max length checks.',
    icon: '📋',
    route: '/employee',
  },
  {
    title: 'Sign In',
    description: 'Authentication form with email format and password rules, including a visibility toggle.',
    icon: '🔐',
    route: '/sign-in',
  },
  {
    title: 'Sign Up',
    description: 'Account creation with password strength rules and a confirm-password match check.',
    icon: '✨',
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
            <Text style={styles.hero}>📝</Text>
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
                <Text style={styles.cardIcon}>{form.icon}</Text>
                <View style={styles.cardBody}>
                  <ThemedText type="smallBold" style={styles.cardTitle}>
                    {form.title}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {form.description}
                  </ThemedText>
                </View>
                <Text style={[styles.chevron, { color: theme.textSecondary }]}>›</Text>
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
  hero: { fontSize: 56 },
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
  cardIcon: { fontSize: 32 },
  cardBody: { flex: 1, gap: 4 },
  cardTitle: { fontSize: 17 },
  chevron: { fontSize: 28, fontWeight: '300' },
});

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { FormInput } from '@/components/form/form-input';
import { PrimaryButton } from '@/components/form/primary-button';
import { SuccessBanner } from '@/components/form/success-banner';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { signUpSchema, type SignUpFormValues } from '@/schemas/sign-up-schema';

/** Compute a 0–4 strength score for live password feedback. */
function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  return score;
}

const STRENGTH_LABELS = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];

export default function SignUpScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [signedUp, setSignedUp] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' },
  });

  const password = watch('password');
  const strength = useMemo(() => passwordStrength(password ?? ''), [password]);

  const onSubmit = (data: SignUpFormValues) => {
    // Real app: register the user against your backend here.
    console.log('Sign-up submitted:', data);
    setSignedUp(true);
    reset();
  };

  const strengthColor =
    strength <= 1 ? theme.error : strength === 2 ? '#E0A100' : theme.success;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {signedUp ? (
            <SuccessBanner
              message="Account created! You can sign in now."
              onDismiss={() => setSignedUp(false)}
            />
          ) : null}

          <View style={styles.form}>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Full Name"
                  icon="👤"
                  placeholder="Jane Doe"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.fullName?.message}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Email"
                  icon="✉️"
                  placeholder="you@example.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Password"
                  icon="🔒"
                  placeholder="8+ chars, upper, lower, number"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry
                />
              )}
            />

            {password ? (
              <View style={styles.strength}>
                <View style={styles.strengthBar}>
                  {[0, 1, 2, 3].map((i) => (
                    <View
                      key={i}
                      style={[
                        styles.strengthSegment,
                        {
                          backgroundColor:
                            i < strength ? strengthColor : theme.backgroundSelected,
                        },
                      ]}
                    />
                  ))}
                </View>
                <ThemedText type="small" themeColor="textSecondary">
                  {STRENGTH_LABELS[strength]}
                </ThemedText>
              </View>
            ) : null}

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Confirm Password"
                  icon="🔒"
                  placeholder="Re-enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  secureTextEntry
                />
              )}
            />

            <PrimaryButton
              label="Create Account"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={isSubmitting}
            />

            <View style={styles.footer}>
              <ThemedText type="small" themeColor="textSecondary">
                Already have an account?{' '}
              </ThemedText>
              <ThemedText
                type="small"
                style={styles.link}
                onPress={() => router.push('/sign-in')}>
                Sign in
              </ThemedText>
            </View>
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
    padding: Spacing.four,
    gap: Spacing.three,
    maxWidth: 640,
    width: '100%',
    alignSelf: 'center',
  },
  form: { gap: Spacing.three },
  strength: { gap: 6, marginLeft: 2 },
  strengthBar: { flexDirection: 'row', gap: 4 },
  strengthSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  link: { color: '#208AEF', fontWeight: '600' },
});

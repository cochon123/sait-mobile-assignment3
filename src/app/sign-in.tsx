import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { FormInput } from '@/components/form/form-input';
import { PrimaryButton } from '@/components/form/primary-button';
import { SuccessBanner } from '@/components/form/success-banner';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { signInSchema, type SignInFormValues } from '@/schemas/sign-in-schema';

export default function SignInScreen() {
  const router = useRouter();
  const [signedIn, setSignedIn] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: SignInFormValues) => {
    // Real app: authenticate against your backend here.
    console.log('Sign-in submitted:', data);
    setSignedIn(true);
    reset();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {signedIn ? (
            <SuccessBanner
              message="Signed in successfully!"
              onDismiss={() => setSignedIn(false)}
            />
          ) : null}

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Email"
                  icon="mail"
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
                  icon="lock"
                  placeholder="At least 8 characters"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry
                />
              )}
            />

            <PrimaryButton
              label="Sign In"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={isSubmitting}
            />

            <View style={styles.footer}>
              <ThemedText type="small" themeColor="textSecondary">
                Don&apos;t have an account?{' '}
              </ThemedText>
              <ThemedText
                type="small"
                style={styles.link}
                onPress={() => router.push('/sign-up')}>
                Sign up
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  link: { color: '#208AEF', fontWeight: '600' },
});

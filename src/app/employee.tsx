import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormInput } from '@/components/form/form-input';
import { FormPicker } from '@/components/form/form-picker';
import { PrimaryButton } from '@/components/form/primary-button';
import { SuccessBanner } from '@/components/form/success-banner';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import {
  DEPARTMENTS,
  employeeSchema,
  type EmployeeFormValues,
} from '@/schemas/employee-schema';

export default function EmployeeFormScreen() {
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    // Validate as the user types/blurs for fast, friendly feedback.
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      postalCode: '',
      department: undefined,
    } as unknown as EmployeeFormValues,
  });

  const onSubmit = (data: EmployeeFormValues) => {
    // In a real app you'd POST `data` to an API here.
    console.log('Employee form submitted:', data);
    setSubmittedName(data.fullName);
    reset();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {submittedName ? (
            <SuccessBanner
              message={`Saved! Welcome aboard, ${submittedName}.`}
              onDismiss={() => setSubmittedName(null)}
            />
          ) : null}
          <View style={styles.form}>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Full Name"
                  icon="user"
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
                  icon="mail"
                  placeholder="jane.doe@sait.ca"
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
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Phone"
                  icon="phone"
                  placeholder="403-555-1234"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.phone?.message}
                  keyboardType="phone-pad"
                />
              )}
            />

            <Controller
              control={control}
              name="postalCode"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Postal Code"
                  icon="mailbox"
                  placeholder="T2P 1J9"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.postalCode?.message}
                  autoCapitalize="characters"
                />
              )}
            />

            <Controller
              control={control}
              name="department"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormPicker
                  label="Department"
                  icon="building"
                  value={value ?? ''}
                  options={DEPARTMENTS}
                  onSelect={onChange}
                  onBlur={onBlur}
                  error={errors.department?.message}
                />
              )}
            />

            <PrimaryButton
              label="Submit"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={isSubmitting}
            />
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
});

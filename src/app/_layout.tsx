import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackTitle: 'Back',
          contentStyle: { backgroundColor: theme.colors.background },
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="employee" options={{ title: 'Employee Information' }} />
        <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
        <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
      </Stack>
    </ThemeProvider>
  );
}

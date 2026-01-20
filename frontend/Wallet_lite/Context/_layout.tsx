import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from './AuthContext'; // <--- ici le provider
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Slot } from 'expo-router';

export const unstable_settings = {
  anchor: 'AuthificationContext',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Slot /> {/* injecte tous tes écrans */}
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

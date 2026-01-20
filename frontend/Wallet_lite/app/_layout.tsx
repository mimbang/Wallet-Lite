import { AuthProvider } from "@/Context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import TabLayout from "./(tabs)/_layout";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    
      <ThemeProvider  value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
        {/* <Slot />       */}
        {/* <TabLayout/> */}
        <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
        <StatusBar style="auto" />
        </AuthProvider>
      </ThemeProvider>
    
  );
}

import { useColorScheme } from "@/hooks/use-color-scheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack >
        {/* Login screen */}
        <Stack.Screen 
          name="login" 
          options={{ headerShown: false }} 
        />

        {/* Register screen */}
        <Stack.Screen 
          name="register" 
          options={{ headerShown: false }} 
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

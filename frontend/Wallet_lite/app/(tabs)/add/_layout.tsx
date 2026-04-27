import { useColorScheme } from "@/hooks/use-color-scheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        title:"", 
        headerShown:false,
      }}>
        {/*Profile screen */}
        <Stack.Screen 
          name="index"  
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

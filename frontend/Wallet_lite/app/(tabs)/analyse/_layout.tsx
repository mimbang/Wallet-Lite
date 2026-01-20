import { Stack } from "expo-router";


export default function MessageLayout() {
    return (
        <Stack screenOptions={{
        title:"", 
        headerShown:false,}}>
            <Stack.Screen name="index"
            />
           
        </Stack>
    )
}
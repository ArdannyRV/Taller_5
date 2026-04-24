import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="proyecto/[id]" options={{ title: 'Detalle del Proyecto' }} />
      <Stack.Screen name="proyecto/editar/[id]" options={{ title: 'Editar Proyecto' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
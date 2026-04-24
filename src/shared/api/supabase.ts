import AsyncStorage from "@react-native-async-storage/async-storage"
import { ENV } from "@shared/config/env"
import { createClient } from "@supabase/supabase-js"
import "react-native-url-polyfill/auto"

// Ej: import { HomeScreen } from '@pages/home/ui/HomeScreen';
// Esto esta bloqueado 
// npm run lint
// bloquean importaciones entre capas en un proyecto de JavaScript/TypeScript se configuran en el linter
// Ej: error    '@pages/home/ui/HomeScreen' import is restricted from being used by a pattern. FSD prohíbe importar desde capas superiores a shared  no-restricted-imports


export const supabase = createClient(ENV.supabaseUrl, ENV.supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})
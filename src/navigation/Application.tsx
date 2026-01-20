import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { useAuthStore } from '@/auth/authStore';

import { StartupScreen, AuthScreen, AuthVerifyScreen, ChatScreen, HistoryScreen } from '@/screens';


const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={Paths.Auth} component={AuthScreen} />
      <AuthStack.Screen name={Paths.AuthVerify} component={AuthVerifyScreen} />
    </AuthStack.Navigator>
  );
}

function AppStackNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name={Paths.Chat} component={ChatScreen} />
      <AppStack.Screen name={Paths.History} component={HistoryScreen} />
    </AppStack.Navigator>
  );
}

function ApplicationNavigator() {
  const { navigationTheme } = useTheme();
  const status = useAuthStore((s) => s.status);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        {status === 'loading' && (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name={Paths.Startup}
              component={StartupScreen}
            />
          </Stack.Navigator>
        )}

        {status === 'unauthenticated' && (
          <AuthStackNavigator />
        )}

        {status === 'authenticated' && (
          <AppStackNavigator />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;

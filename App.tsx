import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AuthScreen from './src/screens/AuthScreen';

type Screen = 'onboarding' | 'auth' | 'home';

export default function App() {
  const [screen, setScreen] = useState<Screen>('onboarding');

  if (screen === 'onboarding') {
    return <OnboardingScreen onFinish={() => setScreen('auth')} />;
  }

  if (screen === 'auth') {
    return <AuthScreen onNext={(phone) => setScreen('home')} />;
  }

  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>🎉 Добро пожаловать!</Text>
      <Text style={styles.placeholderSub}>Главный экран скоро...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  placeholderSub: {
    fontSize: 14,
    color: '#6B7280',
  },
});

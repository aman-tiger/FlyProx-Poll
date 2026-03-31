import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';

export default function App() {
  const [onboardingDone, setOnboardingDone] = useState(false);

  if (!onboardingDone) {
    return <OnboardingScreen onFinish={() => setOnboardingDone(true)} />;
  }

  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>🎉 Онбординг пройден!</Text>
      <Text style={styles.placeholderSub}>Следующий экран скоро...</Text>
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

import React, { useState } from 'react';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AuthScreen from './src/screens/AuthScreen';
import LocationScreen from './src/screens/LocationScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import PollScreen from './src/screens/PollScreen';
import RewardScreen from './src/screens/RewardScreen';
import { Country, City, School } from './src/data/locations';

type Screen = 'onboarding' | 'auth' | 'location' | 'profile' | 'poll' | 'reward';

interface LocationSelection {
  country: Country | null;
  city: City | null;
  school: School | null;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [locationSelection, setLocationSelection] = useState<LocationSelection>({
    country: null,
    city: null,
    school: null,
  });

  if (screen === 'onboarding') {
    return <OnboardingScreen onFinish={() => setScreen('auth')} />;
  }

  if (screen === 'auth') {
    return <AuthScreen onNext={() => setScreen('location')} />;
  }

  if (screen === 'location') {
    return (
      <LocationScreen
        onBack={() => setScreen('auth')}
        onSave={(sel) => {
          setLocationSelection(sel);
          setScreen('profile');
        }}
      />
    );
  }

  if (screen === 'profile') {
    return (
      <ProfileSetupScreen
        schoolName={locationSelection.school?.name}
        onBack={() => setScreen('location')}
        onSave={() => setScreen('poll')}
      />
    );
  }

  if (screen === 'poll') {
    return <PollScreen onSessionComplete={() => setScreen('reward')} />;
  }

  if (screen === 'reward') {
    return (
      <RewardScreen
        coinsEarned={100}
        onMorePolls={() => setScreen('poll')}
        onInviteFriend={() => {}}
      />
    );
  }

  return null;
}

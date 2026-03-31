import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IllustrationProps {
  slide: number;
}

const SLIDE_CONFIGS = [
  {
    emoji: '🗳️',
    bg: '#EBF2FF',
    accent: '#1D6BF3',
    figures: ['🕺', '💃', '🤸'],
  },
  {
    emoji: '😊',
    bg: '#E8F5E9',
    accent: '#34A853',
    figures: ['🙅', '✌️', '🌟'],
  },
  {
    emoji: '🪙',
    bg: '#FFF8E1',
    accent: '#F59E0B',
    figures: ['🪙', '💰', '🎉'],
  },
  {
    emoji: '👥',
    bg: '#F3E5F5',
    accent: '#8B5CF6',
    figures: ['👫', '🤝', '🎁'],
  },
];

export default function OnboardingIllustration({ slide }: IllustrationProps) {
  const config = SLIDE_CONFIGS[slide] ?? SLIDE_CONFIGS[0];

  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}>
      {/* Decorative circles */}
      <View style={[styles.circleLg, { borderColor: config.accent + '30' }]} />
      <View style={[styles.circleSm, { borderColor: config.accent + '40' }]} />

      {/* Figures row */}
      <View style={styles.figuresRow}>
        {config.figures.map((fig, i) => (
          <View
            key={i}
            style={[
              styles.figureCard,
              { backgroundColor: config.accent + '15' },
              i === 1 && styles.figureCardCenter,
            ]}
          >
            <Text style={[styles.figureEmoji, i === 1 && { fontSize: 52 }]}>{fig}</Text>
          </View>
        ))}
      </View>

      {/* Main icon */}
      <View style={[styles.mainIcon, { backgroundColor: config.accent + '20' }]}>
        <Text style={styles.mainEmoji}>{config.emoji}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    overflow: 'hidden',
  },
  circleLg: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1.5,
  },
  circleSm: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1.5,
  },
  figuresRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 16,
  },
  figureCard: {
    width: 70,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  figureCardCenter: {
    width: 84,
    height: 96,
    borderRadius: 20,
    marginBottom: 8,
  },
  figureEmoji: {
    fontSize: 40,
  },
  mainIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainEmoji: {
    fontSize: 28,
  },
});

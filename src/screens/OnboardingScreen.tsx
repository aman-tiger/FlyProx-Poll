import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  PanResponder,
} from 'react-native';
import OnboardingIllustration from '../components/OnboardingIllustration';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    title: 'Анонимное голосование',
    subtitle:
      'Мы никогда не раскрываем за кого вы проголосовали, ваше имя всегда анонимно',
  },
  {
    title: 'Без негатива',
    subtitle:
      'Мы исключаем обидные комментарии и негативный контент по нашим правилам',
  },
  {
    title: 'Монеты',
    subtitle: 'Получайте монеты голосуя — монеты бесплатны',
  },
  {
    title: 'Пригласи своих друзей',
    subtitle: 'Получи до 3 недель премиум за каждого приглашённого друга',
  },
];

interface OnboardingScreenProps {
  onFinish: () => void;
}

export default function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const indexRef = useRef(0);
  indexRef.current = currentIndex;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > 15 && Math.abs(dy) < 60,
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -50 && indexRef.current < SLIDES.length - 1) {
          setCurrentIndex(i => i + 1);
        } else if (dx > 50 && indexRef.current > 0) {
          setCurrentIndex(i => i - 1);
        }
      },
    })
  ).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const slide = SLIDES[currentIndex];
  const isLast = currentIndex === SLIDES.length - 1;
  const isFirst = currentIndex === 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        {!isFirst ? (
          <TouchableOpacity
            onPress={handleBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <TouchableOpacity
          onPress={onFinish}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.skipText}>Пропустить ›</Text>
        </TouchableOpacity>
      </View>

      {/* Swipeable area */}
      <View style={styles.swipeArea} {...panResponder.panHandlers}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <OnboardingIllustration slide={currentIndex} />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </View>
      </View>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>{isLast ? 'Начать' : 'Далее'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backText: {
    fontSize: 22,
    color: '#9CA3AF',
    fontWeight: '300',
  },
  skipText: {
    fontSize: 15,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  swipeArea: {
    flex: 1,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  illustrationBox: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: 24,
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: 32,
    paddingTop: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#1D6BF3',
    borderRadius: 4,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  button: {
    backgroundColor: '#1D6BF3',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#1D6BF3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});

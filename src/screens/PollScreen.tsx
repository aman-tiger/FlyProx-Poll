import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  POLL_QUESTIONS,
  CATEGORY_COLORS,
  getRandomClassmates,
} from '../data/polls';
import BottomTabBar from '../components/BottomTabBar';

const { width } = Dimensions.get('window');

interface PollScreenProps {
  onSessionComplete: () => void;
}

interface QuestionState {
  question: (typeof POLL_QUESTIONS)[0];
  options: string[];
  selected: string | null;
}

function buildSession(): QuestionState[] {
  return POLL_QUESTIONS.map((q) => ({
    question: q,
    options: getRandomClassmates(),
    selected: null,
  }));
}

export default function PollScreen({ onSessionComplete }: PollScreenProps) {
  const [session] = useState<QuestionState[]>(() => buildSession());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>(session[0].options);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const current = session[currentIndex];
  const colors = CATEGORY_COLORS[current.question.category] as [string, string];
  const progress = currentIndex + 1;
  const total = session.length;

  const handleSelect = (name: string) => {
    if (selected !== null) return;
    setSelected(name);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.97,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      if (currentIndex >= session.length - 1) {
        onSessionComplete();
        return;
      }
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setSelected(null);
        setOptions(session[nextIndex].options);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 700);
  };

  const handleShuffle = () => {
    if (selected !== null) return;
    setOptions(getRandomClassmates());
  };

  const handleSkip = () => {
    if (currentIndex >= session.length - 1) {
      onSessionComplete();
      return;
    }
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelected(null);
      setOptions(session[nextIndex].options);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={colors} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${(progress / total) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress} из {total}</Text>
          </View>

          <Animated.View
            style={[
              styles.content,
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
          >
            {/* Emoji */}
            <Text style={styles.emoji}>{current.question.emoji}</Text>

            {/* Question */}
            <Text style={styles.question}>{current.question.text}</Text>

            {/* Options 2×2 */}
            <View style={styles.optionsGrid}>
              {options.map((name, i) => {
                const isSelected = selected === name;
                const isOther = selected !== null && !isSelected;
                return (
                  <TouchableOpacity
                    key={`${name}-${i}`}
                    style={[
                      styles.optionBtn,
                      isSelected && styles.optionBtnSelected,
                      isOther && styles.optionBtnOther,
                    ]}
                    onPress={() => handleSelect(name)}
                    activeOpacity={0.85}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                        isOther && styles.optionTextOther,
                      ]}
                      numberOfLines={2}
                    >
                      {name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Bottom hint */}
            {selected === null && (
              <Text style={styles.hint}>Нажмите чтобы проголосовать</Text>
            )}
          </Animated.View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleShuffle} activeOpacity={0.7}>
              <Text style={styles.actionIcon}>⇅</Text>
              <Text style={styles.actionText}>Смешать</Text>
            </TouchableOpacity>
            <View style={styles.actionDivider} />
            <TouchableOpacity style={styles.actionBtn} onPress={handleSkip} activeOpacity={0.7}>
              <Text style={styles.actionText}>Пропустить</Text>
              <Text style={styles.actionIcon}> ›</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <BottomTabBar active="home" tint="#1D6BF3" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    gap: 6,
  },
  progressBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 20,
  },
  question: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 30,
  },
  optionsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  optionBtn: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
  },
  optionBtnSelected: {
    backgroundColor: '#fff',
    transform: [{ scale: 1.03 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  optionBtnOther: {
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#1D6BF3',
  },
  optionTextOther: {
    color: 'rgba(0,0,0,0.4)',
  },
  hint: {
    marginTop: 20,
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 4,
  },
  actionDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  actionIcon: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
  },
  actionText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
});

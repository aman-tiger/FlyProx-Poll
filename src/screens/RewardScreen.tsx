import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import BottomTabBar from '../components/BottomTabBar';

type RewardState = 'earned' | 'collected' | 'cooldown';

interface RewardScreenProps {
  coinsEarned?: number;
  onMorePolls: () => void;
  onInviteFriend: () => void;
}

export default function RewardScreen({
  coinsEarned = 100,
  onMorePolls,
  onInviteFriend,
}: RewardScreenProps) {
  const [state, setState] = useState<RewardState>('earned');
  const [countdown, setCountdown] = useState(40 * 60); // 40 minutes in seconds

  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        tension: 60,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [state]);

  useEffect(() => {
    if (state !== 'cooldown') return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [state]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCollect = () => {
    bounceAnim.setValue(0);
    fadeAnim.setValue(0);
    setState('collected');
  };

  const handleMorePolls = () => {
    bounceAnim.setValue(0);
    fadeAnim.setValue(0);
    setState('cooldown');
  };

  if (state === 'earned') {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor="#1D6BF3" />
        <SafeAreaView style={[styles.container, { backgroundColor: '#1D6BF3' }]}>
          <Animated.View style={[styles.center, { opacity: fadeAnim }]}>
            <Animated.Text
              style={[
                styles.bigEmoji,
                {
                  transform: [
                    {
                      scale: bounceAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              🎁
            </Animated.Text>
            <Text style={styles.headingWhite}>Босс, вы хорошо поработали.</Text>
            <Text style={styles.subWhite}>
              Вам начислено {coinsEarned} монет за голосование
            </Text>
            <Text style={styles.coins}>🪙🪙🪙</Text>
          </Animated.View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.btnWhite} onPress={handleCollect} activeOpacity={0.85}>
              <Text style={styles.btnWhiteIcon}>🪙</Text>
              <Text style={styles.btnBlueText}>Пополнить свой кабинет</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <BottomTabBar active="home" tint="#1D6BF3" />
      </View>
    );
  }

  if (state === 'collected') {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor="#1D6BF3" />
        <SafeAreaView style={[styles.container, { backgroundColor: '#1D6BF3' }]}>
          <Animated.View style={[styles.center, { opacity: fadeAnim }]}>
            <Animated.Text
              style={[
                styles.bigEmoji,
                {
                  transform: [
                    {
                      scale: bounceAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              🎁
            </Animated.Text>
            <Text style={styles.headingWhite}>Ваш кабинет пополнен</Text>
            <Text style={styles.coins}>🪙🪙🪙</Text>
          </Animated.View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.btnWhite} onPress={handleMorePolls} activeOpacity={0.85}>
              <Text style={styles.btnWhiteIcon}>🗳️</Text>
              <Text style={styles.btnBlueText}>Хочу ещё опросы</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <BottomTabBar active="home" tint="#1D6BF3" />
      </View>
    );
  }

  // cooldown state
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1D6BF3" />
      <SafeAreaView style={[styles.container, { backgroundColor: '#1D6BF3' }]}>
        <Animated.View style={[styles.center, { opacity: fadeAnim }]}>
          <Text style={styles.goldBars}>🏅🏅</Text>
          {countdown > 0 ? (
            <>
              <TouchableOpacity
                style={styles.retryBtn}
                onPress={onMorePolls}
                activeOpacity={0.85}
              >
                <Text style={styles.retryText}>Попробовать ещё раз</Text>
              </TouchableOpacity>
              <Text style={styles.headingWhite}>Новый опрос через</Text>
              <Text style={styles.timer}>{formatTime(countdown)}</Text>
            </>
          ) : (
            <TouchableOpacity style={styles.btnWhite} onPress={onMorePolls} activeOpacity={0.85}>
              <Text style={styles.btnBlueText}>Начать новый опрос</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.orText}>или</Text>
        </Animated.View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnWhite} onPress={onInviteFriend} activeOpacity={0.85}>
            <Text style={styles.btnWhiteIcon}>📱</Text>
            <Text style={styles.btnBlueText}>Пригласить друга</Text>
          </TouchableOpacity>
          <View style={{ height: 10 }} />
          <TouchableOpacity style={styles.btnWhiteOutline} activeOpacity={0.85}>
            <Text style={styles.btnWhiteIcon}>🎬</Text>
            <Text style={styles.btnWhiteOutlineText}>Посмотреть видео</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <BottomTabBar active="home" tint="#1D6BF3" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  bigEmoji: {
    fontSize: 80,
    marginBottom: 8,
  },
  goldBars: {
    fontSize: 72,
    marginBottom: 16,
  },
  headingWhite: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  subWhite: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  coins: {
    fontSize: 36,
    marginTop: 8,
  },
  timer: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 2,
  },
  orText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  retryBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    paddingTop: 8,
  },
  btnWhite: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  btnWhiteIcon: {
    fontSize: 18,
  },
  btnBlueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D6BF3',
  },
  btnWhiteOutline: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  btnWhiteOutlineText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

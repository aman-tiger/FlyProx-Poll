import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Tab = 'home' | 'search' | 'likes' | 'profile' | 'more';

interface BottomTabBarProps {
  active?: Tab;
  tint?: string;
  onTab?: (tab: Tab) => void;
}

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'home', label: 'Главная', icon: '⌂' },
  { key: 'search', label: 'Поиск', icon: '○' },
  { key: 'likes', label: 'Лайки', icon: '♡' },
  { key: 'profile', label: 'Профиль', icon: '◯' },
  { key: 'more', label: 'Ещё', icon: '≡' },
];

export default function BottomTabBar({ active = 'home', tint = '#1D6BF3', onTab }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTab?.(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.icon, isActive && { color: tint }]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, isActive && { color: tint }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: 20,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  icon: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  label: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '400',
  },
});

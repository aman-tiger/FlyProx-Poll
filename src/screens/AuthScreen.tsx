import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Список популярных стран
const COUNTRIES = [
  { code: 'KZ', flag: '🇰🇿', dial: '+7' },
  { code: 'RU', flag: '🇷🇺', dial: '+7' },
  { code: 'US', flag: '🇺🇸', dial: '+1' },
  { code: 'GB', flag: '🇬🇧', dial: '+44' },
  { code: 'DE', flag: '🇩🇪', dial: '+49' },
  { code: 'TR', flag: '🇹🇷', dial: '+90' },
  { code: 'UA', flag: '🇺🇦', dial: '+380' },
  { code: 'UZ', flag: '🇺🇿', dial: '+998' },
  { code: 'AE', flag: '🇦🇪', dial: '+971' },
];

function detectCountry(): typeof COUNTRIES[0] {
  // Позже можно подключить expo-localization
  return COUNTRIES[0]; // КЗ по умолчанию
}

interface AuthScreenProps {
  onNext: (phone: string) => void;
}

export default function AuthScreen({ onNext }: AuthScreenProps) {
  const [country, setCountry] = useState(detectCountry());
  const [phone, setPhone] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const fullPhone = country.dial + phone;
  const canContinue = phone.length >= 7;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top illustration placeholder */}
        <View style={styles.illustration}>
          <Text style={styles.illustrationEmoji}>🦸‍♂️🦸‍♀️</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Введите номер телефона</Text>
        <Text style={styles.subtitle}>
          Мы отправим вам код подтверждения
        </Text>

        {/* Phone input */}
        <View style={styles.inputRow}>
          <TouchableOpacity
            style={styles.countryButton}
            onPress={() => setShowPicker(!showPicker)}
            activeOpacity={0.7}
          >
            <Text style={styles.flag}>{country.flag}</Text>
            <Text style={styles.dial}>{country.dial}</Text>
            <Text style={styles.chevron}>▾</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.phoneInput}
            placeholder="Номер телефона"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            autoFocus
            maxLength={15}
          />
        </View>

        {/* Country picker */}
        {showPicker && (
          <View style={styles.picker}>
            {COUNTRIES.map((c) => (
              <TouchableOpacity
                key={c.code}
                style={styles.pickerItem}
                onPress={() => {
                  setCountry(c);
                  setShowPicker(false);
                }}
              >
                <Text style={styles.pickerFlag}>{c.flag}</Text>
                <Text style={styles.pickerDial}>{c.dial}</Text>
                <Text style={styles.pickerCode}>{c.code}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.spacer} />

        {/* Continue button */}
        <TouchableOpacity
          style={[styles.button, !canContinue && styles.buttonDisabled]}
          onPress={() => canContinue && onNext(fullPhone)}
          activeOpacity={canContinue ? 0.85 : 1}
        >
          <Text style={styles.buttonText}>Продолжить</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
  },
  illustration: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  illustrationEmoji: {
    fontSize: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    overflow: 'hidden',
  },
  countryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRightWidth: 1.5,
    borderRightColor: '#E5E7EB',
    gap: 4,
  },
  flag: {
    fontSize: 20,
  },
  dial: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
    marginLeft: 4,
  },
  chevron: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 2,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  picker: {
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  pickerFlag: {
    fontSize: 20,
  },
  pickerDial: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    width: 48,
  },
  pickerCode: {
    fontSize: 14,
    color: '#6B7280',
  },
  spacer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#1D6BF3',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#1D6BF3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#93C5FD',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});

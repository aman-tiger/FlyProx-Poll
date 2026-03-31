import React, { useState, useRef } from 'react';
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
  Modal,
  FlatList,
  Pressable,
} from 'react-native';

const COUNTRIES = [
  { code: 'KZ', flag: '🇰🇿', dial: '+7', name: 'Казахстан' },
  { code: 'RU', flag: '🇷🇺', dial: '+7', name: 'Россия' },
  { code: 'UZ', flag: '🇺🇿', dial: '+998', name: 'Узбекистан' },
  { code: 'KG', flag: '🇰🇬', dial: '+996', name: 'Кыргызстан' },
  { code: 'TJ', flag: '🇹🇯', dial: '+992', name: 'Таджикистан' },
  { code: 'UA', flag: '🇺🇦', dial: '+380', name: 'Украина' },
  { code: 'BY', flag: '🇧🇾', dial: '+375', name: 'Беларусь' },
  { code: 'AZ', flag: '🇦🇿', dial: '+994', name: 'Азербайджан' },
  { code: 'GE', flag: '🇬🇪', dial: '+995', name: 'Грузия' },
  { code: 'AM', flag: '🇦🇲', dial: '+374', name: 'Армения' },
  { code: 'TR', flag: '🇹🇷', dial: '+90', name: 'Турция' },
  { code: 'AE', flag: '🇦🇪', dial: '+971', name: 'ОАЭ' },
  { code: 'DE', flag: '🇩🇪', dial: '+49', name: 'Германия' },
  { code: 'US', flag: '🇺🇸', dial: '+1', name: 'США' },
  { code: 'GB', flag: '🇬🇧', dial: '+44', name: 'Великобритания' },
  { code: 'FR', flag: '🇫🇷', dial: '+33', name: 'Франция' },
  { code: 'PL', flag: '🇵🇱', dial: '+48', name: 'Польша' },
  { code: 'CN', flag: '🇨🇳', dial: '+86', name: 'Китай' },
  { code: 'IN', flag: '🇮🇳', dial: '+91', name: 'Индия' },
];

type Country = typeof COUNTRIES[0];

interface AuthScreenProps {
  onNext: (phone: string) => void;
}

export default function AuthScreen({ onNext }: AuthScreenProps) {
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [phone, setPhone] = useState('');
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
  );

  const canContinue = phone.replace(/\D/g, '').length >= 7;

  const handleSelect = (c: Country) => {
    setCountry(c);
    setModalVisible(false);
    setSearch('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Illustration */}
        <View style={styles.illustration}>
          <Text style={styles.illustrationEmoji}>🦸‍♂️🦸‍♀️</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Введите номер</Text>
        <Text style={styles.subtitle}>
          Отправим код подтверждения на ваш номер
        </Text>

        {/* Input block */}
        <View style={styles.inputBlock}>
          {/* Country selector */}
          <TouchableOpacity
            style={styles.countryRow}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.flag}>{country.flag}</Text>
            <View style={styles.countryInfo}>
              <Text style={styles.countryName}>{country.name}</Text>
              <Text style={styles.countryDial}>{country.dial}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Phone input */}
          <View style={styles.phoneRow}>
            <Text style={styles.dialPrefix}>{country.dial}</Text>
            <TextInput
              ref={inputRef}
              style={styles.phoneInput}
              placeholder="Номер телефона"
              placeholderTextColor="#C4C9D4"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              autoFocus
              maxLength={15}
            />
          </View>
        </View>

        <View style={styles.spacer} />

        {/* Continue button */}
        <TouchableOpacity
          style={[styles.button, !canContinue && styles.buttonDisabled]}
          onPress={() => canContinue && onNext(country.dial + phone)}
          activeOpacity={canContinue ? 0.85 : 1}
        >
          <Text style={[styles.buttonText, !canContinue && styles.buttonTextDisabled]}>
            Продолжить
          </Text>
        </TouchableOpacity>

        <Text style={styles.legal}>
          Продолжая, вы соглашаетесь с{' '}
          <Text style={styles.legalLink}>Условиями использования</Text>
        </Text>
      </KeyboardAvoidingView>

      {/* Country picker modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modal}>
          {/* Modal header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Страна</Text>
            <TouchableOpacity
              onPress={() => { setModalVisible(false); setSearch(''); }}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchRow}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск страны или кода"
              placeholderTextColor="#9CA3AF"
              value={search}
              onChangeText={setSearch}
              autoCorrect={false}
            />
          </View>

          {/* List */}
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.countryItem,
                  pressed && styles.countryItemPressed,
                  item.code === country.code && styles.countryItemActive,
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemFlag}>{item.flag}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDial}>{item.dial}</Text>
                {item.code === country.code && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </SafeAreaView>
      </Modal>
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
    marginBottom: 28,
  },
  illustrationEmoji: {
    fontSize: 72,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  inputBlock: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  flag: {
    fontSize: 24,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  countryDial: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 1,
  },
  chevron: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  dialPrefix: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 12,
  },
  spacer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#1D6BF3',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#1D6BF3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
  legal: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  legalLink: {
    color: '#1D6BF3',
  },

  // Modal
  modal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  modalClose: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
  },
  countryItemPressed: {
    backgroundColor: '#F9FAFB',
  },
  countryItemActive: {
    backgroundColor: '#EBF2FF',
  },
  itemFlag: {
    fontSize: 24,
  },
  itemName: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  itemDial: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 16,
    color: '#1D6BF3',
    fontWeight: '600',
    marginLeft: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 20,
  },
});

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Pressable,
  Linking,
} from 'react-native';
import { LOCATIONS, Country, City, School } from '../data/locations';

type Step = 'country' | 'city' | 'school';

interface Selection {
  country: Country | null;
  city: City | null;
  school: School | null;
}

interface LocationScreenProps {
  onBack: () => void;
  onSave: (selection: Selection) => void;
}

export default function LocationScreen({ onBack, onSave }: LocationScreenProps) {
  const [step, setStep] = useState<Step>('country');
  const [search, setSearch] = useState('');
  const [selection, setSelection] = useState<Selection>({
    country: null,
    city: null,
    school: null,
  });

  const stepLabel: Record<Step, string> = {
    country: 'Выберите страну',
    city: 'Выберите город',
    school: 'Выберите школу',
  };

  const items = useMemo(() => {
    const q = search.toLowerCase();
    if (step === 'country') {
      return LOCATIONS.filter((c) => c.name.toLowerCase().includes(q));
    }
    if (step === 'city' && selection.country) {
      return selection.country.cities.filter((c) => c.name.toLowerCase().includes(q));
    }
    if (step === 'school' && selection.city) {
      return selection.city.schools.filter((s) => s.name.toLowerCase().includes(q));
    }
    return [];
  }, [step, search, selection]);

  const handleBack = () => {
    if (step === 'city') {
      setStep('country');
      setSearch('');
    } else if (step === 'school') {
      setStep('city');
      setSearch('');
    } else {
      onBack();
    }
  };

  const handleSelect = (item: Country | City | School) => {
    setSearch('');
    if (step === 'country') {
      setSelection({ country: item as Country, city: null, school: null });
      setStep('city');
    } else if (step === 'city') {
      setSelection((prev) => ({ ...prev, city: item as City, school: null }));
      setStep('school');
    } else {
      const updated = { ...selection, school: item as School };
      setSelection(updated);
    }
  };

  const canSave = selection.school !== null;

  const breadcrumb = [
    selection.country?.name,
    selection.city?.name,
    selection.school?.name,
  ]
    .filter(Boolean)
    .join(' › ');

  type ListItem = Country | City | School;

  const renderItem = ({ item }: { item: ListItem }) => {
    const isCountry = step === 'country';
    const isCity = step === 'city';
    const isSchool = step === 'school';

    const title = item.name;
    const subtitle = isCountry
      ? (item as Country).flag
      : isCity
      ? (item as City).subtitle
      : (item as School).subtitle;

    const isSelected =
      (isCountry && selection.country?.id === (item as Country).id) ||
      (isCity && selection.city?.id === (item as City).id) ||
      (isSchool && selection.school?.id === (item as School).id);

    return (
      <Pressable
        style={({ pressed }) => [
          styles.item,
          pressed && styles.itemPressed,
          isSelected && styles.itemSelected,
        ]}
        onPress={() => handleSelect(item)}
      >
        <View style={[styles.itemIcon, isSelected && styles.itemIconSelected]}>
          {isCountry ? (
            <Text style={styles.itemFlag}>{(item as Country).flag}</Text>
          ) : (
            <Text style={styles.itemIconText}>📍</Text>
          )}
        </View>
        <View style={styles.itemText}>
          <Text style={[styles.itemTitle, isSelected && styles.itemTitleSelected]}>
            {title}
          </Text>
          {!isCountry && (
            <Text style={styles.itemSubtitle}>{subtitle}</Text>
          )}
        </View>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Illustration */}
      <View style={styles.illustration}>
        <Text style={styles.illustrationEmoji}>🦸‍♂️🦸‍♀️</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{stepLabel[step]}</Text>

      {/* Breadcrumb */}
      {breadcrumb ? (
        <Text style={styles.breadcrumb}>{breadcrumb}</Text>
      ) : null}

      {/* Search */}
      <View style={styles.searchRow}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={
            step === 'country'
              ? 'Поиск страны'
              : step === 'city'
              ? 'Поиск города'
              : 'Поиск школы'
          }
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <FlatList
        data={items as ListItem[]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={() => (
          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
            onPress={() => Linking.openURL('mailto:support@flyprox.com')}
          >
            <View style={styles.itemIcon}>
              <Text style={styles.itemIconText}>❓</Text>
            </View>
            <View style={styles.itemText}>
              <Text style={[styles.itemTitle, { color: '#1D6BF3' }]}>
                Нет вашей локации?
              </Text>
              <Text style={styles.itemSubtitle}>Написать в поддержку</Text>
            </View>
          </Pressable>
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* Save button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !canSave && styles.buttonDisabled]}
          onPress={() => canSave && onSave(selection)}
          activeOpacity={canSave ? 0.85 : 1}
        >
          <Text style={[styles.buttonText, !canSave && styles.buttonTextDisabled]}>
            Сохранить
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 0,
  },
  backArrow: {
    fontSize: 22,
    color: '#9CA3AF',
  },
  illustration: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  illustrationEmoji: {
    fontSize: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
    paddingHorizontal: 24,
  },
  breadcrumb: {
    fontSize: 13,
    color: '#1D6BF3',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    gap: 8,
  },
  searchIcon: {
    fontSize: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  clearBtn: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    gap: 12,
  },
  itemPressed: {
    opacity: 0.6,
  },
  itemSelected: {
    // subtle highlight
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIconSelected: {
    backgroundColor: '#EBF2FF',
  },
  itemFlag: {
    fontSize: 20,
  },
  itemIconText: {
    fontSize: 16,
  },
  itemText: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  itemTitleSelected: {
    color: '#1D6BF3',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 1,
  },
  checkmark: {
    fontSize: 16,
    color: '#1D6BF3',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  button: {
    borderWidth: 1.5,
    borderColor: '#1D6BF3',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    borderColor: '#E5E7EB',
  },
  buttonText: {
    color: '#1D6BF3',
    fontSize: 17,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
});

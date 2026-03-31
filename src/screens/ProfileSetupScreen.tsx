import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

const GRADES = ['5', '6', '7', '8', '9', '10', '11'];
const LETTERS = ['А', 'Б', 'В', 'Г', 'Д'];
type Gender = 'male' | 'female' | null;

interface ProfileSetupScreenProps {
  schoolName?: string;
  onBack: () => void;
  onSave: (grade: string, gender: string) => void;
}

export default function ProfileSetupScreen({ schoolName, onBack, onSave }: ProfileSetupScreenProps) {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender>(null);

  const canSave = selectedGrade !== null && selectedLetter !== null && gender !== null;
  const gradeLabel = selectedGrade && selectedLetter ? `${selectedGrade}${selectedLetter}` : null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Illustration */}
        <View style={styles.illustration}>
          <Text style={styles.illustrationEmoji}>🎒</Text>
        </View>

        <Text style={styles.title}>Расскажи о себе</Text>
        <Text style={styles.subtitle}>Это поможет подобрать нужный класс</Text>

        {/* School (readonly) */}
        {schoolName ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Школа</Text>
            <View style={styles.schoolBadge}>
              <Text style={styles.schoolIcon}>🏫</Text>
              <Text style={styles.schoolName}>{schoolName}</Text>
            </View>
          </View>
        ) : null}

        {/* Grade number */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Класс</Text>
          <View style={styles.chipRow}>
            {GRADES.map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.chip, selectedGrade === g && styles.chipSelected]}
                onPress={() => setSelectedGrade(g)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, selectedGrade === g && styles.chipTextSelected]}>
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Grade letter */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Буква</Text>
          <View style={styles.chipRow}>
            {LETTERS.map((l) => (
              <TouchableOpacity
                key={l}
                style={[styles.chip, selectedLetter === l && styles.chipSelected]}
                onPress={() => setSelectedLetter(l)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, selectedLetter === l && styles.chipTextSelected]}>
                  {l}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Grade preview */}
        {gradeLabel ? (
          <Text style={styles.gradePreview}>Ваш класс: {gradeLabel}</Text>
        ) : null}

        {/* Gender */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Пол</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[styles.genderBtn, gender === 'male' && styles.genderBtnSelected]}
              onPress={() => setGender('male')}
              activeOpacity={0.8}
            >
              <Text style={styles.genderEmoji}>👦</Text>
              <Text style={[styles.genderText, gender === 'male' && styles.genderTextSelected]}>
                Мужской
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderBtn, gender === 'female' && styles.genderBtnSelected]}
              onPress={() => setGender('female')}
              activeOpacity={0.8}
            >
              <Text style={styles.genderEmoji}>👧</Text>
              <Text style={[styles.genderText, gender === 'female' && styles.genderTextSelected]}>
                Женский
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Save button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !canSave && styles.buttonDisabled]}
          onPress={() => canSave && onSave(`${selectedGrade}${selectedLetter}`, gender!)}
          activeOpacity={canSave ? 0.85 : 1}
        >
          <Text style={[styles.buttonText, !canSave && styles.buttonTextDisabled]}>
            Продолжить
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
  },
  backArrow: {
    fontSize: 22,
    color: '#9CA3AF',
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 24,
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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 28,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  schoolBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  schoolIcon: {
    fontSize: 18,
  },
  schoolName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    minWidth: 48,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: {
    borderColor: '#1D6BF3',
    backgroundColor: '#EBF2FF',
  },
  chipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  chipTextSelected: {
    color: '#1D6BF3',
  },
  gradePreview: {
    fontSize: 14,
    color: '#1D6BF3',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: -8,
    marginBottom: 20,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 12,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    gap: 8,
  },
  genderBtnSelected: {
    borderColor: '#1D6BF3',
    backgroundColor: '#EBF2FF',
  },
  genderEmoji: {
    fontSize: 28,
  },
  genderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  genderTextSelected: {
    color: '#1D6BF3',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
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
});

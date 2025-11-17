import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import GeneticCalculator from '../utils/GeneticCalculator';

export default function TraitsScreen({ route, navigation }) {
  const language = route?.params?.language || 'ar';

  // Mother traits
  const [motherEye, setMotherEye] = useState('Brown');
  const [motherHair, setMotherHair] = useState('Black');
  const [motherSkin, setMotherSkin] = useState('Medium');
  const [motherHeight, setMotherHeight] = useState('165');

  // Father traits
  const [fatherEye, setFatherEye] = useState('Brown');
  const [fatherHair, setFatherHair] = useState('Black');
  const [fatherSkin, setFatherSkin] = useState('Medium');
  const [fatherHeight, setFatherHeight] = useState('175');

  // Child gender
  const [childGender, setChildGender] = useState('male');

  const translations = {
    ar: {
      title: 'الصفات الوراثية',
      subtitle: 'توقع صفات الطفل بناءً على بيانات علمية',
      motherTraits: 'صفات الأم',
      fatherTraits: 'صفات الأب',
      eyeColor: 'لون العين',
      hairColor: 'لون الشعر',
      skinTone: 'لون البشرة',
      height: 'الطول (سم)',
      childGenderLabel: 'جنس الطفل المتوقع',
      male: 'ذكر',
      female: 'أنثى',
      calculate: 'عرض النتيجة',
      back: 'رجوع',
      eyes: { Brown: 'بني', Hazel: 'عسلي', Green: 'أخضر', Blue: 'أزرق' },
      hairs: { Black: 'أسود', Brown: 'بني', Blonde: 'أشقر', Red: 'أحمر' },
      skins: { Light: 'فاتحة', Medium: 'متوسطة', Dark: 'غامقة' },
    },
    en: {
      title: 'Genetic Traits',
      subtitle: 'Predict child traits based on scientific data',
      motherTraits: "Mother's Traits",
      fatherTraits: "Father's Traits",
      eyeColor: 'Eye Color',
      hairColor: 'Hair Color',
      skinTone: 'Skin Tone',
      height: 'Height (cm)',
      childGenderLabel: 'Expected Child Gender',
      male: 'Male',
      female: 'Female',
      calculate: 'Show Result',
      back: 'Back',
      eyes: { Brown: 'Brown', Hazel: 'Hazel', Green: 'Green', Blue: 'Blue' },
      hairs: { Black: 'Black', Brown: 'Brown', Blonde: 'Blonde', Red: 'Red' },
      skins: { Light: 'Light', Medium: 'Medium', Dark: 'Dark' },
    },
  };

  const t = translations[language];

  const eyeOptions = ['Brown', 'Hazel', 'Green', 'Blue'];
  const hairOptions = ['Black', 'Brown', 'Blonde', 'Red'];
  const skinOptions = ['Light', 'Medium', 'Dark'];

  const handleCalculate = () => {
    const mHeight = parseInt(motherHeight) || 165;
    const fHeight = parseInt(fatherHeight) || 175;

    const results = GeneticCalculator.calculateAll(
      motherEye,
      fatherEye,
      motherHair,
      fatherHair,
      motherSkin,
      fatherSkin,
      mHeight,
      fHeight,
      childGender === 'male'
    );

    navigation.navigate('TraitsResult', { results, language });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons
            name={language === 'ar' ? 'arrow-forward' : 'arrow-back'}
            size={24}
            color="#1F2937"
          />
        </TouchableOpacity>

        {/* Header Glass Card */}
        <View style={styles.glassCard}>
          <Text style={[styles.title, language === 'ar' && styles.rtl]}>{t.title}</Text>
          <Text style={[styles.subtitle, language === 'ar' && styles.rtl]}>{t.subtitle}</Text>
        </View>

        {/* Mother Traits */}
        <View style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, language === 'ar' && styles.rtl]}>{t.motherTraits}</Text>

          <Text style={[styles.label, language === 'ar' && styles.rtl]}>{t.eyeColor}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={motherEye}
              onValueChange={(value) => setMotherEye(value)}
              style={styles.picker}
            >
              {eyeOptions.map((option) => (
                <Picker.Item key={option} label={t.eyes[option]} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={[styles.label, language === 'ar' && styles.rtl]}>{t.hairColor}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={motherHair}
              onValueChange={(value) => setMotherHair(value)}
              style={styles.picker}
            >
              {hairOptions.map((option) => (
                <Picker.Item key={option} label={t.hairs[option]} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={[styles.label, language === 'ar' && styles.rtl]}>{t.skinTone}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={motherSkin}
              onValueChange={(value) => setMotherSkin(value)}
              style={styles.picker}
            >
              {skinOptions.map((option) => (
                <Picker.Item key={option} label={t.skins[option]} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={[styles.label, language === 'ar' && styles.rtl]}>{t.height}</Text>
          <TextInput
            style={styles.input}
            value={motherHeight}
            onChangeText={setMotherHeight}
            keyboardType="numeric"
            placeholder="165"
          />
        </View>

        {/* Father Traits */}
        <View style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, language === 'ar' && styles.rtl]}>{t.fatherTraits}</Text>

          <Text style={[styles.label, language === 'ar' && styles.rtl]}>{t.eyeColor}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fatherEye}
              onValueChange={(value) => setFatherEye(value)}
              style={styles.picker}
            >
              {eyeOptions.map((option) => (
                <Picker.Item key={option} label={t.eyes[option]} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={[styles.label, language === 'ar' && styles.rtl]}>{t.hairColor}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fatherHair}
              onValueChange={(value) => setFatherHair(value)}
              style={styles.picker}
            >
              {hairOptions.map((option) => (
                <Picker.Item key={option} label={t.hairs[option]} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={[styles.label, language === 'ar' && styles.rtl]}>{t.skinTone}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fatherSkin}
              onValueChange={(value) => setFatherSkin(value)}
              style={styles.picker}
            >
              {skinOptions.map((option) => (
                <Picker.Item key={option} label={t.skins[option]} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={[styles.label, language === 'ar' && styles.rtl]}>{t.height}</Text>
          <TextInput
            style={styles.input}
            value={fatherHeight}
            onChangeText={setFatherHeight}
            keyboardType="numeric"
            placeholder="175"
          />
        </View>

        {/* Child Gender */}
        <View style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, language === 'ar' && styles.rtl]}>{t.childGenderLabel}</Text>
          <View style={styles.genderButtons}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                childGender === 'male' && styles.genderButtonActive,
              ]}
              onPress={() => setChildGender('male')}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  childGender === 'male' && styles.genderButtonTextActive,
                ]}
              >
                {t.male}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                childGender === 'female' && styles.genderButtonActive,
              ]}
              onPress={() => setChildGender('female')}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  childGender === 'female' && styles.genderButtonTextActive,
                ]}
              >
                {t.female}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Calculate Button */}
        <TouchableOpacity onPress={handleCalculate}>
          <LinearGradient
            colors={['#6C5CE7', '#FF7AB6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.calculateButton}
          >
            <Text style={[styles.calculateButtonText, language === 'ar' && styles.rtl]}>
              {t.calculate}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6F9',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 18,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 16,
    padding: 8,
  },
  glassCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  picker: {
    height: 50,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#6C5CE7',
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  genderButtonTextActive: {
    color: '#FFFFFF',
  },
  calculateButton: {
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rtl: {
    writingDirection: 'rtl',
  },
});

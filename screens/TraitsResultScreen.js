import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function TraitsResultScreen({ route, navigation }) {
  const { results, language } = route.params;

  const translations = {
    ar: {
      title: 'نتائج الصفات الوراثية',
      subtitle: 'توقعات الاحتمالات بناءً على بيانات علمية',
      eyeLabel: 'لون العين المتوقع',
      hairLabel: 'لون الشعر المتوقع',
      skinLabel: 'لون البشرة المتوقع',
      heightLabel: 'الطول المتوقع',
      sources: 'المصادر الطبية',
      back: 'رجوع',
      newPrediction: 'توقع جديد',
    },
    en: {
      title: 'Genetic Traits Results',
      subtitle: 'Probability predictions based on scientific data',
      eyeLabel: 'Predicted Eye Color',
      hairLabel: 'Predicted Hair Color',
      skinLabel: 'Predicted Skin Tone',
      heightLabel: 'Predicted Height',
      sources: 'Medical Sources',
      back: 'Back',
      newPrediction: 'New Prediction',
    },
  };

  const t = translations[language];

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

        {/* Eye Result */}
        <View style={styles.resultCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="eye" size={24} color="#6C5CE7" />
          </View>
          <View style={styles.resultContent}>
            <Text style={[styles.resultLabel, language === 'ar' && styles.rtl]}>{t.eyeLabel}</Text>
            <Text style={[styles.resultText, language === 'ar' && styles.rtl]}>{results.eye}</Text>
          </View>
        </View>

        {/* Hair Result */}
        <View style={styles.resultCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="color-palette" size={24} color="#6C5CE7" />
          </View>
          <View style={styles.resultContent}>
            <Text style={[styles.resultLabel, language === 'ar' && styles.rtl]}>{t.hairLabel}</Text>
            <Text style={[styles.resultText, language === 'ar' && styles.rtl]}>{results.hair}</Text>
          </View>
        </View>

        {/* Skin Result */}
        <View style={styles.resultCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="body" size={24} color="#6C5CE7" />
          </View>
          <View style={styles.resultContent}>
            <Text style={[styles.resultLabel, language === 'ar' && styles.rtl]}>{t.skinLabel}</Text>
            <Text style={[styles.resultText, language === 'ar' && styles.rtl]}>{results.skin}</Text>
          </View>
        </View>

        {/* Height Result */}
        <View style={styles.resultCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="resize" size={24} color="#6C5CE7" />
          </View>
          <View style={styles.resultContent}>
            <Text style={[styles.resultLabel, language === 'ar' && styles.rtl]}>{t.heightLabel}</Text>
            <Text style={[styles.resultText, language === 'ar' && styles.rtl]}>{results.height}</Text>
          </View>
        </View>

        {/* Sources Button */}
        <TouchableOpacity onPress={() => navigation.navigate('TraitsSources', { language })}>
          <LinearGradient
            colors={['#6C5CE7', '#FF7AB6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.sourcesButton}
          >
            <Ionicons name="book" size={20} color="white" />
            <Text style={[styles.sourcesButtonText, language === 'ar' && styles.rtl]}>
              {t.sources}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* New Prediction Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Traits', { language })} style={styles.newButton}>
          <Text style={[styles.newButtonText, language === 'ar' && styles.rtl]}>{t.newPrediction}</Text>
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
    paddingBottom: 40,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultContent: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  resultText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  sourcesButton: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 8,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  sourcesButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  newButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#6C5CE7',
  },
  newButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C5CE7',
  },
  rtl: {
    writingDirection: 'rtl',
  },
});

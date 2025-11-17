import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function TraitsSourcesScreen({ route, navigation }) {
  const language = route?.params?.language || 'ar';

  const translations = {
    ar: {
      title: 'المصادر الطبية',
      subtitle: 'المراجع الرسمية المستخدمة في قسم الصفات الوراثية',
      englishSources: 'English Sources:',
      arabicSources: 'مصادر عربية:',
      warning: 'تنبيه:',
      note: 'هذه التوقعات إحصائية وتعليمية (polygenic models) وليست تشخيصاً طبياً.',
      back: 'رجوع',
    },
    en: {
      title: 'Medical Sources',
      subtitle: 'Official references used in Genetic Traits section',
      englishSources: 'English Sources:',
      arabicSources: 'Arabic Sources:',
      warning: 'Warning:',
      note: 'These predictions are statistical and educational (polygenic models), not medical diagnosis.',
      back: 'Back',
    },
  };

  const t = translations[language];

  const englishSources = [
    { name: 'NIH – National Human Genome Research Institute', url: 'https://www.genome.gov' },
    { name: 'MedlinePlus Genetics – U.S. National Library of Medicine', url: 'https://medlineplus.gov/genetics' },
    { name: 'CDC – Centers for Disease Control and Prevention', url: 'https://www.cdc.gov' },
    { name: 'University of Edinburgh – Genetic Trait Studies', url: 'https://www.ed.ac.uk' },
    { name: 'Johns Hopkins Medicine – Height Prediction Formula', url: 'https://www.hopkinsmedicine.org' },
  ];

  const arabicSources = [
    { name: 'وزارة الصحة السعودية – محتوى التوعية الصحية', url: 'https://www.moh.gov.sa/HealthAwareness' },
    { name: 'Mayo Clinic Arabic', url: 'https://www.mayoclinic.org/ar' },
  ];

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

        {/* English Sources */}
        <Text style={[styles.sectionTitle, language === 'ar' && styles.rtl]}>{t.englishSources}</Text>
        {englishSources.map((source, index) => (
          <TouchableOpacity
            key={index}
            style={styles.sourceCard}
            onPress={() => Linking.openURL(source.url)}
          >
            <Ionicons name="link" size={20} color="#1565C0" />
            <Text style={styles.sourceName}>{source.name}</Text>
            <Ionicons name="open-outline" size={18} color="#1565C0" />
          </TouchableOpacity>
        ))}

        {/* Arabic Sources */}
        <Text style={[styles.sectionTitle, language === 'ar' && styles.rtl, { marginTop: 16 }]}>
          {t.arabicSources}
        </Text>
        {arabicSources.map((source, index) => (
          <TouchableOpacity
            key={index}
            style={styles.sourceCard}
            onPress={() => Linking.openURL(source.url)}
          >
            <Ionicons name="link" size={20} color="#2E7D32" />
            <Text style={[styles.sourceName, styles.arabicText]}>{source.name}</Text>
            <Ionicons name="open-outline" size={18} color="#2E7D32" />
          </TouchableOpacity>
        ))}

        {/* Warning Note */}
        <View style={styles.warningCard}>
          <Text style={[styles.warningTitle, language === 'ar' && styles.rtl]}>{t.warning}</Text>
          <Text style={[styles.warningText, language === 'ar' && styles.rtl]}>{t.note}</Text>
        </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8,
  },
  sourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sourceName: {
    flex: 1,
    fontSize: 14,
    color: '#1565C0',
    fontWeight: '500',
  },
  arabicText: {
    color: '#2E7D32',
  },
  warningCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 6,
  },
  warningText: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
  },
  rtl: {
    writingDirection: 'rtl',
  },
});

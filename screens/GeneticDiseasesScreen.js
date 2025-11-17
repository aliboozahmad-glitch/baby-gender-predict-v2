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

export default function GeneticDiseasesScreen({ route, navigation }) {
  const language = route?.params?.language || 'ar';

  const diseases = [
    {
      id: 'thalassemia',
      ar: 'الثلاسيميا (أنيميا البحر المتوسط)',
      en: 'Thalassemia',
      icon: 'water',
      color: '#E74C3C',
    },
    {
      id: 'sickle_cell',
      ar: 'فقر الدم المنجلي',
      en: 'Sickle Cell Anemia',
      icon: 'fitness',
      color: '#E67E22',
    },
    {
      id: 'hemophilia',
      ar: 'الهيموفيليا (نزف الدم)',
      en: 'Hemophilia',
      icon: 'medical',
      color: '#3498DB',
    },
    {
      id: 'cystic_fibrosis',
      ar: 'التليف الكيسي',
      en: 'Cystic Fibrosis',
      icon: 'body',
      color: '#9B59B6',
    },
    {
      id: 'down_syndrome',
      ar: 'متلازمة داون',
      en: 'Down Syndrome',
      icon: 'happy',
      color: '#1ABC9C',
    },
    {
      id: 'duchenne',
      ar: 'ضمور العضلات الدوشيني',
      en: 'Duchenne Muscular Dystrophy',
      icon: 'flame',
      color: '#F39C12',
    },
  ];

  const translations = {
    ar: {
      title: 'الأمراض الوراثية',
      subtitle: 'اختر مرضاً لمعرفة المزيد',
      back: 'رجوع',
    },
    en: {
      title: 'Genetic Diseases',
      subtitle: 'Select a disease to learn more',
      back: 'Back',
    },
  };

  const t = translations[language];

  return (
    <LinearGradient colors={['#667EEA', '#764BA2', '#F093FB']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons
            name={language === 'ar' ? 'arrow-forward' : 'arrow-back'}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <Text style={[styles.title, language === 'ar' && styles.rtl]}>{t.title}</Text>
        <Text style={[styles.subtitle, language === 'ar' && styles.rtl]}>{t.subtitle}</Text>

        <View style={styles.diseasesList}>
          {diseases.map((disease) => (
            <TouchableOpacity
              key={disease.id}
              style={styles.diseaseCard}
              onPress={() => navigation.navigate('DiseaseDetail', { disease, language })}
              activeOpacity={0.8}
            >
              <View style={[styles.iconContainer, { backgroundColor: disease.color }]}>
                <Ionicons name={disease.icon} size={24} color="white" />
              </View>
              <Text style={[styles.diseaseName, language === 'ar' && styles.rtl]}>
                {language === 'ar' ? disease.ar : disease.en}
              </Text>
              <Ionicons
                name={language === 'ar' ? 'chevron-back' : 'chevron-forward'}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 20,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 32,
  },
  diseasesList: {
    gap: 12,
  },
  diseaseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  diseaseName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  rtl: {
    writingDirection: 'rtl',
  },
});

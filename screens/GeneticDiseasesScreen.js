import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Constants from 'expo-constants';

const BACKEND_URL = Constants.expoConfig?.extra?.backendUrl || process.env.EXPO_PUBLIC_BACKEND_URL;

export default function GeneticDiseasesScreen({ route, navigation }) {
  const language = route?.params?.language || 'ar';

  const [wifeDiseases, setWifeDiseases] = useState([]);
  const [husbandDiseases, setHusbandDiseases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const diseases = [
    { id: 'thalassemia', ar: 'الثلاسيميا', en: 'Thalassemia' },
    { id: 'sickle_cell', ar: 'فقر الدم المنجلي', en: 'Sickle Cell Anemia' },
    { id: 'hemophilia', ar: 'الهيموفيليا', en: 'Hemophilia' },
    { id: 'cystic_fibrosis', ar: 'التليف الكيسي', en: 'Cystic Fibrosis' },
    { id: 'down_syndrome', ar: 'متلازمة داون', en: 'Down Syndrome' },
  ];

  const translations = {
    ar: {
      title: 'الأمراض الوراثية',
      subtitle: 'تقييم المخاطر الوراثية',
      wifeFamily: 'أمراض عائلة الزوجة',
      husbandFamily: 'أمراض عائلة الزوج',
      selectDiseases: 'اختر الأمراض الموجودة في العائلة',
      calculate: 'احسب المخاطر',
      back: 'رجوع',
      riskAssessment: 'تقييم المخاطر',
      riskPercentage: 'نسبة الخطر',
      low: 'منخفض',
      moderate: 'متوسط',
      high: 'عالي',
      recommendations: 'التوصيات',
      newAssessment: 'تقييم جديد',
      note: 'ملاحظة: هذا التقييم للاستشارة فقط - استشر طبيب متخصص',
    },
    en: {
      title: 'Genetic Diseases',
      subtitle: 'Genetic Risk Assessment',
      wifeFamily: "Wife's Family Diseases",
      husbandFamily: "Husband's Family Diseases",
      selectDiseases: 'Select diseases present in the family',
      calculate: 'Calculate Risk',
      back: 'Back',
      riskAssessment: 'Risk Assessment',
      riskPercentage: 'Risk Percentage',
      low: 'Low',
      moderate: 'Moderate',
      high: 'High',
      recommendations: 'Recommendations',
      newAssessment: 'New Assessment',
      note: 'Note: This assessment is for consultation only - consult a specialist',
    },
  };

  const t = translations[language];

  const toggleWifeDisease = (diseaseId) => {
    if (wifeDiseases.includes(diseaseId)) {
      setWifeDiseases(wifeDiseases.filter(d => d !== diseaseId));
    } else {
      setWifeDiseases([...wifeDiseases, diseaseId]);
    }
  };

  const toggleHusbandDisease = (diseaseId) => {
    if (husbandDiseases.includes(diseaseId)) {
      setHusbandDiseases(husbandDiseases.filter(d => d !== diseaseId));
    } else {
      setHusbandDiseases([...husbandDiseases, diseaseId]);
    }
  };

  const handleCalculate = async () => {
    if (wifeDiseases.length === 0 && husbandDiseases.length === 0) {
      Alert.alert(
        language === 'ar' ? 'تنبيه' : 'Warning',
        language === 'ar' ? 'يرجى اختيار مرض واحد على الأقل' : 'Please select at least one disease'
      );
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/predict-genetic-diseases`, {
        wife_family_diseases: wifeDiseases,
        husband_family_diseases: husbandDiseases,
        language: language,
      });

      setResult(response.data);
    } catch (error) {
      console.error('Assessment error:', error);
      Alert.alert(
        language === 'ar' ? 'خطأ' : 'Error',
        language === 'ar' ? 'حدث خطأ أثناء التقييم' : 'An error occurred during assessment'
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setWifeDiseases([]);
    setHusbandDiseases([]);
  };

  if (result) {
    const getRiskColor = () => {
      if (result.risk_percentage < 30) return ['#90EE90', '#32CD32'];
      if (result.risk_percentage < 60) return ['#FFD700', '#FFA500'];
      return ['#FF6B6B', '#FF4444'];
    };

    return (
      <LinearGradient colors={getRiskColor()} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons
              name={language === 'ar' ? 'arrow-forward' : 'arrow-back'}
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <View style={styles.resultContainer}>
            <Text style={[styles.resultTitle, language === 'ar' && styles.rtl]}>
              {t.riskAssessment}
            </Text>

            <View style={styles.riskIcon}>
              <Ionicons name="medical" size={80} color="white" />
            </View>

            <View style={styles.percentageContainer}>
              <Text style={[styles.percentageLabel, language === 'ar' && styles.rtl]}>
                {t.riskPercentage}
              </Text>
              <Text style={styles.percentageValue}>
                {result.risk_percentage}%
              </Text>
            </View>

            <Text style={[styles.riskLevel, language === 'ar' && styles.rtl]}>
              {result.risk_assessment === 'low' ? t.low : result.risk_assessment === 'moderate' ? t.moderate : t.high}
            </Text>

            <View style={styles.recommendationsContainer}>
              <Text style={[styles.recommendationsTitle, language === 'ar' && styles.rtl]}>
                {t.recommendations}
              </Text>
              <Text style={[styles.recommendationsText, language === 'ar' && styles.rtl]}>
                {result.recommendations}
              </Text>
            </View>

            <Text style={[styles.note, language === 'ar' && styles.rtl]}>
              {t.note}
            </Text>

            <TouchableOpacity onPress={resetForm} style={styles.newAssessmentButton}>
              <Text style={[styles.newAssessmentText, language === 'ar' && styles.rtl]}>
                {t.newAssessment}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#E0BBE4', '#957DAD', '#D291BC']} style={styles.container}>
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
        <Text style={[styles.instructions, language === 'ar' && styles.rtl]}>
          {t.selectDiseases}
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, language === 'ar' && styles.rtl]}>
            {t.wifeFamily}
          </Text>
          <View style={styles.diseasesList}>
            {diseases.map((disease) => (
              <TouchableOpacity
                key={`wife-${disease.id}`}
                style={[
                  styles.diseaseButton,
                  wifeDiseases.includes(disease.id) && styles.diseaseButtonSelected,
                ]}
                onPress={() => toggleWifeDisease(disease.id)}
              >
                <Ionicons
                  name={wifeDiseases.includes(disease.id) ? 'checkmark-circle' : 'ellipse-outline'}
                  size={24}
                  color="white"
                />
                <Text style={[styles.diseaseText, language === 'ar' && styles.rtl]}>
                  {language === 'ar' ? disease.ar : disease.en}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, language === 'ar' && styles.rtl]}>
            {t.husbandFamily}
          </Text>
          <View style={styles.diseasesList}>
            {diseases.map((disease) => (
              <TouchableOpacity
                key={`husband-${disease.id}`}
                style={[
                  styles.diseaseButton,
                  husbandDiseases.includes(disease.id) && styles.diseaseButtonSelected,
                ]}
                onPress={() => toggleHusbandDisease(disease.id)}
              >
                <Ionicons
                  name={husbandDiseases.includes(disease.id) ? 'checkmark-circle' : 'ellipse-outline'}
                  size={24}
                  color="white"
                />
                <Text style={[styles.diseaseText, language === 'ar' && styles.rtl]}>
                  {language === 'ar' ? disease.ar : disease.en}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={handleCalculate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={[styles.calculateButtonText, language === 'ar' && styles.rtl]}>
              {t.calculate}
            </Text>
          )}
        </TouchableOpacity>
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
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 16,
  },
  instructions: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  diseasesList: {
    gap: 12,
  },
  diseaseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  diseaseButtonSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  diseaseText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  calculateButton: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#957DAD',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
  },
  riskIcon: {
    marginBottom: 24,
  },
  percentageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  percentageLabel: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  percentageValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  riskLevel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
  },
  recommendationsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    width: '100%',
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  recommendationsText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
  },
  note: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  newAssessmentButton: {
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  newAssessmentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  rtl: {
    writingDirection: 'rtl',
  },
});

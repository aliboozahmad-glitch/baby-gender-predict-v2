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

export default function TraitsScreen({ route, navigation }) {
  const language = route?.params?.language || 'ar';

  const [motherTraits, setMotherTraits] = useState({
    hair_color: 'black',
    eye_color: 'brown',
    skin_tone: 'medium',
    height: 'average',
  });

  const [fatherTraits, setFatherTraits] = useState({
    hair_color: 'black',
    eye_color: 'brown',
    skin_tone: 'medium',
    height: 'average',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const traitOptions = {
    hair_color: [
      { id: 'black', ar: 'أسود', en: 'Black' },
      { id: 'brown', ar: 'بني', en: 'Brown' },
      { id: 'blonde', ar: 'أشقر', en: 'Blonde' },
      { id: 'red', ar: 'أحمر', en: 'Red' },
    ],
    eye_color: [
      { id: 'brown', ar: 'بني', en: 'Brown' },
      { id: 'blue', ar: 'أزرق', en: 'Blue' },
      { id: 'green', ar: 'أخضر', en: 'Green' },
      { id: 'hazel', ar: 'عسلي', en: 'Hazel' },
    ],
    skin_tone: [
      { id: 'fair', ar: 'فاتح', en: 'Fair' },
      { id: 'medium', ar: 'متوسط', en: 'Medium' },
      { id: 'dark', ar: 'داكن', en: 'Dark' },
    ],
    height: [
      { id: 'short', ar: 'قصير', en: 'Short' },
      { id: 'average', ar: 'متوسط', en: 'Average' },
      { id: 'tall', ar: 'طويل', en: 'Tall' },
    ],
  };

  const translations = {
    ar: {
      title: 'الصفات الوراثية',
      subtitle: 'توقع صفات الطفل',
      motherTraits: 'صفات الأم',
      fatherTraits: 'صفات الأب',
      hairColor: 'لون الشعر',
      eyeColor: 'لون العيون',
      skinTone: 'لون البشرة',
      height: 'الطول',
      calculate: 'احسب النتيجة',
      back: 'رجوع',
      predictedTraits: 'الصفات المتوقعة',
      newPrediction: 'توقع جديد',
      note: 'ملاحظة: هذا التوقع تقريبي - الوراثة معقدة وقد تختلف النتائج',
    },
    en: {
      title: 'Genetic Traits',
      subtitle: 'Predict Child Traits',
      motherTraits: "Mother's Traits",
      fatherTraits: "Father's Traits",
      hairColor: 'Hair Color',
      eyeColor: 'Eye Color',
      skinTone: 'Skin Tone',
      height: 'Height',
      calculate: 'Calculate Result',
      back: 'Back',
      predictedTraits: 'Predicted Traits',
      newPrediction: 'New Prediction',
      note: 'Note: This prediction is approximate - genetics are complex and results may vary',
    },
  };

  const t = translations[language];

  const updateMotherTrait = (trait, value) => {
    setMotherTraits({ ...motherTraits, [trait]: value });
  };

  const updateFatherTrait = (trait, value) => {
    setFatherTraits({ ...fatherTraits, [trait]: value });
  };

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/predict-traits`, {
        mother_traits: motherTraits,
        father_traits: fatherTraits,
        language: language,
      });

      setResult(response.data);
    } catch (error) {
      console.error('Prediction error:', error);
      Alert.alert(
        language === 'ar' ? 'خطأ' : 'Error',
        language === 'ar' ? 'حدث خطأ أثناء التوقع' : 'An error occurred during prediction'
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
  };

  if (result) {
    return (
      <LinearGradient colors={['#FFB6C1', '#DDA0DD', '#87CEEB']} style={styles.container}>
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
              {t.predictedTraits}
            </Text>

            <View style={styles.traitsGrid}>
              <View style={styles.traitCard}>
                <Ionicons name="color-palette" size={40} color="white" />
                <Text style={[styles.traitLabel, language === 'ar' && styles.rtl]}>{t.hairColor}</Text>
                <Text style={styles.traitValue}>
                  {language === 'ar' 
                    ? traitOptions.hair_color.find(o => o.id === result.predicted_traits.hair_color)?.ar
                    : traitOptions.hair_color.find(o => o.id === result.predicted_traits.hair_color)?.en
                  }
                </Text>
                <Text style={styles.percentage}>{result.percentages.hair}%</Text>
              </View>

              <View style={styles.traitCard}>
                <Ionicons name="eye" size={40} color="white" />
                <Text style={[styles.traitLabel, language === 'ar' && styles.rtl]}>{t.eyeColor}</Text>
                <Text style={styles.traitValue}>
                  {language === 'ar' 
                    ? traitOptions.eye_color.find(o => o.id === result.predicted_traits.eye_color)?.ar
                    : traitOptions.eye_color.find(o => o.id === result.predicted_traits.eye_color)?.en
                  }
                </Text>
                <Text style={styles.percentage}>{result.percentages.eye}%</Text>
              </View>

              <View style={styles.traitCard}>
                <Ionicons name="body" size={40} color="white" />
                <Text style={[styles.traitLabel, language === 'ar' && styles.rtl]}>{t.skinTone}</Text>
                <Text style={styles.traitValue}>
                  {language === 'ar' 
                    ? traitOptions.skin_tone.find(o => o.id === result.predicted_traits.skin_tone)?.ar
                    : traitOptions.skin_tone.find(o => o.id === result.predicted_traits.skin_tone)?.en
                  }
                </Text>
                <Text style={styles.percentage}>{result.percentages.skin}%</Text>
              </View>

              <View style={styles.traitCard}>
                <Ionicons name="resize" size={40} color="white" />
                <Text style={[styles.traitLabel, language === 'ar' && styles.rtl]}>{t.height}</Text>
                <Text style={styles.traitValue}>
                  {language === 'ar' 
                    ? traitOptions.height.find(o => o.id === result.predicted_traits.height)?.ar
                    : traitOptions.height.find(o => o.id === result.predicted_traits.height)?.en
                  }
                </Text>
                <Text style={styles.percentage}>{result.percentages.height}%</Text>
              </View>
            </View>

            <Text style={[styles.note, language === 'ar' && styles.rtl]}>
              {t.note}
            </Text>

            <TouchableOpacity onPress={resetForm} style={styles.newPredictionButton}>
              <Text style={[styles.newPredictionText, language === 'ar' && styles.rtl]}>
                {t.newPrediction}
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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, language === 'ar' && styles.rtl]}>
            {t.motherTraits}
          </Text>
          {Object.keys(traitOptions).map((trait) => (
            <View key={`mother-${trait}`} style={styles.traitSelector}>
              <Text style={[styles.traitSelectorLabel, language === 'ar' && styles.rtl]}>
                {t[trait.replace('_', '')]}
              </Text>
              <View style={styles.optionsRow}>
                {traitOptions[trait].map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      motherTraits[trait] === option.id && styles.optionButtonSelected,
                    ]}
                    onPress={() => updateMotherTrait(trait, option.id)}
                  >
                    <Text style={[styles.optionText, language === 'ar' && styles.rtl]}>
                      {language === 'ar' ? option.ar : option.en}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, language === 'ar' && styles.rtl]}>
            {t.fatherTraits}
          </Text>
          {Object.keys(traitOptions).map((trait) => (
            <View key={`father-${trait}`} style={styles.traitSelector}>
              <Text style={[styles.traitSelectorLabel, language === 'ar' && styles.rtl]}>
                {t[trait.replace('_', '')]}
              </Text>
              <View style={styles.optionsRow}>
                {traitOptions[trait].map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      fatherTraits[trait] === option.id && styles.optionButtonSelected,
                    ]}
                    onPress={() => updateFatherTrait(trait, option.id)}
                  >
                    <Text style={[styles.optionText, language === 'ar' && styles.rtl]}>
                      {language === 'ar' ? option.ar : option.en}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
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
  traitSelector: {
    marginBottom: 20,
  },
  traitSelectorLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  optionText: {
    fontSize: 14,
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
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
  },
  traitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    marginBottom: 32,
  },
  traitCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: '45%',
    minWidth: 140,
  },
  traitLabel: {
    fontSize: 14,
    color: 'white',
    marginTop: 12,
    marginBottom: 8,
  },
  traitValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  note: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  newPredictionButton: {
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  newPredictionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#BA55D3',
  },
  rtl: {
    writingDirection: 'rtl',
  },
});

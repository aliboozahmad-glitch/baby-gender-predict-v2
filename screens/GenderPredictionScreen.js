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

export default function GenderPredictionScreen({ route, navigation }) {
  const language = route?.params?.language || 'ar';

  const [wifeFamily, setWifeFamily] = useState(['male']);
  const [husbandFamily, setHusbandFamily] = useState(['male']);
  const [childNumber, setChildNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const translations = {
    ar: {
      title: 'توقع نوع الجنين',
      subtitle: 'بناءً على التاريخ العائلي',
      wifeFamily: 'نمط عائلة الزوجة',
      husbandFamily: 'نمط عائلة الزوج',
      child: 'الطفل',
      male: 'ذكر',
      female: 'أنثى',
      whichChild: 'أي طفل تريد توقعه؟',
      firstChild: 'الطفل الأول',
      secondChild: 'الطفل الثاني',
      predict: 'احسب النتيجة',
      prediction: 'النتيجة المتوقعة',
      boy: 'ولد 👦',
      girl: 'بنت 👧',
      confidence: 'نسبة الدقة',
      back: 'رجوع',
      newPrediction: 'توقع جديد',
      note: 'ملاحظة: هذا التوقع مبني على التاريخ العائلي وليس فحصاً طبياً',
      instructions: 'حدد نوع الأطفال من كل عائلة (1-3 أطفال)',
    },
    en: {
      title: 'Gender Prediction',
      subtitle: 'Based on Family History',
      wifeFamily: "Wife's Family Pattern",
      husbandFamily: "Husband's Family Pattern",
      child: 'Child',
      male: 'Boy',
      female: 'Girl',
      whichChild: 'Which child to predict?',
      firstChild: 'First Child',
      secondChild: 'Second Child',
      predict: 'Calculate Result',
      prediction: 'Predicted Result',
      boy: 'Boy 👦',
      girl: 'Girl 👧',
      confidence: 'Accuracy Rate',
      back: 'Back',
      newPrediction: 'New Prediction',
      note: 'Note: This prediction is based on family history and is not a medical test',
      instructions: 'Select gender of children from each family (1-3 children)',
    },
  };

  const t = translations[language];

  const toggleWifeChild = (index: number) => {
    const updated = [...wifeFamily];
    updated[index] = updated[index] === 'male' ? 'female' : 'male';
    setWifeFamily(updated);
  };

  const toggleHusbandChild = (index: number) => {
    const updated = [...husbandFamily];
    updated[index] = updated[index] === 'male' ? 'female' : 'male';
    setHusbandFamily(updated);
  };

  const addWifeChild = () => {
    if (wifeFamily.length < 3) {
      setWifeFamily([...wifeFamily, 'male']);
    }
  };

  const removeWifeChild = () => {
    if (wifeFamily.length > 1) {
      setWifeFamily(wifeFamily.slice(0, -1));
    }
  };

  const addHusbandChild = () => {
    if (husbandFamily.length < 3) {
      setHusbandFamily([...husbandFamily, 'male']);
    }
  };

  const removeHusbandChild = () => {
    if (husbandFamily.length > 1) {
      setHusbandFamily(husbandFamily.slice(0, -1));
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const wifeChildren = wifeFamily.map((gender, index) => ({
        order: index + 1,
        gender: gender,
      }));

      const husbandChildren = husbandFamily.map((gender, index) => ({
        order: index + 1,
        gender: gender,
      }));

      const response = await axios.post(`${BACKEND_URL}/api/predict-gender`, {
        current_pregnancy_order: childNumber,
        wife_family_children: wifeChildren,
        husband_family_children: husbandChildren,
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
    setWifeFamily(['male']);
    setHusbandFamily(['male']);
    setChildNumber(1);
  };

  if (result) {
    const resultColors = result.predicted_gender === 'male' 
      ? ['#87CEEB', '#4682B4', '#1E90FF']
      : ['#FFB6C1', '#FF69B4', '#FF1493'];
    
    return (
      <LinearGradient colors={resultColors} style={styles.container}>
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
              {t.prediction}
            </Text>

            <View style={styles.genderIcon}>
              <Text style={styles.genderEmoji}>
                {result.predicted_gender === 'male' ? '👦' : '👧'}
              </Text>
            </View>

            <Text style={[styles.genderText, language === 'ar' && styles.rtl]}>
              {result.predicted_gender === 'male' ? t.boy : t.girl}
            </Text>

            <View style={styles.confidenceContainer}>
              <Text style={[styles.confidenceLabel, language === 'ar' && styles.rtl]}>
                {t.confidence}
              </Text>
              <Text style={styles.confidenceValue}>
                {result.confidence_percentage}%
              </Text>
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
        
        <Text style={[styles.instructions, language === 'ar' && styles.rtl]}>
          {t.instructions}
        </Text>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, language === 'ar' && styles.rtl]}>
              {t.wifeFamily}
            </Text>
            <View style={styles.addRemoveButtons}>
              <TouchableOpacity
                onPress={removeWifeChild}
                style={[styles.smallButton, wifeFamily.length <= 1 && styles.buttonDisabled]}
                disabled={wifeFamily.length <= 1}
              >
                <Ionicons name="remove" size={20} color={wifeFamily.length <= 1 ? '#ccc' : 'white'} />
              </TouchableOpacity>
              <Text style={styles.countText}>{wifeFamily.length}</Text>
              <TouchableOpacity
                onPress={addWifeChild}
                style={[styles.smallButton, wifeFamily.length >= 3 && styles.buttonDisabled]}
                disabled={wifeFamily.length >= 3}
              >
                <Ionicons name="add" size={20} color={wifeFamily.length >= 3 ? '#ccc' : 'white'} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.childrenRow}>
            {wifeFamily.map((gender, index) => (
              <TouchableOpacity
                key={`wife-${index}`}
                style={[
                  styles.childButton,
                  gender === 'male' ? styles.maleButton : styles.femaleButton,
                ]}
                onPress={() => toggleWifeChild(index)}
              >
                <Text style={styles.childNumber}>{t.child} {index + 1}</Text>
                <Text style={styles.childGenderEmoji}>
                  {gender === 'male' ? '👦' : '👧'}
                </Text>
                <Text style={styles.childGenderText}>
                  {gender === 'male' ? t.male : t.female}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, language === 'ar' && styles.rtl]}>
              {t.husbandFamily}
            </Text>
            <View style={styles.addRemoveButtons}>
              <TouchableOpacity
                onPress={removeHusbandChild}
                style={[styles.smallButton, husbandFamily.length <= 1 && styles.buttonDisabled]}
                disabled={husbandFamily.length <= 1}
              >
                <Ionicons name="remove" size={20} color={husbandFamily.length <= 1 ? '#ccc' : 'white'} />
              </TouchableOpacity>
              <Text style={styles.countText}>{husbandFamily.length}</Text>
              <TouchableOpacity
                onPress={addHusbandChild}
                style={[styles.smallButton, husbandFamily.length >= 3 && styles.buttonDisabled]}
                disabled={husbandFamily.length >= 3}
              >
                <Ionicons name="add" size={20} color={husbandFamily.length >= 3 ? '#ccc' : 'white'} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.childrenRow}>
            {husbandFamily.map((gender, index) => (
              <TouchableOpacity
                key={`husband-${index}`}
                style={[
                  styles.childButton,
                  gender === 'male' ? styles.maleButton : styles.femaleButton,
                ]}
                onPress={() => toggleHusbandChild(index)}
              >
                <Text style={styles.childNumber}>{t.child} {index + 1}</Text>
                <Text style={styles.childGenderEmoji}>
                  {gender === 'male' ? '👦' : '👧'}
                </Text>
                <Text style={styles.childGenderText}>
                  {gender === 'male' ? t.male : t.female}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, language === 'ar' && styles.rtl]}>{t.whichChild}</Text>
          <View style={styles.childNumberButtons}>
            <TouchableOpacity
              style={[
                styles.childNumberButton,
                childNumber === 1 && styles.childNumberButtonActive,
              ]}
              onPress={() => setChildNumber(1)}
            >
              <Text
                style={[
                  styles.childNumberButtonText,
                  childNumber === 1 && styles.childNumberButtonTextActive,
                  language === 'ar' && styles.rtl
                ]}
              >
                {t.firstChild}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.childNumberButton,
                childNumber === 2 && styles.childNumberButtonActive,
              ]}
              onPress={() => setChildNumber(2)}
            >
              <Text
                style={[
                  styles.childNumberButtonText,
                  childNumber === 2 && styles.childNumberButtonTextActive,
                  language === 'ar' && styles.rtl
                ]}
              >
                {t.secondChild}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.predictButton}
          onPress={handlePredict}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={[styles.predictButtonText, language === 'ar' && styles.rtl]}>
              {t.predict}
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
  instructions: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  addRemoveButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  smallButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  childrenRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  childButton: {
    flex: 1,
    minWidth: 90,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  maleButton: {
    backgroundColor: 'rgba(135, 206, 235, 0.9)',
  },
  femaleButton: {
    backgroundColor: 'rgba(255, 182, 193, 0.9)',
  },
  childNumber: {
    fontSize: 12,
    color: 'white',
    marginBottom: 8,
  },
  childGenderEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  childGenderText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  childNumberButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  childNumberButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
  },
  childNumberButtonActive: {
    backgroundColor: 'white',
  },
  childNumberButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  childNumberButtonTextActive: {
    color: '#957DAD',
  },
  predictButton: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  predictButtonText: {
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
  genderIcon: {
    marginBottom: 24,
  },
  genderEmoji: {
    fontSize: 120,
  },
  genderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
  },
  confidenceContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  confidenceLabel: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  confidenceValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  note: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 32,
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
    color: '#4682B4',
  },
  rtl: {
    writingDirection: 'rtl',
  },
});

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

export default function DiseaseDetailScreen({ route, navigation }) {
  const { disease, language } = route.params;

  const diseaseData = {
    thalassemia: {
      ar: {
        name: 'الثلاسيميا (أنيميا البحر المتوسط)',
        definition: 'مرض وراثي يؤثر على إنتاج الهيموجلوبين في الدم، مما يؤدي إلى فقر الدم المزمن.',
        inheritance: 'وراثة جسمية متنحية - يحتاج الطفل لجينين مصابين (من الأب والأم) لظهور المرض',
        riskOne: 'إذا كان أحد الأبوين حاملاً: 50% احتمال أن يكون الطفل حاملاً، 50% سليم',
        riskBoth: 'إذا كان كلا الأبوين حاملين: 25% مصاب، 50% حامل، 25% سليم',
        notes: 'ينصح بإجراء فحص ما قبل الزواج للكشف المبكر. العلاج يشمل نقل الدم الدوري.',
      },
      en: {
        name: 'Thalassemia',
        definition: 'A genetic disorder affecting hemoglobin production, causing chronic anemia.',
        inheritance: 'Autosomal recessive - child needs two affected genes (from both parents)',
        riskOne: 'If one parent is a carrier: 50% carrier child, 50% healthy',
        riskBoth: 'If both parents are carriers: 25% affected, 50% carrier, 25% healthy',
        notes: 'Premarital screening recommended. Treatment includes regular blood transfusions.',
      },
    },
    sickle_cell: {
      ar: {
        name: 'فقر الدم المنجلي',
        definition: 'مرض وراثي يسبب تشوه خلايا الدم الحمراء لتصبح منجلية الشكل، مما يعيق تدفق الدم.',
        inheritance: 'وراثة جسمية متنحية',
        riskOne: 'إذا كان أحد الأبوين حاملاً: 50% احتمال حامل، 50% سليم',
        riskBoth: 'إذا كان كلا الأبوين حاملين: 25% مصاب، 50% حامل، 25% سليم',
        notes: 'يسبب نوبات ألم شديدة. العلاج يشمل الأدوية والمسكنات وأحياناً نقل الدم.',
      },
      en: {
        name: 'Sickle Cell Anemia',
        definition: 'Genetic disease causing red blood cells to become sickle-shaped, blocking blood flow.',
        inheritance: 'Autosomal recessive',
        riskOne: 'If one parent is a carrier: 50% carrier, 50% healthy',
        riskBoth: 'If both parents are carriers: 25% affected, 50% carrier, 25% healthy',
        notes: 'Causes severe pain episodes. Treatment includes medication, pain relief, sometimes transfusions.',
      },
    },
    hemophilia: {
      ar: {
        name: 'الهيموفيليا (نزف الدم الوراثي)',
        definition: 'مرض وراثي يمنع الدم من التجلط بشكل طبيعي، مما يسبب نزيفاً مطولاً حتى من الجروح البسيطة.',
        inheritance: 'وراثة مرتبطة بالكروموسوم X - تصيب الذكور بشكل أساسي',
        riskOne: 'إذا كانت الأم حاملة: 50% من الذكور مصابون، 50% من الإناث حاملات',
        riskBoth: 'إذا كان الأب مصاب والأم حاملة: احتمالات أعلى للإصابة',
        notes: 'يحتاج المصاب لحقن منتظمة من عوامل التجلط. تجنب الإصابات والجروح مهم جداً.',
      },
      en: {
        name: 'Hemophilia',
        definition: 'Genetic disorder preventing blood from clotting normally, causing prolonged bleeding.',
        inheritance: 'X-linked - primarily affects males',
        riskOne: 'If mother is carrier: 50% of males affected, 50% of females carriers',
        riskBoth: 'If father affected and mother carrier: higher risk',
        notes: 'Requires regular clotting factor injections. Avoiding injuries is crucial.',
      },
    },
    cystic_fibrosis: {
      ar: {
        name: 'التليف الكيسي',
        definition: 'مرض وراثي يؤثر على الغدد المخاطية، مسبباً تراكم مخاط سميك في الرئتين والجهاز الهضمي.',
        inheritance: 'وراثة جسمية متنحية',
        riskOne: 'إذا كان أحد الأبوين حاملاً: 50% حامل، 50% سليم',
        riskBoth: 'إذا كان كلا الأبوين حاملين: 25% مصاب، 50% حامل، 25% سليم',
        notes: 'يتطلب علاجاً مستمراً للرئتين والجهاز الهضمي. التشخيص المبكر مهم جداً.',
      },
      en: {
        name: 'Cystic Fibrosis',
        definition: 'Genetic disease affecting mucus glands, causing thick mucus in lungs and digestive system.',
        inheritance: 'Autosomal recessive',
        riskOne: 'If one parent is carrier: 50% carrier, 50% healthy',
        riskBoth: 'If both parents are carriers: 25% affected, 50% carrier, 25% healthy',
        notes: 'Requires continuous lung and digestive treatment. Early diagnosis is crucial.',
      },
    },
    down_syndrome: {
      ar: {
        name: 'متلازمة داون',
        definition: 'حالة وراثية ناتجة عن نسخة إضافية من الكروموسوم 21، تسبب تأخراً في النمو وملامح وجه مميزة.',
        inheritance: 'خلل كروموسومي - يحدث عشوائياً، لكن الخطر يزداد مع عمر الأم',
        riskOne: 'عمر الأم أقل من 35: حوالي 1 من كل 1500',
        riskBoth: 'عمر الأم فوق 40: حوالي 1 من كل 100',
        notes: 'يمكن للمصابين عيش حياة طبيعية مع الدعم والتعليم المناسب. الفحص أثناء الحمل متاح.',
      },
      en: {
        name: 'Down Syndrome',
        definition: 'Genetic condition from extra copy of chromosome 21, causing developmental delays and distinctive features.',
        inheritance: 'Chromosomal abnormality - occurs randomly, risk increases with maternal age',
        riskOne: 'Mother under 35: about 1 in 1500',
        riskBoth: 'Mother over 40: about 1 in 100',
        notes: 'Individuals can live normal lives with proper support and education. Prenatal screening available.',
      },
    },
    duchenne: {
      ar: {
        name: 'ضمور العضلات الدوشيني',
        definition: 'مرض وراثي يسبب ضعفاً تدريجياً في العضلات، يبدأ في الطفولة المبكرة.',
        inheritance: 'وراثة مرتبطة بالكروموسوم X - يصيب الذكور بشكل أساسي',
        riskOne: 'إذا كانت الأم حاملة: 50% من الذكور مصابون',
        riskBoth: 'نادراً ما تصاب الإناث لكن قد يكن حاملات',
        notes: 'لا يوجد علاج شافٍ حالياً. العلاج الطبيعي والداعم يساعد في تحسين نوعية الحياة.',
      },
      en: {
        name: 'Duchenne Muscular Dystrophy',
        definition: 'Genetic disease causing progressive muscle weakness, starting in early childhood.',
        inheritance: 'X-linked - primarily affects males',
        riskOne: 'If mother is carrier: 50% of males affected',
        riskBoth: 'Females rarely affected but may be carriers',
        notes: 'No cure currently. Physical and supportive therapy helps improve quality of life.',
      },
    },
  };

  const data = diseaseData[disease.id][language];

  const translations = {
    ar: {
      back: 'رجوع',
      definition: 'التعريف',
      inheritance: 'نوع الوراثة',
      risk: 'نسبة إصابة الطفل',
      notes: 'ملاحظات',
    },
    en: {
      back: 'Back',
      definition: 'Definition',
      inheritance: 'Inheritance Type',
      risk: 'Child Risk Percentage',
      notes: 'Notes',
    },
  };

  const t = translations[language];

  return (
    <LinearGradient colors={['#667EEA', '#764BA2']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons
            name={language === 'ar' ? 'arrow-forward' : 'arrow-back'}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <View style={[styles.iconContainer, { backgroundColor: disease.color }]}>
          <Ionicons name={disease.icon} size={48} color="white" />
        </View>

        <Text style={[styles.title, language === 'ar' && styles.rtl]}>{data.name}</Text>

        <View style={styles.card}>
          <Text style={[styles.cardTitle, language === 'ar' && styles.rtl]}>{t.definition}</Text>
          <Text style={[styles.cardText, language === 'ar' && styles.rtl]}>{data.definition}</Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.cardTitle, language === 'ar' && styles.rtl]}>{t.inheritance}</Text>
          <Text style={[styles.cardText, language === 'ar' && styles.rtl]}>{data.inheritance}</Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.cardTitle, language === 'ar' && styles.rtl]}>{t.risk}</Text>
          <Text style={[styles.cardText, language === 'ar' && styles.rtl]}>{data.riskOne}</Text>
          {data.riskBoth && (
            <Text style={[styles.cardText, language === 'ar' && styles.rtl, { marginTop: 8 }]}>
              {data.riskBoth}
            </Text>
          )}
        </View>

        <View style={[styles.card, styles.notesCard]}>
          <Text style={[styles.cardTitle, language === 'ar' && styles.rtl]}>{t.notes}</Text>
          <Text style={[styles.cardText, language === 'ar' && styles.rtl]}>{data.notes}</Text>
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notesCard: {
    backgroundColor: '#FFF9E6',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  rtl: {
    writingDirection: 'rtl',
  },
});

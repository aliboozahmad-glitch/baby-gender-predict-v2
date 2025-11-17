// GeneticCalculator - Scientific genetic trait predictions
// Based on NIH, MedlinePlus, Johns Hopkins, and University of Edinburgh studies

const GeneticCalculator = {
  // Eye color rules - simplified polygenic-based estimates (sources: NIH / MedlinePlus)
  getEyeColorResult(mother, father) {
    const key = `${mother}-${father}`;
    const reverseKey = `${father}-${mother}`;
    
    const rules = {
      'Brown-Brown': 'بني 75% — عسلي 18% — أخضر 6% — أزرق 1%  (NIH)',
      'Brown-Blue': 'بني 50% — أخضر 37.5% — أزرق 12.5%  (NIH)',
      'Blue-Brown': 'بني 50% — أخضر 37.5% — أزرق 12.5%  (NIH)',
      'Blue-Blue': 'أزرق 99% — أخضر 1%  (NIH)',
      'Green-Blue': 'أخضر 50% — أزرق 50%  (NIH)',
      'Blue-Green': 'أخضر 50% — أزرق 50%  (NIH)',
      'Green-Brown': 'بني 65% — أخضر 30% — أزرق 5%  (NIH)',
      'Brown-Green': 'بني 65% — أخضر 30% — أزرق 5%  (NIH)',
    };
    
    return rules[key] || rules[reverseKey] || 'بيانات غير كافية';
  },

  // Hair color rules - simplified (source: University of Edinburgh studies)
  getHairColorResult(mother, father) {
    const key = `${mother}-${father}`;
    const reverseKey = `${father}-${mother}`;
    
    const rules = {
      'Black-Black': 'أسود 80% — بني 20%  (Edinburgh)',
      'Black-Blonde': 'أسود 50% — بني/أشقر 50%',
      'Blonde-Black': 'أسود 50% — بني/أشقر 50%',
      'Brown-Blonde': 'بني 30% — أشقر 70%',
      'Blonde-Brown': 'بني 30% — أشقر 70%',
      'Blonde-Blonde': 'أشقر 90% — بني فاتح 10%',
    };
    
    return rules[key] || rules[reverseKey] || 'بيانات غير كافية';
  },

  // Skin tone rules - simplified polygenic estimates (source: NHGRI)
  getSkinToneResult(mother, father) {
    const key = `${mother}-${father}`;
    const reverseKey = `${father}-${mother}`;
    
    const rules = {
      'Dark-Dark': 'غامقة 80% — متوسطة 20%  (NHGRI)',
      'Dark-Light': 'فاتحة 20% — متوسطة 60% — غامقة 20%',
      'Light-Dark': 'فاتحة 20% — متوسطة 60% — غامقة 20%',
      'Medium-Medium': 'متوسطة 70% — فاتحة 15% — غامقة 15%',
      'Light-Light': 'فاتحة 95% — متوسطة 5%',
    };
    
    return rules[key] || rules[reverseKey] || 'بيانات غير كافية';
  },

  // Height calculation - Johns Hopkins formula; +/- 8 cm variability
  getHeightResult(motherHeight, fatherHeight, isMale) {
    const mHeight = parseInt(motherHeight) || 165;
    const fHeight = parseInt(fatherHeight) || 175;
    
    const base = isMale
      ? Math.round((mHeight + fHeight + 13) / 2)
      : Math.round((mHeight + fHeight - 13) / 2);
    
    const low = base - 8;
    const high = base + 8;
    
    return `${base} سم (متوقع) — نطاق تقريبي: ${low} - ${high} سم  (Johns Hopkins)`;
  },

  // Calculate all traits at once
  calculateAll(motherEye, fatherEye, motherHair, fatherHair, motherSkin, fatherSkin, motherHeight, fatherHeight, isMale) {
    return {
      eye: this.getEyeColorResult(motherEye, fatherEye),
      hair: this.getHairColorResult(motherHair, fatherHair),
      skin: this.getSkinToneResult(motherSkin, fatherSkin),
      height: this.getHeightResult(motherHeight, fatherHeight, isMale),
    };
  },
};

export default GeneticCalculator;

const bmiCategory = (bmi: number): string => {
  if (bmi < 16.0) {
    return `Underweight (Severe thinness) - ${bmi}`;
  } else if (bmi > 16.0 && bmi < 16.9) {
    return `Underweight (Moderate thinness) - ${bmi}`;
  } else if (bmi > 17.0 && bmi < 18.4) {
    return `Underweight (Mild thinness) - ${bmi}`;
  } else if (bmi > 18.5 && bmi < 24.9) {
    return `Normal ${bmi}`;
  } else if (bmi > 25.0 && bmi < 29.9) {
    return `Overweight (Pre-obese) - ${bmi}`;
  } else if (bmi > 30.0 && bmi < 34.9) {
    return `Obese (Class I) - ${bmi}`;
  } else if (bmi > 35.0 && bmi < 39.9) {
    return `Obese (Class II) - ${bmi}`;
  } else {
    return `Obese (Class III) - ${bmi}`;
  }
};

const calculateBmi = (height: number, weight: number): string => {
  if (typeof height !== "number" || typeof weight !== "number")
    throw new Error("values must be number");
  if (height === 0 || weight === 0) throw new Error("values must not not be 0");
  const _heightInMetres = height / 100;
  const BMI =
    Math.round((weight / (_heightInMetres * _heightInMetres)) * 100) / 100;
  return bmiCategory(BMI);
};

console.log(calculateBmi(180, 74));

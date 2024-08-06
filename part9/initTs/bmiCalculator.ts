interface Values {
  value1: number;
  value2: number;
}

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

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
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

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

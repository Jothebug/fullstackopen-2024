import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: number;
  //   ratingDescription: string;
  target: number;
  average: number;
}

// const checkValidHours = (data: Array<any>): boolean => {
//   data.forEach((item) => {
//     if (typeof item !== "number") return false;
//   });
//   return true;
// };

const exerciseCalculator = (
  hours: Array<number>,
  targetHours: number
): Result => {
  if (hours.length === 0) throw new Error("There is no daily exercise hours");

  const periodLength = hours.length;
  let trainingDays = 0;
  hours.forEach((hour) => {
    if (hour !== 0) {
      trainingDays += 1;
    }
  });
  const totalHour = hours.reduce((acc, currentvalue) => acc + currentvalue, 0);
  const average = totalHour / periodLength;
  const success = average >= targetHours;
  const rating = Math.round(targetHours - average);

  return {
    periodLength,
    trainingDays,
    success,
    target: targetHours,
    average,
    rating,
  };
};

console.log(exerciseCalculator([3, 0, 2, 4, 0, 3, 1], 2));

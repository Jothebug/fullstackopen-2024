const operation = ["multiply", "add", "divide"] as const;
type Operation = (typeof operation)[number];

const isOperator = (op: Operation | any): Boolean => {
  return operation.includes(op);
};

interface Values {
  value1: number;
  value2: number;
  op: Operation | any;
}

const parseArgv = (args: Array<string>): Values => {
  if (args.length < 5) throw new Error("Not enough arguments");
  if (args.length > 5) throw new Error("Too many arguments");

  if (
    !isNaN(Number(args[2])) &&
    !isNaN(Number(args[3])) &&
    isOperator(args[4])
  ) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
      op: args[4],
    };
  } else {
    throw new Error("Provided values were not right!");
  }
};

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

try {
  const { value1, value2, op } = parseArgv(process.argv);
  console.log(calculator(value1, value2, op));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

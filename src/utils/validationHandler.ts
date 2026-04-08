import { Validator } from 'node-input-validator';

type ValidationRules = Record<string, string>;
type UserInput = Record<string, any>;

const validationFunction = async (
  userInput: UserInput,
  validationRules: ValidationRules
): Promise<string | null> => {
  const validation = new Validator(userInput, validationRules);

  const isValid: boolean = await validation.check();

  if (!isValid) {
    const firstKey = Object.keys(validation.errors)[0];
    const err: string = validation.errors[firstKey].message;

    console.log('error', err);
    return err;
  }

  return null;
};

export default validationFunction;
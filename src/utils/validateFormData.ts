import { ValidationError } from 'yup';
import { IFormDataOptional } from '../interfaces/IFormData';
import { formDataSchema } from './formDataSchema';

export async function validateFormData(dataToValidate: IFormDataOptional) {
  try {
    const formData = await formDataSchema.validate(dataToValidate, {
      abortEarly: false,
    });
    return { formData };
  } catch (ex) {
    if (!(ex instanceof ValidationError)) {
      throw new Error('Not a validation error');
    }

    const errors: Record<string, string[]> = {};

    ex.inner.forEach((element) => {
      const path = element.path || 'root';

      errors[path]
        ? errors[path].push(element.message)
        : (errors[path] = [element.message]);
    });

    return { errors };
  }
}

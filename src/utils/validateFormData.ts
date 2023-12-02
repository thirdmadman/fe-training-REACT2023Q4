import { boolean, number, object, ref, string, ValidationError } from 'yup';
import { IFormDataOptional } from '../interfaces/IFormData';

export async function validateFormData(dataToValidate: IFormDataOptional) {
  const userSchema = object({
    name: string().label('Name').required(),
    age: number().label('Age').required().positive().integer(),
    gender: string().label('Gender').required(),
    country: string().label('Country').required(),
    email: string().label('Email').required().email(),
    password: string()
      .label('Password')
      .required()
      .test({
        name: 'max',
        message: '${path} must contain at least 1 character',
        test: (value) => /^(?=.*[a-z]).+/.test(value),
      })
      .test({
        name: 'max',
        message: '${path} must contain at least 1 uppercase character',
        test: (value) => /^(?=.*[A-Z]).+/.test(value),
      })
      .test({
        name: 'max',
        message: '${path} must contain at least 1 digit',
        test: (value) => /^(?=.*[0-9]).+/.test(value),
      })
      .test({
        name: 'max',
        message: '${path} must contain at least 1 special character',
        test: (value) => /^(?=.*[\W]).+/.test(value),
      }),
    passwordRepeat: string()
      .label('Password')
      .required()
      .oneOf([ref('password')], 'Passwords must match'),
    acceptTC: boolean()
      .label('Accept of T&C')
      .required()
      .isTrue('You must accept T&C'),
    userPicture: string().label('User picture').required(),
  });

  try {
    const formData = await userSchema.validate(dataToValidate, {
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

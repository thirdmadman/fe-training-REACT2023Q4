import { boolean, number, object, ref, string } from 'yup';

export const formDataSchema = object().shape({
  name: string()
    .label('Name')
    .required()
    .test({
      message: '${path} must starts from capital letter',
      test: (value) => !!value[0] && value[0].toUpperCase() === value[0],
    }),
  age: number()
    .typeError('${path} must be a number')
    .label('Age')
    .required()
    .integer()
    .positive(),
  gender: string()
    .label('Gender')
    .required()
    .test({
      message: '${path} is required field',
      test: (value) => value !== 'null',
    }),
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
  userPicture: string()
    .label('User picture')
    .required()
    .test({
      message: '${path} must be png or jpg',
      test: (value) => /^(?=.*image\/(png|jpg|jpeg);base64).+/.test(value),
    })
    .test({
      message: '${path} size must less than 2 Mb',
      test: (value) => value.length < 2000000,
    }),
});

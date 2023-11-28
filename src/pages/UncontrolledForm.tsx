import { useRef } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { ISavedFormData, saveFormData } from '../redux/features/mainPageSlice';
import { boolean, number, object, ref, string, ValidationError } from 'yup';
import { IFormDataOptional } from '../interfaces/IFormData';

const convertBase64 = async (file: File) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(null);
      console.error(error);
    };
  });
};

export function UncontrolledForm() {
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const genderInput = useRef<HTMLInputElement>(null);
  const countryInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const passwordRepeatInput = useRef<HTMLInputElement>(null);
  const acceptTCRepeatInput = useRef<HTMLInputElement>(null);
  const userPictureInput = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const extractFromData = async () => {
    let userPictureData: string | undefined;

    if (userPictureInput.current?.files) {
      const tmp = await convertBase64(userPictureInput.current.files[0]);
      if (typeof tmp === 'string') {
        userPictureData = tmp;
      }
    }

    const formData = {
      name: nameInput.current?.value,
      age: ageInput.current?.value
        ? parseInt(ageInput.current.value, 10)
        : undefined,
      gender: genderInput.current?.value,
      country: countryInput.current?.value,
      email: emailInput.current?.value,
      password: passwordInput.current?.value,
      passwordRepeat: passwordRepeatInput.current?.value,
      acceptTC: Boolean(acceptTCRepeatInput.current?.checked),
      userPicture: userPictureData,
    };

    return formData;
  };

  const validateFormData = async (dataToValidate: IFormDataOptional) => {
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
          test: (value) => /^(?=.*[a-z]).+/.test(value),
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
      return formData;
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

      return errors;
    }
  };

  const onSubmitEvent = async () => {
    console.log('onSubmitEvent');
    const formData = await extractFromData();
    console.log('formData :>> ', formData);

    const validate = await validateFormData(formData);
    console.log('validate :>> ', validate);

    dispatch(saveFormData(formData as unknown as ISavedFormData));
  };

  return (
    <form onSubmit={onSubmitEvent}>
      <div>UncontrolledForm</div>

      <input type="email" placeholder="Input your email" ref={emailInput} />
      <input
        type="text"
        placeholder="Input your password"
        ref={passwordInput}
      />
      <input
        type="text"
        placeholder="Repeat your password"
        ref={passwordRepeatInput}
      />

      <input type="text" placeholder="Input your name" ref={nameInput} />
      <input type="text" placeholder="Input your age" ref={ageInput} />
      <input type="text" placeholder="Input your gender" ref={genderInput} />
      <input type="text" placeholder="Input your country" ref={countryInput} />
      <input type="file" ref={userPictureInput} />

      <input type="checkbox" ref={acceptTCRepeatInput} />

      <button type="submit">Submit</button>
    </form>
  );
}

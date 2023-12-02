import { useRef, useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { ISavedFormData, saveFormData } from '../redux/features/mainPageSlice';
import { IFormDataOptional } from '../interfaces/IFormData';
import { convertFileToBase64 } from '../utils/convertFileToBase64';
import { GenericUncontrolledInput } from '../components/GenericUncotrolledInput';
import { validateFormData } from '../utils/validateFormData';

type TFormInputErrors = Partial<Record<keyof IFormDataOptional, Array<string>>>;

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

  const [errors, setErrors] = useState<TFormInputErrors | null>(null);

  const extractFromData = async () => {
    let userPictureData: string | undefined;

    if (userPictureInput.current?.files) {
      try {
        const tmp = await convertFileToBase64(
          userPictureInput.current.files[0]
        );
        if (typeof tmp === 'string') {
          userPictureData = tmp;
        }
      } catch (e) {
        console.error(e);
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

  const onSubmitEvent = async () => {
    console.log('onSubmitEvent');
    const formData = await extractFromData();
    console.log('formData :>> ', formData);

    const validate = await validateFormData(formData);
    console.log('validate :>> ', validate);

    if (validate.errors) {
      setErrors(validate.errors);
    }

    dispatch(saveFormData(formData as unknown as ISavedFormData));
  };

  const extractErrors = (errors: string[] | undefined) => {
    if (!errors || !(errors.length > 0)) {
      return;
    }

    return errors.map((el) => (
      <p className="mt-2 text-sm text-red-600 dark:text-red-500" key={el}>
        {el}
      </p>
    ));
  };

  return (
    <div>
      <h2>UncontrolledForm</h2>
      <form className="max-w-sm mx-auto" onSubmit={onSubmitEvent}>
        <GenericUncontrolledInput
          errors={errors?.email}
          id="email"
          type="email"
          placeholder="Input your email"
          inputRef={emailInput}
        />
        <GenericUncontrolledInput
          errors={errors?.password}
          id="password"
          type="password"
          placeholder="Input your password"
          inputRef={passwordInput}
        />
        <GenericUncontrolledInput
          errors={errors?.passwordRepeat}
          id="password-repeat"
          type="password"
          placeholder="Repeat your password"
          inputRef={passwordRepeatInput}
        />

        <GenericUncontrolledInput
          errors={errors?.name}
          id="name"
          type="text"
          placeholder="Input your name"
          inputRef={nameInput}
        />

        <GenericUncontrolledInput
          errors={errors?.age}
          id="age"
          type="text"
          placeholder="Input your age"
          inputRef={ageInput}
        />

        <GenericUncontrolledInput
          errors={errors?.gender}
          id="gender"
          type="text"
          placeholder="Input your gender"
          inputRef={genderInput}
        />

        <GenericUncontrolledInput
          errors={errors?.country}
          id="country"
          type="text"
          placeholder="Input your country"
          inputRef={countryInput}
        />

        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            ref={userPictureInput}
          />
          {extractErrors(errors?.userPicture)}
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            A profile picture is useful to confirm your are logged into your
            account
          </div>
        </div>

        <div className="flex items-center mb-4">
          <input
            id="checkbox-1"
            type="checkbox"
            ref={acceptTCRepeatInput}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="checkbox-1"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree to the{' '}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
            .{extractErrors(errors?.acceptTC)}
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

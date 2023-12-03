import { useRef, useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { saveFormData } from '../redux/features/mainPageSlice';
import { convertFileToBase64 } from '../utils/convertFileToBase64';
import { GenericUncontrolledInput } from '../components/uncontrolledComponents/GenericUncotrolledInput';
import { validateFormData } from '../utils/validateFormData';
import { GenderInput } from '../components/uncontrolledComponents/GenderInput';
import { CheckBoxInput } from '../components/uncontrolledComponents/CheckBoxInput';
import { TextInputAutocomplete } from '../components/uncontrolledComponents/TextInputAutocomplete';
import { IFormDataOptional } from '../interfaces/IFormData';
import { COUNTRIES, ROUTE_MAIN } from '../constants';
import { PasswordInput } from '../components/uncontrolledComponents/PasswordInput';
import { Header } from '../components/shared/Header';
import { Footer } from '../components/shared/Footer';
import { Link } from 'react-router-dom';

type TFormInputErrors = Partial<Record<keyof IFormDataOptional, Array<string>>>;

export function UncontrolledForm() {
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const genderInput = useRef<HTMLSelectElement>(null);
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

    const genderInputValue = genderInput.current?.value;

    const formData = {
      name: nameInput.current?.value,
      age: ageInput.current?.value
        ? parseInt(ageInput.current.value, 10)
        : undefined,
      gender: genderInputValue === 'null' ? undefined : genderInputValue,
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
    } else {
      dispatch(
        saveFormData({ formData: validate.formData, type: 'uncontrolled' })
      );
    }
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
    <>
      <Header />
      <main className="my-8">
        <div className="container mx-auto px-6">
          <h2>UncontrolledForm</h2>
          <form
            className="max-w-sm mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitEvent();
            }}
          >
            <GenericUncontrolledInput
              errors={errors?.email}
              id="email"
              type="email"
              label="Input your email"
              placeholder="someone@example.com"
              inputRef={emailInput}
            />

            <PasswordInput
              errors={errors?.password}
              id="password"
              type="password"
              label="Input your password"
              inputRef={passwordInput}
            />

            <GenericUncontrolledInput
              errors={errors?.passwordRepeat}
              id="password-repeat"
              type="password"
              label="Repeat your password"
              inputRef={passwordRepeatInput}
            />

            <GenericUncontrolledInput
              errors={errors?.name}
              id="name"
              type="text"
              label="Input your name"
              placeholder="Mark"
              inputRef={nameInput}
            />

            <GenericUncontrolledInput
              errors={errors?.age}
              id="age"
              type="text"
              label="Input your age"
              placeholder="18"
              inputRef={ageInput}
            />

            <GenderInput
              errors={errors?.gender}
              id="gender"
              label="Select your gender"
              placeholder="Input your gender"
              inputRef={genderInput}
            />

            <TextInputAutocomplete
              label="Choose your Country"
              errors={errors?.country}
              id="country"
              options={COUNTRIES.map((el) => el.name)}
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
                accept=".png,.jpg,.jpeg"
                onChange={(e) => console.log(e.currentTarget.files)}
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

            <CheckBoxInput
              label={
                <>
                  I agree to the{' '}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    terms and conditions
                  </a>
                  .
                </>
              }
              errors={errors?.acceptTC}
              id="acceptTC"
              inputRef={acceptTCRepeatInput}
            />

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <Link to={`${ROUTE_MAIN}`}>Main page</Link>
      <Footer />
    </>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formDataSchema } from '../utils/formDataSchema';
import { GenericInput } from '../components/hookComponents/GenericInput';
import { GenericCheckBoxInput } from '../components/hookComponents/GenericCheckBoxInput';
import { GenericPasswordInput } from '../components/hookComponents/GenericPasswordInput';

export function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formDataSchema), mode: 'onChange' });
  const [data, setData] = useState('');

  return (
    <>
      <div>ReactHookForm</div>
      <form
        className="max-w-sm mx-auto"
        onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
      >
        <GenericInput<'email'>
          useFormRegisterReturn={register('email')}
          error={errors?.email?.message}
          id="email"
          type="email"
          label="Input your email"
          placeholder="someone@example.com"
        />

        <GenericPasswordInput<'password'>
          useFormRegisterReturn={register('password')}
          error={errors?.password?.message}
          id="password"
          type="password"
          label="Input your password"
        />

        <GenericInput<'passwordRepeat'>
          useFormRegisterReturn={register('passwordRepeat')}
          error={errors?.passwordRepeat?.message}
          id="password-repeat"
          type="password"
          label="Repeat your password"
        />

        <GenericInput<'name'>
          useFormRegisterReturn={register('name')}
          error={errors?.name?.message}
          id="name"
          type="text"
          label="Input your name"
          placeholder="Mark"
        />

        <GenericInput<'age'>
          useFormRegisterReturn={register('age')}
          error={errors?.age?.message}
          id="age"
          type="text"
          label="Input your age"
          placeholder="18"
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
            accept=".png,.jpg,.jpeg"
            {...register('userPicture')}
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors?.userPicture?.message}
          </p>
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            A profile picture is useful to confirm your are logged into your
            account
          </div>
        </div>

        <GenericCheckBoxInput<'acceptTC'>
          useFormRegisterReturn={register('acceptTC')}
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
          error={errors?.acceptTC?.message}
          id="acceptTC"
        />

        <p>{data}</p>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formDataSchema } from '../utils/formDataSchema';
import { GenericInput } from '../components/hookComponents/GenericInput';
import { GenericCheckBoxInput } from '../components/hookComponents/GenericCheckBoxInput';

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

        <select {...register('gender', { required: true })}>
          <option value="">Select...</option>
          <option value="male">Option A</option>
          <option value="female">Option B</option>
        </select>
        <p>{data}</p>
        <p>{errors.name?.message}</p>
        <input type="submit" />
      </form>
    </>
  );
}

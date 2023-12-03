import { ISavedFormData } from '../../redux/features/mainPageSlice';

interface IFromDataResultCardProps {
  data: ISavedFormData;
}

export function FromDataResultCard({ data }: IFromDataResultCardProps) {
  return (
    <div className="w-full max-w-sm pt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          <b>Type of from: </b>
          {data.type === 'uncontrolled'
            ? 'Uncontrolled from'
            : 'React hook from'}
        </h5>

        <b>User picture:</b>
        <img
          className="w-32 h-32 mb-3 rounded-full shadow-lg"
          src={data.formData.userPicture}
          alt="Bonnie image"
        />
        <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          <b>Email: </b>
          {data.formData.email}
        </span>
        <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          <b>Password: </b>
          {data.formData.password}
        </span>
        <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          <b>Password repeat: </b>
          {data.formData.passwordRepeat}
        </span>
        <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          <b>Name: </b>
          {data.formData.name}
        </span>
        <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          <b>Age: </b>
          {data.formData.age}
        </span>
        <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          <b>Gender: </b>
          {data.formData.gender}
        </span>
        <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          <b>Country: </b>
          {data.formData.country}
        </span>
        <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          <b>Accepted T&C: </b>
          {data.formData.acceptTC ? 'yes' : 'no'}
        </span>
      </div>
    </div>
  );
}

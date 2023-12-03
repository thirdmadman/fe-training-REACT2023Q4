import { APP_TITLE } from '../../constants';

export function Header() {
  return (
    <header>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-center">
          <div className="w-full text-gray-700 md:text-center text-2xl font-semibold">
            {APP_TITLE}
          </div>
        </div>
      </div>
    </header>
  );
}

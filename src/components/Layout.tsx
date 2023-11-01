import { Outlet } from 'react-router-dom';
import '../index.css';

export function Layout() {
  return (
    <>
      <div className="bg-white min-h-screen relative">
        <Outlet />
      </div>
    </>
  );
}

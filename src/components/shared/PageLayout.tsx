import type { ReactElement } from 'react';

export function PageLayout({ children }: { children: ReactElement }) {
  return <div className="bg-white min-h-screen relative">{children}</div>;
}

import { ReactNode } from 'react';
import Navigation from './Navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <Navigation>{children}</Navigation>;
}

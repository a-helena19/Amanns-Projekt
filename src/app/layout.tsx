import type { Metadata } from 'next';
import { Me } from '@/src/types';
import { API_URL } from '@/src/config';
import './globals.css';
import Nav from '@/src/components/Nav';
import UserInfo from '@/src/components/UserInfo';
import ScrollToTop from '@/src/components/ScrollToTop';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { default: 'Arrrbnb', template: '%s | Arrrbnb' },
  description: 'Room rentals',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const userResponse = await fetch(API_URL + '/users/me');
  if (!userResponse.ok) throw new Error(userResponse.statusText);
  const user = (await userResponse.json()) as Me;

  return (
    <html lang="en">
      <body>
        <ScrollToTop /> 
        <header className="bg-slate-100 border-b border-slate-200 sticky top-0 z-50">
          <div className="w-full px-4 py-4">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <Link href="/rooms" className="text-2xl font-bold text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
                Arrrbnb   
              </Link>
              <Nav />
              <UserInfo user={user} />
            </div>
          </div>
        </header>
        <div className="w-full py-8 px-4 min-h-screen">
          <div className="max-w-5xl mx-auto">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
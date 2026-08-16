import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from './components/Sidebar';

export const metadata: Metadata = {
  title: 'Stellix UI Material — Component Library',
  description: '19 production-ready UI components for Next.js and React Native by Stellix Private Ltd',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <div className="flex h-screen overflow-hidden bg-surface-canvas">
          <Sidebar />
          <main id="main-content" className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:px-8 lg:px-10">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

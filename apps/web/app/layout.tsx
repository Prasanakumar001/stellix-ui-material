import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stellix UI Material — Component Library',
  description: 'Cross-platform UI component library by Stellix Private Ltd',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}

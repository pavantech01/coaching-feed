import type { Metadata } from 'next';
import Link from 'next/link';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Coaching Feed - Realtime Updates',
  description: 'Realtime coaching feed application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Coaching Feed
            </Link>
            <div className="flex gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Home
              </Link>
              <Link
                href="/admin"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>

        {children}

        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-2xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
            <p>Realtime Coaching Feed App | Built with Next.js + Socket.IO</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

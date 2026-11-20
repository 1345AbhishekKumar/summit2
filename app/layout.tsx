import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'SUMMIT. | Premier Adventure Trekking',
  description: 'Summit is a premier adventure trekking company offering robust, massive, and tough expeditions in the untamed earth.',
  keywords: ['trekking', 'adventure', 'expeditions', 'mountain climbing', 'summit'],
  openGraph: {
    title: 'SUMMIT. | Premier Adventure Trekking',
    description: 'Summit is a premier adventure trekking company offering robust, massive, and tough expeditions in the untamed earth.',
    url: 'https://summit-expeditions.com',
    siteName: 'SUMMIT.',
    images: [
      {
        url: 'https://picsum.photos/seed/archhero/1920/1080',
        width: 1920,
        height: 1080,
        alt: 'Mountain Expedition Landscape',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SUMMIT. | Premier Adventure Trekking',
    description: 'Summit is a premier adventure trekking company offering robust, massive, and tough expeditions in the untamed earth.',
    images: ['https://picsum.photos/seed/archhero/1920/1080'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="overflow-x-hidden motion-reduce:transition-none motion-reduce:transform-none">
        {children}
      </body>
    </html>
  );
}

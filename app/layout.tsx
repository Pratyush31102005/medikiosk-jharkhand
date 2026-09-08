import type { Metadata, Viewport } from 'next';
import {
  Noto_Sans_Devanagari,
  Noto_Sans_Bengali,
  Noto_Sans_Oriya,
} from 'next/font/google';
import './globals.css';
const bodyFont = Noto_Sans_Devanagari({
  variable: '--font-body',
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '600', '700'],
});
const bengaliFont = Noto_Sans_Bengali({
  variable: '--font-bengali',
  subsets: ['bengali'],
  weight: ['400', '600', '700'],
});
const odiaFont = Noto_Sans_Oriya({
  variable: '--font-odia',
  subsets: ['oriya'],
  weight: ['400', '600', '700'],
});
export const metadata: Metadata = {
  title: 'MediKiosk · आपका स्वास्थ्य साथी',
  description:
    'A simple voice-assisted patient intake prototype by Jharkhand in Hindi, English, Bengali and Odia.',
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#145e67',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi">
      <body
        className={`${bodyFont.variable} ${bengaliFont.variable} ${odiaFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

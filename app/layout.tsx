import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
const bodyFont = Noto_Sans_Devanagari({ variable: '--font-body', subsets: ['latin','devanagari'], weight: ['400','500','600','700'] });
export const metadata: Metadata = {
 title: 'MediKiosk · आपका स्वास्थ्य साथी',
 description: 'A simple bilingual patient intake prototype by Localdost. Share symptoms and prepare a history for staff review.',
};
export const viewport: Viewport = {width:'device-width',initialScale:1,themeColor:'#145e67'};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
 return <html lang="hi"><body className={bodyFont.variable}>{children}</body></html>;
}

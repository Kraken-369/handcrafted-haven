import { Handlee, Jost } from 'next/font/google';
 
export const jost = Jost({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-primary',
  weight: ['400', '700', '900'],
});

export const handlee = Handlee({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-secondary',
  weight: '400',
});

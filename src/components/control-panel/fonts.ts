import { Silkscreen, VT323 } from 'next/font/google';

// Only the Control Panel uses these, so they load on that page alone
export const pixel = Silkscreen({ weight: ['400', '700'], subsets: ['latin'], variable: '--cp-pixel' });
export const terminal = VT323({ weight: '400', subsets: ['latin'], variable: '--cp-term' });

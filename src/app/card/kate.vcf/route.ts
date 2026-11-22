import { card } from '@/data/slash';

export const dynamic = 'force-static';

// vCard text values escape backslashes, commas, and semicolons
const esc = (s: string) => s.replace(/([\\,;])/g, '\\$1');

export function GET() {
    const [first, ...rest] = card.name.split(' ');
    const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${esc(rest.join(' '))};${esc(first)};;;`,
        `FN:${esc(card.name)}`,
        `TITLE:${esc(card.title)}`,
        `ORG:${esc(card.org)}`,
        `EMAIL;TYPE=INTERNET:${card.email}`,
        card.phone && `TEL;TYPE=CELL:${card.phone}`,
        `URL:${card.url}`,
        `ADR;TYPE=HOME:;;;${esc(card.location.split(', ')[0])};${esc(card.location.split(', ')[1] ?? '')};;`,
        ...card.socials.filter((s) => s.url).map((s) => `X-SOCIALPROFILE;TYPE=${s.label.toLowerCase()}:${s.url}`),
        `NOTE:${esc(card.socials.filter((s) => s.handle).map((s) => `${s.label}: ${s.handle}`).join(' · '))}`,
        'END:VCARD',
    ].filter(Boolean);

    return new Response(lines.join('\r\n') + '\r\n', {
        headers: {
            'content-type': 'text/vcard; charset=utf-8',
            'content-disposition': 'attachment; filename="kate-thompson.vcf"',
        },
    });
}

// Content for the slash pages. Each page shows an empty note until its list has entries.

export interface RollItem {
    name: string;
    url: string;
    note?: string;
}

export const chipotleOrder: { item: string; choice: string }[] = [
    { item: 'Entrée', choice: 'Burrito' },
    { item: 'Rice', choice: 'White' },
    { item: 'Beans', choice: 'None' },
    { item: 'Protein', choice: 'Chicken' },
    { item: 'Toppings', choice: 'Corn, cheese' },
    { item: 'Side', choice: 'Guac' },
];

export const daylists: { title: string; date?: string }[] = [
    // { title: 'sad girl indie folk tuesday morning', date: '2026-11' },
];

export const blogroll: RollItem[] = [];

export const podroll: RollItem[] = [];

export const postroll: RollItem[] = [];

export const card = {
    name: 'Kate Thompson',
    title: 'Software Engineer',
    org: 'MSOE',
    location: 'Milwaukee, WI',
    url: 'https://k8thompson.dev',
    email: 'katethompson134@gmail.com',
    phone: '',
    image: '',
    socials: [
        { label: 'GitHub', handle: 'k8thompson134', url: 'https://github.com/k8thompson134' },
        { label: 'LinkedIn', handle: 'kate-thompson-msoe', url: 'https://www.linkedin.com/in/kate-thompson-msoe/' },
        { label: 'Twitter', handle: 'groundpizza', url: 'https://twitter.com/groundpizza' },
        { label: 'Instagram', handle: 'k.thompson02', url: 'https://www.instagram.com/k.thompson02/' },
        { label: 'Discord', handle: 'groundpizza', url: '' },
        { label: 'Steam', handle: '', url: '' },
    ],
};

export const poll = {
    id: 'next-module',
    question: 'WHICH MODULE SHOULD I BUILD NEXT?',
    options: ['LOTERIA DECK', 'STITCH YOUR NAME', 'PATCH BAY', 'TRIVIA'],
};

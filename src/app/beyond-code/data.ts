export interface GalleryItem {
  title: string;
  category: string;
  image: string;
  // Silent looping clip; `image` is its poster frame
  video?: string;
  // Original Bryce output, shown in the render-window frame
  render?: RenderInfo;
  alt: string;
  description?: string;
  link?: { href: string; label: string };
  // Flattened page scans, in order, for sections shown as a journal
  pages?: string[];
  // Read only by the hub cover; gallery thumbnails always show the whole piece
  contain?: boolean;
}

export interface RenderInfo {
  file: string;
  size: string;
  date: string;
  frames?: number;
  download: string;
}

export interface GallerySection {
  heading?: string;
  intro?: string;
  portrait?: boolean;
  journal?: boolean;
  items: GalleryItem[];
}

export interface BeyondCategory {
  slug: string;
  title: string;
  summary: string;
  description: string;
  cover: string;
  layout?: 'photo' | 'wall' | 'scrapbook' | 'render';
  coverContain?: boolean;
  sections: GallerySection[];
}

const img = (name: string) => `/images/beyond-code/${name}.webp`;
const bmp = (file: string, name: string, date: string, size = '480×360'): RenderInfo => ({
  file: `${file}.bmp`,
  size,
  date,
  download: `/downloads/bryce/${name}.bmp`,
});
const avi = (file: string, clip: string, date: string, frames: number): RenderInfo => ({
  file: `${file}.avi`,
  size: '320×240',
  date,
  frames,
  download: `/videos/beyond-code/${clip}.mp4`,
});
const page = (name: string) => `/images/beyond-code/journal/${name}.webp`;
const spread = (name: string) => [page(`${name}-left`), page(`${name}-right`)];

export const categories: BeyondCategory[] = [
  {
    slug: 'campaign',
    cover: img('campaign-mars-cheese-castle'),
    title: 'Campaign Design',
    summary: "Official art for Francesca Hong's campaign: a fundraising Lotería deck and a Wisconsin Landmarks donor print.",
    description:
      "Official campaign art for Francesca Hong's Fran for Wisconsin campaign, designed to raise money and to make policy something people could hold, play with, and hang on a wall.",
    sections: [
      {
        heading: 'Lotería Deck',
        intro:
          'Lotería is a Mexican game a lot like bingo. Everyone plays on a board and a caller draws cards from a deck. This deck was played at ticketed fundraisers, and every time a card was drawn, it kicked off a conversation about the policy on it. Each ticket came with a board to play on, and afterward the card art sold as posters to raise more money for the campaign. I first learned Lotería playing it at the Día de los Muertos celebrations I hosted for my sorority, so I was thrilled to see the campaign doing a deck.',
        portrait: true,
        items: [
          {
            title: 'Los Trabajadores',
            category: 'Lotería · Workers',
            image: img('campaign-loteria-trabajadores'),
            alt: 'Lotería card titled Los Trabajadores: two workers in hard hats and overalls stand inside a white outline of Wisconsin, framed by orange marigolds on a red background.',
            description: 'Two workers in hard hats inside an outline of Wisconsin, framed by marigolds.',
          },
          {
            title: 'El Santuario',
            category: 'Lotería · Safe Community Spaces',
            image: img('campaign-loteria-santuario'),
            alt: 'Lotería card titled El Santuario, Safe Community Spaces: a monarch butterfly on a yellow background.',
            description: 'A monarch butterfly for safe community spaces.',
          },
          {
            title: 'El Tejón',
            category: 'Lotería · BadgerCare Public Option',
            image: img('campaign-loteria-tejon'),
            alt: 'Lotería card titled El Tejón: a badger in a white doctor’s coat with a name tag reading Hello my name is Dr. Care, next to a medical bag, under a speech burst reading ¡Opción Pública!',
            description: 'Meet Dr. Care, a badger in a little doctor’s coat. First name Badger, last name Care. He’s here for the BadgerCare public option.',
          },
          {
            title: 'Electricidad Asequible',
            category: 'Lotería · 2% Utility Cap',
            image: img('campaign-loteria-electricidad'),
            alt: 'Lotería card titled Electricidad Asequible, Affordable Electricity, 2% Utility Cap: a still from Bad Bunny’s Super Bowl halftime show, edited into red silhouettes of three people cheering on top of a utility pole against a yellow sky, with the lyrics Esta es mi sol and Esta es mi tierra.',
            description: 'Edited from a still of Bad Bunny’s Super Bowl halftime show, with a line from “El Apagón.” The card stands for capping household energy bills at 2% of income.',
          },
          {
            title: 'End ICE Collaboration',
            category: 'Lotería · Immigration',
            image: img('campaign-loteria-ice'),
            alt: 'Lotería card reading ¡Terminar la colaboración con ICE en Wisconsin! End the collaboration with ICE in Wisconsin!: a cooler full of ice crossed out over a dotted map of Wisconsin on green.',
            description: 'A crossed-out cooler of ice over a dotted map of Wisconsin, for ending state collaboration with ICE.',
          },
        ],
      },
      {
        heading: 'Wisconsin Landmarks',
        intro:
          'A limited, small-run print series sent to donors during a fundraising push, with each print built around a Wisconsin landmark.',
        items: [
          {
            title: 'Mars Cheese Castle',
            category: 'Donor Print · Kenosha',
            image: img('campaign-mars-cheese-castle'),
            alt: 'Print in the style of the Mars Cheese Castle roadside sign: yellow letter tiles on red poles spell Fran for Wisconsin above a black panel reading Vote by August 11th, on a navy background, captioned Mars Cheese Castle, Kenosha, WI.',
            description: 'The Mars Cheese Castle’s roadside sign in Kenosha, rebuilt to read “Fran for Wisconsin” with a reminder to vote by August 11th.',
          },
        ],
      },
    ],
  },
  {
    slug: 'logos',
    cover: img('logo-esubmit'),
    title: 'Logo Design',
    summary: 'Logos adopted by their organizations, plus the concepts and finalists behind them.',
    description: "Logos I've designed that were officially adopted by their organizations.",
    sections: [
      {
        items: [
          {
            title: 'K8 Mark',
            category: 'Official · This Site',
            image: '/images/k8-mark-l.png',
            alt: 'The K8 monogram used as this site’s mark.',
            description: 'I was messing around with effects in Affinity and wanted it to look like a retro computer screen, with scan lines, a little texture, and some dimension.',
            contain: true,
          },
          {
            title: 'eSubmit Logo',
            category: 'Official · Adopted 2024',
            image: img('logo-esubmit'),
            alt: 'Final eSubmit logo.',
            description: 'The logo for eSubmit, the assignment submission tool and autograder for programming courses.',
            contain: true,
          },
          {
            title: 'PLiPS Logo',
            category: 'Official · Adopted',
            image: img('logo-plips'),
            alt: 'PLiPS logo: the word PLIPS in a rounded orange badge.',
            description: 'An application mark for the Progressive Learning Platform, a teaching processor and toolchain that started at Oklahoma State University, to give it more polish. I made it in Canva and kept it fun on purpose. Assembly language is intimidating enough already, so I wanted it to feel approachable and memorable, not sterile.',
            contain: true,
          },
        ],
      },
      {
        heading: 'eSubmit Process',
        intro: 'Early concepts, then the four finalists the final mark was chosen from.',
        items: [
          ...[1, 2, 3, 4].map((n) => ({
            title: `Concept ${n}`,
            category: 'Early Concept',
            image: img(`logo-esubmit-concept-${n}`),
            alt: `eSubmit logo early concept ${n}.`,
            contain: true,
          })),
          ...['a', 'b', 'c', 'd'].map((l) => ({
            title: `Finalist ${l.toUpperCase()}`,
            category: 'Finalist',
            image: img(`logo-esubmit-final-${l}`),
            alt: `eSubmit logo finalist ${l.toUpperCase()}.`,
            contain: true,
          })),
        ],
      },
    ],
  },
  {
    slug: 'posters',
    layout: 'wall',
    cover: img('poster-no-kings'),
    coverContain: true,
    title: 'Posters & Flyers',
    summary: 'Event promotion for MSOE YDSA, MKE YDSA, and Kappa Sigma Mu.',
    description: 'Event promotion and organizing materials for MSOE YDSA, MKE YDSA, and Kappa Sigma Mu.',
    sections: [
      {
        portrait: true,
        items: [
          {
            title: 'No Kings',
            category: 'MSOE YDSA',
            image: img('poster-no-kings'),
            alt: 'Flyer styled as a crumpled protest sign held up on a stick against a red grid: Join MSOE YDSA at No Kings! Stop by our table and grab a sign! Saturday 10/17, Cathedral Square Park (behind the MSOE Library). 2pm community fair, 2:45pm music and speakers, 3:30pm march.',
            description: 'Tabling at No Kings in Cathedral Square Park.',
          },
          {
            title: 'Fall Kickoff',
            category: 'MSOE YDSA',
            image: img('poster-fall-kickoff'),
            alt: 'Red-on-cream diner-style flyer with checkerboard borders: Fall Kickoff, MSOE Young Democratic Socialists of America. Learn about YDSA, what we believe in, and how we are organizing at MSOE. Monday Sep 14th, 6–8 PM, CC 118. RSVP QR code and a hand-drawn pizza box reading Free pizza! Come grab a slice.',
            description: 'A diner-menu look for the semester’s first meeting, with free pizza.',
          },
          {
            title: 'Pumpkin Carving',
            category: 'MSOE YDSA + SAGA',
            image: img('poster-pumpkin-carving'),
            alt: 'Autumn flyer with leaves and vines: Pumpkin Carving, MSOE YDSA + SAGA. Carve pumpkins and watch Over the Garden Wall. Thursday October 29th, 5:30pm–8pm, CC118. Scan to RSVP. Two pumpkins carry the MSOE YDSA rose logo and the rainbow SAGA logo, glowing as if carved.',
            description: 'Most of the work is in the pumpkins. I converted both club logos to SVG, recolored them, removed SAGA’s background elements, and added a glow so they look carved.',
          },
          {
            title: 'No Hate, No Fear',
            category: 'MSOE YDSA',
            image: img('poster-all-students-welcome'),
            alt: 'Flyer with pride flags on a sky-blue background: No hate, no fear, all students are welcome here! Sign our sanctuary campus petition to protect LGBTQ and immigrant rights at MSOE.',
            description: 'A sanctuary campus petition to protect LGBTQ and immigrant students at MSOE.',
          },
          {
            title: 'Holiday Gift Sale for Palestine',
            category: 'MSOE YDSA · Raiders Against War',
            image: img('poster-artists-and-makers'),
            alt: 'Flyer with watermelon slices: Calling all artists, crafters, and makers! Donations needed for charity gift sale. Holiday Gift Sale for Palestine, Friday December 6th, 5–8pm, CC Collaboration Café.',
            description: 'A call for handmade donations to a holiday gift sale raising humanitarian relief for Palestine.',
          },
          {
            title: 'The Election Is Scary Close',
            category: 'MSOE YDSA',
            image: img('poster-ydsa-election'),
            alt: 'Halloween-themed flyer with pumpkins and bats: The election is scary close! Join us for a discussion of the upcoming election and learn why you should vote in Wisconsin, even if you are from out of state. Wednesday October 30th, 6pm, CC 121.',
            description: 'A Halloween-themed election discussion on why out-of-state students can vote in Wisconsin.',
          },
          {
            title: 'VP Debate Watch Party',
            category: 'MSOE YDSA',
            image: img('poster-debate-watch-party'),
            alt: 'Red, white, and blue flyer with stars and stripes: MSOE Young Democratic Socialists of America vice presidential debate watch party, Tuesday October 1st, The Cove (Viets Tower), with debate prediction bingo boards.',
            description: 'A debate watch party with prediction bingo boards.',
          },
          {
            title: 'Black History Month Film Screening',
            category: 'MSOE YDSA × SAGA',
            image: img('poster-ydsa-saga'),
            alt: 'Flyer with a portrait of Marsha P. Johnson in a flower crown over rainbow stripes, for a Black History Month film screening co-hosted by MSOE YDSA and the Sexuality and Gender Alliance.',
            description: 'A film screening on the life of Marsha P. Johnson, co-hosted with the Sexuality and Gender Alliance.',
          },
          {
            title: 'General Meeting',
            category: 'MKE YDSA',
            image: img('poster-fall-music-festival'),
            alt: 'Autumn-leaf flyer in orange, red, and gold: MKE YDSA General Meeting, October 3rd, 6pm.',
            description: 'A fall general meeting for Milwaukee’s YDSA chapter.',
          },
          {
            title: 'Learn About Passover',
            category: 'Kappa Sigma Mu',
            image: img('poster-learn-about-voting'),
            alt: 'Flyer with matzah and flowers: Learn about Passover with Kappa Sigma Mu. Thursday April 25th at 6:00 pm, CC Collaboration Cafe. Hear the Passover story and explore Jewish traditions with a speaker from Milwaukee Hillel.',
            description: 'A Passover education event with a speaker from Milwaukee Hillel.',
          },
        ],
      },
    ],
  },
  {
    slug: 'photography',
    layout: 'photo',
    cover: img('photo-mckinley-leaves'),
    title: 'Photography',
    summary: 'Milwaukee, San Francisco, and the Rockies, shot on an early-2000s Olympus digicam.',
    description:
      'Shot on an Olympus Camedia C-4000 Zoom, an early-2000s 4-megapixel point-and-shoot.',
    sections: [
      {
        heading: 'McKinley Beach, Milwaukee',
        items: [
          {
            title: 'Fall Leaves',
            category: 'McKinley Beach',
            image: img('photo-mckinley-leaves'),
            alt: 'Autumn leaves floating in clear shallow water over pebbles, lit by rippling sunlight.',
          },
          {
            title: 'Driftwood Art',
            category: 'McKinley Beach',
            image: img('photo-mckinley-driftwood'),
            alt: 'Driftwood art propped up on a sandy beach in front of Lake Michigan under a blue sky with gulls.',
            description: 'Found on the beach just like this.',
          },
        ],
      },
      {
        heading: 'San Francisco',
        items: [
          {
            title: 'Life Is Weird',
            category: 'Polk Street',
            image: img('photo-polk-street'),
            alt: 'A utility box painted with the words Life Is Weird on a corner of Polk Street, with a steep San Francisco hill behind it.',
          },
          {
            title: 'House of Prime Rib',
            category: 'Van Ness',
            image: img('photo-house-of-prime-rib'),
            alt: 'The neon House of Prime Rib sign at dusk beside a red awning and a row of gooseneck lamps.',
          },
          {
            title: 'Sea Lions',
            category: 'Pier 39',
            image: img('photo-pier-39-sea-lions'),
            alt: 'Sea lions sprawled on floating docks at Pier 39, with a line of cormorants on a breakwater and fog over the bay.',
          },
        ],
      },
      {
        heading: 'Estes Park & Rocky Mountain National Park',
        items: [
          {
            title: 'Valley View',
            category: 'Rocky Mountain NP',
            image: img('photo-rocky-mountain-valley'),
            alt: 'Snow-capped peaks above a wide forested valley under a deep blue sky.',
          },
          {
            title: 'Rock Shop',
            category: 'Coffee on the Rocks',
            image: img('photo-estes-park-rock-shop'),
            alt: 'Bins of rhyolite and obsidian priced by the pound in front of a sunlit river and a pine-covered mountain.',
          },
          {
            title: 'By the Rock Shop',
            category: 'Coffee on the Rocks',
            image: img('photo-estes-park-river'),
            alt: 'The river by the rock shop at Coffee on the Rocks, running past cabins with green roofs and framed by pine trees.',
          },
        ],
      },
      {
        heading: 'On the Road',
        items: [
          {
            title: 'Illinois at Dusk',
            category: 'Driving to Milwaukee',
            image: img('photo-illinois-highway'),
            alt: 'View from a car window of a highway shoulder, wildflowers, and farm fields at dusk, with the sunset reflected in the side mirror.',
          },
        ],
      },
    ],
  },
  {
    slug: '3d',
    layout: 'render',
    cover: img('3d-checkerboard-orb'),
    title: '3D Renders',
    summary: 'Surreal, nostalgic little worlds made in Bryce, the 90s 3D program.',
    description:
      'Made in Bryce, running in an emulator on my PC. Bryce started as a mathematician’s research into generating mountains and coastlines with fractals, and was turned into a 3D program made for artists in the mid-90s, named after Bryce Canyon. I love how it renders. The hard reflections and too-pink skies come out surreal and dreamlike but also nostalgic, like an I Spy book or an animation playing in a museum when I was a kid. Using the actual program from the time, instead of faking the look in a modern one, was the fun part. These are me messing around to learn it, and Bryce can animate scenes too, which is how a shrimp ended up getting abducted.',
    sections: [
      {
        heading: 'Glass & Chrome',
        items: [
          {
            title: 'Checkerboard Orb',
            category: 'Infinite Plane',
            image: img('3d-checkerboard-orb'),
            render: bmp('orb', 'orb', '2026-11-20'),
            alt: 'A glass dome glowing green from inside sits on an endless black and white checkerboard under a deep purple sky.',
          },
          {
            title: 'Pedestals',
            category: 'Pink Sunset',
            image: img('3d-pedestals'),
            render: bmp('glass on peds', 'glass-on-peds', '2026-11-20'),
            alt: 'A faceted glass sphere, a gold ellipsoid, and a glass ring float above three marble pedestals in green water under a pink and yellow sunset.',
          },
          {
            title: 'Spiral Staircase',
            category: 'Green Plain',
            image: img('3d-spiral-staircase'),
            render: bmp('spiral shapes', 'spiral-shapes', '2026-11-20'),
            alt: 'A red spiral staircase rises into a blue cloudy sky over green ground, beside a floating island, a red and black octahedron, a red torus, a blue cone, and a chrome sphere.',
          },
          {
            title: 'Gumdrops',
            category: 'Open Ocean',
            image: img('3d-gumdrops'),
            render: bmp('bulbs', 'bulbs', '2026-11-20'),
            alt: 'Three glossy domes in yellow, green, and magenta float in blue ocean water, each reflected below.',
          },
        ],
      },
      {
        heading: 'The Eye Pyramid',
        items: [
          {
            title: 'Cracked Earth',
            category: 'Desert at Sunset',
            image: img('3d-cracked-earth'),
            render: bmp('creppy', 'creppy', '2026-11-21'),
            alt: 'A floating pyramid with a single eye hovers above a dark pyramid on cracked desert ground, under an orange and pink sunset, reflected in a pool of yellow light.',
          },
          {
            title: 'Golden Flats',
            category: 'Desert at Sunset',
            image: img('3d-golden-flats'),
            render: bmp('piramid', 'piramid', '2026-11-21'),
            alt: 'A floating pyramid with a blue eye hovers over a circuit-textured pyramid on flat golden ground at sunset.',
          },
        ],
      },
      {
        heading: 'Skull Island',
        intro: 'Same boat, two renders. The way there, and how that went.',
        items: [
          {
            title: 'The Crossing',
            category: 'Yellow Sea',
            image: img('3d-the-crossing'),
            render: bmp('boat to skull island', 'boat-to-skull-island', '2026-11-20'),
            alt: 'A small rowboat drifts toward a giant pink skull lying half-sunk in shimmering yellow water.',
          },
          {
            title: 'Shipwreck',
            category: 'Purple Sea',
            image: img('3d-shipwreck'),
            render: bmp('shipwreck', 'shipwreck', '2026-11-20'),
            alt: 'The rowboat wrecked against the teeth of the half-sunk skull in purple water.',
          },
        ],
      },
      {
        heading: 'Bubbles',
        items: [
          {
            title: 'Mirror Balls',
            category: 'Deep Blue',
            image: img('3d-mirror-balls'),
            render: bmp('mirrorballs', 'mirrorballs', '2026-11-21'),
            alt: 'A crowd of glass bubbles in every size, each holding smaller bubbles inside, filling a deep blue frame.',
          },
          {
            title: 'Green Bubbles',
            category: 'Emerald',
            image: img('3d-green-bubbles'),
            render: bmp('greenballs', 'greenballs', '2026-11-21'),
            alt: 'Glass bubbles in every size packed together against a bright green background, catching white highlights.',
          },
          {
            title: 'Aero Balls',
            category: 'Aqua',
            image: img('3d-aero-balls'),
            render: bmp('aero bals', 'aero-bals', '2026-11-21'),
            alt: 'Glass bubbles, some tinted green, floating over bright aqua water that glows with reflected light.',
          },
          {
            title: 'Burple Water',
            category: 'Shallows',
            image: img('3d-burple-water'),
            render: bmp('burplewater', 'burplewater', '2026-11-21'),
            alt: 'Glass bubbles resting on and floating above rippling blue-purple water, reflected in the surface.',
          },
        ],
      },
      {
        heading: 'Odds & Ends',
        items: [
          {
            title: 'I Spy',
            category: 'Junk Drawer',
            image: img('3d-i-spy'),
            render: bmp('k8_ispy', 'k8-ispy', '2026-11-22', '320×240'),
            alt: 'An I Spy style desk scene on wood grain: chess pieces, a metal spring, marbles, a pushpin, a pencil, a gear, a pink eraser, an 8 die, and letter blocks spelling K.',
          },
          {
            title: 'K8TV',
            category: 'Station Ident',
            image: img('3d-k8tv'),
            render: avi('k8tv_bounce', '3d-k8tv', '2026-11-22', 60),
            video: '/videos/beyond-code/3d-k8tv.mp4',
            alt: 'Animation: a pixel-block K8 logo in pink and cyan chrome bounces beside the word TV in pink script, with floating cyan cubes, over a cloudy pink sky and a glittering pink floor.',
          },
        ],
      },
      {
        heading: 'Shrimp Abduction',
        intro: 'My first Bryce animation. A UFO, an island, and one shrimp, under three different skies.',
        items: [
          {
            title: 'Daytime',
            category: 'Blue Sky',
            image: img('3d-abduction-day'),
            render: avi('ufoshrimpnap', '3d-abduction-day', '2026-11-21', 165),
            video: '/videos/beyond-code/3d-abduction-day.mp4',
            alt: 'Animation: a flying saucer slides in over a rocky island in a pale lavender sea and beams a pink shrimp up in a green light.',
          },
          {
            title: 'Night Shift',
            category: 'Starry Night',
            image: img('3d-abduction-night'),
            render: avi('ufoshrimpnap_stars', '3d-abduction-night', '2026-11-21', 165),
            video: '/videos/beyond-code/3d-abduction-night.mp4',
            alt: 'Animation: under a navy starry sky, a flying saucer beams a shrimp up out of dark water in a green light reflected on the waves.',
          },
          {
            title: 'Vaporwave',
            category: 'Pink Sea',
            image: img('3d-abduction-vapor'),
            render: avi('ufoshimp_vapor', '3d-abduction-vapor', '2026-11-21', 165),
            video: '/videos/beyond-code/3d-abduction-vapor.mp4',
            alt: 'Animation: a flying saucer drifts in under pink and white clouds and lifts a shrimp out of a rippling pink sea in a purple beam.',
          },
        ],
      },
    ],
  },
  {
    slug: 'crafts',
    layout: 'scrapbook',
    cover: img('craft-loon-cross-stitch'),
    title: 'Crafts & Collage',
    summary: 'Cross stitch, upcycled teacup candles, and collage journals.',
    description: 'Cross stitch, upcycled gifts, and collage journals built from packaging, stickers, and travel scraps.',
    sections: [
      {
        heading: 'Cross Stitch',
        items: [
          {
            title: 'Loon',
            category: 'Cross Stitch',
            image: img('craft-loon-cross-stitch'),
            alt: 'A small cross-stitched loon on blue fabric in a dark square frame, next to a jar of beach stones.',
            description: 'I love loons. Most summers my family vacations at a lake in northern Minnesota. I collect rocks, and the beach stones in the jar are ones I picked up along Lake Michigan.',
          },
          {
            title: 'Spherical Cow',
            category: 'Cross Stitch',
            image: img('craft-cow-cross-stitch'),
            alt: 'Cross-stitched cow above the words “assume a spherical cow.”',
            description: 'The physics joke about simplifying a problem until it’s solvable. First, assume a spherical cow.',
          },
          {
            title: 'Snoopy',
            category: 'Cross Stitch',
            image: img('craft-snoopy-cross-stitch'),
            alt: 'Cross-stitched Snoopy.',
          },
        ],
      },
      {
        heading: 'Collage Journals',
        journal: true,
        items: [
          {
            title: 'San Francisco',
            category: 'Travel Journal',
            image: img('collage-san-francisco'),
            pages: spread('san-francisco'),
            alt: 'Travel journal spread from San Francisco with a Fog Cats sticker, a Japan Center receipt, a United boarding pass, washi tape, an SF City Wear clothing tag, and a United Priority tag.',
            description: 'A trip with my sister and dad. Fog Cats is an all-cat store we found, and most of the Japanese stationery here came from the Japantown mall, including the receipt from its stationery shop. That stationery is what got me into junk journaling, and this was my first spread.',
          },
          {
            title: 'Fish',
            category: 'Collage',
            image: img('collage-fish'),
            pages: [page('fish')],
            alt: 'Collage page of cut-out Swedish Fish candy packaging, fish stickers, and a fish skeleton on purple paper.',
            description: 'The fish stickers are from a Japanese sticker book of fish I picked up in San Francisco, and everything else is cut from a Swedish Fish box.',
          },
          {
            title: 'Sept',
            category: 'Collage',
            image: img('collage-sept'),
            pages: [page('sept')],
            alt: 'Collage page on pink patterned paper: ransom-note letters spelling Sept, cut-out perfume bottles, stickers, and a $69.99 price tag.',
            description: 'Both perfumes were travel-size decants from my Scentbird subscription that month. Love-O-Matic smells like a strawberry laundromat, and Bo is a sweet, woody scent inspired by a redwood forest. Both were lovely. The stickers are from Magic Hands Art Reuse. The “MESS” is cut from a Tom Tiffany brochure claiming Wisconsin can’t afford Milwaukee’s mess, combined with a Swedish Fish box to make “MESSish,” because my house was kind of a mess-ish that month.',
          },
          {
            title: 'Oct.',
            category: 'Collage',
            image: img('collage-october'),
            pages: spread('october'),
            alt: 'Spread on watercolor pumpkin paper: ransom-note letters spelling Oct., a Commodity Spice perfume label, a Snoopy witch sticker over carved pumpkins, a sepia cemetery photo, a ghost sticker, a Glorioso’s Italian Market tag, and a Polish Flat antiques stamp from Milwaukee.',
            description: 'The whole month on one spread. The Polish Flat, one of my favorite antique stores in Milwaukee, had a cute Halloween market. The stickers are from Magic Hands Art Reuse, a secondhand art supply store in a Milwaukee art studio, where I can pick up low-cost supplies for any project and their ’90s and early-2000s stationery always gets me. The little Culver’s guy is from Curd-toberfest, Commodity Spice is a perfume I tried that month, and the cemetery cutouts are from the Ghost Tours of Cedarburg brochure.',
          },
          {
            title: 'Don’t Dream It, Be It',
            category: 'Collage',
            image: img('collage-tim-curry'),
            pages: spread('tim-curry'),
            alt: 'Tim Curry as Frank-N-Furter on a striped tag over a sepia graveyard, with gold stars and a Haunted label, facing a black starry page with embossed label tape reading “Don’t dream it, be it. Tim Curry 8/25/26.”',
            description: 'I found this Tim Curry sticker at an estate sale shortly after he passed away in August. I’m a big Rocky Horror fan and have been to the midnight showings with a shadow cast, props, and audience participation many times, so it became a memorial spread. It was Halloween season, so I went spooky with it. The graveyard background is from a Ghost Tours of Cedarburg flyer. “Don’t dream it, be it” is from Frank-N-Furter’s last big number in the show.',
          },
          {
            title: 'You Can See Everything',
            category: 'Collage',
            image: img('collage-see-everything'),
            pages: spread('see-everything'),
            alt: 'Spread on a red popcorn bag: ransom-note letters reading “you can see everything” over a cut-out film camera, facing Cookie Dough Bites and Sno Caps candy box logos with heart-shaped cutouts.',
            description: 'Made after seeing the movie You Can See Everything at the Oriental Theatre, Milwaukee’s gorgeous historic movie palace. That is the real popcorn bag from that night, and those are the boxes of candy I ate. The camera is from a Target magazine, and the letters are from all over, like Tom Tiffany junk mail, travel brochures, and a perfume box.',
          },
          {
            title: 'I ♥ Sushi',
            category: 'Collage',
            image: img('collage-sushi'),
            pages: spread('sushi'),
            alt: 'A large yellow smiley face facing an illustrated sushi menu card held with pink grid washi tape, with fish stamps and a fish sticker.',
            description: 'The sushi postcard was a free gift with a purchase at the Japantown mall. The fish stickers are from a fish-themed Japanese sticker book, the fish stamps are from Magic Hands Art Reuse, and the smiley face is cut from a sushi takeout bag. I like sushi, lol.',
          },
          {
            title: 'Hole-Punch Rainbow',
            category: 'Collage',
            image: img('collage-dots'),
            pages: spread('dots'),
            alt: 'A page of hole-punched paper dots arranged in a rainbow gradient from red to purple, facing scalloped black-and-white patterned circles.',
            description: 'Every dot is punched from mail that piled up, like junk mail, magazines still delivered for past tenants of my apartment, hospital mailers, and Costco and Sendik’s magazines and promos. I hunted through them for colors, textures, and small variations, which turned into an exercise in classifying color. The line between yellow, orange, and red, or green, blue, and purple, is blurrier than it sounds. The facing page collects large, mostly monochrome patterns, like the security tint printed inside envelopes, packaging, and a QR code. It was a peaceful couch craft, and the tiny decisions I agonized over at the time disappear when I look at the finished page.',
          },
          {
            title: 'Tom Tiffany Farted in My Soup',
            category: 'Collage · Election',
            image: img('collage-tiffany'),
            pages: spread('tiffany'),
            alt: 'Ransom-note letters reading “Tom Tiffany farted in my soup” beside his campaign-mailer photo doodled with a clown wig, nose, and cheeks, facing an orange NRA endorsement mailer.',
            description: 'Inspired by a TikTok that grew into a series of political cartoons showing Tom Tiffany doing comically evil things ahead of the election, like farting in your soup. The letters and his photo are cut from the stacks of junk mail about Tiffany I was getting at the time, and the facing page is the NRA mailer that showed up asking me to vote for him.',
            link: { href: 'https://www.tiktok.com/t/ZPNJEH8ds/', label: 'The TikTok that started it' },
          },
          {
            title: 'Blusconsin',
            category: 'Collage · Election',
            image: img('collage-blusconsin'),
            pages: spread('blusconsin'),
            alt: 'Spread framed in polka-dot washi tape: a torn-paper Wisconsin collage reading “for Wisconsin” over repeating Blusconsin type, facing a hand-lettered Governor Crowley bingo card with an I Voted sticker in the center square, captioned “Oh boy a trifecta! But will anything change?”',
            description: 'Made after Democrats’ big midterm win in Wisconsin. I designed the Blusconsin background and state outline in Affinity and laser-printed them on blue construction paper, then filled the outline with scraps like a Milwaukee skyline from the Shepherd Express, offcuts from this page and an earlier one, stickers, and a torn-up medication box. The “for Wisconsin,” “Milwaukee,” and the W all came from Tom Tiffany junk mail, which felt right. The bingo card tracks Governor Crowley’s campaign promises. I designed it in Affinity too and laser-printed it onto tissue paper taped to printer paper, then laid it over a Wisconsin Votes postcard of cows in a field so both show through. My I Voted sticker is the free space, and I’ll add a sticker to each square as promises get kept. I’m excited about the trifecta, but now they have to actually deliver.',
          },
          {
            title: 'Austin',
            category: 'Travel Journal',
            image: img('collage-austin'),
            pages: spread('austin'),
            alt: 'Travel journal spread from Austin on green paper: cell therapy prep instructions from Ways2Well, a United boarding pass, a Paperwork Austin sticker, a Google guest badge, a Truluck’s tag, a Bird Bird Biscuit menu, and a Clippy sticker saying “The work is mysterious and important.”',
            description: 'A trip to Ways2Well in Austin for a Dezawa Muse stem cell treatment for my long COVID. I cut the rules from my prep handouts into strips, like no anti-inflammatories for a week, no alcohol, and no injury-prone activities like heavy lifting or rollerblading, which I thought was funny. Around the treatment I got to visit the Google office and eat well at Bird Bird Biscuit and Truluck’s. I flew during the weekend of the FAA ground stop, so the boarding pass earned its spot. The Clippy sticker had been waiting for the right page. It matched the colors, and “the work is mysterious and important” is the mantra from Severance. A little “no pain, no growth” sticker sits by the rules. They were hard to follow, but I’m hopeful about the treatment.',
          },
        ],
      },
      {
        heading: 'Upcycled',
        items: [
          {
            title: 'Teacup Candles',
            category: 'Upcycled · Christmas Gifts',
            image: img('craft-teacup-candles'),
            alt: 'Candles poured into upcycled teacups, made as Christmas gifts.',
            description: 'The teacups are thrifted from Goodwill. Some of the red wax is from a candle I took from my grandma’s house after she passed away, so every family member got a piece of her candle. I added scent before pouring.',
          },
        ],
      },
    ],
  },
  {
    slug: 'events',
    cover: img('event-holi'),
    title: 'Events Hosted',
    summary: "SWE conferences, cultural celebrations, and community events I've organized.",
    description: "Cultural celebrations, conferences, and community events I've organized through SWE and KSM.",
    sections: [
      {
        heading: 'SWE Conference',
        items: [
          {
            title: 'Hands-On Future',
            category: 'SWE · Hosted',
            image: img('event-swe-hands-on-future-1'),
            alt: 'Hands-On Future conference hosted by the Society of Women Engineers.',
            description: 'As SWE’s Women in STEM Outreach Chair, I was the lead organizer, and it was my big project for the year. It was the first in-person Hands-On Future since COVID, after one cancelled year and one online. Girls from local middle and high schools picked a few majors and took a short hands-on lesson in each, taught by MSOE students, alumni, professors, and corporate partners. I lined up the sponsors and the volunteers who guided groups and taught. Milwaukee Tool took apart one of their drills the way their engineers do in training, and provided lunch. For software engineering, we skipped coding, since CS covered that, and taught designing for a user. Students picked a character from a book, show, or movie, built a persona, and designed a product for them, like a high-tech umbrella for Mary Poppins or a son finder for Nemo’s dad. The kids loved it.',
          },
          {
            title: 'STEM Expo',
            category: 'SWE · Hosted',
            image: img('event-swe-hands-on-future-2'),
            alt: 'Hands-On Future attendees gathered around a competition robot at the end-of-day expo.',
            description: 'The day ended with an expo of MSOE’s STEM and competition teams, like the lunar robotics and VEX robotics teams, where students talked with team members about their projects and saw the robots up close.',
          },
        ],
      },
      {
        heading: 'KSM Cultural Events',
        items: [
          {
            title: 'Diwali Celebration',
            category: 'KSM · Outreach Chair',
            image: img('event-diwali'),
            alt: 'Diwali celebration hosted with Kappa Sigma Mu.',
            description: 'Diwali and Holi were cultural celebrations I led for my sorority, Kappa Sigma Mu. They were open to everyone and planned so Indian international students had a place to celebrate with their peers. Sorority sisters performed dances, and we served Indian food, which for many people from the rural Midwest was a first.',
          },
          {
            title: 'Diwali Presentation',
            category: 'KSM',
            image: img('event-diwali-presentation'),
            alt: 'A presentation on Diwali traditions.',
          },
          {
            title: 'Diwali Sand Art',
            category: 'KSM',
            image: img('event-diwali-sand-art'),
            alt: 'Colored sand art made at the Diwali celebration.',
            description: 'I sourced the supplies for everyone to make small sand mandalas.',
          },
          {
            title: 'Holi Festival',
            category: 'KSM',
            image: img('event-holi'),
            alt: 'Holi festival hosted with Kappa Sigma Mu.',
          },
          {
            title: 'Holi Dance Class',
            category: 'KSM',
            image: img('event-holi-dance-class'),
            alt: 'A dance class at the Holi festival.',
            description: 'Everyone learned an Indian dance routine together.',
          },
          {
            title: 'Piñata Making',
            category: 'KSM',
            image: img('event-pinata-making'),
            alt: 'Piñata making with Kappa Sigma Mu.',
            description: 'Part of our Día de los Muertos celebration, one of two I hosted, with Lotería, conchas, tamales, and sugar-skull-style painting on plastic skulls. Those events are where I first learned Lotería. These are the test piñatas we made from recycled cardboard and tissue paper to check the instructions before the event.',
          },
        ],
      },
      {
        heading: 'Campus Panels',
        items: [
          {
            title: 'World Hijab Day Panel',
            category: 'Hosted',
            image: img('event-world-hijab-day-1'),
            alt: 'World Hijab Day panel on campus.',
            description: 'I organized two World Hijab Day panels. I invited panelists from Muslim women’s groups in the area, our Muslim Students Association, and Muslim faculty, wrote questions using World Hijab Day’s resources, and set up audience questions on note cards so they could be screened and read by a moderator. Each panel was paired with an information booth in the campus center, run with the MSA. I learned a lot about the faith and the practice, and so did the students who came.',
          },
          {
            title: 'World Hijab Day Panelists',
            category: 'Hosted',
            image: img('event-world-hijab-day-2'),
            alt: 'Panelists speaking at the World Hijab Day panel.',
            description: 'At the second panel, I moderated.',
          },
        ],
      },
    ],
  },
];

export const itemCount = (category: BeyondCategory) =>
  category.sections.reduce((sum, section) => sum + section.items.length, 0);

export const coverItem = (category: BeyondCategory) =>
  category.sections.flatMap((section) => section.items).find((item) => item.image === category.cover)!;

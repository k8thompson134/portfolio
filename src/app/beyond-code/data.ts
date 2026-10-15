export interface GalleryItem {
  title: string;
  category: string;
  image: string;
  alt: string;
  description?: string;
  // Read only by the hub cover; gallery thumbnails always show the whole piece
  contain?: boolean;
}

export interface GallerySection {
  heading?: string;
  intro?: string;
  portrait?: boolean;
  items: GalleryItem[];
}

export interface BeyondCategory {
  slug: string;
  title: string;
  summary: string;
  description: string;
  cover: string;
  layout?: 'photo' | 'wall' | 'scrapbook';
  coverContain?: boolean;
  sections: GallerySection[];
}

const img = (name: string) => `/images/beyond-code/${name}.webp`;

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
          'Lotería is a Mexican game a lot like bingo: everyone plays on a board, and a caller draws cards from a deck. This deck was played at ticketed fundraisers, and every time a card was drawn, it kicked off a conversation about the policy on it. Each ticket came with a board to play on, and afterward the card art sold as posters to raise more money for the campaign.',
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
            description: 'Meet Dr. Care: a badger in a little doctor’s coat. First name Badger, last name Care. He’s here for the BadgerCare public option.',
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
            description: 'A crossed-out cooler of ice over a dotted map of Wisconsin: end state collaboration with ICE.',
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
            description: 'Most of the work is in the pumpkins: both club logos converted to SVG, recolored, SAGA’s background elements removed, and a glow added so they look carved.',
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
    slug: 'crafts',
    layout: 'scrapbook',
    cover: img('craft-loon-cross-stitch'),
    title: 'Crafts & Collage',
    summary: 'Cross stitch, upcycled teacup candles, and collage journals.',
    description: 'Handmade work: cross stitch, upcycled gifts, and collage journals built from packaging, stickers, and travel scraps.',
    sections: [
      {
        heading: 'Cross Stitch',
        items: [
          {
            title: 'Loon',
            category: 'Cross Stitch',
            image: img('craft-loon-cross-stitch'),
            alt: 'A small cross-stitched loon on blue fabric in a dark square frame, next to a jar of beach stones.',
          },
          {
            title: 'Spherical Cow',
            category: 'Cross Stitch',
            image: img('craft-cow-cross-stitch'),
            alt: 'Cross-stitched cow above the words “assume a spherical cow.”',
            description: 'The physics joke about simplifying a problem until it’s solvable: first, assume a spherical cow.',
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
        items: [
          {
            title: 'Fish',
            category: 'Collage',
            image: img('collage-fish'),
            alt: 'Collage page of cut-out Swedish Fish candy packaging, fish stickers, and a fish skeleton on purple paper.',
          },
          {
            title: 'Sept',
            category: 'Collage',
            image: img('collage-sept'),
            alt: 'Collage page on pink patterned paper: ransom-note letters spelling Sept, cut-out perfume bottles, stickers, and a $69.99 price tag.',
          },
          {
            title: 'San Francisco',
            category: 'Travel Journal',
            image: img('collage-san-francisco'),
            alt: 'Travel journal spread from San Francisco with a Fog Cats sticker, washi tape, a clothing tag, and an airline priority tag.',
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
          },
          {
            title: 'Conference Session',
            category: 'SWE · Hosted',
            image: img('event-swe-hands-on-future-2'),
            alt: 'A session at the Hands-On Future conference.',
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
          },
          {
            title: 'Piñata Making',
            category: 'KSM',
            image: img('event-pinata-making'),
            alt: 'Piñata making with Kappa Sigma Mu.',
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
          },
          {
            title: 'World Hijab Day Panelists',
            category: 'Hosted',
            image: img('event-world-hijab-day-2'),
            alt: 'Panelists speaking at the World Hijab Day panel.',
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

import Link from 'next/link';
import EntryPhotos, { type EntryPhoto } from './EntryPhotos';
import styles from './ExperienceTimeline.module.scss';

interface Entry {
  org: string;
  role: string;
  dates: string;
  description: string[];
  link?: { href: string; label: string };
  photos?: EntryPhoto[];
}

export const ROBOTICS: Entry[] = [
  {
    org: 'FTC Team 12682, The Golden Ratio',
    role: 'Co-Lead Programmer and Vision Systems Lead, then Mentor',
    dates: '2018 – 2022',
    description: [
      'Knowledge transfer was my big focus. I led the programming part of our summer camp for new members, got our code off a single team laptop and onto GitHub, and built a library of reusable code and examples so it would outlast my class. I also brought Dynamic AR along to make AR models of our robots for judging, and I coached the drive team from the field. Sustainability ended up as our judging theme my senior year, and the team nominated me for the FIRST Dean’s List.',
      'For outreach I presented at the kickoff’s notebook and judges’ presentation workshop, emceed demo matches at the Museum of Science and Industry, demoed our robots at Google Chicago, and reimaged donated laptops so they could go to schools and firefighters in Jamaica.',
      'My first season with the team won the Connect Award and second place for Inspire at the 2019 League Championship. In 2020 we were finalist alliance captain at League, won the Connect Award at State, and qualified for Worlds, which got canceled for COVID. I stuck around as a mentor for two more seasons, running the programming part of Robotics Boot Camp, and the team has since made Worlds three years running.',
    ],
    photos: [
      {
        title: 'Presenting at Kickoff',
        category: 'Skystone kickoff · 2019',
        image: '/images/experience/skystone-kickoff-workshop.webp',
        alt: 'Kate presenting the notebook and judges’ presentation workshop to a classroom of FTC students at the Skystone kickoff.',
        width: 1400,
        height: 934,
      },
      {
        title: 'Demo Matches',
        category: 'Museum of Science and Industry · 2019',
        image: '/images/experience/golden-ratio-demo-field.webp',
        alt: 'Kate explaining the game to museum visitors beside a demo field of robots.',
        width: 1400,
        height: 1050,
      },
      {
        title: 'Google Chicago',
        category: '2019',
        image: '/images/experience/golden-ratio-google.webp',
        alt: 'The Golden Ratio team in matching black shirts in front of a wall of colorful gears at Google’s Chicago office.',
        width: 1400,
        height: 934,
      },
      {
        title: 'MTI Career Expo',
        category: '2019',
        image: '/images/experience/golden-ratio-mti-expo.webp',
        alt: 'Kate and the Golden Ratio team in sunglasses at the team’s table at the MTI Career Expo.',
        width: 960,
        height: 720,
      },
      {
        title: 'Laptops for Jamaica',
        category: 'Jamaica International Ministry · 2019',
        image: '/images/experience/golden-ratio-jamaica.webp',
        alt: 'The Golden Ratio team with members of the Jamaica International Ministry at the event for the repurposed laptops.',
        width: 1400,
        height: 1050,
      },
      {
        title: 'Inspire Award',
        category: 'State qualifier · 2019',
        image: '/images/experience/golden-ratio-inspire-2019.webp',
        alt: 'The Golden Ratio team wearing medals and holding an Inspire Award 1st Place sign and trophies.',
        width: 1400,
        height: 934,
      },
      {
        title: 'Towards Sustainability',
        category: 'Team theme · 2020',
        image: '/images/experience/golden-ratio-sustainability.webp',
        alt: 'Kate holding a Golden Ratio sign reading A Strategic Journey Towards Sustainability.',
        width: 956,
        height: 717,
      },
      {
        title: 'Finalist Alliance Captain',
        category: 'League Championship · 2020',
        image: '/images/experience/golden-ratio-finalist-captain.webp',
        alt: 'Kate holding the Finalist Alliance Captain sign with the Golden Ratio team in medals.',
        width: 1083,
        height: 722,
      },
      {
        title: 'Connect Award',
        category: 'Illinois State · 2020',
        image: '/images/experience/state-2020-connect-award.webp',
        alt: 'The Golden Ratio team in black shirts posing with the Connect Award at the 2020 Illinois State Championship.',
        width: 1400,
        height: 933,
      },
    ],
  },
  {
    org: 'FTC Team 7351, Dynamic Signals',
    role: 'Programmer',
    dates: '2015 – 2018',
    description: [
      'I joined in 8th grade, learned Java from my teammates, and wrote autonomous code on the software sub-team. My freshman year I built Dynamic AR, an augmented reality app in Unity and Vuforia that pulled up our robot’s CAD model, and every version of it from the season, for judges in the pits. Other teams in the North region started doing it too. I kept building on it in later seasons, including a version that used ground-plane detection to show the robot life-size without a printed target.',
      'We were the winning alliance at the 2016 Illinois State Championship, won the Inspire Award at the 2017 Asia Pacific Invitational in Sydney, and finished 7th at the 2018 World Championship. The Sydney trip started with company visits in Silicon Valley, and we even played a match for Chinese television. At the 2016 World Championship in St. Louis I was a student ambassador for corporate visitors and got a “You Inspire Me” award from one of the judges.',
    ],
    photos: [
      {
        title: 'Software Team',
        category: '2015',
        image: '/images/experience/dynamic-signals-software-team.webp',
        alt: 'Kate working on the robot’s electronics during her first season.',
        width: 1280,
        height: 851,
      },
      {
        title: 'Starting on Vuforia',
        category: '2016',
        image: '/images/experience/dynamic-signals-vuforia.webp',
        alt: 'Kate, in a hoodie with her name on the back, at a laptop as the team started using Vuforia.',
        width: 1280,
        height: 851,
      },
      {
        title: 'Dynamic AR',
        category: 'Unity and Vuforia',
        image: '/images/experience/dynamic-ar-app.webp',
        alt: 'Phone screenshot of the Dynamic AR app showing the robot’s 3D CAD model standing on a printed image target, with buttons to switch robot versions.',
        width: 676,
        height: 1200,
      },
      {
        title: 'Building Dynamic AR',
        category: 'Unity editor',
        image: '/images/experience/dynamic-ar-unity.webp',
        alt: 'The Unity editor with the robot model placed on a field image target for the Dynamic AR app.',
        width: 1400,
        height: 744,
      },
      {
        title: 'Making It Official',
        category: 'Lab coat',
        image: '/images/experience/dynamic-signals-lab-coat.webp',
        alt: 'Kate in her navy Dynamic Signals team lab coat in the team workshop.',
        width: 1280,
        height: 851,
      },
      {
        title: 'Inspire Award',
        category: 'Sydney · 2017',
        image: '/images/experience/api-inspire-award.webp',
        alt: 'Kate and the Dynamic Signals team in lab coats accepting the Inspire Award on stage at Macquarie University.',
        width: 1280,
        height: 851,
      },
      {
        title: 'Inspire Award Winner',
        category: 'Sydney · 2017',
        image: '/images/experience/api-inspire-screen.webp',
        alt: 'The ceremony screen reading 2017 Asia Pacific Invitational Inspire Award Winner, 7351 Dynamic Signals, with a US flag.',
        width: 1280,
        height: 851,
      },
      {
        title: 'Finalist Alliance',
        category: 'Sydney · 2017',
        image: '/images/experience/api-finalist-alliance.webp',
        alt: 'The finalist alliance teams, including Dynamic Signals in lab coats, posing on stage with their awards.',
        width: 1280,
        height: 851,
      },
    ],
  },
];

export const TEACHING: Entry[] = [
  {
    org: 'iD Tech',
    role: 'Student, then Online Programming Instructor',
    dates: '2014 – 2022',
    description: [
      'I started going to iD Tech camps in 2014 and spent 12 weeks there over the years at the University of Wisconsin–Madison, learning Java, C++, VEX robotics, and Unity. I reached L10, the top level of their Pathway program, which only 378 of more than 306,000 students have reached. My last camp was the first AcademyNEXT class, a month at Stanford on AI and machine learning, where my team built a robot that used reinforcement learning to find its way back to a home base.',
      'In summer 2022 I came back to teach kids and teens ages 7 to 17 over video: Java, Python, Unity with C#, Roblox with Lua, and Scratch. A lot of it was finding the explanation that clicked for each kid, and fixing their setup without being in the room.',
    ],
    link: {
      href: 'https://media.idtech.com/downloads/L10/4/Kathryn%20Thompson%20Letter%20of%20Recommendation.pdf',
      label: 'L10 letter from iD Tech’s CEO',
    },
  },
  {
    org: 'FLL and Jr. FLL Mentoring',
    role: 'Student Mentor',
    dates: '2015 – 2019',
    description: [
      'I was the only student mentor for two FLL teams at my old junior high, the Cyber Cats and Mission Impossiburger, and helped with programming, testing, and the research project. I also mentored the POP Rocks and LEGO Masters Jr. FLL teams and an all-girls Jr. FLL team, volunteered with the LEGO robotics classes at the Cary Area Library, and brought robotics to Girls on the Run, which got a few of the girls to join FLL.',
      'With my teams I ran monthly FLL and Jr. FLL workshops at the Lake Villa District Library and GIFT (Girls In FIRST and Tech) sessions, where I ran the electronics station with Snap Circuits and littleBits. We also put on a FIRST Co-Op that got nearly 50 kids from seven brand-new teams started in FLL and Jr. FLL, complete with a plumber explaining that season’s water theme, and a showcase and competition for Lake and McHenry County teams with Illinois 4-H.',
    ],
    photos: [
      {
        title: 'Electronics Station',
        category: 'GIFT · 2016',
        image: '/images/experience/gift-snap-circuits.webp',
        alt: 'Kate helping girls build Snap Circuits projects at the electronics station of a GIFT workshop.',
        width: 1280,
        height: 851,
      },
      {
        title: 'GIFT Workshop',
        category: 'Lake Villa District Library · 2016',
        image: '/images/experience/gift-workshop.webp',
        alt: 'Kate talking with a group of girls at a GIFT workshop at the Lake Villa District Library.',
        width: 1280,
        height: 851,
      },
      {
        title: 'POP Rocks Expo',
        category: 'Jr. FLL · 2017',
        image: '/images/experience/pop-rocks-expo.webp',
        alt: 'Kate kneeling with the POP Rocks Jr. FLL team in their yellow team shirts at their expo.',
        width: 1280,
        height: 960,
      },
      {
        title: 'FIRST Co-Op',
        category: '2017',
        image: '/images/experience/first-co-op.webp',
        alt: 'Kids from new FLL and Jr. FLL teams posing with Dynamic Signals members in front of the 7351 banner.',
        width: 1280,
        height: 851,
      },
    ],
  },
];

export const LEADERSHIP: Entry[] = [
  {
    org: 'Kappa Sigma Mu',
    role: 'Outreach Chair',
    dates: '2022 – 2024',
    description: [
      'As outreach chair I planned cultural events like Día de los Muertos, Rosh Hashanah, Holi, and Diwali, plus World Hijab Day panels, researching each tradition and working with people who actually celebrate it. For Tie Blanket Tuesday we made blankets for Jewish Family Services in Milwaukee and learned about Hanukkah.',
      'Some of the best events came from partnering with other groups. We co-hosted a tatreez (Palestinian embroidery) workshop with the Muslim Students Association, who brought in a tatreez artist. A member’s idea to celebrate Korean New Year grew into a Lunar New Year celebration with the International Student Association and AASU, where we ran a Yut Nori station next to Chinese calligraphy and paper lanterns. It has become a yearly event.',
    ],
    link: { href: '/beyond-code/events', label: 'More event photos' },
    photos: [
      {
        title: 'Diwali',
        category: '2023',
        image: '/images/beyond-code/event-diwali.webp',
        alt: 'Kate and friends making sand rangoli designs at a table at the Diwali celebration.',
        width: 1365,
        height: 1024,
      },
      {
        title: 'Holi Dance Class',
        category: '2024',
        image: '/images/beyond-code/event-holi-dance-class.webp',
        alt: 'A crowd learning an Indian dance routine at the Holi celebration.',
        width: 1544,
        height: 869,
      },
      {
        title: 'Día de los Muertos',
        category: 'Piñata making',
        image: '/images/beyond-code/event-pinata-making.webp',
        alt: 'Piñatas shaped like the letters K, S, and M on a table.',
        width: 576,
        height: 1024,
      },
      {
        title: 'World Hijab Day Panel',
        category: 'Kappa Sigma Mu',
        image: '/images/beyond-code/event-world-hijab-day-1.webp',
        alt: 'Kate with the World Hijab Day panelists after the panel.',
        width: 1344,
        height: 955,
      },
      {
        title: 'Lunar New Year',
        category: 'With ISA · 2024',
        image: '/images/experience/ksm-lunar-new-year-flyer.webp',
        alt: 'Flyer for the 2024 Lunar New Year celebration hosted by ISA and KSM, with a red dragon and fireworks.',
        width: 478,
        height: 598,
      },
    ],
  },
  {
    org: 'Society of Women Engineers, MSOE',
    role: 'K-12 Outreach Chair',
    dates: '2022 – 2023',
    description: [
      'I ran Hands-On Future, the first one back after COVID, where high schoolers try out engineering majors through activities led by students and professors. In all, 43 students from Illinois and Wisconsin signed up and ranked nine majors, and I scheduled each of them into three sessions from their top picks. I also recruited volunteers across departments, handled the schools, materials, and rooms, and got Milwaukee Tool to come show what’s inside their tools and sponsor lunch.',
    ],
    link: { href: '/beyond-code/events', label: 'Event photos' },
  },
  {
    org: 'FIRST Ladies',
    role: 'Regional Partner Team Lead',
    dates: '2017 – 2020',
    description: [
      'In 2017 I became the first Illinois FIRST Ladies Regional Partner. It started with a league meetup at McHenry County College in 2016 that drew more than 30 girls and grew into meetups with guest speakers at league meets and the Illinois State Championship in 2017 and 2018, several of them co-hosted with team Vertigo. For the 2018 North Super Regional in Iowa I raised more than $3,000 from friends and STEM professionals for a breakfast with a speaker from AbbVie, and more than 80 people came.',
      'At The Golden Ratio I led a bowling meetup, the Fearless Females panel at the Cary Area Library, and its follow-up, The Conversation Continues, at the League Championship. I also raised the money for and planned the first FIRST Ladies breakfast and professional panel at the Illinois State Championship in 2019, and another in 2020. Along the way we co-hosted a robotics badge workshop with the Girl Scouts, where 120 girls from more than 60 troops earned all three robotics badges for their level, and I spoke at a Google tech talk about how women engineers can support FIRST Ladies.',
    ],
    photos: [
      {
        title: 'The Conversation Continues',
        category: 'League Championship · 2020',
        image: '/images/experience/fearless-females-panel.webp',
        alt: 'Kate moderating a FIRST Ladies panel of women professionals seated on the competition floor.',
        width: 1084,
        height: 723,
      },
      {
        title: 'Fearless Females Panelists',
        category: 'League Championship · 2020',
        image: '/images/experience/fearless-females-panelists.webp',
        alt: 'The panelists and Golden Ratio members, including Kate, posing on the competition floor after the panel.',
        width: 1084,
        height: 723,
      },
      {
        title: 'Lunch Meet Up',
        category: 'Illinois State',
        image: '/images/experience/first-ladies-state-lunch.webp',
        alt: 'Girls from several FTC teams talking around a table at the FIRST Ladies lunch meet-up at the Illinois State Championship.',
        width: 1280,
        height: 851,
      },
      {
        title: 'FIRST Ladies at State',
        category: 'Illinois State',
        image: '/images/experience/first-ladies-state-sign.webp',
        alt: 'A crowd of girls from FTC teams at the FIRST Ladies lunch meet-up, with a FIRST Ladies sign in front.',
        width: 1280,
        height: 851,
      },
      {
        title: 'FIRST Ladies Meet Up',
        category: 'League meetup',
        image: '/images/experience/first-ladies-meetup-vertigo.webp',
        alt: 'Girls from FTC teams talking around tables in a school hallway at a FIRST Ladies meet-up.',
        width: 1280,
        height: 851,
      },
      {
        title: 'FIRST Ladies Bowling Meet-up',
        category: '2019',
        image: '/images/experience/first-ladies-bowling-flyer.webp',
        alt: 'Flyer for a FIRST Ladies bowling meet-up with pizza at Elgin Lanes on February 23, 2019.',
        width: 1077,
        height: 955,
      },
      {
        title: 'Calling All Fearless Females',
        category: '2020',
        image: '/images/experience/fearless-females-flyer.webp',
        alt: 'Flyer for a FIRST Ladies leadership panel for girls 12 and up at Cary Area Library, sponsored by The Golden Ratio.',
        width: 916,
        height: 1188,
      },
    ],
  },
  {
    org: 'Rep. Randy Hultgren’s STEM Scholars',
    role: 'Inaugural Scholar, then Student STEM Advisor',
    dates: '2016 – 2018',
    description: [
      'I was in the first class of the 14th District STEM Scholars, then in the pilot group of student STEM advisors the next year. Every month we met with the congressman and local STEM professionals at places like FONA’s flavor chemistry labs, SciTech, and Fermilab, and gave a student’s take on STEM education and space policy in roundtable discussions.',
    ],
    photos: [
      {
        title: 'Roundtable with Congressman Hultgren',
        category: '2016',
        image: '/images/experience/stem-scholars-roundtable.webp',
        alt: 'STEM Scholars, including Kate in a striped fringe cardigan, seated in a circle for a roundtable discussion with Congressman Hultgren.',
        width: 1280,
        height: 851,
      },
      {
        title: 'STEM Scholars Class',
        category: '2016',
        image: '/images/experience/stem-scholars-class.webp',
        alt: 'The 2016 STEM Scholars class posing in front of the FONA International sign.',
        width: 1280,
        height: 851,
      },
    ],
  },
];

export function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ol className={styles.entries}>
      {entries.map((entry) => (
        <li key={entry.org + entry.role} className={styles.entry}>
          <span className={styles.dates}>{entry.dates}</span>
          <div>
            <h3 className={styles.org}>{entry.org}</h3>
            <p className={styles.role}>{entry.role}</p>
            {entry.description.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={styles.description}>
                {paragraph}
              </p>
            ))}
            {entry.link && (
              <Link href={entry.link.href} className={styles.entryLink}>
                {entry.link.label} →
              </Link>
            )}
            {entry.photos && <EntryPhotos photos={entry.photos} />}
          </div>
        </li>
      ))}
    </ol>
  );
}

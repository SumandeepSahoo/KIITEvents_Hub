
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Technical' | 'Cultural' | 'Workshop' | 'Sports';
  status: 'Upcoming' | 'Ongoing' | 'Past';
  image: string;
  aiHint: string;
  description: string;
  societyId?: string;
}

const allEvents: Event[] = [
  {
    id: '1',
    title: 'KIIT Hackathon 2025',
    date: 'Sep 7, 2025',
    time: '10:00 AM',
    location: 'Campus-15 Auditorium',
    category: 'Technical',
    status: 'Upcoming',
    image: 'https://picsum.photos/seed/1/600/400',
    aiHint: 'code hackathon',
    description: 'Join the most anticipated hackathon of the year! A 24-hour event where you can build, innovate, and collaborate with the brightest minds on campus. Prizes, mentorship, and a lot of caffeine await!',
    societyId: 'soc-5',
  },
  {
    id: '2',
    title: 'Startup Conclave',
    date: 'Sep 15, 2025',
    time: '9:00 AM',
    location: 'Convention Center',
    category: 'Workshop',
    status: 'Upcoming',
    image: 'https://picsum.photos/seed/2/600/400',
    aiHint: 'business conference',
    description: 'A full-day workshop for aspiring entrepreneurs. Learn from successful founders, get insights on funding, and pitch your ideas to a panel of experts. Your journey from idea to unicorn starts here.',
    societyId: 'soc-4',
  },
  {
    id: '3',
    title: 'Annual Tech Fest "Kritansh"',
    date: 'Oct 20, 2025',
    time: 'All Day',
    location: 'Campus-7',
    category: 'Technical',
    status: 'Upcoming',
    image: 'https://picsum.photos/seed/3/600/400',
    aiHint: 'technology festival',
    description: 'Kritansh is back with a bang! Experience a fusion of technology, innovation, and fun. From coding competitions to drone races, there is something for every tech enthusiast.',
  },
  {
    id: '4',
    title: 'Intra-University Football Tournament',
    date: 'Oct 25, 2025',
    time: '8:00 AM',
    location: 'KIIT Stadium',
    category: 'Sports',
    status: 'Upcoming',
    image: 'https://picsum.photos/seed/4/600/400',
    aiHint: 'football sport',
    description: 'Witness the ultimate showdown as teams from different schools battle it out for the championship trophy. Come cheer for your favorite team and experience the thrill of the game.',
  },
   {
    id: '10',
    title: 'Public Speaking Masterclass',
    date: 'Nov 5, 2025',
    time: '2:00 PM',
    location: 'Room 404, Campus-5',
    category: 'Workshop',
    status: 'Upcoming',
    image: 'https://picsum.photos/seed/10/600/400',
    aiHint: 'public speaking',
    description: 'Master the art of public speaking in this interactive workshop. Learn how to craft compelling speeches and deliver them with confidence.',
    societyId: 'soc-6'
  },
  {
    id: '11',
    title: 'Guest Lecture: AI in Healthcare',
    date: 'Nov 12, 2025',
    time: '3:00 PM',
    location: 'Online',
    category: 'Technical',
    status: 'Upcoming',
    image: 'https://picsum.photos/seed/11/600/400',
    aiHint: 'ai healthcare',
    description: 'Join us for an insightful guest lecture by Dr. Anya Sharma on the revolutionary impact of Artificial Intelligence in the healthcare industry.',
    societyId: 'soc-12'
  },
  {
    id: '12',
    title: 'Symphony Evening',
    date: 'Nov 20, 2025',
    time: '7:00 PM',
    location: 'Amphitheatre, Campus-7',
    category: 'Cultural',
    status: 'Upcoming',
    image: 'https://picsum.photos/seed/12/600/400',
    aiHint: 'music concert',
    description: 'An enchanting evening of live music performances by the KIIT Music Society. Get ready to be mesmerized by soulful melodies and rocking beats.',
    societyId: 'soc-10'
  },
  {
    id: '5',
    title: 'Art & Photography Exhibition',
    date: 'Aug 25 - Sep 5, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Art Gallery, Campus-12',
    category: 'Cultural',
    status: 'Ongoing',
    image: 'https://picsum.photos/seed/5/600/400',
    aiHint: 'art gallery',
    description: 'Immerse yourself in a world of creativity. This exhibition showcases stunning artworks and photographs from talented students across the university. A visual treat for all art lovers.',
  },
   {
    id: '6',
    title: 'Robotics Workshop Series',
    date: 'Aug 28 - Sep 10, 2025',
    time: '4:00 PM',
    location: 'Tesla Labs, Campus-3',
    category: 'Workshop',
    status: 'Ongoing',
    image: 'https://picsum.photos/seed/6/600/400',
    aiHint: 'robotics workshop',
    description: 'A hands-on workshop series where you will learn to build and program your own robots. From basic bots to advanced AI-powered machines, this is your chance to dive into the world of robotics.',
    societyId: 'soc-1',
  },
  {
    id: '13',
    title: 'CodeSprint: 7-Day Challenge',
    date: 'Sep 1 - Sep 7, 2025',
    time: 'All Day',
    location: 'Online Platform',
    category: 'Technical',
    status: 'Ongoing',
    image: 'https://picsum.photos/seed/13/600/400',
    aiHint: 'coding challenge',
    description: 'A week-long coding challenge designed to test your problem-solving skills. Compete with fellow coders and win exciting prizes.',
    societyId: 'soc-5'
  },
  {
    id: '14',
    title: 'Theatrix: Annual Theatre Production',
    date: 'Sep 3 - Sep 5, 2025',
    time: '6:00 PM',
    location: 'Auditorium, Campus-6',
    category: 'Cultural',
    status: 'Ongoing',
    image: 'https://picsum.photos/seed/14/600/400',
    aiHint: 'theatre stage',
    description: 'The official theatre society of KIIT presents its annual production. A captivating play that promises to keep you on the edge of your seat.',
  },
  {
    id: '7',
    title: 'KORUS - The K-Pop Fest',
    date: 'Apr 12, 2025',
    time: '5:00 PM',
    location: 'Amphitheatre, Campus-7',
    category: 'Cultural',
    status: 'Past',
    image: 'https://picsum.photos/seed/7/600/400',
    aiHint: 'music festival',
    description: 'Experience the Hallyu wave right here on campus! KORUS brings you an evening of electrifying K-Pop performances, dance-offs, and fan gatherings. A must-attend for all K-Pop enthusiasts.',
  },
  {
    id: '8',
    title: 'Web3 & Blockchain Summit',
    date: 'Mar 22, 2025',
    time: '11:00 AM',
    location: 'Online',
    category: 'Technical',
    status: 'Past',
    image: 'https://picsum.photos/seed/8/600/400',
    aiHint: 'blockchain crypto',
    description: 'An online summit that demystifies the world of Web3 and Blockchain. Industry experts discuss the future of the internet, NFTs, and decentralized finance. A great learning opportunity for everyone.',
    societyId: 'soc-5'
  },
   {
    id: '9',
    title: 'KIIT Marathon 2025',
    date: 'Feb 15, 2025',
    time: '6:00 AM',
    location: 'Starting from Campus-1',
    category: 'Sports',
    status: 'Past',
    image: 'https://picsum.photos/seed/9/600/400',
    aiHint: 'running marathon',
    description: 'Run for a cause! The annual KIIT Marathon promotes health, fitness, and community spirit. Join thousands of participants in this exciting event and make a difference.',
  },
  {
    id: '15',
    title: 'Dance Workshop: Hip-Hop & Contemporary',
    date: 'Jan 20, 2025',
    time: '5:00 PM',
    location: 'Dance Studio, Campus-11',
    category: 'Workshop',
    status: 'Past',
    image: 'https://picsum.photos/seed/15/600/400',
    aiHint: 'hiphop dance',
    description: 'A two-day dance workshop covering Hip-Hop and Contemporary styles. Learn from professional dancers and choreographers.',
  },
  {
    id: '16',
    title: 'Design Thinking Seminar',
    date: 'Dec 18, 2024',
    time: '10:00 AM',
    location: 'Convention Center',
    category: 'Workshop',
    status: 'Past',
    image: 'https://picsum.photos/seed/16/600/400',
    aiHint: 'design thinking',
    description: 'A seminar on the principles of design thinking and how it can be applied to solve complex problems and drive innovation.',
    societyId: 'soc-7'
  },
];

export const upcomingEvents: Event[] = allEvents.filter(e => e.status === 'Upcoming');
export const ongoingEvents: Event[] = allEvents.filter(e => e.status === 'Ongoing');
export const pastEvents: Event[] = allEvents.filter(e => e.status === 'Past');

export function getEventById(id: string): Event | undefined {
  return allEvents.find(event => event.id === id);
}

export function getEventsBySocietyId(societyId: string): Event[] {
    return allEvents.filter(event => event.societyId === societyId);
}


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
}

export const upcomingEvents: Event[] = [
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
  },
];

export const ongoingEvents: Event[] = [
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
  },
];

export const pastEvents: Event[] = [
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
  },
];

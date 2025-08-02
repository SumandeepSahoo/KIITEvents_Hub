
export interface Society {
  id: string;
  name: string;
  category: 'Technical' | 'Cultural' | 'Social' | 'Hobby';
  logo: string;
  aiHint: string;
  description: string;
}

export const allSocieties: Society[] = [
  {
    id: 'soc-1',
    name: 'KIIT Robotics Society',
    category: 'Technical',
    logo: 'https://picsum.photos/seed/soc1/200/200',
    aiHint: 'robot logo',
    description: 'Fostering innovation in robotics and automation through workshops, projects, and competitions.',
  },
  {
    id: 'soc-2',
    name: 'Qutopia',
    category: 'Cultural',
    logo: 'https://picsum.photos/seed/soc2/200/200',
    aiHint: 'quiz logo',
    description: 'The official quizzing society of KIIT. We host quizzes on a variety of topics and participate in national level competitions.',
  },
  {
    id: 'soc-3',
    name: 'KIIT Film Society',
    category: 'Hobby',
    logo: 'https://picsum.photos/seed/soc3/200/200',
    aiHint: 'film camera',
    description: 'A place for cinephiles to watch, discuss, and create films. We organize screenings, workshops, and filmmaking competitions.',
  },
  {
    id: 'soc-4',
    name: 'Enactus KIIT',
    category: 'Social',
    logo: 'https://picsum.photos/seed/soc4/200/200',
    aiHint: 'social impact',
    description: 'A community of student, academic and business leaders committed to using the power of entrepreneurial action to transform lives.',
  },
  {
    id: 'soc-5',
    name: 'KIIT Coding Club',
    category: 'Technical',
    logo: 'https://picsum.photos/seed/soc5/200/200',
    aiHint: 'code logo',
    description: 'The central hub for competitive programming and software development enthusiasts on campus.',
  },
   {
    id: 'soc-6',
    name: 'Kalam',
    category: 'Cultural',
    logo: 'https://picsum.photos/seed/soc6/200/200',
    aiHint: 'literature feather',
    description: 'The literary society of KIIT, promoting reading, writing, and spoken word poetry among students.',
  },
  {
    id: 'soc-7',
    name: 'KIIT E-Cell',
    category: 'Technical',
    logo: 'https://picsum.photos/seed/soc7/200/200',
    aiHint: 'entrepreneurship lightbulb',
    description: 'The Entrepreneurship Cell of KIIT, fostering the spirit of entrepreneurship among students.',
  },
  {
    id: 'soc-8',
    name: 'KIIT Automotive Society',
    category: 'Hobby',
    logo: 'https://picsum.photos/seed/soc8/200/200',
    aiHint: 'car engine',
    description: 'For all the automobile enthusiasts, this society is all about designing, building, and racing vehicles.',
  },
  {
    id: 'soc-9',
    name: 'KIIT Social Wing',
    category: 'Social',
    logo: 'https://picsum.photos/seed/soc9/200/200',
    aiHint: 'helping hands',
    description: 'Dedicated to making a positive impact on society through various social welfare activities.',
  },
  {
    id: 'soc-10',
    name: 'KIIT Music Society',
    category: 'Cultural',
    logo: 'https://picsum.photos/seed/soc10/200/200',
    aiHint: 'music notes',
    description: 'A community for music lovers to collaborate, create, and perform music of various genres.',
  },
  {
    id: 'soc-11',
    name: 'KIIT Gaming Club',
    category: 'Hobby',
    logo: 'https://picsum.photos/seed/soc11/200/200',
    aiHint: 'game controller',
    description: 'The ultimate hub for gamers on campus, hosting tournaments and casual gaming sessions.',
  },
  {
    id: 'soc-12',
    name: 'KIIT AI/ML Club',
    category: 'Technical',
    logo: 'https://picsum.photos/seed/soc12/200/200',
    aiHint: 'artificial intelligence',
    description: 'Exploring the frontiers of Artificial Intelligence and Machine Learning through projects and discussions.',
  }
];

export function getSocietyById(id: string): Society | undefined {
    return allSocieties.find(society => society.id === id);
}

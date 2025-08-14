import Header from '@/components/Header';
import EventList from '@/components/EventList';
import { eventServerAPI } from '@/lib/events-server';
import SocietyList from '@/components/SocietyList';
import { allSocieties } from '@/lib/societies';
import CreateEventButton from '@/components/CreateEventButton';
import { Trophy, Calendar, Music, Users, Star, PartyPopper, Mic, Camera, BookOpen, Heart, Sparkles } from 'lucide-react';

// Fetch events from the database directly (server-side)
async function getEvents() {
  try {
    const [upcoming, ongoing, past] = await Promise.all([
      eventServerAPI.getByStatus('Upcoming'),
      eventServerAPI.getByStatus('Ongoing'),
      eventServerAPI.getByStatus('Past')
    ]);

    return { upcoming, ongoing, past };
  } catch (error) {
    console.error('Error fetching events:', error);
    // Return empty arrays as fallback
    return { upcoming: [], ongoing: [], past: [] };
  }
}

export default async function Home() {
  const { upcoming, ongoing, past } = await getEvents();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="flex-1 pt-16">
        {/* NEW: Lock content to max width so layout is same on all large screens */}
        <div className="max-w-[1440px] mx-auto px-4 py-8 md:py-12">
          <div className="relative text-center mb-16 flex flex-col items-center overflow-visible">
            
            {/* Blue blur top-left */}
            <div
              className="absolute left-[20%] top-[25%] 
              -translate-x-1/2 -translate-y-1/2
              w-[28vw] h-[14vw] 
              rounded-full bg-blue-700 opacity-70 blur-[80px] 
              z-0 pointer-events-none"
            />

            {/* Blue blur bottom-right */}
            <div
              className="absolute right-[20%] bottom-[25%] 
              translate-x-1/2 translate-y-1/2
              w-[28vw] h-[14vw] 
              rounded-full bg-blue-700 opacity-70 blur-[80px] 
              z-0 pointer-events-none"
            />

            {/* Dark purple blur center */}
            <div
              className="absolute left-1/2 top-1/2 
              -translate-x-1/2 -translate-y-1/2
              w-[35vw] h-[18vw] 
              rounded-3xl bg-purple-900 opacity-100 blur-[100px] 
              z-0 pointer-events-none"
            />

            {/* Animated icons (unchanged) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <Sparkles className="absolute right-12 top-4 text-blue-400 animate-float-slow" size={24} />
              <Music className="absolute right-0 top-1/2 -translate-y-1/2 text-pink-400 animate-pulse-slow" size={28} />
              <Users className="absolute right-12 bottom-4 text-green-400 animate-float-reverse" size={24} />
              <PartyPopper className="absolute left-12 bottom-4 text-purple-400 animate-float-slow" size={24} />
              <Mic className="absolute left-0 top-1/2 -translate-y-1/2 text-red-400 animate-pulse-slow" size={28} />
              <Camera className="absolute left-12 top-4 text-indigo-400 animate-float-reverse" size={24} />
              <BookOpen className="absolute left-1/4 top-2 text-blue-300 animate-float-slow" size={20} />
              <Heart className="absolute right-1/4 bottom-2 text-pink-300 animate-bounce-slow" size={20} />
            </div>

            {/* Glassy center panel */}
            <div className="relative z-10 px-8 py-8 rounded-3xl bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-lg border border-purple-500 inline-block
                            overflow-hidden transition-all duration-300 ease-in-out group">
              <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out rounded-3xl z-0" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-headline relative z-10">
                KIIT Event Universe
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto relative z-10">
                Your central hub for discovering, joining, and experiencing all the vibrant events happening across the campus.
              </p>
              <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-purple-500 rounded-3xl transition-all duration-300 ease-in-out z-20" />
            </div>
          </div>

          {/* Your event lists here */}
          <div className="space-y-10">
            <EventList
              title={
                <span className="flex items-center gap-2">
                  Upcoming Events
                  <Calendar className="text-white-400 animate-bounce-slow" size={24} />
                </span>
              }
              events={upcoming}
            />
            <EventList
              title={
                <span className="flex items-center gap-2">
                  Ongoing Events
                  <Calendar className="text-white-400 animate-bounce-slow" size={24} />
                </span>
              }
              events={ongoing}
            />
            <SocietyList
              title={
                <span className="flex items-center gap-2">
                  Student Societies
                  <Users className="text-white-500" size={24} />
                </span>
              }
              societies={allSocieties}
            />
            <EventList
              title={
                <span className="flex items-center gap-2">
                  Past Events
                  <Calendar className="text-white-400 animate-bounce-slow" size={24} />
                </span>
              }
              events={past}
            />
          </div>
        </div>
      </main>
      <CreateEventButton />
      <footer className="py-6 border-t border-border/20 mt-12">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} KIITEvents Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}


// export default async function Home() {
//   const { upcoming, ongoing, past } = await getEvents();

//   return (
//     <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
//       <Header />
//       <main className="flex-1 pt-16">
//         <div className="container mx-auto px-4 py-8 md:py-12">
//           <div className="relative text-center mb-16 flex flex-col items-center overflow-visible">
//             {/* Blue-toned blurred background */}
//             <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[180px] md:w-[500px] md:h-[250px] rounded-full bg-blue-700 opacity-50 blur-3xl z-0 pointer-events-none" />

//             {/* NEW: Blue-toned blurred background (bottom-right) */}
//             <div className="absolute right-1/4 bottom-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[180px] md:w-[500px] md:h-[250px] rounded-full bg-blue-700 opacity-50 blur-3xl z-0 pointer-events-none" />
            
//             {/* Blurred dark purple background */}
//             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[220px] md:w-[600px] md:h-[300px] rounded-3xl bg-purple-900 opacity-60 blur-2xl z-0 pointer-events-none" />

//             {/* Animated icons around the heading */}
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
//               {/* Top */}
//               {/* <Trophy className="absolute left-1/2 -translate-x-1/2 -top-8 text-yellow-400 animate-bounce-slow" size={28} /> */}
//               {/* Top-right */}
//               <Sparkles className="absolute right-12 top-4 text-blue-400 animate-float-slow" size={24} />
//               {/* Right */}
//               <Music className="absolute right-0 top-1/2 -translate-y-1/2 text-pink-400 animate-pulse-slow" size={28} />
//               {/* Bottom-right */}
//               <Users className="absolute right-12 bottom-4 text-green-400 animate-float-reverse" size={24} />
//               {/* Bottom */}
//               {/* <Star className="absolute left-1/2 -translate-x-1/2 -bottom-8 text-yellow-300 animate-bounce-reverse" size={28} /> */}
//               {/* Bottom-left */}
//               <PartyPopper className="absolute left-12 bottom-4 text-purple-400 animate-float-slow" size={24} />
//               {/* Left */}
//               <Mic className="absolute left-0 top-1/2 -translate-y-1/2 text-red-400 animate-pulse-slow" size={28} />
//               {/* Top-left */}
//               <Camera className="absolute left-12 top-4 text-indigo-400 animate-float-reverse" size={24} />
//               {/* Extra icons for variety */}
//               <BookOpen className="absolute left-1/4 top-2 text-blue-300 animate-float-slow" size={20} />
//               <Heart className="absolute right-1/4 bottom-2 text-pink-300 animate-bounce-slow" size={20} />
//             </div>
//             {/* Glassy Center Panel */}
//             {/* <div className="relative z-10 px-8 py-8 rounded-3xl bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-lg border border-purple-500 inline-block">
//               <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-headline">
//                 KIIT Event Universe
//               </h2>
//               <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
//                 Your central hub for discovering, joining, and experiencing all the vibrant events happening across the campus.
//               </p>
//             </div> */}
//             <div className="relative z-10 px-8 py-8 rounded-3xl bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-lg border border-purple-500 inline-block
//                             overflow-hidden
//                             transition-all duration-300 ease-in-out
//                             group">
//               <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out rounded-3xl z-0" />
//               <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-headline relative z-10">
//                 KIIT Event Universe
//               </h2>
//               <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto relative z-10">
//                 Your central hub for discovering, joining, and experiencing all the vibrant events happening across the campus.
//               </p>
//               <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent group-hover:border-purple-500 rounded-3xl transition-all duration-300 ease-in-out z-20" />
//             </div>
//           </div>

//           <div className="space-y-10">
//             <EventList
//               title={
//                 <span className="flex items-center gap-2">
//                   Upcoming Events
//                   <Calendar className="text-white-400 animate-bounce-slow" size={24} />
//                 </span>
//               }
//               events={upcoming}
//             />
//             <EventList
//               title={
//                 <span className="flex items-center gap-2">
//                   Ongoing Events
//                   <Calendar className="text-white-400 animate-bounce-slow" size={24} />
//                 </span>
//               }
//               events={ongoing}
//             />
//             <SocietyList
//               title={
//                 <span className="flex items-center gap-2">
//                   Student Societies
//                   <Users className="text-white-500" size={24} />
//                 </span>
//               }
//               societies={allSocieties}
//             />
//             <EventList
//               title={
//                 <span className="flex items-center gap-2">
//                   Past Events
//                   <Calendar className="text-white-400 animate-bounce-slow" size={24} />
//                 </span>
//               }
//               events={past}
//             />
//           </div>
//         </div>
//       </main>
//       <CreateEventButton />
//       <footer className="py-6 border-t border-border/20 mt-12">
//         <div className="container mx-auto text-center text-muted-foreground text-sm">
//           &copy; {new Date().getFullYear()} KIITEvents Hub. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }

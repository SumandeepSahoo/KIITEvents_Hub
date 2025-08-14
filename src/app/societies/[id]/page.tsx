import { getSocietyById, Society } from '@/lib/societies';
import { getEventsBySocietyId, Event } from '@/lib/events';
import Header from '@/components/Header';
import EventList from '@/components/EventList';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Trophy, Calendar, Music, Users, Star, PartyPopper, Mic, Camera, BookOpen, Heart, Sparkles } from 'lucide-react';

export default async function SocietyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const society = await getSocietyById(id);

  if (!society) {
    notFound();
  }

  const societyEvents = await getEventsBySocietyId(society.id);
  const upcomingEvents = societyEvents.filter(e => e.status === 'Upcoming');
  const ongoingEvents = societyEvents.filter(e => e.status === 'Ongoing');
  const pastEvents = societyEvents.filter(e => e.status === 'Past');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              <Image
                src={society.logo}
                alt={`${society.name} logo`}
                fill
                className="object-cover"
                data-ai-hint={society.aiHint}
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 font-headline">{society.name}</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
                {society.description}
              </p>
              <p className="text-base text-primary mt-2">
                Please visit the official page for more details.
              </p>
            </div>
          </div>
          <div className="space-y-15">
            {upcomingEvents.length > 0 && <EventList  title={
                <span className="flex items-center gap-2">
                  Upcoming Events
                  <Calendar className="text-white-400 animate-bounce-slow" size={24} />
                </span>
              } events={upcomingEvents} />}

            {ongoingEvents.length > 0 && <EventList title={
                <span className="flex items-center gap-2">
                  Ongoing Events
                  <Calendar className="text-white-400 animate-bounce-slow" size={24} />
                </span>
              } events={ongoingEvents} />}

            {pastEvents.length > 0 && <EventList title={
                <span className="flex items-center gap-2">
                  Past Events
                  <Calendar className="text-white-400 animate-bounce-slow" size={24} />
                </span>
              } events={pastEvents} />}
              
            {societyEvents.length === 0 && (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/20 bg-secondary/30 p-12 text-center">
                <p className="text-2xl font-bold font-headline">No Events Found</p>
                <p className="text-lg text-muted-foreground mt-2">This society has not posted any events yet. Check back later!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="py-6 border-t border-border/20 mt-12">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} KIITEvents Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

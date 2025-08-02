import Header from '@/components/Header';
import EventList from '@/components/EventList';
import { upcomingEvents, ongoingEvents, pastEvents } from '@/lib/events';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-headline">KIIT Event Universe</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Your central hub for discovering, joining, and experiencing all the vibrant events happening across the campus.
            </p>
          </div>

          <div className="space-y-20">
            <EventList title="Upcoming Events" events={upcomingEvents} />
            <EventList title="Ongoing Events" events={ongoingEvents} />
            <EventList title="Past Events" events={pastEvents} />
          </div>
        </div>
      </main>
       <Link href="/events/new">
        <Button className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg" size="icon">
          <Plus className="h-8 w-8" />
          <span className="sr-only">Create Event</span>
        </Button>
      </Link>
      <footer className="py-6 border-t border-border/20 mt-12">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} KIITEvents Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

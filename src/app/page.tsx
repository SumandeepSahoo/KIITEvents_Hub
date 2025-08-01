import Header from '@/components/Header';
import EventList from '@/components/EventList';
import { upcomingEvents, ongoingEvents, pastEvents } from '@/lib/events';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-2 font-headline">Events Dashboard</h2>
            <p className="text-lg text-muted-foreground">Discover, register for, and track events happening at KIIT.</p>
          </div>

          <div className="space-y-16">
            <EventList title="Upcoming Events" events={upcomingEvents} />
            <EventList title="Ongoing Events" events={ongoingEvents} />
            <EventList title="Past Events" events={pastEvents} />
          </div>
        </div>
      </main>
    </div>
  );
}

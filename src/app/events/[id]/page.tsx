import { getEventById, Event } from '@/lib/events';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Ticket } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id);

  if (!event) {
    notFound();
  }

  const isPast = event.status === 'Past';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to all events
            </Link>

          <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
            <div className="md:col-span-3">
              <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-lg shadow-primary/10">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className={`object-cover ${isPast ? 'grayscale' : ''}`}
                  data-ai-hint={event.aiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                    <Badge variant={isPast ? "secondary" : "default"} className={`mb-2 text-base ${isPast ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}>
                        {event.category}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold text-white font-headline">{event.title}</h1>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
                <div className="bg-secondary/30 rounded-2xl p-6 h-full flex flex-col">
                    <h2 className="text-2xl font-bold font-headline mb-4">Event Details</h2>
                    <div className="space-y-4 text-muted-foreground flex-grow">
                        <div className="flex items-start gap-3">
                            <CalendarDays className="h-5 w-5 shrink-0 mt-1 text-primary" />
                            <div>
                                <p className="font-semibold text-foreground">Date & Time</p>
                                <p>{event.date} at {event.time}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 shrink-0 mt-1 text-primary" />
                            <div>
                                <p className="font-semibold text-foreground">Location</p>
                                <p>{event.location}</p>
                            </div>
                        </div>
                    </div>
                    <Button className="w-full mt-6 text-lg py-6" variant={isPast ? "outline" : "default"} disabled={isPast}>
                        <Ticket className="mr-2 h-5 w-5"/>
                        {event.status === 'Upcoming' ? 'Register Now' : 'View Details'}
                    </Button>
                </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold font-headline mb-4">About the Event</h2>
            <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
                <p>{event.description}</p>
            </div>
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

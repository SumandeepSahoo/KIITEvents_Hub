import { eventServerAPI } from '@/lib/events-server';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CalendarDays, MapPin, Ticket, Shield, Info } from 'lucide-react';

// Make this a server component to fetch data
async function getEvent(id: string) {
  try {
    const event = await eventServerAPI.getById(id);
    return event;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const isPast = event.status === 'Past';
  const isAdminEvent = event.createdBy === 'admin';

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
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={isPast ? "secondary" : "default"} className={`text-base ${isPast ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}>
                      {event.category}
                    </Badge>
                    {/* {isAdminEvent && (
                      <Badge variant="outline" className="text-sm bg-white/10 text-white border-white/20">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin Event
                      </Badge>
                    )} */}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white font-headline">{event.title}</h1>
                </div>
                Admin badge overlay
                {isAdminEvent && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary/90 text-white rounded-full p-2">
                      <Shield className="h-5 w-5" />
                    </div>
                  </div>
                )}
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
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 shrink-0 mt-1 text-primary" />
                    <div>
                      <h2 className="font-semibold text-foreground">About the Event</h2>
                    </div>
                  </div>
                  <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed break-words overflow-auto max-h-[300px]">
                    <p>{event.description}</p>
                  </div>
                  {isAdminEvent && (
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 shrink-0 mt-1 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Created By</p>
                        <p>Administrator</p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-base text-primary mt-6 text-center">
                  Please visit the official page for more details.
                </p>
              </div>
            </div>
          </div>

          {/* <div className="mt-12">
            <h2 className="text-3xl font-bold font-headline mb-4">About the Event</h2>
            <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
              <p>{event.description}</p>
            </div>
          </div> */}

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

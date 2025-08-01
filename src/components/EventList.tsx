"use client";

import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import EventCard from "@/components/EventCard";
import type { Event } from "@/lib/events";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const EventCarousel = ({ events }: { events: Event[] }) => {
  if (events.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/50 p-12 text-center">
        <p className="text-lg font-medium text-muted-foreground">No events found.</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search.</p>
      </div>
    );
  }
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="p-1 h-full">
              <EventCard event={event} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
};

interface EventListProps {
    title: string;
    events: Event[];
}

export default function EventList({ title, events }: EventListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    if (!searchQuery) return events;
    return events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, events]);

  return (
    <section>
        <div className="flex flex-col items-start justify-between gap-4 border-b pb-4 mb-6 sm:flex-row sm:items-center">
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
            <div className="relative w-full sm:w-64 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search events..."
                    className="pl-9 bg-card"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
        <EventCarousel events={filteredEvents} />
    </section>
  );
}

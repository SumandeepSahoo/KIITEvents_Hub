"use client";

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import EventCard from "@/components/EventCard";
import type { Event } from "@/lib/events";
import { upcomingEvents, ongoingEvents, pastEvents } from "@/lib/events";

const EventGrid = ({ events }: { events: Event[] }) => {
  if (events.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/50 p-12 text-center">
        <p className="text-lg font-medium text-muted-foreground">No events found.</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default function EventTabs() {
  const [searchQuery, setSearchQuery] = useState('');

  const filterEvents = (events: Event[]) => {
    if (!searchQuery) return events;
    return events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredUpcoming = useMemo(() => filterEvents(upcomingEvents), [searchQuery]);
  const filteredOngoing = useMemo(() => filterEvents(ongoingEvents), [searchQuery]);
  const filteredPast = useMemo(() => filterEvents(pastEvents), [searchQuery]);

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <div className="flex flex-col items-start justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
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
      <TabsContent value="upcoming" className="mt-6">
        <EventGrid events={filteredUpcoming} />
      </TabsContent>
      <TabsContent value="ongoing" className="mt-6">
        <EventGrid events={filteredOngoing} />
      </TabsContent>
      <TabsContent value="past" className="mt-6">
        <EventGrid events={filteredPast} />
      </TabsContent>
    </Tabs>
  );
}

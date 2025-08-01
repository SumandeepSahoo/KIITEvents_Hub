import type { Event } from '@/lib/events';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const isPast = event.status === 'Past';
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl bg-secondary/50 border-border/20 transition-all duration-300 ease-in-out hover:shadow-primary/10 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className={`object-cover ${isPast ? 'grayscale' : ''}`}
            data-ai-hint={event.aiHint}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 flex flex-col">
        <div className="flex-grow">
          <Badge variant={isPast ? "secondary" : "default"} className={`mb-2 ${isPast ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}>
            {event.category}
          </Badge>
          <h3 className="mb-2 text-lg font-bold font-headline leading-tight text-foreground">{event.title}</h3>
        </div>
        <div className="space-y-2 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 shrink-0" />
                <span>{event.date} - {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{event.location}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant={isPast ? "outline" : "default"} disabled={isPast}>
          {event.status === 'Upcoming' ? 'Register' : 'View Details'}
        </Button>
      </CardFooter>
    </Card>
  );
}

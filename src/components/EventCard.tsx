import type { Event } from '@/lib/models/event';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Image as ImageIcon, Shield } from 'lucide-react';
import { useState } from 'react';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const isPast = event.status === 'Past';
  const [imageError, setImageError] = useState(false);
  const isAdminEvent = event.createdBy === 'admin';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="flex h-full min-h-[350px] flex-col overflow-hidden rounded-2xl bg-secondary/50 border-border/20 transition-all duration-300 ease-in-out hover:shadow-primary/30 hover:shadow-lg hover:-translate-y-1 hover:border-primary/60">
  <CardHeader className="p-0">
    <div className="relative h-40 w-full"> {/* smaller image */}
      {!imageError ? (
        <Image
          src={event.image}
          alt={event.title}
          fill
          className={`object-cover ${isPast ? 'grayscale' : ''}`}
          onError={handleImageError}
          unoptimized
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center bg-muted ${isPast ? 'grayscale' : ''}`}>
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  </CardHeader>

  <CardContent className="flex-1 p-4 flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Badge variant={isPast ? "secondary" : "default"} className={`${isPast ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}>
          {event.category}
        </Badge>
        {isAdminEvent && (
          <Badge variant="outline" className="text-xs">
            <Shield className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        )}
      </div>
      <h3 className="mb-2 text-lg font-bold font-headline leading-tight text-foreground line-clamp-2">
        {event.title}
      </h3>
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
    <Link href={`/events/${event._id}`} className="w-full">
      <Button className="w-full" variant={isPast ? "outline" : "default"} disabled={isPast}>
        View Details
      </Button>
    </Link>
  </CardFooter>
</Card>

    // <Card className="flex h-full flex-col overflow-hidden rounded-2xl bg-secondary/50 border-border/20 transition-all duration-300 ease-in-out hover:shadow-primary/30 hover:shadow-lg hover:-translate-y-1 hover:border-primary/60">
    //   <CardHeader className="p-0">
    //     <div className="relative h-40 w-full">
    //       {!imageError ? (
    //         <Image
    //           src={event.image}
    //           alt={event.title}
    //           fill
    //           className={`object-cover ${isPast ? 'grayscale' : ''}`}
    //           data-ai-hint={event.aiHint}
    //           onError={handleImageError}
    //           unoptimized={true}
    //         />
    //       ) : (
    //         <div className={`w-full h-full flex items-center justify-center bg-muted ${isPast ? 'grayscale' : ''}`}>
    //           <ImageIcon className="h-12 w-12 text-muted-foreground" />
    //         </div>
    //       )}
    //        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    //        {/* Admin badge for admin-created events */}
    //        {isAdminEvent && (
    //          <div className="absolute top-2 right-2">
    //            <div className="bg-primary/90 text-white rounded-full p-1">
    //              <Shield className="h-4 w-4" />
    //            </div>
    //          </div>
    //        )}
    //     </div>
    //   </CardHeader>
    //   <CardContent className="flex-1 p-4 flex flex-col">
    //     <div className="flex-grow">
    //       <div className="flex items-center gap-2 mb-2">
    //         <Badge variant={isPast ? "secondary" : "default"} className={`${isPast ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}>
    //           {event.category}
    //         </Badge>
    //         {isAdminEvent && (
    //           <Badge variant="outline" className="text-xs">
    //             <Shield className="h-3 w-3 mr-1" />
    //             Admin
    //           </Badge>
    //         )}
    //       </div>
    //       <h3 className="mb-2 text-lg font-bold font-headline leading-tight text-foreground">{event.title}</h3>
    //     </div>
    //     <div className="space-y-2 mt-2 text-sm text-muted-foreground">
    //         <div className="flex items-center gap-2">
    //             <CalendarDays className="h-4 w-4 shrink-0" />
    //             <span>{event.date} - {event.time}</span>
    //         </div>
    //         <div className="flex items-center gap-2">
    //             <MapPin className="h-4 w-4 shrink-0" />
    //             <span>{event.location}</span>
    //         </div>
    //     </div>
    //   </CardContent>
    //   <CardFooter className="p-4 pt-0">
    //     <Link href={`/events/${event._id}`} className="w-full">
    //       <Button className="w-full" variant={isPast ? "outline" : "default"} disabled={isPast}>
    //         {event.status === 'Upcoming' ? 'View Details' : 'View Details'}
    //       </Button>
    //     </Link>
    //   </CardFooter>
    // </Card>
  );
}

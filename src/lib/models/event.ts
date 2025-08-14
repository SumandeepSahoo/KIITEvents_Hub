import { ObjectId } from 'mongodb';

// TypeScript interface for Event (for API responses and client-side)
export interface Event {
  _id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'Technical' | 'Cultural' | 'Workshop' | 'Sports';
  status: 'Upcoming' | 'Ongoing' | 'Past';
  image: string;
  aiHint?: string;
  societyId?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Type for database operations (with ObjectId)
export interface EventDocument {
  _id?: ObjectId;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'Technical' | 'Cultural' | 'Workshop' | 'Sports';
  status: 'Upcoming' | 'Ongoing' | 'Past';
  image: string;
  aiHint?: string;
  societyId?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Type for creating a new event (without auto-generated fields)
export type CreateEventInput = Omit<Event, '_id' | 'status' | 'createdAt' | 'updatedAt'>;

// Type for updating an event
export type UpdateEventInput = Partial<Omit<Event, '_id' | 'createdAt' | 'updatedAt'>>;

// Helper function to determine event status based on date
export function getEventStatus(date: string): 'Upcoming' | 'Ongoing' | 'Past' {
  try {
    // Parse the date string (assuming YYYY-MM-DD format from HTML date input)
    const eventDate = new Date(date + 'T00:00:00');
    const now = new Date();
    
    // Reset time to start of day for accurate comparison
    const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    console.log('Date comparison:', {
      inputDate: date,
      parsedEventDate: eventDateOnly.toISOString(),
      nowDate: nowDateOnly.toISOString(),
      eventTimestamp: eventDateOnly.getTime(),
      nowTimestamp: nowDateOnly.getTime()
    });
    
    // If event is today, consider it ongoing
    if (eventDateOnly.getTime() === nowDateOnly.getTime()) {
      console.log('Event is today - marking as Ongoing');
      return 'Ongoing';
    }
    
    // If event date is in the future
    if (eventDateOnly > nowDateOnly) {
      console.log('Event is in the future - marking as Upcoming');
      return 'Upcoming';
    }
    
    // If event date is in the past
    console.log('Event is in the past - marking as Past');
    return 'Past';
  } catch (error) {
    console.error('Error parsing date:', date, error);
    // Default to upcoming if date parsing fails
    return 'Upcoming';
  }
} 
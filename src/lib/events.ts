import { Event } from './models/event';

// Define your API base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9002';

// API functions for events
export const eventAPI = {
  // Get all events
  async getAll(): Promise<Event[]> {
    const response = await fetch('/api/events');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  },

  // Get events by status
  async getByStatus(status: 'Upcoming' | 'Ongoing' | 'Past'): Promise<Event[]> {
    const response = await fetch(`/api/events?status=${status}`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  },

  // // Get events by society ID
  // async getBySocietyId(societyId: string): Promise<Event[]> {
  //   const response = await fetch(`/api/events?societyId=${societyId}`);
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch events');
  //   }
  //   return response.json();
  // },

  async getBySocietyId(societyId: string): Promise<Event[]> {
    const response = await fetch(`${BASE_URL}/api/events?societyId=${societyId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  },


  // Get event by ID
  async getById(id: string): Promise<Event | null> {
    const response = await fetch(`/api/events/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch event');
    }
    return response.json();
  },

  // Create a new event
  async create(eventData: Omit<Event, '_id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create event');
    }

    return response.json();
  },

  // Update an event
  async update(id: string, updateData: Partial<Event>): Promise<Event> {
    const response = await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update event');
    }

    return response.json();
  },

  // Delete an event
  async delete(id: string): Promise<void> {
    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete event');
    }
  },
};

// Legacy functions for backward compatibility (using static data as fallback)
const allEvents: Event[] = [

];

export const upcomingEvents: Event[] = allEvents.filter(e => e.status === 'Upcoming');
export const ongoingEvents: Event[] = allEvents.filter(e => e.status === 'Ongoing');
export const pastEvents: Event[] = allEvents.filter(e => e.status === 'Past');

export function getEventById(id: string): Event | undefined {
  return allEvents.find(event => event._id === id);
}

// export function getEventsBySocietyId(societyId: string): Event[] {
//     return allEvents.filter(event => event.societyId === societyId);
// }
// export async function getEventsBySocietyId(id: string): Promise<Event[]> {
//   return allEvents.filter((e) => e.societyId === id);
// }

export async function getEventsBySocietyId(id: string): Promise<Event[]> {
  // Correct implementation:
  // It should use the API function to fetch data from the server.
  return eventAPI.getBySocietyId(id);
}

// Export the Event type
export type { Event } from './models/event';

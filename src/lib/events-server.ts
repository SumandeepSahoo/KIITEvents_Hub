import { getDb } from './mongodb';
import { Event, getEventStatus } from './models/event';
import { ObjectId } from 'mongodb';

// Helper function to convert MongoDB document to plain object
function convertMongoDoc(doc: any): Event {
  if (!doc) return doc;
  
  return {
    _id: doc._id?.toString() || doc._id,
    title: doc.title,
    description: doc.description,
    date: doc.date,
    time: doc.time,
    location: doc.location,
    category: doc.category,
    status: doc.status,
    image: doc.image,
    aiHint: doc.aiHint,
    societyId: doc.societyId,
    createdBy: doc.createdBy,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

// Server-side API functions for events (direct database access)
export const eventServerAPI = {
  // Get all events
  async getAll(): Promise<Event[]> {
    const db = await getDb();
    const collection = db.collection('events');
    
    const events = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return events.map(convertMongoDoc);
  },

  // Get events by status
  async getByStatus(status: 'Upcoming' | 'Ongoing' | 'Past'): Promise<Event[]> {
    const db = await getDb();
    const collection = db.collection('events');
    
    const events = await collection
      .find({ status })
      .sort({ date: 'asc' })
      .toArray();
    
    return events.map(convertMongoDoc);
  },

  // Get events by society ID
  async getBySocietyId(societyId: string): Promise<Event[]> {
    const db = await getDb();
    const collection = db.collection('events');
    
    const events = await collection
      .find({ societyId })
      .sort({ createdAt: -1 })
      .toArray();
    
    return events.map(convertMongoDoc);
  },

  // Get event by ID
  async getById(id: string): Promise<Event | null> {
    const db = await getDb();
    const collection = db.collection('events');
    
    // Try to find by ObjectId first, then by string ID
    let event;
    if (ObjectId.isValid(id)) {
      event = await collection.findOne({ _id: new ObjectId(id) });
    }
    
    if (!event) {
      event = await collection.findOne({ _id: new ObjectId(id) });
    }
    
    return event ? convertMongoDoc(event) : null;
  },

  // Get upcoming events (limited)
  async getUpcomingEvents(limitCount: number = 10): Promise<Event[]> {
    const db = await getDb();
    const collection = db.collection('events');
    
    const events = await collection
      .find({ status: 'Upcoming' })
      .sort({ date: 'asc' })
      .limit(limitCount)
      .toArray();
    
    return events.map(convertMongoDoc);
  },
}; 

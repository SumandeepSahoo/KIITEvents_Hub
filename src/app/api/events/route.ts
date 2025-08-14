import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { Event, EventDocument, getEventStatus } from '@/lib/models/event';

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

// GET /api/events - Get all events
export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const collection = db.collection('events');
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const societyId = searchParams.get('societyId');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // Build query
    let query: any = {};
    if (status) {
      query.status = status;
    }
    if (societyId) {
      query.societyId = societyId;
    }
    
    // Execute query
    const events = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    
    // Convert MongoDB documents to plain objects
    const serializedEvents = events.map(convertMongoDoc);
    
    return NextResponse.json(serializedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.description || !body.date || !body.time || !body.location || !body.category || !body.image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection('events');
    
    // Create event object for database (without _id, MongoDB will generate it)
    const now = new Date();
    const eventData: Omit<EventDocument, '_id'> = {
      title: body.title,
      description: body.description,
      date: body.date,
      time: body.time,
      location: body.location,
      category: body.category,
      status: getEventStatus(body.date),
      image: body.image,
      societyId: body.societyId,
      createdBy: body.createdBy,
      createdAt: now,
      updatedAt: now,
    };
    
    // Insert into database
    const result = await collection.insertOne(eventData);
    
    // Return the created event with its ID
    const createdEvent: Event = {
      _id: result.insertedId.toString(),
      ...eventData,
    };
    
    return NextResponse.json(createdEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
} 
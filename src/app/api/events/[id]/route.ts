import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getEventStatus } from '@/lib/models/event';
import { ObjectId } from 'mongodb';

// Helper function to convert MongoDB document to plain object
function convertMongoDoc(doc: any): any {
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

// GET /api/events/[id] - Get a specific event
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const collection = db.collection('events');
    
    // Validate ObjectId
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }
    
    const event = await collection.findOne({ _id: new ObjectId(params.id) });
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(convertMongoDoc(event));
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id] - Update a specific event
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Validate ObjectId
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection('events');
    
    // Check if event exists
    const existingEvent = await collection.findOne({ _id: new ObjectId(params.id) });
    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Prepare update data
    const updateData: any = {
      ...body,
      updatedAt: new Date(),
    };
    
    // If date is being updated, recalculate status
    if (body.date) {
      updateData.status = getEventStatus(body.date);
    }
    
    // Update the event
    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Return the updated event
    const updatedEvent = await collection.findOne({ _id: new ObjectId(params.id) });
    return NextResponse.json(convertMongoDoc(updatedEvent));
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id] - Delete a specific event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ObjectId
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection('events');
    
    // Check if event exists
    const existingEvent = await collection.findOne({ _id: new ObjectId(params.id) });
    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Delete the event
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
} 
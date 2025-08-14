import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection('events');
    
    // Test the connection by counting documents
    const count = await collection.countDocuments();
    
    return NextResponse.json({
      message: 'MongoDB connection successful',
      database: db.databaseName,
      eventsCount: count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    return NextResponse.json(
      { 
        error: 'MongoDB connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
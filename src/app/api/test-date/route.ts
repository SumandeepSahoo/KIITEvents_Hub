import { NextRequest, NextResponse } from 'next/server';
import { getEventStatus } from '@/lib/models/event';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const testDate = searchParams.get('date');
    
    if (!testDate) {
      return NextResponse.json({
        error: 'Please provide a date parameter',
        example: '/api/test-date?date=2025-01-15'
      });
    }
    
    const status = getEventStatus(testDate);
    const now = new Date();
    
    return NextResponse.json({
      inputDate: testDate,
      calculatedStatus: status,
      currentDate: now.toISOString(),
      currentDateOnly: new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString(),
      parsedEventDate: new Date(testDate + 'T00:00:00').toISOString(),
      eventDateOnly: new Date(new Date(testDate + 'T00:00:00').getFullYear(), new Date(testDate + 'T00:00:00').getMonth(), new Date(testDate + 'T00:00:00').getDate()).toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to test date',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 
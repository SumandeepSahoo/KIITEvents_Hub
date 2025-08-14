# MongoDB Setup Guide

## Environment Variables

Create a `.env.local` file in the `studio` directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
MONGODB_DB=kiit-events
```

## MongoDB Options

### Option 1: Local MongoDB
1. Install MongoDB locally on your machine
2. Start the MongoDB service
3. Use the connection string: `YOUR_MONGODB_CONNECTION_STRING`

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string from the cluster
4. Use the connection string: MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/kiit-events

## Database Structure

The application will automatically create the following collections:
- `events` - Stores all event data

## Event Schema

```typescript
interface Event {
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
```

## API Endpoints

- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event
- `GET /api/events/[id]` - Get a specific event
- `PUT /api/events/[id]` - Update an event
- `DELETE /api/events/[id]` - Delete an event

## Query Parameters

- `status` - Filter by event status (Upcoming, Ongoing, Past)
- `societyId` - Filter by society ID
- `limit` - Limit the number of results (default: 50) 

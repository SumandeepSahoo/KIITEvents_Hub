"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useUser } from '@clerk/nextjs';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { eventAPI } from '@/lib/events';
import { Event } from '@/lib/models/event';
import { allSocieties } from '@/lib/societies';

type FormData = Omit<Event, '_id' | 'status' | 'createdAt' | 'updatedAt'> & { societyId: string };

// Admin email address - change this to your email
const ADMIN_EMAIL = 's24692813@gmail.com'; // Replace with your email

export default function CreateEventPage() {
    const { user, isLoaded } = useUser();
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FormData>();

    // Show loading state while Clerk loads
    if (!isLoaded) {
        return (
            <div className="flex flex-col min-h-screen bg-background text-foreground">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading...</p>
                    </div>
                </main>
            </div>
        );
    }

    // Redirect if not authenticated
    if (!user) {
        router.push('/sign-in');
        return null;
    }

    // Check if user is admin
    const userEmail = user.emailAddresses[0]?.emailAddress;
    const isAdmin = userEmail === ADMIN_EMAIL;

    if (!isAdmin) {
        return (
            <div className="flex flex-col min-h-screen bg-background text-foreground">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center max-w-md mx-auto p-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
                        <p className="text-muted-foreground mb-4">
                            Only administrators can create events. You are logged in as: <strong>{userEmail}</strong>
                        </p>
                        <Link href="/">
                            <Button>Back to Home</Button>
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        
        try {
            // Debug: Log the data being submitted
            console.log('Submitting event data:', data);
            console.log('Date being submitted:', data.date);
            console.log('Current date:', new Date().toISOString());
            console.log('Admin creating event:', userEmail);
            
            // Add user information to the event
            const eventDataWithUser = {
                ...data,
                createdBy: 'admin', // Tag as admin instead of email
            };
            
            // Create the event using the API
            const createdEvent = await eventAPI.create(eventDataWithUser);
            
            console.log('Event created successfully:', createdEvent);
            
            toast({
                title: "Event Created!",
                description: "Your new event has been successfully posted.",
            });
            
            // Redirect to the event page
            router.push(`/events/${createdEvent._id}`);
        } catch (error) {
            console.error('Error creating event:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create event. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to all events
                    </Link>
                    <div className="max-w-3xl mx-auto bg-secondary/30 rounded-2xl p-6 md:p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold font-headline">Create a New Event</h1>
                            <p className="text-muted-foreground mt-2">Fill out the details below to post your event.</p>
                            <div className="mt-4 p-3 bg-green-100 rounded-lg">
                                <p className="text-sm text-green-800 font-medium">🛡️ Admin Access</p>
                                <p className="text-xs text-green-700">Creating event as: {userEmail}</p>
                            </div>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium mb-2">Event Title</label>
                                <Input 
                                    id="title" 
                                    {...register('title', { 
                                        required: 'Title is required',
                                        minLength: { value: 1, message: 'Title is required' },
                                        maxLength: { value: 100, message: 'Title must be less than 100 characters' }
                                    })}
                                    placeholder="e.g., Annual Tech Fest" 
                                    className="bg-background/70"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                )}
                            </div>
                            
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                                <Textarea 
                                    id="description" 
                                    {...register('description', { 
                                        required: 'Description is required',
                                        minLength: { value: 10, message: 'Description must be at least 10 characters' },
                                        maxLength: { value: 1000, message: 'Description must be less than 1000 characters' }
                                    })}
                                    placeholder="Tell us more about the event..." 
                                    className="bg-background/70" 
                                    rows={5}
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
                                    <Input 
                                        id="date" 
                                        type="date" 
                                        {...register('date', { required: 'Date is required' })}
                                        className="bg-background/70"
                                    />
                                    {errors.date && (
                                        <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium mb-2">Time</label>
                                    <Input 
                                        id="time" 
                                        type="time" 
                                        {...register('time', { required: 'Time is required' })}
                                        className="bg-background/70"
                                    />
                                    {errors.time && (
                                        <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
                                    <Input 
                                        id="location" 
                                        {...register('location', { 
                                            required: 'Location is required',
                                            maxLength: { value: 200, message: 'Location must be less than 200 characters' }
                                        })}
                                        placeholder="e.g., Campus-15 Auditorium" 
                                        className="bg-background/70"
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
                                    <Select onValueChange={(value) => setValue('category', value as any)}>
                                        <SelectTrigger className="bg-background/70">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Technical">Technical</SelectItem>
                                            <SelectItem value="Cultural">Cultural</SelectItem>
                                            <SelectItem value="Workshop">Workshop</SelectItem>
                                            <SelectItem value="Sports">Sports</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                                    )}
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium mb-2">Image URL</label>
                                <Input 
                                    id="image" 
                                    type="url" 
                                    {...register('image', { 
                                        required: 'Image URL is required',
                                        pattern: {
                                            value: /^https?:\/\/.+/,
                                            message: 'Please enter a valid URL starting with http:// or https://'
                                        }
                                    })}
                                    placeholder="https://picsum.photos/600/400" 
                                    className="bg-background/70"
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                    Use a reliable image hosting service like Picsum Photos, Unsplash, or upload to your own server.
                                </p>
                                {errors.image && (
                                    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                                )}
                            </div>

                            <div>
                              <label htmlFor="societyId" className="block text-sm font-medium mb-2">Society</label>
                              <Select onValueChange={value => setValue('societyId', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a society" />
                                </SelectTrigger>
                                <SelectContent>
                                  {allSocieties.map(society => (
                                    <SelectItem key={society.id} value={society.id}>
                                      {society.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.societyId && (
                                <p className="text-red-500 text-sm mt-1">{errors.societyId.message}</p>
                              )}
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" className="text-lg px-8 py-6" disabled={isSubmitting}>
                                    {isSubmitting ? 'Creating Event...' : 'Create Event'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <footer className="py-6 border-t border-border/20 mt-12">
                <div className="container mx-auto text-center text-muted-foreground text-sm">
                    &copy; {new Date().getFullYear()} KIITEvents Hub. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

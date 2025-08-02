"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateEventPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        // Here you would typically handle form submission, e.g., send data to a server
        // For this example, we'll just simulate a delay and show a success message.
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
            title: "Event Created!",
            description: "Your new event has been successfully posted.",
        });
        
        // Reset form or redirect user
        (event.target as HTMLFormElement).reset();
        setIsSubmitting(false);
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
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">Event Title</label>
                <Input id="title" name="title" required placeholder="e.g., Annual Tech Fest" className="bg-background/70"/>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                <Textarea id="description" name="description" required placeholder="Tell us more about the event..." className="bg-background/70" rows={5}/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
                    <Input id="date" name="date" type="date" required className="bg-background/70"/>
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium mb-2">Time</label>
                    <Input id="time" name="time" type="time" required className="bg-background/70"/>
                </div>
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
                    <Input id="location" name="location" required placeholder="e.g., Campus-15 Auditorium" className="bg-background/70"/>
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
                    <Select name="category" required>
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
                </div>
              </div>
               <div>
                <label htmlFor="image" className="block text-sm font-medium mb-2">Image URL</label>
                <Input id="image" name="image" type="url" placeholder="https://example.com/image.png" required className="bg-background/70"/>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" className="text-lg px-8 py-6" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Post Event'}
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

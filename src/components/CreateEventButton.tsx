"use client";

import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

// Admin email address - change this to your email
const ADMIN_EMAIL = 's24692813@gmail.com'; // Replace with your email

export default function CreateEventButton() {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();

  const handleClick = () => {
    if (!isLoaded) return;
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access admin features.",
        variant: "destructive",
      });
    } else {
      const userEmail = user.emailAddresses[0]?.emailAddress;
      if (userEmail !== ADMIN_EMAIL) {
        toast({
          title: "Admin Access Required",
          description: "Only administrators can create events.",
          variant: "destructive",
        });
      }
    }
  };

  if (!isLoaded) {
    return null;
  }

  // Only show button for admin
  if (!user || user.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
    return null; // Don't show the button at all for non-admins
  }

  return (
    <Link href="/events/new">
      <Button className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg" size="icon">
        <Plus className="h-8 w-8" />
        <span className="sr-only">Create Event (Admin Only)</span>
      </Button>
    </Link>
  );
} 
import { Bell, Zap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold font-headline tracking-tight text-foreground">KIITEvents Hub</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground hover:bg-accent">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/40x40.png" alt="@student" data-ai-hint="person face" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-foreground">Hey, Student</p>
              <p className="text-xs text-muted-foreground">Welcome back!</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

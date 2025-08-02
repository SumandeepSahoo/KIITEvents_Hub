
import Header from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Edit } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to all events
            </Link>
            <div className="max-w-4xl mx-auto">
                <Card className="bg-secondary/30">
                    <CardHeader className="flex flex-row items-center gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://placehold.co/100x100.png" alt="@student" data-ai-hint="person face" />
                            <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-3xl font-bold font-headline">Student Name</CardTitle>
                            <CardDescription className="text-lg">student@kareer.com</CardDescription>
                        </div>
                        <Button variant="outline" size="icon" className="ml-auto">
                            <Edit className="h-4 w-4"/>
                        </Button>
                    </CardHeader>
                    <CardContent className="mt-6">
                       <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" defaultValue="Student" className="bg-background/70" />
                                </div>
                                <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" defaultValue="Name" className="bg-background/70" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="student@kareer.com" className="bg-background/70"/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bio">Bio</Label>
                                <textarea id="bio" placeholder="Tell us about yourself" className="w-full min-h-[100px] rounded-md border border-input bg-background/70 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"></textarea>
                            </div>
                             <div className="flex justify-end pt-4">
                                <Button type="submit" className="text-lg px-8 py-6">
                                  Save Changes
                                </Button>
                            </div>
                       </form>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  )
}

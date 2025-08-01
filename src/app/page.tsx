import Header from '@/components/Header';
import EventTabs from '@/components/EventTabs';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2 font-headline">Events Dashboard</h2>
          <p className="text-muted-foreground mb-6">Discover, register for, and track events happening at KIIT.</p>
          <EventTabs />
        </div>
      </main>
    </div>
  );
}

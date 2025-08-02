
import type { Society } from '@/lib/societies';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface SocietyCardProps {
  society: Society;
}

export default function SocietyCard({ society }: SocietyCardProps) {
  return (
    <Link href={`/societies/${society.id}`} className="group">
        <Card className="flex flex-col items-center justify-center text-center p-4 h-full bg-secondary/50 border-border/20 transition-all duration-300 ease-in-out hover:shadow-primary/10 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
        <CardContent className="p-0">
            <div className="relative h-24 w-24 mb-4 rounded-full overflow-hidden border-2 border-border/20 group-hover:border-primary/30 transition-colors">
            <Image
                src={society.logo}
                alt={`${society.name} logo`}
                fill
                className="object-cover"
                data-ai-hint={society.aiHint}
            />
            </div>
            <h4 className="font-bold text-base font-headline text-foreground">{society.name}</h4>
        </CardContent>
        </Card>
    </Link>
  );
}

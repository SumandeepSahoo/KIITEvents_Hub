import type { Society } from "@/lib/societies";
import SocietyCard from "./SocietyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface SocietyListProps {
    title: string;
    societies: Society[];
}

export default function SocietyList({ title, societies }: SocietyListProps) {
  return (
    <section>
        <div className="border-b border-border/20 pb-4 mb-8">
            <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
        </div>
        <Carousel
            opts={{
                align: "start",
                dragFree: true,
            }}
            className="w-full"
        >
            <CarouselContent className="-ml-4">
                {societies.map((society) => (
                    <CarouselItem key={society.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                        <SocietyCard society={society} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
        </Carousel>
    </section>
  );
}

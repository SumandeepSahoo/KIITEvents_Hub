// import type { Society } from "@/lib/societies";
// import SocietyCard from "./SocietyCard";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"

// interface SocietyListProps {
//     title: string;
//     societies: Society[];
// }

// export default function SocietyList({ title, societies }: SocietyListProps) {
//   return (
//     <section>
//         <div className="border-b border-border/20 pb-4 mb-8">
//             <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
//         </div>
//         <Carousel
//             opts={{
//                 align: "start",
//                 dragFree: true,
//             }}
//             className="w-full"
//         >
//             <CarouselContent className="-ml-4">
//                 {societies.map((society) => (
//                     <CarouselItem key={society.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
//                         <SocietyCard society={society} />
//                     </CarouselItem>
//                 ))}
//             </CarouselContent>
//             <CarouselPrevious className="hidden sm:flex" />
//             <CarouselNext className="hidden sm:flex" />
//         </Carousel>
//     </section>
//   );
// }
"use client";

import { useState, useMemo } from "react";
import type { Society } from "@/lib/societies";
import SocietyCard from "./SocietyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SocietyListProps {
  title:  React.ReactNode; // Changed to React.ReactNode for flexibility
  societies: Society[];
}

export default function SocietyList({ title, societies }: SocietyListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSocieties = useMemo(() => {
    if (!searchQuery) return societies;
    return societies.filter((society) =>
      society.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, societies]);

  return (
    <section>
      <div className="flex flex-col items-start justify-between gap-4 border-b border-border/20 pb-4 mb-8 sm:flex-row sm:items-center">
        <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
        <div className="relative w-full sm:w-64 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search societies..."
            className="pl-9 bg-secondary/50 border-border/30 focus:bg-secondary focus:border-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {filteredSocieties.map((society) => (
            <CarouselItem
              key={society.id}
              className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <SocietyCard society={society} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel> */}
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {filteredSocieties.map((society) => (
            <CarouselItem
              key={society.id}
              className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <SocietyCard society={society} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/*Centered buttons below the carousel content */}
        <div className="flex justify-between mt-6">
          <CarouselPrevious className="static" />
          <CarouselNext className="static" />
        </div>
      </Carousel>
    </section>
  );
}

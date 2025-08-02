import type { Society } from "@/lib/societies";
import SocietyCard from "./SocietyCard";

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {societies.map((society) => (
                <SocietyCard key={society.id} society={society} />
            ))}
        </div>
    </section>
  );
}

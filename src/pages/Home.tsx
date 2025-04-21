import { CategoryCard } from "@/components/CategoryCard";
import { AppLayout } from "@/components/AppLayout";
import { CalendarDays, Briefcase, ShoppingBag, Calendar } from "lucide-react";

const categories = [
  {
    id: "personal",
    name: "Personal",
    icon: CalendarDays,
    path: "/personal"
  },
  {
    id: "work",
    name: "Work",
    icon: Briefcase,
    path: "/work"
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: ShoppingBag,
    path: "/shopping"
  },
  {
    id: "planned",
    name: "Planned",
    icon: Calendar,
    path: "/planned"
  }
];

export default function Home() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-120px)]">
        <h1 className="text-3xl font-bold mb-8">Welcome to Your Task Manager</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.path}
              id={category.id}
              name={category.name}
              icon={category.icon}
              path={category.path}
            />
          ))}
        </div>
      </div>
      <footer className="text-center py-4 text-sm text-muted-foreground">
        made with <span className="inline align-middle" style={{ color: "#fff" }}>🤍</span> by Sajal
      </footer>
    </AppLayout>
  );
}

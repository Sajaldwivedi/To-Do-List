
import { Sun, Calendar, User, Briefcase, ShoppingBag } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { CategoryCard } from "@/components/CategoryCard";
import { UserHeader } from "@/components/UserHeader";
import { useIsMobile } from "@/hooks/use-mobile";

const categories = [
  { id: "today", name: "Today", icon: Sun, path: "/" },
  { id: "planned", name: "Planned", icon: Calendar, path: "/planned" },
  { id: "personal", name: "Personal", icon: User, path: "/personal" },
  { id: "work", name: "Work", icon: Briefcase, path: "/work" },
  { id: "shopping", name: "Shopping", icon: ShoppingBag, path: "/shopping" }
];

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <AppLayout>
      <div className="yellow-gradient-soft min-h-screen -m-4 md:-m-6 p-4 md:p-6 md:rounded-xl flex flex-col justify-between">
        <div>
          {isMobile && <UserHeader />}
          
          <div className="md:max-w-xl mx-auto">
            <div className="space-y-3">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                  path={category.path}
                />
              ))}
            </div>
          </div>
        </div>
        <footer className="w-full text-xs text-todo-gray/70 mt-8 text-center select-none">
          made with <span className="inline align-middle" style={{ color: "#fff" }}>🤍</span> by Sajal
        </footer>
      </div>
    </AppLayout>
  );
};

export default Index;

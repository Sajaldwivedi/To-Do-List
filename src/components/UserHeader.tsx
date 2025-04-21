
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserHeaderProps {
  hideGreeting?: boolean;
}

export function UserHeader({ hideGreeting = false }: UserHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Avatar>
        <AvatarImage src="/lovable-uploads/f6f18b60-e2ac-4056-87e4-3b1525240196.png" alt="Avatar" />
        <AvatarFallback>EN</AvatarFallback>
      </Avatar>
      {!hideGreeting && (
        <div>
          <h2 className="font-semibold">Hello Ender</h2>
        </div>
      )}
    </div>
  );
}

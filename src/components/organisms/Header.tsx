import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/Avatar";
import { useAuth } from "@/context/AuthContext";
import { Plane } from "lucide-react";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "IFC Analyst" }: HeaderProps) {
  const { user } = useAuth();

  // Get initials from user name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-card border-none shadow-sm sticky top-0 z-40 safe-area-top">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-primary rounded-xl shadow-md">
            <Plane className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">{title}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Vietnam Airlines</p>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-base font-semibold text-foreground leading-tight">{user.name}</p>
              <p className="text-sm text-muted-foreground leading-tight">{user.role}</p>
            </div>
            <Avatar className="h-11 w-11 sm:h-12 sm:w-12 ring-2 ring-primary/20 shadow-md">
              {user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
              <AvatarFallback className="text-base font-semibold">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </header>
  );
}

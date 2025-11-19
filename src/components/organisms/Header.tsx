import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/Avatar";
import { useAuth } from "@/context/AuthContext";
import { Plane } from "lucide-react";

export function Header() {
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
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40 safe-area-top">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 bg-primary rounded-xl shadow-sm">
            <Plane className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-bold text-foreground leading-tight">IFC Analyst</h1>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-tight">Vietnam Airlines</p>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-sm font-medium text-foreground leading-tight">{user.name}</p>
              <p className="text-xs text-muted-foreground leading-tight">{user.role}</p>
            </div>
            <Avatar className="h-9 w-9 sm:h-10 sm:w-10 ring-2 ring-primary/10">
              {user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </header>
  );
}

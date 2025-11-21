import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/Avatar";
import { useAuth } from "@/context/AuthContext";

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
    <header className="bg-card border-none sticky top-0 z-40 safe-area-top ">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground">Danh sách tất cả các chuyến bay</p>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-sm font-semibold text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
            <Avatar className="h-10 w-10 sm:h-11 sm:w-11 ring-2 ring-primary/10 shadow-sm">
              {user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
              <AvatarFallback className="text-sm font-semibold bg-primary text-primary-foreground">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </header>
  );
}

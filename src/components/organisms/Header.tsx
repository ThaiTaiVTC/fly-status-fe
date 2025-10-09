import { Badge } from "@/components/atoms/Badge";
import { Plane, Wifi } from "lucide-react";

export function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40 safe-area-top">
      <div className="flex items-center justify-between px-3 py-2 sm:px-6 sm:py-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="p-1.5 sm:p-2 bg-primary rounded-lg">
              <Plane className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-foreground">IFC</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden xs:block">Internet trên chuyến bay</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <Badge variant="success" className="flex items-center space-x-1">
            <Wifi className="h-3 w-3" />
            <span className="text-xs sm:text-sm">OK</span>
          </Badge>
          <span className="text-[10px] sm:text-xs text-muted-foreground">14:53 29-09</span>
        </div>
      </div>
    </header>
  );
}

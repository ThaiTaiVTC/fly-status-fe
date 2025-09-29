import React from "react";
import { Plane, Wifi } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border shadow-sm z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg">
              <Plane className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">IFC</h1>
              <p className="text-xs text-muted-foreground">Internet trên chuyến bay</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Badge variant="success" className="flex items-center space-x-1">
            <Wifi className="h-3 w-3" />
            <span>OK</span>
          </Badge>
          <span className="text-xs text-muted-foreground">14:53 29-09</span>
        </div>
      </div>
    </header>
  );
}

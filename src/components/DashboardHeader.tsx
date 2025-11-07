import { Calendar, User } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-lg font-semibold text-foreground tracking-wide">
        STOCK MANAGEMENT SYSTEM – ADMIN
      </h1>
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="font-medium">faiz</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>02 Nov 2025</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

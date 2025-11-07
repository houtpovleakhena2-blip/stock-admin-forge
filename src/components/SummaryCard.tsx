import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant: "info" | "success" | "destructive";
}

const SummaryCard = ({ title, value, icon: Icon, variant }: SummaryCardProps) => {
  const variantStyles = {
    info: "bg-info text-info-foreground",
    success: "bg-success text-success-foreground",
    destructive: "bg-destructive text-destructive-foreground",
  };

  return (
    <div
      className={cn(
        "rounded-lg p-6 shadow-md transition-transform hover:scale-105",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-90 mb-2">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon className="h-8 w-8 opacity-80" />
      </div>
    </div>
  );
};

export default SummaryCard;

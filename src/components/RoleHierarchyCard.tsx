import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Briefcase, User } from "lucide-react";

const roles = [
  {
    name: "Admin",
    value: "admin",
    icon: Shield,
    color: "destructive" as const,
    description: "Full system access. Can manage all users, stock, transactions, and system settings.",
    permissions: ["Manage all users", "Assign roles", "Full CRUD on all data", "System configuration"],
  },
  {
    name: "Manager",
    value: "manager",
    icon: Briefcase,
    color: "default" as const,
    description: "Manage operations. Can oversee stock, transactions, and team members.",
    permissions: ["View all data", "Manage stock", "Manage transactions", "View reports"],
  },
  {
    name: "Office Manager",
    value: "office_manager",
    icon: Users,
    color: "secondary" as const,
    description: "Handle office operations. Can manage daily transactions and inventory.",
    permissions: ["Manage stock", "Create transactions", "View reports", "Limited user access"],
  },
  {
    name: "Employee",
    value: "employee",
    icon: User,
    color: "outline" as const,
    description: "Basic access. Can view information and create transactions.",
    permissions: ["View stock", "Create transactions", "View own data"],
  },
];

const RoleHierarchyCard = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Role Hierarchy & Permissions
        </CardTitle>
        <CardDescription>
          User roles define what actions users can perform in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.value}
                className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <Badge variant={role.color}>{role.name}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {role.description}
                </p>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-foreground mb-2">
                    Key Permissions:
                  </p>
                  {role.permissions.map((permission, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                      <span className="text-primary">•</span>
                      {permission}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleHierarchyCard;

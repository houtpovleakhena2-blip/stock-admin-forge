import { Home, Package, BarChart3, Users, Receipt, Lock, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Manage Stock", icon: Package, path: "/stock" },
  { title: "Reports & Charts", icon: BarChart3, path: "/reports" },
  { title: "Manage Users", icon: Users, path: "/users" },
  { title: "Transactions", icon: Receipt, path: "/transactions" },
  { title: "Change Password", icon: Lock, path: "/password" },
  { title: "Logout", icon: LogOut, path: "/logout" },
];

const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-primary min-h-screen shadow-lg">
      <nav className="py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className="flex items-center gap-3 px-6 py-3 text-primary-foreground/80 hover:bg-accent hover:text-primary-foreground transition-all duration-200"
                activeClassName="bg-accent text-primary-foreground font-medium"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;

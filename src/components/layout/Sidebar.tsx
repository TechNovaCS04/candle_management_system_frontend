import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Boxes,
  Factory,
  ShoppingCart,
  Users,
  Truck,
  UserSquare2,
  Wallet,
  X,
} from "lucide-react";
import logo from "../../assets/logo.png";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/products", label: "Products", icon: Package },
  { to: "/raw-materials", label: "Raw Materials", icon: Boxes },
  { to: "/production", label: "Production", icon: Factory },
  { to: "/sales", label: "Sales", icon: ShoppingCart },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/suppliers", label: "Suppliers", icon: Truck },
  { to: "/employees", label: "Employees", icon: UserSquare2 },
  { to: "/finance", label: "Finance", icon: Wallet },
  {to: "/reports", label: "Reports", icon: LayoutDashboard },
  {to: "/settings", label: "Settings", icon: UserSquare2 },

];

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-bronze-900/50 z-40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-bronze-900 flex flex-col z-50 transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="relative flex items-center justify-center px-5 h-24 border-b border-bronze-800/60 flex-shrink-0">
          <img src={logo} alt="Sangeetha Candles" className="h-16 w-auto object-contain" />
          <button
            onClick={onCloseMobile}
            className="lg:hidden absolute right-2 top-5 -translate-y-1/2 text-bronze-200 hover:text-cream-50 p-1"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-bronze-700 text-cream-50"
                    : "text-bronze-200 hover:bg-bronze-800 hover:text-cream-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-bronze-300 rounded-r-full" />
                  )}
                  <Icon size={18} strokeWidth={1.8} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-bronze-800/60 flex-shrink-0">
          <p className="text-xs text-bronze-300/70 leading-relaxed">
            Sangeetha Candles System
            <br />
            Built by TechNova
          </p>
        </div>
      </aside>
    </>
  );
}
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown, LogOut, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../reducers/authSlice";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const admin = useAppSelector((s) => s.auth.admin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  const initials = admin?.fullName
    ? admin.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "AD";

  return (
    <header className="sticky top-0 z-30 h-16 bg-cream-50/95 backdrop-blur-sm border-b border-wax-200 flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-bronze-600 hover:bg-wax-100 p-1.5 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="relative max-w-xs w-full hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-bronze-300" />
          <input
            placeholder="Search anything..."
            className="w-full rounded-lg border border-wax-200 bg-cream-100 pl-9 pr-3 py-2 text-sm placeholder:text-bronze-300 focus:outline-none focus:ring-2 focus:ring-bronze-300 focus:bg-cream-50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          className="relative text-bronze-500 hover:bg-wax-100 p-2 rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-ember-500 rounded-full" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-wax-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-bronze-500 flex items-center justify-center text-cream-50 text-xs font-semibold flex-shrink-0">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-bronze-900 leading-tight">{admin?.fullName || "Admin"}</p>
              <p className="text-xs text-bronze-400 leading-tight">{admin?.email || "admin@sangeethacandles.lk"}</p>
            </div>
            <ChevronDown size={14} className="text-bronze-400 hidden sm:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-cream-50 border border-wax-200 rounded-xl shadow-lg py-1.5 z-50">
              <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-bronze-700 hover:bg-wax-100 transition-colors">
                <User size={15} />
                My Profile
              </button>
              <div className="h-px bg-wax-200 my-1" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-ember-600 hover:bg-ember-100 transition-colors"
              >
                <LogOut size={15} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

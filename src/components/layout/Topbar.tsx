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
    <header className="topbar sticky top-0 z-30 h-16 flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-icon hover:bg-surface-hover p-1.5 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="relative max-w-xs w-full hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-muted" />
          <input
            placeholder="Search anything..."
            className="field pl-9 pr-3 py-2 bg-surface-muted focus:bg-surface-elevated"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          className="relative text-brand-hover hover:bg-surface-hover p-2 rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-surface-hover transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-text-inverse text-xs font-semibold flex-shrink-0">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-text-body leading-tight">{admin?.fullName || "Admin"}</p>
              <p className="text-xs text-text-subtle leading-tight">{admin?.email || "admin@sangeethacandles.lk"}</p>
            </div>
            <ChevronDown size={14} className="text-text-subtle hidden sm:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 panel shadow-lg py-1.5 z-50">
              <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-body hover:bg-surface-hover transition-colors">
                <User size={15} />
                My Profile
              </button>
              <div className="h-px bg-border-strong my-1" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-danger hover:bg-danger-bg transition-colors"
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

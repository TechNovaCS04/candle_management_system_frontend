import type { ReactNode } from "react";
import {
  Package,
  Factory,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import logo from "../../assets/logo.png";
import authIllustration from "../../assets/auth-candle-management.png";

const features = [
  { icon: Package, title: "Inventory" },
  { icon: Factory, title: "Production" },
  { icon: TrendingUp, title: "Sales & finance" },
  { icon: ShieldCheck, title: "Secure access" },
];

export default function AuthLayout({
  children,
  title,
  subtitle,
  footer,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
  footer?: ReactNode;
}) {
  return (
    <div className="auth-shell">
      <aside className="auth-brand-panel">
        <div className="auth-brand-glow w-72 h-72 bg-bronze-300 -top-16 -left-16" />
        <div className="auth-brand-glow w-96 h-96 bg-bronze-500 bottom-0 right-0 translate-x-1/4 translate-y-1/4" />

        <div className="auth-brand-content">
          <div className="auth-brand-intro">
            <p className="text-bronze-100/80 text-xs font-semibold uppercase tracking-widest mb-2">
              Management Portal
            </p>
            <h2 className="font-display text-2xl xl:text-3xl leading-snug font-medium mb-2">
              Run your candle business
              <span className="text-bronze-100"> from one place.</span>
            </h2>
            <p className="text-bronze-100/70 text-xs xl:text-sm leading-relaxed max-w-md">
              Inventory, production, sales, and finances in one workspace.
            </p>
          </div>

          <div className="auth-hero-image hidden lg:block">
            <img
              src={authIllustration}
              alt="Candle workshop inventory and production management"
              className="auth-hero-img"
            />
          </div>

          <div className="auth-feature-grid hidden lg:grid">
            {features.map(({ icon: Icon, title: featureTitle }) => (
              <div key={featureTitle} className="auth-feature-item">
                <div className="auth-feature-icon">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <p className="text-sm font-semibold text-cream-50 leading-tight">{featureTitle}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="auth-brand-footer">
          © {new Date().getFullYear()} Sangeetha Candles · Built by TechNova
        </p>
      </aside>

      <div className="auth-form-panel">
        <div className="auth-form-bg" />

        <div className="auth-form-wrap">
          <div className="auth-hero-image lg:hidden mb-5 w-full">
            <img
              src={authIllustration}
              alt="Candle workshop inventory and production management"
              className="auth-hero-img-mobile"
            />
          </div>

          <div className="auth-card w-full">
            <div className="auth-card-accent" />

            <div className="auth-card-inner">
              <header className="auth-card-header">
                <img src={logo} alt="Sangeetha Candles" className="auth-card-logo" />
                <span className="auth-card-badge">Administrator Portal</span>
                <h1 className="auth-card-title">{title}</h1>
                <p className="auth-card-subtitle">{subtitle}</p>
              </header>

              <div className="auth-card-form">{children}</div>

              {footer && <footer className="auth-card-footer">{footer}</footer>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

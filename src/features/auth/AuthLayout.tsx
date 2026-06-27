import type { ReactNode } from "react";
import logo from "../../assets/logo.png";

export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-h-screen flex bg-cream-100">
      {/* Left brand panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-[42%] relative bg-bronze-900 flex-col justify-between p-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #C98A4B 0%, transparent 45%), radial-gradient(circle at 80% 75%, #B5651D 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10">
          <h2 className="font-display text-3xl leading-tight text-cream-50 font-medium mb-4">
            Hand-poured care,
            <br />
            managed with ease.
          </h2>
          <p className="text-bronze-100/70 text-sm leading-relaxed max-w-sm">
            From raw wax to the customer's doorstep — track inventory,
            production batches, sales and finances, all in one warm workspace.
          </p>
        </div>

        <p className="relative z-10 text-xs text-bronze-100/50">
          © {new Date().getFullYear()} Sangeetha Candles. Administrator Portal.
        </p>
      </div>

      {/* Right form panel — logo shown above the form at every screen size */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <img
              src={logo}
              alt="Sangeetha Candles"
              className="h-20 w-auto object-contain"
            />
          </div>

          <h1 className="font-display text-2xl font-semibold text-bronze-900 mb-1.5 text-center">
            {title}
          </h1>
          <p className="text-sm text-bronze-500 mb-7 text-center">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
}
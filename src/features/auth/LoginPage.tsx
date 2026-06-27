import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "./AuthLayout";
import { Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAppDispatch } from "../../app/hooks";
import { loginSuccess } from "../../reducers/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  function validate() {
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address";
    if (!password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setAuthError("");
    if (!validate()) return;

    setIsSubmitting(true);
    // Mock auth — replace with real API call once backend auth endpoint is ready.
    setTimeout(() => {
      setIsSubmitting(false);
      if (password.length < 6) {
        setAuthError("Incorrect email or password.");
        return;
      }
      dispatch(
        loginSuccess({
          admin: { adminId: "ADM-0001", email, fullName: "Admin User" },
          token: "mock-jwt-token",
        })
      );
      navigate("/dashboard");
    }, 600);
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to manage your candle business.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
          autoComplete="email"
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
            autoComplete="current-password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-[40px] text-bronze-300 hover:text-bronze-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        <div className="flex items-center justify-between -mt-1">
          <label className="flex items-center gap-2 text-sm text-bronze-600 cursor-pointer">
            <input type="checkbox" className="rounded border-wax-300 text-bronze-500 focus:ring-bronze-300" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-bronze-600 hover:text-bronze-800">
            Forgot password?
          </Link>
        </div>

        {authError && (
          <p className="text-sm text-ember-500 bg-ember-100 rounded-lg px-3 py-2">{authError}</p>
        )}

        <Button type="submit" fullWidth size="md" disabled={isSubmitting} className="mt-1" icon={<Mail size={16} />}>
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="text-sm text-bronze-500 text-center mt-7">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-bronze-700 hover:text-bronze-900">
          Sign up
        </Link>
      </p>

      <div className="flex items-center gap-2 mt-6 text-bronze-300">
        <Lock size={12} />
        <span className="text-xs">Secured administrator access only</span>
      </div>
    </AuthLayout>
  );
}

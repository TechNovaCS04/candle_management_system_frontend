import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Lock, ArrowRight } from "lucide-react";
import AuthLayout from "./AuthLayout";
import PasswordField from "./PasswordField";
import { Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAppDispatch } from "../../app/hooks";
import { loginSuccess } from "../../reducers/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage inventory, production, and sales."
      footer={
        <>
          <p className="text-sm text-text-muted text-center">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="auth-link">
              Create account
            </Link>
          </p>
          <div className="auth-trust-badge">
            <Lock size={14} />
            <span>Secured management access</span>
          </div>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="admin@sangeethacandles.lk"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
          autoComplete="email"
          className="auth-field"
        />

        <PasswordField
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          placeholder="Enter your password"
          required
          autoComplete="current-password"
          inputClassName="auth-field"
        />

        <div className="auth-form-row">
          <label className="auth-checkbox">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="auth-inline-link">
            Forgot password?
          </Link>
        </div>

        {authError && <p className="auth-alert-error">{authError}</p>}

        <Button
          type="submit"
          fullWidth
          size="md"
          disabled={isSubmitting}
          className="auth-submit"
          icon={isSubmitting ? <LogIn size={18} /> : <ArrowRight size={18} />}
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
}

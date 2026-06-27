import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, ArrowRight } from "lucide-react";
import AuthLayout from "./AuthLayout";
import PasswordField from "./PasswordField";
import { Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAppDispatch } from "../../app/hooks";
import { loginSuccess } from "../../reducers/authSlice";

interface FormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function passwordStrengthLevel(password: string) {
  if (!password) return 0;
  if (password.length < 6) return 1;
  if (password.length < 10) return 2;
  return 3;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate() {
    const next: Partial<FormState> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!form.password) next.password = "Password is required";
    else if (form.password.length < 6) next.password = "Use at least 6 characters";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      dispatch(
        loginSuccess({
          admin: { adminId: "USER-0002", email: form.email, fullName: form.fullName },
          token: "mock-jwt-token",
        })
      );
      navigate("/dashboard");
    }, 700);
  }

  const strength = passwordStrengthLevel(form.password);

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register to access the candle management portal."
      footer={
        <p className="text-sm text-text-muted text-center">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <div className="auth-form-grid">
          <Input
            label="Full name"
            name="fullName"
            placeholder="Your full name"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            error={errors.fullName}
            required
            autoComplete="name"
            className="auth-field"
          />

          <Input
            label="Email address"
            type="email"
            name="email"
            placeholder="admin@sangeethacandles.lk"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            error={errors.email}
            required
            autoComplete="email"
            className="auth-field"
          />
        </div>

        <PasswordField
          label="Password"
          name="password"
          value={form.password}
          onChange={(v) => update("password", v)}
          error={errors.password}
          placeholder="Create a password"
          required
          autoComplete="new-password"
          inputClassName="auth-field"
        />

        {form.password.length > 0 && (
          <div className="auth-strength" aria-hidden>
            <div className="auth-strength-bars">
              {[1, 2, 3].map((level) => (
                <span
                  key={level}
                  className={`auth-strength-bar ${
                    strength >= level
                      ? strength === 1
                        ? "auth-strength-bar-weak"
                        : strength === 2
                          ? "auth-strength-bar-good"
                          : "auth-strength-bar-strong"
                      : ""
                  }`}
                />
              ))}
            </div>
            <span className="auth-strength-label">
              {strength === 1 ? "Weak" : strength === 2 ? "Good" : "Strong"}
            </span>
          </div>
        )}

        <PasswordField
          label="Confirm password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={(v) => update("confirmPassword", v)}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          required
          autoComplete="new-password"
          inputClassName="auth-field"
        />

        <p className="auth-note">
          For authorized business management use only.
        </p>

        <Button
          type="submit"
          fullWidth
          size="md"
          disabled={isSubmitting}
          className="auth-submit"
          icon={isSubmitting ? <UserPlus size={18} /> : <ArrowRight size={18} />}
        >
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}

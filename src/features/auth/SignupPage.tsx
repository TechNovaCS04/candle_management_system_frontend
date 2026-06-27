import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import AuthLayout from "./AuthLayout";
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

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
    // Mock registration — replace with POST /api/admin/register once backend is ready.
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

  return (
    <AuthLayout title="Create administrator account" subtitle="Set up access to the Sangeetha Candles admin portal.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Full name"
          name="fullName"
          placeholder="Enter your full name"
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          error={errors.fullName}
          required
          autoComplete="name"
        />


        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
          required
          autoComplete="email"
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            error={errors.password}
            required
            autoComplete="new-password"
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

        <Input
          label="Confirm password"
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChange={(e) => update("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          required
          autoComplete="new-password"
        />

        <Button type="submit" fullWidth size="md" disabled={isSubmitting} className="mt-1" icon={<UserPlus size={16} />}>
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="text-sm text-bronze-500 text-center mt-7">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-bronze-700 hover:text-bronze-900">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

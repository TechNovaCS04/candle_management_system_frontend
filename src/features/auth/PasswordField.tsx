import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../../components/ui/Input";

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  hint?: string;
  inputClassName?: string;
}

export default function PasswordField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder = "Enter your password",
  autoComplete,
  required,
  hint,
  inputClassName = "",
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        label={label}
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
        hint={hint}
        required={required}
        autoComplete={autoComplete}
        className={`pr-11 ${inputClassName}`.trim()}
      />
      <button
        type="button"
        onClick={() => setShowPassword((v) => !v)}
        className="password-toggle"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

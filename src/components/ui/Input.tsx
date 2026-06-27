import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-bronze-800">
            {label}
            {props.required && <span className="text-ember-500 ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-lg border bg-cream-50 px-3.5 py-2.5 text-sm text-bronze-900 placeholder:text-bronze-300 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-300 ${
            error ? "border-ember-500" : "border-wax-200 focus:border-bronze-400"
          } ${className}`}
          {...props}
        />
        {hint && !error && <span className="text-xs text-bronze-400">{hint}</span>}
        {error && <span className="text-xs text-ember-500">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", id, ...props }, ref) => {
    const selectId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-bronze-800">
            {label}
            {props.required && <span className="text-ember-500 ml-0.5">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full rounded-lg border bg-cream-50 px-3.5 py-2.5 text-sm text-bronze-900 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-300 ${
            error ? "border-ember-500" : "border-wax-200 focus:border-bronze-400"
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-ember-500">{error}</span>}
      </div>
    );
  }
);
Select.displayName = "Select";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const textareaId = id || props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-bronze-800">
            {label}
            {props.required && <span className="text-ember-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full rounded-lg border bg-cream-50 px-3.5 py-2.5 text-sm text-bronze-900 placeholder:text-bronze-300 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-300 resize-none ${
            error ? "border-ember-500" : "border-wax-200 focus:border-bronze-400"
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-ember-500">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

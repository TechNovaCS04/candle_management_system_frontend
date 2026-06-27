/**
 * Theme reference — semantic tokens are defined in src/index.css (@theme).
 * Use Tailwind classes (e.g. bg-surface, text-brand) in components.
 */
export const theme = {
  surface: {
    DEFAULT: "surface",
    muted: "surface-muted",
    elevated: "surface-elevated",
    hover: "surface-hover",
  },
  text: {
    DEFAULT: "text",
    body: "text-body",
    muted: "text-muted",
    subtle: "text-subtle",
    inverse: "text-inverse",
  },
  brand: {
    DEFAULT: "brand",
    hover: "brand-hover",
    active: "brand-active",
    light: "brand-light",
    subtle: "brand-subtle",
  },
  icon: {
    DEFAULT: "icon",
    muted: "icon-muted",
    inverse: "icon-inverse",
  },
  nav: {
    hover: "nav-hover",
    active: "nav-active",
  },
  border: {
    DEFAULT: "border",
    strong: "border-strong",
  },
  status: {
    success: { bg: "success-bg", text: "success-text" },
    warning: { bg: "warning-bg", text: "warning-text" },
    danger: { bg: "danger-bg", text: "danger-text" },
  },
} as const;

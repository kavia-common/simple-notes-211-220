import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

/**
 * PUBLIC_INTERFACE
 * Button component supporting variants, sizes, full-width, disabled, and loading state.
 * Accessible markup: uses aria-busy for loading and proper focus/hover styles.
 */
const VARIANT_STYLES = {
  primary: {
    background: "#3b82f6",
    color: "#fff",
    border: "1.5px solid #3b82f6",
    hoverBg: "#2563eb",
    focusRing: "#2563eb",
  },
  secondary: {
    background: "#64748b",
    color: "#fff",
    border: "1.5px solid #64748b",
    hoverBg: "#475569",
    focusRing: "#475569",
  },
  success: {
    background: "#06b6d4",
    color: "#fff",
    border: "1.5px solid #06b6d4",
    hoverBg: "#0891b2",
    focusRing: "#0891b2",
  },
  danger: {
    background: "hsl(0 84% 60%)",
    color: "#fff",
    border: "1.5px solid hsl(0 84% 60%)",
    hoverBg: "hsl(0 74% 54%)",
    focusRing: "hsl(0 74% 54%)",
  },
};

const SIZE_STYLES = {
  sm: {
    fontSize: "0.95rem",
    padding: "7px 14px",
    minWidth: "68px",
    borderRadius: "7px"
  },
  md: {
    fontSize: "1.07rem",
    padding: "12px 22px",
    minWidth: "88px",
    borderRadius: "8px"
  },
  lg: {
    fontSize: "1.21rem",
    padding: "16px 29px",
    minWidth: "110px",
    borderRadius: "10px"
  },
};

/**
 * Generate inline style object for current button state.
 */
function getButtonStyles({ variant, size, fullWidth, disabled, loading }) {
  const v = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  const s = SIZE_STYLES[size] || SIZE_STYLES.md;
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: fullWidth ? "100%" : "auto",
    background: v.background,
    color: v.color,
    border: v.border,
    borderRadius: s.borderRadius,
    fontSize: s.fontSize,
    fontWeight: 600,
    letterSpacing: "0.03em",
    padding: s.padding,
    minWidth: s.minWidth,
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled || loading ? 0.56 : 1,
    pointerEvents: disabled ? "none" : undefined,
    transition: "background 0.13s, border 0.13s, box-shadow 0.14s, color 0.14s",
    outline: "none",
    position: "relative",
    userSelect: "none",
    boxShadow: "0 2px 7px rgba(59,130,246,0.07)"
  };
}

function getButtonHoverStyles(variant) {
  const v = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  return {
    background: v.hoverBg,
    borderColor: v.hoverBg,
    color: "#fff"
  };
}
function getButtonFocusStyles(variant) {
  const v = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  return {
    boxShadow: `0 0 0 2.2px ${v.focusRing}`,
    borderColor: v.focusRing
  };
}

// PUBLIC_INTERFACE
function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  children,
  style = {},
  className = "",
  ...props
}) {
  const [isHovered, setHovered] = React.useState(false);
  const [isFocused, setFocused] = React.useState(false);

  const baseStyle = getButtonStyles({ variant, size, fullWidth, disabled, loading });
  const hoverStyle = isHovered ? getButtonHoverStyles(variant) : {};
  const focusStyle = isFocused ? getButtonFocusStyles(variant) : {};

  // Show spinner when loading
  const spinner = (
    <span
      style={{
        border: "2.2px solid #fff",
        borderRightColor: "transparent",
        borderRadius: "50%",
        width: "1em",
        height: "1em",
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: "8px",
        animation: "spin 0.6s linear infinite"
      }}
      aria-hidden="true"
    />
  );

  return (
    <button
      type="button"
      className={`custom-btn${className ? " " + className : ""}`}
      style={{ ...baseStyle, ...hoverStyle, ...focusStyle, ...(style || {}) }}
      disabled={disabled || loading}
      aria-busy={loading}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    >
      {loading && spinner}
      <span style={{ opacity: loading ? 0.7 : 1 }}>
        {children}
      </span>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </button>
  );
}

// PropTypes for documentation and error checking
Button.propTypes = {
  /** The color variant of the button */
  variant: PropTypes.oneOf(["primary", "secondary", "success", "danger"]),
  /** The size of the button */
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  /** Make the button width 100% of its container */
  fullWidth: PropTypes.bool,
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Whether to show a loading spinner, disables the button as well */
  loading: PropTypes.bool,
  /** Button text or elements */
  children: PropTypes.node,
  /** Additional CSS-in-JS or className */
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Button;

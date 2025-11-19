import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

/**
 * PUBLIC_INTERFACE
 * Button component: neutral by default, gentle accent variants (primary, secondary, success, danger).
 * Prop supports: variants, sizes, fullWidth, disabled, loading.
 * Accessible: aria-busy when loading, focus outlines, proper roles.
 */
const VARIANT_CLASS = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  danger: "danger",
  neutral: "", // maps to the default/gray/neutral look
};

const SIZE_CLASS = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

/**
 * PUBLIC_INTERFACE
 * Button React component for clean, modern, accessible buttons with subtle variants.
 */
function Button({
  variant = "neutral",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  children,
  style = {},
  className = "",
  ...props
}) {
  // Styles and classes
  const variantClass = VARIANT_CLASS[variant] || ""; // fallback to neutral
  const sizeClass = SIZE_CLASS[size] || "md";
  const classes = [
    "custom-btn",
    variantClass,
    sizeClass,
    fullWidth ? "fullWidth" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  // Spinner Element
  const spinner = (
    <span
      style={{
        border: "2.2px solid #adb9c9",
        borderTop: `2.2px solid ${
          variant === "primary"
            ? "#fff"
            : variant === "success"
            ? "#fff"
            : variant === "secondary"
            ? "#64748b"
            : variant === "danger"
            ? "#fff"
            : "#9baaac"
        }`,
        borderRadius: "50%",
        width: "1.05em",
        height: "1.05em",
        display: "inline-block",
        marginRight: "8px",
        verticalAlign: "middle",
        animation: "subtleSpin 0.7s linear infinite",
        boxSizing: "border-box",
      }}
      aria-hidden="true"
    />
  );

  return (
    <button
      type="button"
      className={classes}
      style={style}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && spinner}
      <span style={{ opacity: loading ? 0.76 : 1 }}>{children}</span>
    </button>
  );
}

// PropTypes for documentation and error checking
Button.propTypes = {
  /** The color variant of the button */
  variant: PropTypes.oneOf([
    "neutral", // default
    "primary",
    "secondary",
    "success",
    "danger",
  ]),
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

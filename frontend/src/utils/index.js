//
// Utility functions for the Simple Notes app
//

// PUBLIC_INTERFACE
/**
 * Conditionally join class names. Like clsx or classNames.
 * Usage: cn('foo', condition && 'bar', ...)
 */
export function cn(...args) {
  /** Returns a space-separated string of valid (truthy) classNames. */
  return args
    .filter(Boolean) // omit false, null, undefined, 0, ''
    .join(" ");
}

// PUBLIC_INTERFACE
/**
 * Simple unique ID generator (e.g., for note IDs).
 */
export function uid(prefix = "id") {
  // Uses Date.now() and random for uniqueness. No collisions in local-only scenarios.
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// PUBLIC_INTERFACE
/**
 * Local storage helpers with JSON safety and namespacing.
 * Key will always be prefixed with 'simple-notes:'.
 */
const NAMESPACE = "simple-notes:";

export function setItem(key, value) {
  try {
    window.localStorage.setItem(NAMESPACE + key, JSON.stringify(value));
  } catch (err) {
    // ignore in private mode or full storage
  }
}

// PUBLIC_INTERFACE
export function getItem(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(NAMESPACE + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

// PUBLIC_INTERFACE
export function removeItem(key) {
  try {
    window.localStorage.removeItem(NAMESPACE + key);
  } catch (err) {
    // ignore
  }
}

// PUBLIC_INTERFACE
/**
 * Format date in YYYY-MM-DD or friendly output.
 */
export function formatDate(date, opts = { human: false }) {
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    if (!(d instanceof Date) || isNaN(d)) return "";
    if (opts.human)
      return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    return d.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

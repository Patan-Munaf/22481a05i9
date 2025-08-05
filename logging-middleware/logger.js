/**
 * Logging Middleware
 * Sends structured log data to the AffordMed test server logging API.
 * Must be called wherever logging is needed in your app.
 */

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

/**
 * Possible values for log attributes (must be lowercase)
 */
const VALID_STACKS = ["backend", "frontend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const VALID_PACKAGES = [
  "cache", "controller", "cron_job", "db", "domain", 
  "handler", "repository", "route", "service", // Backend only
  "api", // Frontend only
  "component", "hook", "page", "state", "style", // Frontend only
  "auth", "config", "middleware", "utils" // Both
];

/**
 * Log an event by sending a POST request to the log API.
 * @param {Object} params - Parameters for the log entry.
 * @param {string} params.stack - Must be "backend" or "frontend".
 * @param {string} params.level - One of the valid log levels.
 * @param {string} params.package - One of the valid packages.
 * @param {string} params.message - Descriptive log message.
 * @param {string} params.token - Authorization token for API access.
 */
export async function logEvent({ stack, level, package: pkg, message, token }) {
  // Validate inputs before sending
  if (!VALID_STACKS.includes(stack.toLowerCase())) {
    throw new Error(`Invalid stack value '${stack}'. Must be 'backend' or 'frontend'.`);
  }
  if (!VALID_LEVELS.includes(level.toLowerCase())) {
    throw new Error(`Invalid level value '${level}'. Must be one of ${VALID_LEVELS.join(", " )}.`);
  }
  if (!VALID_PACKAGES.includes(pkg.toLowerCase())) {
    throw new Error(`Invalid package value '${pkg}'. Must be one of ${VALID_PACKAGES.join(", " )}.`);
  }
  if (!token) {
    throw new Error("Authorization token is required.");
  }

  // Prepare payload
  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message
  };

  try {
    // Send log to server
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to send log:", await response.text());
    }
  } catch (error) {
    // Silently fail to avoid disrupting app usability
  }
}
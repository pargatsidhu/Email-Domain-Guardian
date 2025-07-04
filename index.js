// index.js

/**
 * Extracts the domain from an email address.
 * @param {string} email - The email address.
 * @returns {string|null} The domain or null if the email is invalid.
 */
function getDomain(email) {
  if (typeof email !== 'string' || email.indexOf('@') === -1) {
    return null;
  }
  return email.split('@')[1];
}

/**
 * Validates an email address against allow and disallow lists of domains.
 *
 * @param {string} email - The email address to validate.
 * @param {object} options - The validation options.
 * @param {string[]} [options.allow] - A list of allowed domains. If provided, the email's domain must be in this list.
 * @param {string[]} [options.disallow] - A list of disallowed domains. The email's domain must not be in this list.
 * @returns {boolean} - True if the email domain is valid according to the rules, false otherwise.
 */
function validate(email, options = {}) {
  const domain = getDomain(email);

  if (!domain) {
    return false; // Invalid email format
  }

  const { allow, disallow } = options;

  // Rule 1: Check against the disallow list first (it takes precedence).
  if (disallow && Array.isArray(disallow) && disallow.includes(domain)) {
    return false;
  }

  // Rule 2: Check against the allow list.
  if (allow && Array.isArray(allow) && !allow.includes(domain)) {
    return false;
  }

  // If it passes all checks, it's valid.
  return true;
}

module.exports = { validate };
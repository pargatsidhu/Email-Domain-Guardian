# Email Domain Guardian 🛡️

A simple, zero-dependency utility to validate email domains against allow and disallow lists.

[![NPM Version](https://img.shields.io/npm/v/email-domain-guardian.svg)](https://www.npmjs.com/package/email-domain-guardian).
![npm](https://img.shields.io/npm/dm/your-package-name)
![GitHub release](https://img.shields.io/github/v/release/pargatsidhu/Email-Domain-Guardian)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why?

This package is perfect for scenarios like user registration forms where you want to restrict sign-ups to specific corporate domains or block sign-ups from temporary email providers.

## Installation

```bash
npm install email-domain-guardian
```

## Usage

The package exports a single function, `validate`.

```javascript
const { validate } = require('email-domain-guardian');

// --- Example 1: Using an allow list ---
// Only allow signups from 'work.com' and 'partner.com'.
const allowOptions = {
  allow: ['work.com', 'partner.com']
};

console.log(validate('employee@work.com', allowOptions)); // true
console.log(validate('user@gmail.com', allowOptions));   // false

// --- Example 2: Using a disallow list ---
// Block common temporary email providers.
const disallowOptions = {
  disallow: ['tempmail.com', '10minutemail.com']
};

console.log(validate('user@gmail.com', disallowOptions));      // true
console.log(validate('spammer@tempmail.com', disallowOptions)); // false

// --- Example 3: Combined usage ---
// Disallow takes precedence over allow.
const combinedOptions = {
  allow: ['work.com', 'tempmail.com'],
  disallow: ['tempmail.com']
};

console.log(validate('user@tempmail.com', combinedOptions)); // false
```

## API

### `validate(email, options)`

-   **`email`** (`string`): The email address to validate.
-   **`options`** (`object`): An object containing the validation rules.
    -   **`options.allow`** (`string[]`, optional): A list of domains that are explicitly allowed. If this list is provided, an email is only valid if its domain is in this list.
    -   **`options.disallow`** (`string[]`, optional): A list of domains that are explicitly disallowed. If an email's domain is in this list, it is always invalid. This check runs before the `allow` check.
-   **Returns**: `boolean` - `true` if the email domain is valid, `false` otherwise.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT](LICENSE)

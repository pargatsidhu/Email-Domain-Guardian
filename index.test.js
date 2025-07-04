const { validate } = require('./index');

describe('domain-guardian', () => {
  // Test the 'allow' functionality
  describe('allow list', () => {
    const options = { allow: ['gmail.com', 'yahoo.com'] };

    test('should return true for an allowed domain', () => {
      expect(validate('test@gmail.com', options)).toBe(true);
    });

    test('should return false for a non-allowed domain', () => {
      expect(validate('test@hotmail.com', options)).toBe(false);
    });
  });

  // Test the 'disallow' functionality
  describe('disallow list', () => {
    const options = { disallow: ['hotmail.com', 'aol.com'] };

    test('should return true for a non-disallowed domain', () => {
      expect(validate('test@gmail.com', options)).toBe(true);
    });

    test('should return false for a disallowed domain', () => {
      expect(validate('test@hotmail.com', options)).toBe(false);
    });
  });

  // Test a combination of 'allow' and 'disallow'
  describe('combined allow and disallow lists', () => {
    const options = {
      allow: ['gmail.com', 'yahoo.com'],
      disallow: ['spam.com', 'junk.com'],
    };

    test('should return true for an allowed and not-disallowed domain', () => {
      expect(validate('user@gmail.com', options)).toBe(true);
    });

    test('should return false for a domain that is not in the allow list', () => {
      expect(validate('user@outlook.com', options)).toBe(false);
    });

    test('should return false for a disallowed domain, even if it were in an allow list', () => {
      const trickyOptions = {
        allow: ['gmail.com', 'spam.com'],
        disallow: ['spam.com'],
      };
      expect(validate('user@spam.com', trickyOptions)).toBe(false);
    });
  });

  // Test edge cases
  describe('edge cases', () => {
    test('should return true when no options are provided', () => {
      expect(validate('test@anydomain.com')).toBe(true);
    });

    test('should return false for an invalid email format', () => {
      expect(validate('invalid-email')).toBe(false);
    });

    test('should handle empty lists gracefully', () => {
      const options = { allow: [], disallow: [] };
      // With an empty allow list, nothing is allowed.
      expect(validate('test@gmail.com', { allow: [] })).toBe(false);
      // With an empty disallow list, nothing is disallowed.
      expect(validate('test@gmail.com', { disallow: [] })).toBe(true);
    });
  });
});
import { describe, expect, it } from 'vitest';
import { SITE_URL } from './config';

describe('SITE_URL', () => {
  it('is a valid HTTPS URL', () => {
    expect(() => new URL(SITE_URL)).not.toThrow();
    expect(new URL(SITE_URL).protocol).toBe('https:');
  });

  it('does not end with a trailing slash', () => {
    expect(SITE_URL.endsWith('/')).toBe(false);
  });
});

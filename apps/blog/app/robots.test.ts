import { describe, expect, it } from 'vitest';
import robots, { dynamic } from './robots';

describe('robots', () => {
  it('exports force-static for static export compatibility', () => {
    expect(dynamic).toBe('force-static');
  });

  it('allows all user agents', () => {
    const result = robots();
    expect(result.rules).toMatchObject({ userAgent: '*', allow: '/' });
  });

  it('includes sitemap URL', () => {
    const result = robots();
    expect(result.sitemap).toMatch(/sitemap\.xml$/);
  });
});

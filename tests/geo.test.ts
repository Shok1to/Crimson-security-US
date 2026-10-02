import { describe, it, expect, vi } from 'vitest';

// next/font only runs inside the Next compiler; the layout is imported here for its metadata.
vi.mock('next/font/google', () => ({
  Archivo: () => ({ variable: '' }),
  Inter: () => ({ variable: '' }),
}));

import { metadata as rootMetadata } from '@/app/layout';
import { metadata as privacyMetadata } from '@/app/privacy/page';
import { GET as llms } from '@/app/llms.txt/route';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { organizationJsonLd, pageJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { site } from '@/lib/site';

/** Search engines truncate past these; AI summarisers quote what they can read. */
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;

describe('metadata length limits', () => {
  it('keeps the home title and description inside the limits', () => {
    const t = rootMetadata.title as { default: string };
    expect(t.default.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(String(rootMetadata.description).length).toBeLessThanOrEqual(DESCRIPTION_MAX);
    expect(String(rootMetadata.description).length).toBeGreaterThanOrEqual(70);
  });

  it('keeps the privacy page inside the limits, including the title template', () => {
    const title = `${privacyMetadata.title} | ${site.name}`;
    expect(title.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(String(privacyMetadata.description).length).toBeLessThanOrEqual(DESCRIPTION_MAX);
  });
});

describe('robots and sitemap', () => {
  it('links the sitemap from robots and lists every page in it', () => {
    const r = robots();
    expect(r.sitemap).toBe(`${site.url}/sitemap.xml`);
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain(site.url);
    expect(urls).toContain(`${site.url}/privacy`);
  });
});

describe('llms.txt', () => {
  it('is plain text and carries the US facts, not the Canadian ones', async () => {
    const res = await llms();
    expect(res.headers.get('Content-Type')).toMatch(/text\/plain/);
    const body = await res.text();
    expect(body).toContain('Reston');
    expect(body).toContain(site.phone.display);
    expect(body).toContain(`${site.url}/sitemap.xml`);
    expect(body).not.toMatch(/canad|toronto|pipeda/i);
  });
});

describe('JSON-LD', () => {
  it('describes the US organisation and links the website to it', () => {
    expect(organizationJsonLd.address.addressCountry).toBe('US');
    expect(organizationJsonLd.address.addressRegion).toBe('VA');
    expect(websiteJsonLd.publisher['@id']).toBe(organizationJsonLd['@id']);
  });

  it('builds a WebPage and breadcrumb for an inner page', () => {
    const [page, crumbs] = pageJsonLd({ path: '/privacy', name: 'Privacy Policy', description: 'x' });
    expect(page['@type']).toBe('WebPage');
    expect(crumbs['@type']).toBe('BreadcrumbList');
  });
});

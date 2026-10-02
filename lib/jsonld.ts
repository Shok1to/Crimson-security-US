import { company, services, supportHours } from '@/lib/content';
import { site } from '@/lib/site';

/** Stable @id values, so every page's JSON-LD points at the same entities. */
export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ids.organization,
  name: site.name,
  legalName: 'Crimson Security Inc.',
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  logo: `${site.url}/icon.png`,
  image: `${site.url}/opengraph-image.png`,
  email: site.emails.info,
  telephone: site.phone.e164,
  foundingDate: String(company.established),
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.regionCode,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  },
  areaServed: [site.address.country, ...site.locations],
  knowsAbout: [...services.map((s) => s.title), 'PCI DSS', 'ISO 27002', 'HIPAA', 'GLBA', 'NIST 800-53'],
  hasCredential: company.certifications.map((name) => ({
    '@type': 'EducationalOccupationalCredential',
    name,
  })),
  /**
   * DERIVED, NOT STATED. These are published technical SUPPORT hours, not confirmed office hours.
   * Correct the values in lib/content.ts or delete this block if the real hours differ.
   */
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [...supportHours.days],
    opens: supportHours.opens,
    closes: supportHours.closes,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Information Security Services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.title, description: service.summary },
    })),
  },
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': ids.website,
  url: site.url,
  name: site.name,
  inLanguage: 'en-US',
  publisher: { '@id': ids.organization },
};

/** WebPage + BreadcrumbList for an inner page. */
export function pageJsonLd(opts: { path: string; name: string; description: string }) {
  const url = `${site.url}${opts.path}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: opts.name,
      description: opts.description,
      inLanguage: 'en-US',
      isPartOf: { '@id': ids.website },
      about: { '@id': ids.organization },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: opts.name, item: url },
      ],
    },
  ];
}

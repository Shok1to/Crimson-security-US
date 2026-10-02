import { company, differentiators, services } from '@/lib/content';
import { addressCityLine, site } from '@/lib/site';

/** Plain-text guide for LLMs and AI crawlers, per the llms.txt convention (llmstxt.org). */
export async function GET() {
  const serviceLines = services.map((s) => `- ${s.title}: ${s.summary}`).join('\n');
  const differentiatorLines = differentiators.map((d) => `- ${d.title}: ${d.description}`).join('\n');
  const locationLines = [`${site.address.street}, ${addressCityLine} (headquarters)`, ...site.locations].map((l) => `- ${l}`).join('\n');

  const body = `# ${site.name}

> ${site.description}

## Company
${site.name} Inc. is a US information security compliance and assessment firm, privately held and established in
${company.established}. It has been a PCI QSA company since ${company.qsaSince} and conducts ${company.assessmentsPerYear} assessments a year for clients
in ${company.industries.join(', ')}. Technicians hold ${company.certifications.join(', ')} certifications, and the owner is present
on assessments whenever possible. ${company.reportDelivery}

Headquarters and offices:
${locationLines}

Contact: ${site.emails.info} | ${site.phone.display}

## Services
${serviceLines}

## Why Crimson Security
${differentiatorLines}

## Pages
- [Home](${site.url}/): services, capabilities, company differentiators and the contact form.
- [Privacy Policy](${site.url}/privacy): how personal information submitted through this website is
  collected, used and protected.

## Resources
- [Sitemap](${site.url}/sitemap.xml)
- [Robots](${site.url}/robots.txt)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

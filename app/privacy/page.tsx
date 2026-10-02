import type { Metadata } from 'next';
import Link from 'next/link';
import AccentDivider from '@/components/AccentDivider';
import JsonLd from '@/components/JsonLd';
import { pageJsonLd } from '@/lib/jsonld';
import { addressCityLine, site, socialImageAlt } from '@/lib/site';

const TITLE = 'Privacy Policy';
const DESCRIPTION =
  'How Crimson Security collects, uses, shares and protects personal information submitted through this website, and the choices you have.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/privacy' },
  /**
   * Without these the root layout's blocks passed straight through, so a link
   * to this page previewed as the HOME page and linked there, while the
   * canonical above said /privacy. The two disagreed.
   *
   * Everything is restated on purpose. Next merges metadata per KEY, not per
   * field, so declaring either block replaces the parent's entirely — verified
   * against the built output, where an earlier version of this that set only
   * title, description and url silently dropped og:type, og:locale,
   * og:site_name and, worst, og:image. Declaring the block also suppresses the
   * inherited file-convention image, so the images array is not optional here:
   * without it this page previews with no image at all.
   *
   * twitter does NOT fall back to openGraph. Also verified: with openGraph
   * fixed and twitter left alone, twitter:title still carried the home page's
   * title.
   */
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
    title: `${TITLE} | ${site.name}`,
    description: DESCRIPTION,
    url: '/privacy',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: socialImageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | ${site.name}`,
    description: DESCRIPTION,
    images: [{ url: '/twitter-image.png', width: 1200, height: 630, alt: socialImageAlt }],
  },
};

/*
 * DRAFT policy text. It describes only what this site actually does today: a contact form,
 * a chat assistant powered by Anthropic's Claude, transactional email through Resend, and no
 * advertising or tracking cookies unless NEXT_PUBLIC_META_PIXEL_ID is set (see PIXEL_ENABLED
 * below). Carried over from the Canadian sibling and rewritten for a US audience, but NOT yet
 * reviewed against US state privacy law (e.g. CCPA/CPRA, Virginia VCDPA) — have counsel review it,
 * and update it if you add analytics, a CRM, or any other processing.
 */
const LAST_UPDATED = 'October 1, 2026';

/** The Meta Pixel is an advertising tracker; the policy must say so whenever it is switched on. */
const PIXEL_ENABLED = Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID);

const h2 = 'mt-12 font-display text-2xl font-bold text-silver-50';
const p = 'mt-4 leading-relaxed text-silver-300';
const li = 'leading-relaxed text-silver-300';

export default function PrivacyPage() {
  return (
    <div className="bg-ink-900">
      <JsonLd data={pageJsonLd({ path: '/privacy', name: TITLE, description: DESCRIPTION })} />
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-8">
        <p className="section-label">Legal</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-silver-50 sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-silver-500">Last updated: {LAST_UPDATED}</p>
        <AccentDivider className="mt-8" />

        <p className={p}>
          Crimson Security (&ldquo;Crimson Security&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your
          privacy. This policy explains what personal information we collect through this website, how we use
          it, and the choices you have. We handle personal information in accordance with the privacy laws
          that apply to us in the United States.
        </p>

        <h2 className={h2}>Information we collect</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-crimson-400">
          <li className={li}>
            <strong className="text-silver-100">Information you give us.</strong> When you use our contact
            form we collect your name, email address, and message, along with your company, phone number and
            the service you&apos;re interested in if you choose to provide them.
          </li>
          <li className={li}>
            <strong className="text-silver-100">Technical information.</strong> Like most websites, our
            hosting provider may automatically record technical data such as IP address, browser type, and
            pages requested in standard server logs.
          </li>
          <li className={li}>
            <strong className="text-silver-100">Chat assistant.</strong> Before the assistant will
            answer anything, we ask for your name, either an email address or a phone number, and
            your agreement that we may contact you about your enquiry. We process those details, a
            record of the consent you gave, and the messages you send.
          </li>
        </ul>
        {PIXEL_ENABLED ? (
          <p className={p}>
            This website uses the Meta Pixel, which may set cookies and send information about your visit
            (such as pages viewed and your IP address) to Meta for advertising measurement. You can block
            it with your browser&apos;s tracking-protection settings or an ad blocker.
          </p>
        ) : (
          <p className={p}>This website does not use advertising or cross-site tracking cookies.</p>
        )}

        <h2 className={h2}>How we use it</h2>
        <p className={p}>
          We use the information you send us to respond to your enquiry and to discuss potential services with
          you. Technical logs are used to keep the site secure and working properly. We do not sell your
          personal information.
        </p>

        <h2 className={h2}>Who we share it with</h2>
        <p className={p}>
          We share personal information only with service providers who help us operate this website and
          handle enquiries (for example, website hosting, email delivery, and the provider behind our chat
          assistant), and only as needed for those purposes. We may also disclose information where required
          by law.
        </p>
        <p className={p}>
          Some of these service providers may process information outside the United States. Where that
          happens, the information is subject to the laws of the country where it is processed. By sending us
          an enquiry or using the chat assistant, you agree to your information being handled this way.
        </p>

        <h2 className={h2}>Chat assistant</h2>
        <p className={p}>
          The assistant on this site is powered by Anthropic&apos;s Claude. Messages you send are
          transmitted to Anthropic as our service provider solely to generate a reply, and are not
          used to train their models. We do not store conversations on our servers; a conversation
          exists only in your browser while it is open.
        </p>
        <p className={p}>
          The assistant asks for your name and a way to reach you before it will answer a question.
          Those details are emailed to us with your first question, exactly as a contact-form
          submission would be, and are handled the same way. We also record the wording of the
          consent you agreed to and when you agreed to it, so what was asked and what was agreed are
          both clear. We use this only to reply to you.
        </p>
        <p className={p}>
          The consent box is never ticked for you, and the assistant is never the only way to reach
          us. If you would rather not give your details to it, the{' '}
          <Link
            href="/#contact"
            className="text-crimson-300 underline underline-offset-4 hover:text-silver-50"
          >
            contact form
          </Link>{' '}
          does the same job, and you can email or call us directly.
        </p>

        <h2 className={h2}>Retention and safeguards</h2>
        <p className={p}>
          We keep enquiry information only as long as needed to respond and to maintain our business records,
          and we use reasonable administrative and technical safeguards to protect it.
        </p>

        <h2 className={h2}>Your rights</h2>
        <p className={p}>
          You may ask to access the personal information we hold about you, ask us to correct it, or withdraw
          your consent to our use of it, subject to legal and contractual restrictions. Depending on where you
          live, your state may give you additional rights, such as to request deletion of your information. To make a request,
          email{' '}
          <a
            href={`mailto:${site.emails.info}`}
            className="text-crimson-300 underline underline-offset-4 hover:text-silver-50"
          >
            {site.emails.info}
          </a>{' '}
          or use the{' '}
          <Link
            href="/#contact"
            className="text-crimson-300 underline underline-offset-4 hover:text-silver-50"
          >
            contact form
          </Link>
          .
        </p>

        <h2 className={h2}>Contact us</h2>
        <address className={`${p} not-italic`}>
          {site.name}
          <br />
          {site.address.street}
          <br />
          {addressCityLine}
          <br />
          <a
            href={`mailto:${site.emails.info}`}
            className="text-crimson-300 underline underline-offset-4 hover:text-silver-50"
          >
            {site.emails.info}
          </a>
          <br />
          <a
            href={`tel:${site.phone.e164}`}
            className="text-crimson-300 underline underline-offset-4 hover:text-silver-50"
          >
            {site.phone.display}
          </a>
        </address>

        <h2 className={h2}>Changes to this policy</h2>
        <p className={p}>
          We may update this policy from time to time. The &ldquo;Last updated&rdquo; date above shows when it
          was last changed.
        </p>
      </article>
    </div>
  );
}

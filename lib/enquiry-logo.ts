/**
 * The brand mark, embedded in the message rather than hotlinked.
 *
 * A remote <img> fails in three situations that all matter here: a client that
 * blocks remote images (the default in many), a send from a local or preview
 * environment where site.url is not publicly reachable, and any moment before
 * the asset has actually been deployed. Embedding removes all three.
 *
 * Held as a constant rather than read from public/ at send time: files under
 * public/ are served statically but are not reliably present in a serverless
 * function's own filesystem, so reading it at runtime would work locally and
 * fail in production -- the worst possible split.
 *
 * Source: public/crimson-security-mark-email.png, 60x60. Regenerate both
 * together if the mark changes.
 */
export const LOGO_CONTENT_ID = 'crimson-mark';
export const LOGO_FILENAME = 'crimson-security.png';

/** Base64 PNG, 500 bytes decoded. */
export const LOGO_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAABu0lEQVR4nO2asUoDQRCGJ2csr1C08gFETbS1sBVbbW0tDIIPYGNn' +
  'LUKS5nwFEbEQC0vBWtGXULDXMzqDt3AM5LjAzW6YnQ8u7OUvZr/M3m0OrpWm6S9EhAlrx4S1Y8LaMWHtmLB2vAkPhgPYOj2G2Rae' +
  'lPjC6v29A7jMMjyTx4vw80ICbSbKGeU5dD4THMkiLnw9n8DyDA5qkG3uwPntHY7kEBd+W5ysa6vvI/yUI4iwk3rBjDffZVJ4F/7G' +
  'ahsf/1I8I9QJ/+DRLaR4RugTxmrdmDqcY7X1mIQJJ1WVSeFdmHQ6hRTPaCJrRSaFd+HoruGohV8xK//FLu/RUvgXxsPtwyHwL4zV' +
  'XIdD4F2YVN1dOgQm3DRcOLolHZ0wIb3XVmHCTcOFy/swzwjpH2OqhGki6h4eqJiT4hkRVYcJdcKEk6rKpDDhpuFS0S3p6IQJJ1WV' +
  'SWHCTcOlqNi4fZi+lX509C5MuC5WZVIEER5H+YYmhbjw1VwCK20c1OBm/whOLvo4kkNcmKjzygNNwl3bkngRJu53t2Hp8QH4AqeX' +
  'Wp7OhtA77OGZPN6EpwUT1o4Ja8eEtWPC2jFh7fwBvcMsNIBQDqgAAAAASUVORK5CYII=';

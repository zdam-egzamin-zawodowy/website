const SITE_URL =
  process.env.NEXT_PUBLIC_URL || 'https://zdamegzaminzawodowy.pl';

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml', '/404', '/pl', '/500'],
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_URL}/server-sitemap.xml`],
  },
};

const CDN = process.env.NEXT_PUBLIC_CDN_URI
  ? new URL(process.env.NEXT_PUBLIC_CDN_URI)
  : '';

module.exports = {
  i18n: {
    locales: ['pl'],
    defaultLocale: 'pl',
  },
  images: {
    domains: CDN instanceof URL ? ['localhost', CDN.hostname] : ['localhost'],
  },
  async headers() {
    return [
      {
        source: '/:all*(gif|jpe?g|tiff|png|webp|bmp|svg|ico)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2629746, must-revalidate',
          },
        ],
      },
    ];
  },
};

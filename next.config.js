module.exports = {
  i18n: {
    locales: ['pl'],
    defaultLocale: 'pl',
  },
  images: {
    domains: ['localhost', 'cdn.zdamegzaminzawodowy.pl'],
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

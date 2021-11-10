import * as Sentry from '@sentry/nextjs';

const initSentry = () => {
  const SENTRY_DSN =
    process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

  if (!SENTRY_DSN) {
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 0.3,
    environment: process.env.NODE_ENV ?? 'development',
    release:
      'zdam-egzamin-zawodowy-website@' +
      (process.env.NEXT_PUBLIC_VERSION ?? 'development'),
  });
};

initSentry();

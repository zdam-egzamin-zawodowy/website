import React from 'react';
import { useRouter } from 'next/router';
import { URL } from 'config/app';

import Head from 'next/head';

const NAME = 'Zdam Egzamin Zawodowy';
const DEFAULT_DESCRIPTION =
  'zdamegzaminzawodowy.pl to ogromny baza pytań z różnych egzaminów zawodowych. Pytania pochodzą z arkuszy z lat ubiegłych.';

export interface SEOProps {
  title?: string;
  description?: string;
}

const SEO = ({ title, description = DEFAULT_DESCRIPTION }: SEOProps) => {
  const { asPath } = useRouter();
  const formattedTitle = title ? `${title} | ${NAME}` : NAME;
  return (
    <Head>
      <title>{formattedTitle}</title>
      <link rel="canonical" href={URL + asPath} />
      <link rel="icon" href={URL + '/favicon.ico'} />
      <meta name="description" content={description} />
      <meta
        name="apple-touch-icon"
        content={`${URL}/images/logo-192x192.png`}
      />
      <meta property="og:site_name" content={NAME} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={URL + asPath} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${URL}/images/meta/zdam.png`} />
      <meta property="og:image:width" content={'1280'} />
      <meta property="og:image:height" content={'640'} />
      <meta property="og:locale" content="pl" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={URL + asPath} />
      <meta name="twitter:image" content={`${URL}/images/meta/zdam.png`} />
      <meta name="twitter:image:alt" content={NAME} />
    </Head>
  );
};

export default SEO;

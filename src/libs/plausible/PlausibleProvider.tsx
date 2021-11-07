import React, { PropsWithChildren } from 'react';
import PlausibleProvider from 'next-plausible';

type PlausibleProviderProps = PropsWithChildren<
  Partial<Parameters<typeof PlausibleProvider>[0]>
>;

const MyPlausibleProvider = ({ children, ...rest }: PlausibleProviderProps) => {
  return (
    <PlausibleProvider
      enabled={process.env.NEXT_PUBLIC_PLAUSIBLE_ENABLED === 'true'}
      domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? ''}
      customDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN}
      trackLocalhost={
        process.env.NEXT_PUBLIC_PLAUSIBLE_TRACK_LOCALHOST === 'true'
      }
      selfHosted={process.env.NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN !== ''}
      {...rest}
    >
      {children}
    </PlausibleProvider>
  );
};

export default MyPlausibleProvider;

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { Link as MUILink, LinkProps as MUILinkProps } from '@material-ui/core';

export type LinkProps = Omit<MUILinkProps, 'href'> &
  Pick<
    NextLinkProps,
    'href' | 'as' | 'replace' | 'scroll' | 'prefetch' | 'shallow' | 'locale'
  >;

const Link = ({
  href,
  as,
  replace,
  scroll,
  prefetch,
  shallow,
  locale,
  children,
  ...rest
}: LinkProps) => {
  if (
    typeof href === 'string' &&
    (href.match(/^([a-z0-9]*:|.{0})\/\/.*$/gim) ||
      href.substr(0, 7) === 'mailto:')
  ) {
    return (
      <MUILink href={href} {...rest}>
        {children}
      </MUILink>
    );
  }

  return (
    <NextLink
      passHref
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
      shallow={shallow}
      locale={locale}
    >
      <MUILink {...rest}>{children}</MUILink>
    </NextLink>
  );
};

export default Link;

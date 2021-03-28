import { resolveHref } from 'next/dist/next-server/lib/router/router';
import { UrlObject } from 'url';

const resolveAs = (url: UrlObject): string => resolveHref('', url, true)[1];

export default resolveAs;

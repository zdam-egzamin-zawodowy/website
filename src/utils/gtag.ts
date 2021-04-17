import { Event } from 'config/analytics';

type GTagFN = (
  type: 'event',
  event: Event,
  params: { [key: string]: string }
) => void;

interface customWindow extends Window {
  gtag: GTagFN;
}

declare const window: customWindow;

const gtag: GTagFN = (t, event, params) => {
  window.gtag(t, event, params);
};

export default gtag;

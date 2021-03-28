import React from 'react';
import { GOOGLE_PLAY_URL } from 'config/app';

import { Container, Typography } from '@material-ui/core';
import Link from 'common/Link/Link';
import Section, { BgColor } from 'common/Section/Section';

const CheckMobileApp = () => {
  return (
    <Section bgColor={BgColor.Primary}>
      <Container>
        <Typography align="center" gutterBottom variant="h3" component="h2">
          Nie zapomnij sprawdzić naszej aplikacji mobilnej!
        </Typography>
        <Typography align="center">
          <Link
            href={GOOGLE_PLAY_URL}
            title="Pobierz aplikację na Androida z Google Play"
          >
            <img
              style={{ width: '200px' }}
              src="/images/google-play-badge.svg"
              alt="Pobierz z Google Play"
            />
          </Link>
        </Typography>
      </Container>
    </Section>
  );
};

export default CheckMobileApp;

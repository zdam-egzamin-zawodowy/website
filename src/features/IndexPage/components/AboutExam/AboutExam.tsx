import React from 'react';

import { Container, Typography } from '@material-ui/core';
import Section, { Size } from 'common/Section/Section';

const AboutExam = () => {
  return (
    <Section size={Size.Medium}>
      <Container>
        <Typography align="center" variant="h2" gutterBottom>
          Czym jest egzamin zawodowy?
        </Typography>
        <Typography align="center" variant="h4">
          <strong>Egzamin zawodowy</strong> to egzamin, który obejmuje zakresem
          tematycznym jedną kwalifikację. Liczba dwuczęściowych egzaminów w
          danym zawodzie jest zależna od liczby kwalifikacji wyodrębnionych w
          podstawie programowej dla danego zawodu.
        </Typography>
      </Container>
    </Section>
  );
};

export default AboutExam;

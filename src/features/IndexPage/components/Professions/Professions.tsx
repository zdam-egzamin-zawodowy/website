import { Profession as ProfessionT } from 'libs/graphql';

import { Container, Typography } from '@material-ui/core';
import Section, { Size } from 'common/Section/Section';
import Profession from './Profession';

export interface ProfessionsProps {
  professions: ProfessionT[];
}

export const SECTION_ID = 'professions';

const Professions = ({ professions }: ProfessionsProps) => {
  return (
    <Section id={SECTION_ID} size={Size.Medium}>
      <Container>
        <Typography align="center" variant="h2" gutterBottom>
          Lista dostępnych zawodów i kwalifikacji
        </Typography>
        {professions.map(profession => {
          return <Profession profession={profession} key={profession.id} />;
        })}
      </Container>
    </Section>
  );
};

export default Professions;

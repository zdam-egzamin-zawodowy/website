import { polishPlurals } from 'polish-plurals';
import { useCountdown } from 'libs/hooks';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';
import Section from '../Section/Section';

export interface TimerProps {
  dateOfTheExam: Date | string;
}

const Timer = ({ dateOfTheExam }: TimerProps) => {
  const classes = useStyles();
  const { days, minutes, hours, seconds } = useCountdown(
    new Date(dateOfTheExam)
  );

  return (
    <Section className={classes.textAlignCenter}>
      <Container>
        <Typography variant="h2" gutterBottom>
          Do najbliższej sesji egzaminacyjnej pozostało
        </Typography>
        <Grid container spacing={2}>
          {[
            {
              number: days,
              text: polishPlurals('dzień', 'dni', 'dni', days),
            },
            {
              number: hours,
              text: polishPlurals('godzina', 'godziny', 'godzin', hours),
            },
            {
              number: minutes,
              text: polishPlurals('minuta', 'minuty', 'minut', minutes),
            },
            {
              number: seconds,
              text: polishPlurals('sekunda', 'sekundy', 'sekund', seconds),
            },
          ].map(({ number, text }) => (
            <Grid key={text} item xs={6} sm={3}>
              <Typography
                variant="h3"
                component="p"
                className={classes.number}
                gutterBottom
              >
                {number}
              </Typography>
              <Typography variant="h4" component="h3">
                {text}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

const useStyles = makeStyles(theme => ({
  textAlignCenter: {
    textAlign: 'center',
  },
  number: {
    padding: theme.spacing(2),
    border: `1px solid #fff`,
    borderRadius: 10,
    display: 'inline-block',
  },
}));

export default Timer;

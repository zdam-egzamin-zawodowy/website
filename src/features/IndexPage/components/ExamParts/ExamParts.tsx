import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Grid } from '@material-ui/core';
import Section, { Size } from '../Section/Section';

const ExamParts = () => {
  const classes = useStyles();
  return (
    <Section size={Size.Medium}>
      <Container>
        <Typography align="center" variant="h2" gutterBottom>
          Z czego składa się egzamin zawodowy?
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={classes.examPart}>
            <div className={classes.imageWrapper}>
              <Image
                src="/images/written-part.png"
                alt="Egzamin zawodowy - Część pisemna"
                width={608}
                height={408}
              />
            </div>
            <Typography variant="h4">Część pisemna</Typography>
            <Typography>
              Część pisemna jest przeprowadzana w formie testu pisemnego. Trwa
              60 minut i przeprowadzana jest w formie testu składającego się z
              40 zadań zamkniętych zawierających cztery odpowiedzi do wyboru, z
              których tylko jedna odpowiedź jest prawidłowa.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.examPart}>
            <div className={classes.imageWrapper}>
              <Image
                src="/images/practical-part.png"
                alt="Egzamin zawodowy - Część praktyczna"
                width={608}
                height={408}
              />
            </div>
            <Typography variant="h4">Część praktyczna</Typography>
            <Typography>
              Część praktyczna jest przeprowadzana w formie testu praktycznego i
              trwa nie krócej niż 120 minut i nie dłużej niż 240 minut. Egzamin
              polega na wykonaniu przez zdającego zadania egzaminacyjnego
              zawartego w arkuszu egzaminacyjnym na stanowisku egzaminacyjnym.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
};

const useStyles = makeStyles(theme => ({
  examPart: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
  imageWrapper: {
    width: '75%',
    margin: 'auto',
  },
}));

export default ExamParts;

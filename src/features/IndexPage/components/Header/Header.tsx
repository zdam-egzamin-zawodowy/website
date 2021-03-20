import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Toolbar,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <Toolbar />
      <Divider />
      <Container className={classes.container}>
        <div>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={7} xs={12}>
              <Typography gutterBottom variant="h1">
                Prosta droga do zdania egzaminu zawodowego
              </Typography>
              <Typography variant="h5">
                <strong>zdamegzaminzawodowy.pl</strong> to ogromna baza pytań z
                różnych egzaminów zawodowych. Pytania pochodzą z arkuszy z lat
                ubiegłych. Wyszukaj poniżej interesującą Cię kwalifikację i
                zacznij rozwiązywać testy!
              </Typography>
            </Grid>
            <Grid item md={5} xs={12} className={classes.imageWrapper}>
              <Image
                src="/images/checklist.png"
                alt="zdamegzaminzawodowy.pl - dużo prostsza droga do zdania egzaminu zawodowego"
                width={700}
                height={700}
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </header>
  );
};

const useStyles = makeStyles(theme => ({
  header: {
    color: theme.palette.common.white,
    position: 'relative',
    backgroundColor: theme.palette.primary.dark,
    // backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
    overflowX: 'hidden',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    minHeight: '75vh',
  },
  imageWrapper: {
    textAlign: 'center',
  },
}));

export default Header;

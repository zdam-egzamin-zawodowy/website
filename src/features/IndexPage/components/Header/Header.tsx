import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Toolbar, Grid, Typography } from '@material-ui/core';

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <Container className={classes.container}>
        <div>
          <Toolbar />
          <Grid container spacing={2} alignItems="center" wrap="wrap-reverse">
            <Grid item md={5} xs={12} className={classes.imageWrapper}>
              <Image
                src="/images/checklist.png"
                alt="zdamegzaminzawodowy.pl - dużo prostsza droga do zdania egzaminu zawodowego"
                width={500}
                height={500}
              />
            </Grid>
            <Grid item md={7} xs={12}>
              <Typography gutterBottom align="center" variant="h1">
                <strong>Dużo</strong> prostsza droga do zdania egzaminu
                zawodowego
              </Typography>
              <Typography variant="h5">
                <strong>zdamegzaminzawodowy.pl</strong> to ogromna baza pytań z
                różnych egzaminów zawodowych. Pytania pochodzą z arkuszy z lat
                ubiegłych. Wyszukaj poniżej interesującą Cię kwalifikację i
                zacznij rozwiązywać testy!
              </Typography>
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
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    minHeight: '80vh',
  },
  imageWrapper: {
    textAlign: 'center',
  },
}));

export default Header;

import { GOOGLE_PLAY_URL } from 'config/app';

import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Divider } from '@material-ui/core';
import Link from 'common/Link/Link';
import QualificationSelector, {
  QualificationSelectorProps,
} from './QualificationSelector';

interface HeaderProps {
  qualifications: QualificationSelectorProps['qualifications'];
}

const Header = ({ qualifications = [] }: HeaderProps) => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Divider />
      <Container className={classes.container}>
        <div>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={7} xs={12}>
              <Typography gutterBottom variant="h1">
                Prosta droga do zdania egzaminu zawodowego
              </Typography>
              <Typography variant="h5" gutterBottom>
                <strong>zdamegzaminzawodowy.pl</strong> to ogromna baza pytań z
                różnych egzaminów zawodowych. Pytania pochodzą z arkuszy z lat
                ubiegłych. Wyszukaj poniżej interesującą Cię kwalifikację i
                zacznij rozwiązywać testy!
              </Typography>
              <QualificationSelector qualifications={qualifications} />
              <Divider className={classes.divider} />
              <div>
                <Link
                  href={GOOGLE_PLAY_URL}
                  title="Pobierz aplikację na Androida z Google Play"
                >
                  <img
                    className={classes.googlePlayBadge}
                    src="/images/google-play-badge.svg"
                    alt="Pobierz aplikację na Androida z Google Play"
                  />
                </Link>
              </div>
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
    position: 'relative',
    overflowX: 'hidden',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    minHeight: '60vh',
  },
  imageWrapper: {
    textAlign: 'center',
  },
  divider: {
    marginTop: theme.spacing(5),
  },
  googlePlayBadge: {
    width: '150px',
  },
}));

export default Header;

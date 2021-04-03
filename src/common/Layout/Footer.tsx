import { AUTHOR } from 'config/app';
import { Route } from 'config/routing';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import Link from 'common/Link/Link';

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.footer} position="absolute" component="footer">
      <Toolbar disableGutters>
        <Container className={classes.container}>
          <Typography component="p">
            zdamegzaminzawodowy.pl &copy; {new Date().getFullYear()}
          </Typography>
          <div className={classes.links}>
            <Link
              color="inherit"
              underline="hover"
              title="Polityka prywatności"
              href={Route.PrivacyPolicyPage}
            >
              Polityka prywatności
            </Link>
            <Link
              color="inherit"
              underline="hover"
              title="Kontakt"
              href={AUTHOR.CONTACT}
            >
              Kontakt
            </Link>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => {
  return {
    footer: {
      top: 'auto',
      bottom: 0,
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      },
    },
    links: {
      '& > *:not(:last-child)': {
        marginRight: theme.spacing(1),
      },
    },
  };
});

export default Footer;

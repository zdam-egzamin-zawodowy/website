import clsx from 'clsx';
import { Route } from 'config/routing';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import Link from 'common/Link/Link';

export interface TopBarProps {
  transparent?: boolean;
}

const TopBar = ({ transparent }: TopBarProps) => {
  const classes = useStyles();
  return (
    <AppBar
      position="absolute"
      color="primary"
      component="nav"
      className={clsx(classes.navbar, { transparent })}
    >
      <Container>
        <Toolbar disableGutters>
          <div>
            <Typography className={classes.title} variant="h4">
              <Link href={Route.IndexPage} title="Strona główna">
                <img src="/logo.svg" alt="zdamegzaminzawodowy.pl" />
                <span>zdamegzaminzawodowy.pl</span>
              </Link>
            </Typography>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  navbar: {
    '&  a': {
      transition: 'all .2s',
      cursor: 'pointer',
      padding: theme.spacing(0.75, 1),
    },
    '&.transparent': {
      boxShadow: 'none',
      backgroundColor: 'transparent',
    },
  },
  title: {
    '& a': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      color: 'inherit',
      '& span': {
        [theme.breakpoints.down('xs')]: {
          display: 'none',
        },
      },
    },
    '& img': {
      width: theme.spacing(6),
      marginRight: theme.spacing(1),
    },
  },
}));

export default TopBar;

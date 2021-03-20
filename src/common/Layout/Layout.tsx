import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import TopBar from './TopBar';
import Footer from './Footer';

export interface LayoutProps {
  children?: React.ReactNode;
  absoluteTopBar?: boolean;
  transparentTopBar?: boolean;
  padding?: boolean;
}

const Layout = ({
  children,
  padding = true,
  absoluteTopBar,
  transparentTopBar,
}: LayoutProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <TopBar transparent={transparentTopBar} />
      <main className={clsx(classes.main, { padding })}>
        {!absoluteTopBar && <Toolbar />}
        {children}
        <Toolbar />
      </main>
      <Footer />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  main: {
    minHeight: '100vh',
    '&.padding': {
      padding: theme.spacing(3, 0),
    },
  },
  container: {
    position: 'relative',
  },
}));

export default Layout;

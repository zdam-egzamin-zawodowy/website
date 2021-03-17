import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import TopBar from './TopBar';
import Footer from './Footer';

export interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <TopBar />
      <main className={classes.main}>
        <Toolbar />
        {children}
        <Toolbar />
      </main>
      <Footer />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(3, 0),
    minHeight: '100vh',
  },
  container: {
    position: 'relative',
  },
}));

export default Layout;

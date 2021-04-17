import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, ButtonGroup, useMediaQuery } from '@material-ui/core';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Done as DoneIcon,
  Refresh as RefreshIcon,
} from '@material-ui/icons';

export interface NavigationProps {
  hasPreviousTab: boolean;
  hasNextTab: boolean;
  isLastQuestion: boolean;
  onRequestPrevTab: () => void;
  onRequestNextTab: () => void;
  onFinish: () => void;
  onReset: () => void;
  reviewMode: boolean;
}

const Navigation = ({
  hasPreviousTab,
  hasNextTab,
  isLastQuestion,
  onRequestPrevTab,
  onRequestNextTab,
  onFinish,
  reviewMode,
  onReset,
}: NavigationProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div className={classes.buttonContainer}>
      <div className={classes.navButtonGroup}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          disabled={!hasPreviousTab}
          onClick={onRequestPrevTab}
        >
          Wróć
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          disabled={!hasNextTab}
          onClick={onRequestNextTab}
        >
          Dalej
        </Button>
      </div>
      <ButtonGroup color="primary" variant="contained" fullWidth={matches}>
        {isLastQuestion && !reviewMode && (
          <Button onClick={onFinish} startIcon={<DoneIcon />}>
            Zakończ test
          </Button>
        )}
        {reviewMode && (
          <Button startIcon={<RefreshIcon />} onClick={onReset}>
            Rozpocznij od nowa
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};

const useStyles = makeStyles(theme => {
  return {
    navButtonGroup: {
      display: 'flex',
      '& > *:not(:last-child)': {
        marginRight: theme.spacing(2),
      },
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-between',
      },
    },

    buttonContainer: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        '& > *:not(:last-child)': {
          marginBottom: theme.spacing(1),
        },
      },
    },
  };
});

export default Navigation;

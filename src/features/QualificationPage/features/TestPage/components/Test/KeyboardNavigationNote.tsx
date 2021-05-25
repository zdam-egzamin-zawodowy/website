import React from 'react';
import { useLocalStorage } from 'react-use';
import { Box, IconButton, NoSsr } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Close as CloseIcon } from '@material-ui/icons';

const LOCAL_STORAGE_KEY = 'showKeyboardNavigationNote';

const KeyboardNavigationNote = () => {
  const [show, setShow] = useLocalStorage(LOCAL_STORAGE_KEY, true);

  if (!show || typeof window === 'undefined') {
    return null;
  }

  return (
    <NoSsr>
      <Box mb={2}>
        <Alert
          severity="info"
          action={
            <IconButton onClick={() => setShow(false)}>
              <CloseIcon />
            </IconButton>
          }
        >
          <AlertTitle>Nawigacja</AlertTitle>
          Czy wiesz, że{' '}
          <strong>
            możesz poruszać się pomiędzy pytaniami i wybierać odpowiedzi{' '}
          </strong>
          za pomocą klawiatury? <br />- <strong>klawisze A / B / C / D</strong>{' '}
          - wybór odpowiedzi <br />- <strong>lewa strzałka</strong> - powrót do
          poprzedniego pytania <br />- <strong>prawa strzałka</strong> -
          przejście do następnego pytania <br />
        </Alert>
      </Box>
    </NoSsr>
  );
};

export default KeyboardNavigationNote;

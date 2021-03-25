import { useState } from 'react';
import { Maybe, Qualification } from 'libs/graphql';

import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Toolbar,
  Grid,
  Typography,
  Divider,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import ThemeProvider from 'libs/material-ui/ThemeProvider';

interface HeaderProps {
  qualifications: Qualification[];
}

const Header = ({ qualifications = [] }: HeaderProps) => {
  const [selectedQualification, setSelectedQualification] = useState<
    Maybe<Qualification>
  >(null);
  const classes = useStyles();

  console.log(selectedQualification);
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
              <Typography variant="h5" gutterBottom>
                <strong>zdamegzaminzawodowy.pl</strong> to ogromna baza pytań z
                różnych egzaminów zawodowych. Pytania pochodzą z arkuszy z lat
                ubiegłych. Wyszukaj poniżej interesującą Cię kwalifikację i
                zacznij rozwiązywać testy!
              </Typography>
              <ThemeProvider cssBaseline={false} paletteType="dark">
                <Autocomplete
                  getOptionLabel={option => `${option.name} (${option.code})`}
                  noOptionsText="Nie znaleziono żadnej kwalifikacji"
                  clearText="Wyczyść"
                  onChange={(e, value) => {
                    setSelectedQualification(value);
                  }}
                  renderInput={params => {
                    return (
                      <TextField
                        {...params}
                        fullWidth
                        label="Wpisz nazwę kwalifikacji lub jej oznaczenie"
                        placeholder="Na przykład: EE.08"
                        variant="outlined"
                        color="secondary"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    );
                  }}
                  options={qualifications}
                />
              </ThemeProvider>
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

import { MouseEventHandler, useState } from 'react';
import { Maybe, Qualification } from 'libs/graphql';
import { SECTION_ID as PROFESSIONS_SECTION_ID } from '../Professions/Professions';

import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { InputAdornment, TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import Link from 'common/Link/Link';
import TestForm from './TestForm';

export interface QualificationSelectorProps {
  qualifications: Qualification[];
}

const PROFESSIONS_SECTION_SELECTOR = '#' + PROFESSIONS_SECTION_ID;

const QualificationSelector = ({
  qualifications,
}: QualificationSelectorProps) => {
  const [selectedQualification, setSelectedQualification] = useState<
    Maybe<Qualification>
  >(null);
  const classes = useStyles();

  const scrollToProfessions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = document.querySelector<HTMLDivElement>(
      PROFESSIONS_SECTION_SELECTOR
    );
    if (element?.scrollIntoView) {
      e.preventDefault();
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className={classes.container}>
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
      <Link
        href={PROFESSIONS_SECTION_SELECTOR}
        onClick={scrollToProfessions}
        title="Przejdź do listy dostępnych zawodów i kwalifikacji."
      >
        Przejdź do listy dostępnych zawodów i kwalifikacji.
      </Link>
      {selectedQualification && (
        <TestForm qualification={selectedQualification} />
      )}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

export default QualificationSelector;

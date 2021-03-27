import { useState } from 'react';
import { Maybe, Qualification } from 'libs/graphql';

import { Autocomplete } from '@material-ui/lab';
import { InputAdornment, TextField } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import TestForm from './TestForm';
import { makeStyles } from '@material-ui/core/styles';

export interface QualificationSelectorProps {
  qualifications: Qualification[];
}

const QualificationSelector = ({
  qualifications,
}: QualificationSelectorProps) => {
  const [selectedQualification, setSelectedQualification] = useState<
    Maybe<Qualification>
  >(null);
  const classes = useStyles();

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

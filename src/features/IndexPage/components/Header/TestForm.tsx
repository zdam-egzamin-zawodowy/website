import { useState } from 'react';
import { polishPlurals } from 'polish-plurals';
import { Qualification } from 'libs/graphql';
import { QUESTIONS } from 'config/app';
import { Route } from 'config/routing';

import { makeStyles } from '@material-ui/core/styles';
import { Button, MenuItem, TextField, Typography } from '@material-ui/core';
import Link from 'common/Link/Link';

export interface TestFormProps {
  qualification: Qualification;
}

const TestForm = ({ qualification }: TestFormProps) => {
  const classes = useStyles();
  const [howManyQuestions, setHowManyQuestions] = useState(QUESTIONS[0]);

  return (
    <div className={classes.container}>
      <Typography className={classes.note}>
        Wybrana przez Ciebie kwalifikacja:{' '}
        <strong>
          {qualification.name} ({qualification.code})
        </strong>
      </Typography>
      <div className={classes.formContainer}>
        <TextField
          label="Ilość pytań"
          value={howManyQuestions}
          className={classes.howManyQuestionsInput}
          onChange={e => setHowManyQuestions(parseInt(e.target.value))}
          variant="outlined"
          select
        >
          {QUESTIONS.map(question => (
            <MenuItem key={question} value={question}>
              {question}{' '}
              {polishPlurals('pytanie', 'pytania', 'pytań', question)}
            </MenuItem>
          ))}
        </TextField>
        <Link
          title="Rozpocznij test"
          href={{
            pathname: Route.TestPage,
            query: {
              slug: qualification.slug,
              limit: howManyQuestions,
            },
          }}
        >
          <Button variant="contained" color="secondary">
            Rozpocznij test
          </Button>
        </Link>
      </div>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
  },
  note: {
    marginBottom: theme.spacing(1.5),
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  howManyQuestionsInput: {
    flex: 1,
    marginRight: theme.spacing(1),
  },
}));

export default TestForm;

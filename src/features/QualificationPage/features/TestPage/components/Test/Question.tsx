import React, { Fragment } from 'react';
import clsx from 'clsx';
import buildURL from 'utils/buildURL';
import { Answer, Question as QuestionT } from 'libs/graphql';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export interface QuestionProps {
  question: QuestionT;
  answer: Answer;
  onChangeAnswer: (answer: Answer) => void;
  reviewMode: boolean;
}

function Question({
  question,
  answer,
  onChangeAnswer,
  reviewMode,
}: QuestionProps) {
  const classes = useStyles();
  return (
    <div className={classes.question}>
      {question.from && (
        <Typography variant="caption">{question.from}</Typography>
      )}
      <Typography variant="h4" component="h3">
        {question.content.split('\n').map(fragment => {
          return (
            <Fragment key={fragment}>
              {fragment}
              <br />
            </Fragment>
          );
        })}
      </Typography>
      {question.image && (
        <Typography align="center">
          <img src={buildURL('cdn', question.image)} alt={question.content} />
        </Typography>
      )}
      {reviewMode && (
        <div className={classes.alertContainer}>
          {!answer && (
            <Alert severity="error">
              Nie wybrałeś w tym pytaniu żadnej odpowiedzi.
            </Alert>
          )}
          {question.explanation && (
            <Alert severity="info">{question.explanation}</Alert>
          )}
        </div>
      )}
      {Object.values(Answer).map(a => {
        const upper = a.toUpperCase();
        const image = question[
          `answer${upper}Image` as keyof QuestionT
        ] as string;
        const answerContent = question[
          `answer${upper}` as keyof QuestionT
        ] as string;
        return (
          <Button
            key={a}
            className={clsx(classes.button, {
              [classes.buttonWithImage]: !!image,
              correct: reviewMode && a === question.correctAnswer,
              wrong: reviewMode && a !== question.correctAnswer && a === answer,
            })}
            variant={
              a === answer || (reviewMode && a === question.correctAnswer)
                ? 'contained'
                : 'outlined'
            }
            fullWidth
            onClick={() => onChangeAnswer(a)}
            color={'primary'}
          >
            {`${upper}. `}
            {image ? (
              <img
                src={buildURL('cdn', image)}
                alt={answerContent ?? `Odpowiedź ${upper}.`}
              />
            ) : (
              answerContent.split('\n').map(fragment => (
                <Fragment key={fragment}>
                  {fragment}
                  <br />
                </Fragment>
              ))
            )}
          </Button>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles(theme => {
  return {
    question: {
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
      '& img': {
        maxWidth: '100%',
      },
    },
    button: {
      justifyContent: 'flex-start',
      transition: 'background-color .2s',
      textAlign: 'left',
      textTransform: 'none',
      '& img ': {
        display: 'block',
      },
      '&.correct': {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
      },
      '&.wrong': {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
      },
    },
    buttonWithImage: {
      '& .MuiButton-label': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    alertContainer: {
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(1),
      },
    },
  };
});

export default Question;
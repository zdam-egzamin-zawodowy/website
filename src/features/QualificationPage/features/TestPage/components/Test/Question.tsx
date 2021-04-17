import React, { Fragment } from 'react';
import clsx from 'clsx';
import buildURL from 'utils/buildURL';
import { Answer, Question as QuestionT } from 'libs/graphql';

import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import WordWrap from './WordWrap';
import ImageWrapper from './ImageWrapper';

export interface QuestionProps {
  question: QuestionT;
  answer: Answer;
  onSelectAnswer: (answer: Answer) => void;
  reviewMode: boolean;
}

const ANSWERS = Object.values(Answer);

const Question = ({
  question,
  answer,
  onSelectAnswer,
  reviewMode,
}: QuestionProps) => {
  const classes = useStyles();
  const updatedAt = new Date(question.updatedAt).getTime();
  return (
    <div className={classes.question}>
      {question.from && (
        <Typography variant="caption">{question.from}</Typography>
      )}
      <Typography variant="h4" component="h3">
        {question.content.split('\n').map(fragment => {
          return (
            <Fragment key={fragment}>
              <WordWrap>{fragment}</WordWrap>
              <br />
            </Fragment>
          );
        })}
      </Typography>
      {question.image && (
        <ImageWrapper height="300px">
          <Image
            layout="fill"
            src={buildURL('cdn', question.image) + `?${updatedAt}`}
            alt={question.content}
            objectFit="contain"
          />
        </ImageWrapper>
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
      {ANSWERS.map(a => {
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
            onClick={() => onSelectAnswer(a)}
            color={'primary'}
          >
            <span>
              {`${upper}. `}
              {answerContent.split('\n').map(fragment => (
                <Fragment key={fragment}>
                  {fragment}
                  <br />
                </Fragment>
              ))}
            </span>
            {image && (
              <ImageWrapper height="300px">
                <Image
                  layout="fill"
                  src={buildURL('cdn', image) + `?${updatedAt}`}
                  alt={answerContent ?? `Odpowiedź ${upper}.`}
                  objectFit="contain"
                />
              </ImageWrapper>
            )}
          </Button>
        );
      })}
    </div>
  );
};

const useStyles = makeStyles(theme => {
  return {
    question: {
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(2),
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

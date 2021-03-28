import { useMemo } from 'react';
import { polishPlurals } from 'polish-plurals';
import { calculateDifferenceBetweenTwoDates } from 'libs/hooks';
import { Answer, Question } from 'libs/graphql';

import { Typography } from '@material-ui/core';

export interface SummaryProps {
  answers: Answer[];
  questions: Question[];
  reviewMode: boolean;
  startedAt: Date;
  endedAt: Date;
}

const Summary = ({
  answers,
  questions,
  reviewMode,
  startedAt,
  endedAt,
}: SummaryProps) => {
  const correctAnswers = useMemo(() => {
    if (!reviewMode) return 0;
    return answers.filter(
      (answer, index) => questions[index].correctAnswer === answer
    ).length;
  }, [answers, questions, reviewMode]);
  const { hours, seconds, minutes } = useMemo(() => {
    return calculateDifferenceBetweenTwoDates(startedAt, endedAt);
  }, [startedAt, endedAt]);
  const total = questions.length;

  return (
    <div>
      <Typography gutterBottom component="h3" variant="h4">
        Czas rozwiązywania: {hours}{' '}
        {polishPlurals('godzina', 'godziny', 'godzin', hours)}, {minutes}{' '}
        {polishPlurals('minuta', 'minuty', 'minut', minutes)} i {seconds}{' '}
        {polishPlurals('sekunda', 'sekundy', 'sekund', seconds)}.
      </Typography>
      <Typography component="h3" variant="h4">
        Twój wynik:{' '}
        <strong>{Math.ceil((correctAnswers / total) * 100)}%</strong>
      </Typography>
      <Typography>
        Udzielono poprawnej odpowiedzi na <strong>{correctAnswers}</strong>{' '}
        {polishPlurals('pytanie', 'pytania', 'pytań', correctAnswers)} z{' '}
        <strong>{total}</strong>.
      </Typography>
    </div>
  );
};

export default Summary;

import { useEffect, useMemo, useRef, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import clsx from 'clsx';
import { usePrompt } from 'libs/hooks';
import {
  Answer,
  createClient,
  Qualification,
  Query,
  Question as QuestionT,
} from 'libs/graphql';
import { Event } from 'config/analytics';
import gtag from 'utils/gtag';
import { QUERY_GENERATE_TEST_SIMILAR_QUALIFICATIONS } from '../../queries';
import { QueryGenerateTestSimilarQualificationsArgs } from '../../types';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import Section from 'common/Section/Section';
import TabPanel from './TabPanel';
import Question from './Question';
import Navigation from './Navigation';
import Summary from './Summary';
import FixedSpinner from './FixedSpinner';

export interface TestProps {
  initialQuestions: QuestionT[];
  qualification: Qualification;
}

const MIN_QUESTIONS_REQUIRED_TO_SHOW_CONFIRMATION = 2;

const Test = ({ initialQuestions, qualification }: TestProps) => {
  const headingRef = useRef<HTMLSpanElement | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>(
    new Array(initialQuestions.length).fill('')
  );
  const [currentTab, setCurrentTab] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);
  const [startedAt, setStartedAt] = useState(new Date());
  const [endedAt, setEndedAt] = useState(new Date());
  const classes = useStyles();
  const maxTabIndex = questions.length + (reviewMode ? 1 : 0) - 1;
  usePrompt(!reviewMode);
  const analyticsParams = useMemo(
    () => ({
      qualificationID: qualification.id.toString(),
      questions: questions.length.toString(),
    }),
    [qualification, questions]
  );
  useEffect(() => {
    gtag(
      'event',
      reviewMode ? Event.FinishTest : Event.StartTest,
      analyticsParams
    );
  }, [reviewMode, analyticsParams]);
  useUpdateEffect(() => {
    if (headingRef.current?.scrollIntoView) {
      headingRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [currentTab]);
  useUpdateEffect(() => {
    resetValues(initialQuestions);
  }, [qualification, initialQuestions]);

  const resetValues = (
    questions?: Pick<Query, 'generateTest'>['generateTest']
  ) => {
    if (Array.isArray(questions)) {
      setQuestions(questions);
    }
    setStartedAt(new Date());
    setEndedAt(new Date());
    setSelectedAnswers(
      new Array((questions ?? initialQuestions).length).fill('')
    );
    setCurrentTab(0);
    setReviewMode(false);
  };

  const handleSelectAnswer = (index: number, newAnswer: Answer) => {
    if (selectedAnswers[index] === newAnswer) {
      return;
    }

    setSelectedAnswers(answers =>
      answers.map((oldAnswer, index2) =>
        index2 === index ? newAnswer : oldAnswer
      )
    );
    gtag('event', Event.SelectAnswer, {
      qualificationID: analyticsParams.qualificationID,
      questionID: questions[index].id.toString(),
      answer: newAnswer,
      correct: questions[index].correctAnswer === newAnswer ? '1' : '0',
    });
  };

  const handleReset = async () => {
    if (isFetching) {
      return;
    }

    try {
      setIsFetching(true);
      const { generateTest: newQuestions } = await createClient().request<
        Pick<Query, 'generateTest'>,
        QueryGenerateTestSimilarQualificationsArgs
      >(QUERY_GENERATE_TEST_SIMILAR_QUALIFICATIONS, {
        limitTest: questions.length,
        limitSuggestions: 0,
        skipSuggestions: true,
        qualificationID: qualification.id,
      });
      resetValues(newQuestions);
    } catch (e) {}

    setIsFetching(false);
  };

  const handleFinish = () => {
    if (
      initialQuestions.length >= MIN_QUESTIONS_REQUIRED_TO_SHOW_CONFIRMATION &&
      !window.confirm('Czy na pewno chcesz zakończyć test?')
    ) {
      return;
    }
    setEndedAt(new Date());
    setCurrentTab(currentTab => currentTab + 1);
    setReviewMode(true);
  };

  const handleGoToNextTab = () => {
    if (currentTab === maxTabIndex) {
      return;
    }
    setCurrentTab(current => current + 1);
  };

  const handleGoToPrevTab = () => {
    if (currentTab === 0) {
      return;
    }
    setCurrentTab(current => current - 1);
  };

  return (
    <Section>
      {isFetching && <FixedSpinner />}
      <Container>
        <header>
          <Typography ref={headingRef} align="center" variant="h1" gutterBottom>
            Kwalifikacja <strong>{qualification.code}</strong>
          </Typography>
        </header>
        {questions.length === 0 ? (
          <Typography align="center" variant="h2">
            Do tej kwalifikacji nie zostały dodane żadne pytania.
          </Typography>
        ) : (
          <Paper>
            <AppBar color="default" position="static">
              <Tabs
                value={currentTab}
                textColor="primary"
                indicatorColor="primary"
                variant="scrollable"
                onChange={(_, newTab: number) => setCurrentTab(newTab)}
              >
                {questions.map((question, index) => {
                  return (
                    <Tab
                      key={question.id}
                      className={clsx(
                        reviewMode
                          ? {
                              [classes.correct]:
                                question.correctAnswer ===
                                selectedAnswers[index],
                              [classes.incorrect]:
                                question.correctAnswer !==
                                selectedAnswers[index],
                            }
                          : {}
                      )}
                      label={`Pytanie ${index + 1}`}
                    />
                  );
                })}
                <Tab label="Podsumowanie" disabled={!reviewMode} />
              </Tabs>
            </AppBar>
            <Box padding={3}>
              {questions.map((question, index) => (
                <TabPanel key={question.id} value={currentTab} index={index}>
                  <Question
                    question={question}
                    answer={selectedAnswers[index]}
                    onSelectAnswer={answer => handleSelectAnswer(index, answer)}
                    reviewMode={reviewMode}
                    current={currentTab === index}
                  />
                </TabPanel>
              ))}
              <TabPanel value={currentTab} index={questions.length}>
                <Summary
                  answers={selectedAnswers}
                  questions={questions}
                  reviewMode={reviewMode}
                  startedAt={startedAt}
                  endedAt={endedAt}
                />
              </TabPanel>
              <Navigation
                hasPreviousTab={currentTab !== 0}
                hasNextTab={currentTab !== maxTabIndex}
                onRequestPrevTab={handleGoToPrevTab}
                onRequestNextTab={handleGoToNextTab}
                isLastQuestion={currentTab === maxTabIndex}
                reviewMode={reviewMode}
                onReset={handleReset}
                onFinish={handleFinish}
              />
            </Box>
          </Paper>
        )}
      </Container>
    </Section>
  );
};

const useStyles = makeStyles(theme => {
  return {
    incorrect: {
      color: `${theme.palette.error.main} !important`,
    },
    correct: {
      color: `${theme.palette.success.main} !important`,
    },
  };
});

export default Test;

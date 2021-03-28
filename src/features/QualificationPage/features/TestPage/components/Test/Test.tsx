import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
  Answer,
  Qualification,
  Question as QuestionT,
  createClient,
  Query,
  QueryGenerateTestArgs,
} from 'libs/graphql';
import { QUERY_GENERATE_TEST } from './queries';

import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Tab,
  Typography,
  Tabs,
  AppBar,
  Box,
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

  useEffect(() => {
    if (headingRef.current?.scrollIntoView) {
      headingRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [currentTab]);

  const handleReset = async () => {
    try {
      setIsFetching(true);
      const { generateTest: newQuestions } = await createClient().request<
        Pick<Query, 'generateTest'>,
        QueryGenerateTestArgs
      >(QUERY_GENERATE_TEST, {
        limit: questions.length,
        qualificationIDs: [qualification.id],
      });
      if (Array.isArray(newQuestions)) {
        setQuestions(newQuestions);
      }
      setStartedAt(new Date());
      setEndedAt(new Date());
      setSelectedAnswers(
        new Array((newQuestions ?? initialQuestions).length).fill('')
      );
      setCurrentTab(0);
      setReviewMode(false);
    } catch (e) {}

    setIsFetching(false);
  };

  const handleFinish = () => {
    setEndedAt(new Date());
    setCurrentTab(currentTab => currentTab + 1);
    setReviewMode(true);
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
                    onChangeAnswer={newAnswer =>
                      setSelectedAnswers(answers =>
                        answers.map((oldAnswer, index2) =>
                          index2 === index ? newAnswer : oldAnswer
                        )
                      )
                    }
                    reviewMode={reviewMode}
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
                hasNextTab={
                  currentTab + 1 !== questions.length + (reviewMode ? 1 : 0)
                }
                onRequestPrevTab={() => setCurrentTab(currentTab - 1)}
                onRequestNextTab={() => setCurrentTab(currentTab + 1)}
                isLastQuestion={
                  currentTab + 1 === questions.length + (reviewMode ? 1 : 0)
                }
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

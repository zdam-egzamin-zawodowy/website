import { useState } from 'react';
import { Answer, Qualification, Question as QuestionT } from 'libs/graphql';

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

export interface TestProps {
  initialQuestions: QuestionT[];
  qualification: Qualification;
}

const Test = ({ initialQuestions, qualification }: TestProps) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>(
    new Array(initialQuestions.length).fill('')
  );
  const [currentTab, setCurrentTab] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);

  return (
    <Section>
      <Container>
        <Typography align="center" variant="h1" gutterBottom>
          Kwalifikacja <strong>{qualification.code}</strong>
        </Typography>
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
                    <Tab key={question.id} label={`Pytanie ${index + 1}`} />
                  );
                })}
              </Tabs>
            </AppBar>
            <Box padding={3}>
              {questions.map((question, index) => (
                <TabPanel key={question.id} value={index} index={index}>
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
            </Box>
          </Paper>
        )}
      </Container>
    </Section>
  );
};

export default Test;

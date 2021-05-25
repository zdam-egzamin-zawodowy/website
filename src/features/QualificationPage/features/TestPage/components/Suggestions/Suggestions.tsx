import { polishPlurals } from 'polish-plurals';
import { Qualification } from 'libs/graphql';
import { QUESTIONS } from 'config/app';
import { Route } from 'config/routing';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import Section from 'common/Section/Section';
import Link from 'common/Link/Link';

export interface SuggestionsProps {
  suggestions: Qualification[];
}

const Suggestions = ({ suggestions }: SuggestionsProps) => {
  const classes = useStyles();

  return (
    <Section>
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Podobne kwalifikacje
        </Typography>
        <Grid container spacing={2}>
          {suggestions.map(suggestion => {
            return (
              <Grid item xs={12} sm={6} md={4} key={suggestion.id}>
                <Card className={classes.card}>
                  <CardHeader
                    title={suggestion.name}
                    subheader={suggestion.code}
                  />
                  <div className={classes.spacer} />
                  <CardActions>
                    {QUESTIONS.map(limit => {
                      return (
                        <Link
                          href={{
                            pathname: Route.TestPage,
                            query: { slug: suggestion.slug, limit },
                          }}
                          key={limit}
                        >
                          <Button color="secondary">
                            Test {limit}{' '}
                            {polishPlurals(
                              'pytanie',
                              'pytania',
                              'pytań',
                              limit
                            )}
                          </Button>
                        </Link>
                      );
                    })}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  spacer: {
    flex: 1,
  },
}));

export default Suggestions;

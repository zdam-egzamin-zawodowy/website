import { useMemo } from 'react';
import { groupBy } from 'lodash';
import { polishPlurals } from 'polish-plurals';
import { Profession as ProfessionT } from 'libs/graphql';
import { QUESTIONS } from 'config/app';
import { Route } from 'config/routing';

import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import Link from 'common/Link/Link';

export interface ProfessionProps {
  profession: ProfessionT;
}

const Profession = ({ profession }: ProfessionProps) => {
  const classes = useStyles();
  const qualificationsByFormula = useMemo(() => {
    return groupBy(profession.qualifications, 'formula');
  }, [profession]);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h4">{profession.name}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {profession.qualifications.length > 0 ? (
          Object.keys(qualificationsByFormula).map(formula => {
            const qualifications = qualificationsByFormula[formula];
            return (
              <div key={formula}>
                <Typography variant="h5">{formula}</Typography>
                {qualifications.map(qualification => {
                  return (
                    <Typography key={qualification.id}>
                      <strong>
                        {qualification.name} ({qualification.code})
                      </strong>{' '}
                      -&gt;{' '}
                      {QUESTIONS.map((limit, index) => {
                        return (
                          <span key={limit}>
                            <Link
                              href={{
                                pathname: Route.TestPage,
                                query: {
                                  slug: qualification.slug,
                                  limit: limit,
                                },
                              }}
                            >
                              Test {limit}{' '}
                              {polishPlurals(
                                'pytanie',
                                'pytania',
                                'pytań',
                                limit
                              )}
                            </Link>
                            {index + 1 !== QUESTIONS.length ? ' | ' : ''}
                          </span>
                        );
                      })}
                    </Typography>
                  );
                })}
              </div>
            );
          })
        ) : (
          <Typography>
            Żadna kwalifikacja nie została przypisana do zawodu{' '}
            {profession.name}
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles(theme => {
  return {
    accordionDetails: {
      flexDirection: 'column',
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(1),
      },
    },
  };
});

export default Profession;

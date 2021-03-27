import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

export enum Size {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum BgColor {
  Primary = 'primary',
  PrimaryDark = 'primary.dark',
  Secondary = 'secondary',
  SecondaryDark = 'secondary.dark',
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: Size;
  bgColor?: BgColor;
  className?: string;
}

const Section = ({
  size = Size.Small,
  bgColor,
  className,
  children,
  ...rest
}: SectionProps) => {
  const classes = useStyles();
  return (
    <section
      className={clsx(className, classes.section, {
        ['is-medium']: size === Size.Medium,
        ['is-large']: size === Size.Large,
        ['is-primary']: bgColor === BgColor.Primary,
        ['is-primary-dark']: bgColor === BgColor.PrimaryDark,
        ['is-secondary']: bgColor === BgColor.Secondary,
        ['is-secondary-dark']: bgColor === BgColor.SecondaryDark,
      })}
      {...rest}
    >
      {children}
    </section>
  );
};

const useStyles = makeStyles(theme => ({
  section: {
    padding: theme.spacing(3, 0),
    '&.is-medium': {
      padding: theme.spacing(8, 0),
    },
    '&.is-large': {
      padding: theme.spacing(15, 0),
    },
    '&.is-primary': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    '&.is-primary-dark': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
    '&.is-secondary': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    '&.is-secondary-dark': {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.contrastText,
    },
  },
}));

export default Section;

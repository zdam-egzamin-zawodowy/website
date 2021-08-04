module.exports = {
  extends: ['next'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-pascal-case': [
      'warn',
      {
        ignore: [],
      },
    ],
  },
};

module.exports = {
  extends: ['react-app'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-pascal-case': [
      'warn',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
  },
};

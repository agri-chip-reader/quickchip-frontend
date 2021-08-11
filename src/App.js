import React from 'react';

import 'react-perfect-scrollbar/dist/css/styles.css';

import theme from 'src/theme';
import routes from 'src/routes';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import ReactNotification from 'react-notifications-component'

import { useRoutes } from 'react-router-dom';

const App = () => {
  const routing = useRoutes(routes);
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
        <ReactNotification />
      </ThemeProvider>
  );
};

export default App;

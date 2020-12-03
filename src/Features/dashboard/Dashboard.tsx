import React from 'react';
import { Provider, createClient } from 'urql';
import { MetricsSelector } from '../metricsSelecter';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

export const DashboardPage = () => {
  return (
    <Provider value={client}>
      <MetricsSelector />
    </Provider>
  );
};

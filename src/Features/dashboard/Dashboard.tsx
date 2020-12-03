import React from 'react';
import { Provider, createClient } from 'urql';
import { MetricsSelector } from '../metricsSelecter';
import { ShowMetricsData } from '../showMatricsData';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

export const DashboardPage = () => {
  return (
    <Provider value={client}>
      <div style={{ position: 'absolute', top: 10, right: 20 }}>
        <MetricsSelector />
      </div>
      <div style={{ position: 'absolute', top: 10, left: 20, width: '75vw' }}>
        <ShowMetricsData />
      </div>
    </Provider>
  );
};

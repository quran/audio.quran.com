import React from 'react';
import { IndexRoute, Route } from 'react-router';

import {
  App,
  Home,
  NotFound,
  Qaris,
  Qari
} from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      <Route path="/qaris" component={Qaris} />
      <Route path="/reciters" component={Qaris} />

      <Route path="quran/:id" component={Qari} />
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};

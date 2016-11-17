import React from 'react';
import { IndexRoute, Route } from 'react-router';

import {
  App,
  Home,
  NotFound,
  Qaris,
  Qari,
  About,
  Sura
} from 'containers';

function isValid(nextState, replaceState) {
  if (isNaN(nextState.params.id) || nextState.params.id > 114 || nextState.params.id < 1) {
    replaceState('/');
  }
}
export default () => {
  return (
    <Route path="/" component={App}>

      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      <Route path="/section/(:section)" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/qaris" component={Qaris} />
      <Route path="/reciters" component={Qaris} />

      <Route path="quran/:id" component={Qari} />
      <Route path="/sura" component={Home} onEnter={isValid}/>
      <Route path="/sura/:id" component={Sura} onEnter={isValid}/>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};

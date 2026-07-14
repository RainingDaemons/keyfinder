/*
@Date         : 14-07-2026
@Author       : Felipe Gutiérrez Carilao
@Website      : https://www.rainingdaemons.com/
@Module       : frontend/src
@File         : index.jsx
*/

import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import 'solid-devtools';
import "./index.css";

import Home from './routes/Home';
import HowItWorks from './routes/HowItWorks';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/how-it-works" component={HowItWorks} />
  </Router>
), root);
